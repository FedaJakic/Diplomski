import express from 'express'
import asyncHandler from 'express-async-handler'
import { EXTERNAL_URL } from '../utils/constants.js'
import { config } from 'dotenv'
import { CryptoCache } from '../models/CryptoCache.js'
import {
  getCurrentAndPastTimestamps,
  fetchHistoryForCrypto,
} from '../utils/cryptoInfo/helpers.js'

config()
const API_KEY = process.env.LIVECOINWATCH_API
const router = express.Router()

router.post(
  '/all',
  asyncHandler(async (req, res, next) => {
    try {
      const result = await CryptoCache.findAll()

      res.status(200).send(result)
    } catch (err) {
      console.error(err)
      const error = new Error(err.message)
      return next(error)
    }
  })
)

router.post(
  '/cache-crypto',
  asyncHandler(async (req, res, next) => {
    try {
      const listResponse = await fetch(
        'https://api.livecoinwatch.com/coins/list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${API_KEY}`,
          },
          body: JSON.stringify({
            currency: 'EUR',
            sort: 'rank',
            order: 'ascending',
            offset: 0,
            limit: 100,
            meta: true,
          }),
        }
      )

      if (!listResponse.ok) {
        throw new Error('Failed to fetch list data from the external API')
      }

      const mainList = await listResponse.json()

      // Fetch all existing records from the database
      const existingCryptos = await CryptoCache.findAll()
      const existingCryptosMap = new Map(
        existingCryptos.map((crypto) => [crypto.code, crypto])
      )

      const cryptoDataPromises = mainList.map(async (crypto) => {
        const history = await fetchHistoryForCrypto(crypto.code)
        return {
          name: crypto.name,
          code: crypto.code,
          rank: crypto.rank,
          image: crypto.webp64,
          color: crypto.color,
          official_website: crypto.links.website,
          whitepaper: crypto.links.whitepaper,
          current_price: crypto.rate,
          cap: crypto.cap,
          volume: crypto.volume,
          all_time_high_usd: crypto.allTimeHighUSD,
          delta_hour: ((crypto.delta.hour - 1) * 100).toFixed(2),
          delta_day: ((crypto.delta.day - 1) * 100).toFixed(2),
          history_7_days: history,
        }
      })

      const cryptoData = await Promise.all(cryptoDataPromises)

      for (const newCrypto of cryptoData) {
        const existingCrypto = existingCryptosMap.get(newCrypto.code)

        if (existingCrypto) {
          // Update only changed fields
          const updatedFields = {}
          for (const key of Object.keys(newCrypto)) {
            if (newCrypto[key] !== existingCrypto[key]) {
              updatedFields[key] = newCrypto[key]
            }
          }
          if (Object.keys(updatedFields).length > 0) {
            await existingCrypto.update(updatedFields)
          }
        } else {
          // Create new entry
          await CryptoCache.create(newCrypto)
        }
      }

      res.status(201).json({
        success: true,
        message: 'Crypto data cached successfully',
      })
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

export default router
