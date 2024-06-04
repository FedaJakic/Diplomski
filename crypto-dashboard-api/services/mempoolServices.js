import asyncHandler from 'express-async-handler'
import createBitcoinClient from '../config/btcServer.js'

// @desc    Get block info by Hash
// @route   Post /api/blocks/getBlockInfoByHash
// @access  Public
const getMempoolInfo = asyncHandler(async (req, res) => {
  try {
    const client = createBitcoinClient()

    const response = await client.getMempoolInfo()

    res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

export { getMempoolInfo }
