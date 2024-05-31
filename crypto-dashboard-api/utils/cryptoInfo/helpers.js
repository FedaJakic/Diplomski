import { config } from 'dotenv'
config()
const API_KEY = process.env.LIVECOINWATCH_API

export const getCurrentAndPastTimestamps = () => {
  const now = new Date()

  const currentTimestamp = now.getTime()
  const pastTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000

  return { currentTimestamp, pastTimestamp }
}

export const fetchHistoryForCrypto = async (cryptoCode) => {
  const timestamps = getCurrentAndPastTimestamps()
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
