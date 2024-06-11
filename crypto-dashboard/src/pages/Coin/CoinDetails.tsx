import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import DeltaChart from '../../components/bitcoin/DeltaChart'
import BigGraph from '../../components/graph/BigGraph'
import { GraphHistory } from '../../util/pages/graphsAndInfos/types'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'
import SocialLinks from '../../components/graph/SocialLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { UserUrlsApi } from '../../api/user'
import { tokenDecode } from '../../util/helpers/tokenHelpers'
import CoinBasicInfo from '../../components/coin/CoinBasicInfo'

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

interface CoinData {
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

const CoinDetails: React.FC = () => {
  const token = localStorage.getItem('token')
  const { code } = useParams()
  const [coinData, setCoinData] = useState<CoinData | null>(null)
  const [history, setHistory] = useState<GraphHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const response = await GraphsAndInfosApi.getCodeInfo({
          currency: 'EUR',
          code: code?.toUpperCase() || 'BTC',
        })
        setCoinData(response)

        const response2 = await GraphsAndInfosApi.getSingleHistory({
          currency: 'EUR',
          code: code?.toUpperCase() || 'BTC',
        })
        setHistory(response2)

        if (token && code) {
          const resFavourite = await UserUrlsApi.isFavourite({
            userId: tokenDecode(token).id,
            cryptoCode: code.toUpperCase(),
          })
          setIsFavorite(resFavourite.isFavourite)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching coin info:', error)
      }
    }

    fetchCoinInfo()
  }, [code])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    if (!isFavorite && token && code) {
      console.log('add to favourites')
      const decodedToken = tokenDecode(token)
      UserUrlsApi.addToFacvourites({
        userId: decodedToken.id,
        cryptoCode: code.toUpperCase(),
      })
    } else if (isFavorite && token && code) {
      const decodedToken = tokenDecode(token)
      UserUrlsApi.removeFromFavourites({
        userId: decodedToken.id,
        cryptoCode: code.toUpperCase(),
      })
    }
  }

  if (isLoading) return <Loading />

  if (!coinData) return <div>No data available</div>

  const deltaData = [
    (coinData.delta.hour - 1) * 100,
    (coinData.delta.day - 1) * 100,
    (coinData.delta.week - 1) * 100,
    (coinData.delta.month - 1) * 100,
    (coinData.delta.quarter - 1) * 100,
  ]

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <img src={coinData.png64} alt={`${coinData.name} logo`} />
          <h1 style={{ color: coinData.color }}>
            {coinData.name} ({coinData.symbol ? coinData.symbol : 'N/A'})
          </h1>
          <p>Rank: {coinData.rank}</p>
          {coinData.name !== 'Bitcoin' && (
            <div onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon
                icon={solidHeart}
                size="2x"
                color={isFavorite ? 'red' : 'grey'}
              />
            </div>
          )}
        </div>
      </div>
      <div className="col-12">
        <BigGraph historyData={history} name={coinData.name} />
      </div>
      <CoinBasicInfo coinData={coinData} />
      <div className="row">
        <div className="col-6">
          <DeltaChart data={deltaData} />
        </div>
        <div className="col-6">
          <SocialLinks links={coinData.links} />
        </div>
      </div>
    </div>
  )
}

export default CoinDetails
