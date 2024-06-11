import express from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/Users.js'
import { verifyToken } from '../utils/authentication/authHelpers.js'
import { config } from 'dotenv'
import { matchPassword } from '../utils/authentication/auth.js'
import upload from '../config/multerConfig.js'

config()
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { username, name, surname, email, password, date_of_birth } = req.body
    const role = 1

    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await User.create({
        username: username,
        first_name: name,
        last_name: surname,
        email: email,
        password: hashedPassword,
        date_of_birth: date_of_birth,
        role_id: role,
      })

      res.status(201).json({
        success: true,
      })
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

router.post(
  '/login',
  asyncHandler(async (req, res, _) => {
    let { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (user && (await matchPassword(password, user.dataValues.password))) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role_id,
        },
        SECRET_KEY,
        { expiresIn: '3h' }
      )

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          name: user.first_name,
          surname: user.last_name,
          email: user.email,
          date_of_birth: user.date_of_birth,
          role: user.role_id,
          token: token,
        },
      })
    } else {
      res.status(401).send({ success: false })
      throw new Error('Invalid email or password')
    }
  })
)

router.get(
  '/all-users',
  asyncHandler(async (req, res) => {
    try {
      const users = await User.findAll()
      res.status(200).json({
        message: 'Successfully retrieved users!',
        data: users,
        success: true,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
)

router.post(
  '/userProfile',
  asyncHandler(async (req, res) => {
    try {
      const { userId } = req.body
      const userProfile = await User.findOne({
        where: {
          id: userId,
        },
      })
      res.status(200).send(userProfile)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
)

router.put(
  '/userProfile',
  asyncHandler(async (req, res) => {
    const { userId } = req.body
    try {
      const [updatedRows, updatedInstance] = await User.update(req.body, {
        where: { id: userId },
        returning: true,
      })
      if (!updatedRows) {
        throw new Error('Nothing updated!')
      }
      res.status(200).send({
        message: 'Successfully updated user!',
        data: updatedInstance,
        success: true,
      })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
)

router.put(
  '/profilePicture',
  upload.single('profile_picture'),
  asyncHandler(async (req, res) => {
    const { userId, username } = req.body

    console.log('---------------------------------')
    console.log('Request body:', req.body)
    console.log('Uploaded file:', req.file)
    console.log('---------------------------------')

    if (!req.file) {
      return res.status(400).send({ error: 'File upload failed' })
    }

    const profilePicturePath = `/profilePictures/${username}/${req.file.filename}`

    try {
      // Update the user's profile picture URL in the database
      await User.update(
        { profile_picture: profilePicturePath },
        { where: { id: userId } }
      )

      res.status(200).send({
        message: 'Successfully updated user!',
        success: true,
        profilePicturePath,
      })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
)

// @desc    Delete user by ID
// @route   PUT /api/users/userProfile/:userId
// @access  Public
router.post(
  '/delete',
  asyncHandler(async (req, res) => {
    const { userId } = req.body
    try {
      const deletedRow = await User.destroy({
        where: { id: userId },
      })

      res.status(200).json({
        success: true,
        message: 'User uspješno obrisana.',
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Greška prilikom brisanja usera.',
        error: error.message,
      })
    }
  })
)

export default router
