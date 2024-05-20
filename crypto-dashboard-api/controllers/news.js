import express from 'express'
import asyncHandler from 'express-async-handler'
import { EXTERNAL_URL } from '../utils/constants.js'
import { config } from 'dotenv'

config()
const NEWS_API_KEY = process.env.NEWS_API_KEY

const router = express.Router()

router.get(
  '/news',
  asyncHandler(async (req, res, next) => {
    try {
      const news = await fetch(
        `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      )

      const newsResponse = await news.json()

      res.status(201).send(newsResponse)
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

export default router
