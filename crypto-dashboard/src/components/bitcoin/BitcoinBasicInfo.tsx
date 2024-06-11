import React from 'react'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'

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
    </>
  )
}

export default BitcoinBasicInfo
