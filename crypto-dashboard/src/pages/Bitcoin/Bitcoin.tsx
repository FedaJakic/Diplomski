import React, { useState, useEffect } from 'react'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import DeltaChart from '../../components/bitcoin/DeltaChart'
import BigGraph from '../../components/graph/BigGraph'
import { GraphHistory } from '../../util/pages/graphsAndInfos/types'
import SocialLinks from '../../components/graph/SocialLinks'
import BasicMempoolInfo from '../../components/bitcoin/BasicMempoolInfo'
import BitcoinBasicInfo from '../../components/bitcoin/BitcoinBasicInfo'

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

interface MempoolInfo {
  loaded: boolean
  size: number
  bytes: number
  usage: number
  total_fee: number
  maxmempool: number
  mempoolminfee: number
  minrelaytxfee: number
  incrementalrelayfee: number
  unbroadcastcount: number
  fullrbf: boolean
}

const Bitcoin: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null)
  const [history, setHistory] = useState<GraphHistory[]>([])
  const [mempoolInfo, setMempoolInfo] = useState<MempoolInfo | null>(null)
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

        const mempoolResponse = await GraphsAndInfosApi.getMempoolInfo()
        setMempoolInfo(mempoolResponse)

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
  ]

  return (
    <div className="container mt-4">
      <BitcoinBasicInfo bitcoinData={bitcoinData} />
      <div className="col-12">
        <BigGraph historyData={history} name="Bitcoin" />
      </div>
      <div className="row">
        <div className="col-6">
          <DeltaChart data={deltaData} />
        </div>
        <div className="col-6">
          <SocialLinks links={bitcoinData.links} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Mempool Information</h3>
          {mempoolInfo && <BasicMempoolInfo mempoolInfo={mempoolInfo} />}
        </div>
      </div>
    </div>
  )
}

export default Bitcoin
