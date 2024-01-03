import React from 'react';
import BlockchainHeight from '../components/dashboard/BlockchainHeight';
import { Container } from '@mui/material';

const MainDashboard = () => {
  return (
    <>
      <Container style={{ margin: '12px' }} maxWidth="lg">
        <BlockchainHeight />
      </Container>
    </>
  );
};

export default MainDashboard;
