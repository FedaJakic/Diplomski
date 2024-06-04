import React, { useState, useEffect } from 'react'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import DeltaChart from '../../components/bitcoin/DeltaChart'
import BigGraph from '../../components/graph/BigGraph'
import { GraphHistory } from '../../util/pages/graphsAndInfos/types'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'
import SocialLinks from '../../components/graph/SocialLinks'

interface Delta {
  hour: number
  day: number
  week: number
  month: number
  quarter: number
  year: number
}

interface Links {
  [key: string]: string | null
}

interface BitcoinData {
  name: string
  symbol: string
  rank: number
  age: number
  color: string
  png64: string
  exchanges: number
  markets: number
  pairs: number
  allTimeHighUSD: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  links: Links
  rate: number
  volume: number
  cap: number
  liquidity: number
  delta: Delta
}

const Bitcoin: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null)
  const [history, setHistory] = useState<GraphHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBitcoinInfo = async () => {
      try {
        const response = await GraphsAndInfosApi.getCodeInfo({
          currency: 'EUR',
          code: 'BTC',
        })
        setBitcoinData(response)

        const response2 = await GraphsAndInfosApi.getSingleHistory({
          currency: 'EUR',
          code: 'BTC',
        })
        setHistory(response2)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching Bitcoin info:', error)
      }
    }

    fetchBitcoinInfo()
  }, [])

  if (isLoading) return <Loading />

  if (!bitcoinData) return <div>No data available</div>

  const deltaData = [
    (bitcoinData.delta.hour - 1) * 100,
    (bitcoinData.delta.day - 1) * 100,
    (bitcoinData.delta.week - 1) * 100,
    (bitcoinData.delta.month - 1) * 100,
    (bitcoinData.delta.quarter - 1) * 100,
    // (bitcoinData.delta.year - 1) * 100,
  ]

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <img src={bitcoinData.png64} alt={`${bitcoinData.name} logo`} />
          <h1 style={{ color: bitcoinData.color }}>
            {bitcoinData.name} ({bitcoinData.symbol})
          </h1>
          <p>Rank: {bitcoinData.rank}</p>
        </div>
      </div>
      <div className="col-12">
        <BigGraph historyData={history} />
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-currency-dollar"></i> Rate
              </h5>
              <p className="card-text">${bitcoinData.rate.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-graph-up"></i> Volume
              </h5>
              <p className="card-text">
                ${formatLargeNumber(bitcoinData.volume)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-bank"></i> Market Cap
              </h5>
              <p className="card-text">${formatLargeNumber(bitcoinData.cap)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-droplet"></i> Liquidity
              </h5>
              <p className="card-text">
                ${formatLargeNumber(bitcoinData.liquidity)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-wallet2"></i> Circulating Supply
              </h5>
              <p className="card-text">
                {bitcoinData.circulatingSupply.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-box-seam"></i> Total Supply
              </h5>
              <p className="card-text">
                {bitcoinData.totalSupply.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-trophy"></i> Max Supply
              </h5>
              <p className="card-text">
                {bitcoinData.maxSupply.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-stars"></i> All Time High (USD)
              </h5>
              <p className="card-text">
                ${bitcoinData.allTimeHighUSD.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-shop"></i> Markets
              </h5>
              <p className="card-text">{bitcoinData.markets}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <DeltaChart data={deltaData} />
        </div>
        <div className="col-6">
          <SocialLinks links={bitcoinData.links} />
        </div>
      </div>
    </div>
  )
}

export default Bitcoin
