import { config } from 'dotenv'
config()
const API_KEY = process.env.LIVECOINWATCH_API

export const getCurrentAndPastTimestampsOneWeek = () => {
  const now = new Date()

  const currentTimestamp = now.getTime()
  const pastTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000

  return { currentTimestamp, pastTimestamp }
}

export const getCurrentAndPastTimestampsOneMonth = () => {
  const now = new Date()

  const currentTimestamp = Math.floor(now.getTime() / 1000)

  const pastDate = new Date(now)
  pastDate.setMonth(now.getMonth() - 1)

  const pastTimestamp = Math.floor(pastDate.getTime() / 1000)

  return { currentTimestamp, pastTimestamp }
}

export const fetchHistoryForCryptoOneWeek = async (cryptoCode) => {
  const timestamps = getCurrentAndPastTimestampsOneWeek()
  const responseHistory = await fetch(
    'https://api.livecoinwatch.com/coins/single/history',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        currency: 'EUR',
        code: cryptoCode,
        start: timestamps.pastTimestamp,
        end: timestamps.currentTimestamp,
        meta: true,
      }),
    }
  )

  if (!responseHistory.ok) {
    throw new Error(`Failed to fetch data for ${cryptoCode}`)
  }

  const result = await responseHistory.json()
  return result.history
}

export const fetchHistoryForCryptoOneMonth = async (cryptoCode) => {
  const timestamps = getCurrentAndPastTimestampsOneMonth()
  const responseHistory = await fetch(
    'https://api.livecoinwatch.com/coins/single/history',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        currency: 'EUR',
        code: cryptoCode,
        start: timestamps.pastTimestamp,
        end: timestamps.currentTimestamp,
        meta: true,
      }),
    }
  )

  if (!responseHistory.ok) {
    throw new Error(`Failed to fetch data for ${cryptoCode}`)
  }

  const result = await responseHistory.json()
  return result.history
}
