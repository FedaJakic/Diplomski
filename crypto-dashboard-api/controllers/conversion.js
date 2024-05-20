import express from 'express'
import asyncHandler from 'express-async-handler'
import { EXTERNAL_URL } from '../utils/constants.js'

const router = express.Router()

router.post(
  '/conversion',
  asyncHandler(async (req, res, next) => {
    const { currencyFrom, currencyTo, value } = req.body

    try {
      const currencyConversionJSON = await fetch(
        `${EXTERNAL_URL.api_coinbase_conversion}${currencyFrom}`
      )

      const conversion = await currencyConversionJSON.json()
      const rate = conversion.data.rates[currencyTo]

      if (!rate) {
        throw new Error(`Conversion rate for ${currencyTo} not found`)
      }

      const convertedValue = value * parseFloat(rate)

      res.status(200).json({
        convertedValue,
      })
    } catch (err) {
      const error = new Error(err.message)
      return next(error)
    }
  })
)

export default router
