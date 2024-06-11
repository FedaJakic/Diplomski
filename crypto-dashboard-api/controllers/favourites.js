import express from 'express'
import asyncHandler from 'express-async-handler'
import { Favourite } from '../models/Favourites.js'
import { CryptoCache } from '../models/CryptoCache.js'
import { config } from 'dotenv'

config()
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.body

    try {
      // Find all favorite crypto codes for the user
      const favouriteCryptos = await Favourite.findAll({
        where: {
          user_id: userId,
        },
        attributes: ['crypto_code'],
      })

      const cryptoCodes = favouriteCryptos.map((fav) => fav.crypto_code)

      // Find details of all cryptos in the CryptoCache model
      const cryptoDetails = await CryptoCache.findAll({
        where: {
          code: cryptoCodes,
        },
      })

      res.status(200).json({ success: true, favorite_cryptos: cryptoDetails })
    } catch (err) {
      next(err)
    }
  })
)

router.post(
  '/isFavourite',
  asyncHandler(async (req, res, next) => {
    const { userId, cryptoCode } = req.body

    try {
      const favourite = await Favourite.findOne({
        where: {
          user_id: userId,
          crypto_code: cryptoCode,
        },
      })

      if (favourite) {
        return res.status(200).json({ success: true, isFavourite: true })
      } else {
        return res.status(200).json({ success: true, isFavourite: false })
      }
    } catch (err) {
      next(err)
    }
  })
)

router.post(
  '/addToFavourites',
  asyncHandler(async (req, res, next) => {
    const { userId, cryptoCode } = req.body

    try {
      const newFavourite = await Favourite.create({
        user_id: userId,
        crypto_code: cryptoCode,
      })

      res.status(200).json({ success: true, favourite: newFavourite })
    } catch (err) {
      console.error('Error adding to favorites:', err)
      next(err)
    }
  })
)

router.post(
  '/removeFromFavourites',
  asyncHandler(async (req, res, next) => {
    const { userId, cryptoCode } = req.body

    try {
      const favourite = await Favourite.findOne({
        where: {
          user_id: userId,
          crypto_code: cryptoCode,
        },
      })

      if (!favourite) {
        return res
          .status(404)
          .json({ success: false, message: 'Favourite not found' })
      }

      await favourite.destroy()

      res
        .status(200)
        .json({ success: true, message: 'Favourite removed successfully' })
    } catch (err) {
      next(err)
    }
  })
)

export default router
