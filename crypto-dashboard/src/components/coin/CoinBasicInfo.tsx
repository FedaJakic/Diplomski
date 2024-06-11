import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'

interface CoinData {
  rate: number
  volume: number
  cap: number
  liquidity: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  allTimeHighUSD: number
  markets: number
}

interface CoinBasicInfoProps {
  coinData: CoinData
}

const CoinBasicInfo: React.FC<CoinBasicInfoProps> = ({ coinData }) => {
  const renderTooltip = (info: string) => (
    <Tooltip>
      <span>{info}</span>
    </Tooltip>
  )

  const infoItems = [
    {
      title: 'Rate',
      value: `EUR ${coinData.rate ? coinData.rate.toFixed(2) : 'N/A'}`,
      info: 'The current price of the cryptocurrency in EUR.',
    },
    {
      title: 'Volume',
      value: `EUR ${
        coinData.volume ? formatLargeNumber(coinData.volume) : 'N/A'
      }`,
      info: 'The total trading volume of the cryptocurrency in the last 24 hours.',
    },
    {
      title: 'Market Cap',
      value: `EUR ${coinData.cap ? formatLargeNumber(coinData.cap) : 'N/A'}`,
      info: 'The total market capitalization of the cryptocurrency.',
    },
    {
      title: 'Liquidity',
      value: `EUR ${
        coinData.liquidity ? formatLargeNumber(coinData.liquidity) : 'N/A'
      }`,
      info: 'The amount of liquidity available in the market.',
    },
    {
      title: 'Circulating Supply',
      value: `${
        coinData.circulatingSupply
          ? formatLargeNumber(coinData.circulatingSupply)
          : 'N/A'
      }`,
      info: 'The number of coins currently in circulation.',
    },
    {
      title: 'Total Supply',
      value: `${
        coinData.totalSupply ? formatLargeNumber(coinData.totalSupply) : 'N/A'
      }`,
      info: 'The total number of coins that exist.',
    },
    {
      title: 'Max Supply',
      value: `${
        coinData.maxSupply ? formatLargeNumber(coinData.maxSupply) : 'N/A'
      }`,
      info: 'The maximum number of coins that will ever exist.',
    },
    {
      title: 'All Time High (USD)',
      value: `$${
        coinData.allTimeHighUSD ? coinData.allTimeHighUSD.toFixed(2) : 'N/A'
      }`,
      info: 'The highest price the cryptocurrency has ever reached in USD.',
    },
    {
      title: 'Markets',
      value: `${coinData.markets}`,
      info: 'The number of markets where the cryptocurrency is traded.',
    },
  ]

  return (
    <div className="row">
      {infoItems.map(({ title, value, info }) => (
        <div className="col-md-4" key={title}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                {title}
                <OverlayTrigger placement="top" overlay={renderTooltip(info)}>
                  <span>
                    <FaInfoCircle
                      className="ms-2"
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </OverlayTrigger>
              </h5>
              <p className="card-text">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoinBasicInfo
