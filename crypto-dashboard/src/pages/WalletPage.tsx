import React from 'react';
import { Grid } from '@mui/material';
import AddedWallet from '../components/wallet/AddedWallet';
import CreateWallet from '../components/wallet/CreateWallet';

const WalletPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <AddedWallet />
      <CreateWallet />
    </Grid>
  );
};

export default WalletPage;
