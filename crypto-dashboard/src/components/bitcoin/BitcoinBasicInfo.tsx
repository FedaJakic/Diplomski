import React from 'react'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

interface BitcoinData {
  name: string
  symbol: string
  rank: number
  color: string
  png64: string
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

interface BitcoinBasicInfoProps {
  bitcoinData: BitcoinData
}

const BitcoinBasicInfo: React.FC<BitcoinBasicInfoProps> = ({ bitcoinData }) => {
  const renderTooltip = (info: string) => (
    <Tooltip>
      <span>{info}</span>
    </Tooltip>
  )

  return (
    <>
      <div className="row mb-4">
        <div className="col-12 text-center">
          <img src={bitcoinData.png64} alt={`${bitcoinData.name} logo`} />
          <h1 style={{ color: bitcoinData.color }}>
            {bitcoinData.name} ({bitcoinData.symbol})
          </h1>
          <p>Rank: {bitcoinData.rank}</p>
        </div>
      </div>
      <div className="row">
        {[
          {
            title: 'Rate',
            value: `$${bitcoinData.rate.toLocaleString()}`,
            info: 'The current price of Bitcoin in USD.',
          },
          {
            title: 'Volume',
            value: `$${formatLargeNumber(bitcoinData.volume)}`,
            info: 'The total trading volume of Bitcoin in the last 24 hours.',
          },
          {
            title: 'Market Cap',
            value: `$${formatLargeNumber(bitcoinData.cap)}`,
            info: 'The total market capitalization of Bitcoin.',
          },
          {
            title: 'Liquidity',
            value: `$${formatLargeNumber(bitcoinData.liquidity)}`,
            info: 'The amount of liquidity available in the Bitcoin market.',
          },
          {
            title: 'Circulating Supply',
            value: bitcoinData.circulatingSupply.toLocaleString(),
            info: 'The number of Bitcoins currently in circulation.',
          },
          {
            title: 'Total Supply',
            value: bitcoinData.totalSupply.toLocaleString(),
            info: 'The total number of Bitcoins that have been mined.',
          },
          {
            title: 'Max Supply',
            value: bitcoinData.maxSupply.toLocaleString(),
            info: 'The maximum number of Bitcoins that will ever exist.',
          },
          {
            title: 'All Time High (USD)',
            value: `$${bitcoinData.allTimeHighUSD.toLocaleString()}`,
            info: 'The highest price Bitcoin has ever reached in USD.',
          },
          {
            title: 'Markets',
            value: bitcoinData.markets,
            info: 'The number of markets where Bitcoin is traded.',
          },
        ].map(({ title, value, info }) => (
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
    </>
  )
}

export default BitcoinBasicInfo
