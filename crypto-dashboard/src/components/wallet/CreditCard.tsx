import React from 'react';
import { Box, Grid } from '@mui/material';
import './CreditCard.css';

const CreditCard = () => {
  return (
    <Box className="credit-card-front-container">
      <img
        className="credit-card-logo"
        src={'../../assets/bitcoin-btc-logo.png'}
        alt="credit card logo"
      />
      <div className="credit-card-number">BTC CARD 0000 0001</div>
      <div className="credit-card-name-exp">
        <span className="credit-card-name">Wallet #1</span>
        <span className="credit-card-exp">
          <span className="month">12</span>
          <span className="slash">/</span>
          <span className="year">23</span>
        </span>
      </div>
      <img
        className="bg-credit-card-front"
        src={`../../assets/bg-card-front.png`}
        alt="credit card front"
      />
    </Box>
  );
};

export default CreditCard;
