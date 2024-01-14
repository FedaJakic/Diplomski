import asyncHandler from 'express-async-handler';
import createBitcoinClient from '../config/btcServer.js';

// @desc    Get BlockchainHeiht
// @route   GET /api/dashboard/blockchain-height
// @access  Public
const createNewWallet = async (req, res) => {
  try {
    const bitcoinClient = createBitcoinClient();
    const { walletName } = req.body;

    const walletExists = await bitcoinClient.listWallets();

    if (walletExists.includes(walletName)) {
      return res.status(400).json({ error: 'Wallet already exists' });
    }

    const result = await bitcoinClient.loadWallet(walletName);

    if (result.name === walletName) {
      return res
        .status(200)
        .json({ message: 'Wallet created successfully', walletName, result });
    } else {
      return res.status(500).json({ error: 'Failed to create wallet' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const listWallets = async (req, res) => {
  try {
    const bitcoinClient = createBitcoinClient();

    const walletList = await bitcoinClient.listWallets();

    return res.status(200).json({ wallets: walletList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getWalletInfo = async (req, res) => {
  const bitcoinClient = createBitcoinClient();
  const { walletName } = req.body;

  const result = await bitcoinClient.loadWallet(walletName);

  bitcoinClient
    .getWalletInfo(walletName)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export { createNewWallet, listWallets, getWalletInfo };
