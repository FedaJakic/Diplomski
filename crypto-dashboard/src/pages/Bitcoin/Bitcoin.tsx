import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface HistoricalData {
  date: string
  price: number
}

interface BitcoinData {
  name: string
  symbol: string
  rank: number
  age: number
  color: string
  png32: string
  png64: string
  webp32: string
  webp64: string
  exchanges: number
  markets: number
  pairs: number
  categories: string[]
  allTimeHighUSD: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  links: {
    website: string
    whitepaper: string
    reddit: string
  }
  rate: number
  volume: number
  cap: number
  liquidity: number
  delta: {
    hour: number
    day: number
    week: number
    month: number
    quarter: number
    year: number
  }
}

const Bitcoin: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])

  useEffect(() => {
    fetchBitcoinData()
    fetchHistoricalData()
  }, [])

  const fetchBitcoinData = async () => {
    const response = await fetch('https://api.livecoinwatch.com/coins/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY',
      },
      body: JSON.stringify({
        currency: 'USD',
        code: 'BTC',
        meta: true,
      }),
    })

    const data: BitcoinData = await response.json()
    setBitcoinData(data)
  }

  const fetchHistoricalData = async () => {
    // Replace this with the actual API call to fetch historical data
    // For demonstration, using mock data
    const mockData: HistoricalData[] = [
      { date: '2023-01-01', price: 40000 },
      { date: '2023-02-01', price: 45000 },
      { date: '2023-03-01', price: 50000 },
      { date: '2023-04-01', price: 55000 },
      { date: '2023-05-01', price: 60000 },
      { date: '2023-06-01', price: 65000 },
      { date: '2023-07-01', price: 70000 },
      { date: '2023-08-01', price: 75000 },
      { date: '2023-09-01', price: 80000 },
      { date: '2023-10-01', price: 85000 },
    ]

    setHistoricalData(mockData)
  }

  if (!bitcoinData) {
    return <div>Loading...</div>
  }

  const data = {
    labels: historicalData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Bitcoin Price in USD',
        data: historicalData.map((entry) => entry.price),
        fill: false,
        borderColor: bitcoinData.color,
        backgroundColor: bitcoinData.color,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bitcoin Price in USD Over Time',
      },
    },
  }

  return (
    <div>
      <h2>{bitcoinData.name} Chart</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default Bitcoin
