import React from 'react';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateWallet = () => {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div style={{ display: 'flex', margin: '12px' }}>
      <TextField
        id="outlined-basic"
        label="Wallet name"
        variant="outlined"
        sx={{ m: 2 }}
      />
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ m: 2 }}
        onClick={handleClick}
      >
        Create Wallet
      </Button>
    </div>
  );
};

export default CreateWallet;
