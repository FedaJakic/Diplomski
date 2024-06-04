import express from 'express'
import asyncHandler from 'express-async-handler'
import { config } from 'dotenv'
import { getMempoolInfo } from '../services/mempoolServices.js'

config()
const API_KEY = process.env.LIVECOINWATCH_API
const router = express.Router()

router.route('/mempool').get(getMempoolInfo)

export default router
