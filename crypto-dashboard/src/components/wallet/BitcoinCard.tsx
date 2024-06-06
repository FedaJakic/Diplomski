import React from 'react'
import './bitcoinCard.css'
import BitcoinCardSVG from '../svg/BitcoinCardSVG'
import CardMetalSVG from '../svg/CardMetalSVG'

interface Props {
  address: string
  qrCode: string
}

const BitcoinCard: React.FC<Props> = ({ address, qrCode }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="heading_8264">BITCOIN CARD</p>
          <BitcoinCardSVG />
          <CardMetalSVG />
          <p className="number my-4">{address}</p>
          <p className="name">fjakic00</p>
        </div>
        <div className="flip-card-back">
          <div className="qr-code-container">
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code"
              className="qr-code"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BitcoinCard
