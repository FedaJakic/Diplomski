import express from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/Users.js'
import { verifyToken } from '../utils/authentication/authHelpers.js'
import { config } from 'dotenv'
import { matchPassword } from '../utils/authentication/auth.js'

config()
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { name, surname, email, password, date_of_birth } = req.body
    const role = 1

    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await User.create({
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
          role: user.role,
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

export default router
