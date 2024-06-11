import express from 'express'
import asyncHandler from 'express-async-handler'
import { User } from '../models/Users.js'
import { Message } from '../models/Message.js'
import { EXTERNAL_URL } from '../utils/constants.js'

const router = express.Router()

router.post(
  '/send',
  asyncHandler(async (req, res, next) => {
    try {
      const { senderId, receiverId, subject, content } = req.body

      const sender = await User.findByPk(senderId)
      const receiver = await User.findByPk(receiverId)

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' })
      }

      const message = await Message.create({
        senderId,
        receiverId,
        subject,
        content,
      })

      res.status(201).json({ success: true, message })
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

router.get(
  '/unseen/:userId',
  asyncHandler(async (req, res, next) => {
    try {
      const { userId } = req.params
      const unseenCount = await Message.count({
        where: {
          receiverId: userId,
          isViewed: false,
        },
      })

      res.status(200).json({ unseenCount })
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

router.get(
  '/:userId',
  asyncHandler(async (req, res, next) => {
    try {
      const { userId } = req.params
      const messages = await Message.findAll({
        where: { receiverId: userId },
        include: [
          { model: User, as: 'sender', attributes: ['id', 'username'] },
          { model: User, as: 'receiver', attributes: ['id', 'username'] },
        ],
        order: [['created', 'DESC']],
      })
      res.status(200).json({ success: true, messages })
    } catch (err) {
      next(err)
    }
  })
)

router.get(
  '/find/:messageId',
  asyncHandler(async (req, res, next) => {
    try {
      const { messageId } = req.params
      console.log('ajkdhaskludgmskdzgasnkdhgasmkdjzag')
      const message = await Message.findOne({
        where: { id: messageId },
        include: [
          { model: User, as: 'sender', attributes: ['id', 'username'] },
          { model: User, as: 'receiver', attributes: ['id', 'username'] },
        ],
      })
      if (!message) {
        return res
          .status(404)
          .json({ success: false, message: 'Message not found' })
      }
      res.status(200).json({ success: true, message })
    } catch (err) {
      next(err)
    }
  })
)

// Mark message as viewed
router.patch(
  '/:messageId/view',
  asyncHandler(async (req, res, next) => {
    try {
      const { messageId } = req.params
      await Message.update({ isViewed: true }, { where: { id: messageId } })
      res.status(200).json({ success: true })
    } catch (err) {
      next(err)
    }
  })
)

export default router
