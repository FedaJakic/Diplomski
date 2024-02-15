import asyncHandler from 'express-async-handler';
import createBitcoinClient from '../config/btcServer.js';
import pkg from 'bitcore-lib';
const { PrivateKey } = pkg;
import { testnet } from 'bitcore-lib/lib/networks.js';

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

const createNewWalletTemp = async (req, res) => {
  try {
    const bitcoinClient = createBitcoinClient();
    const { walletName } = req.body;

    const result = await bitcoinClient.createWallet(walletName);

    return res.status(200).json(result);
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

  //   const result = await bitcoinClient.loadWallet(walletName);

  bitcoinClient
    .getWalletInfo(walletName)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getWalletBalance = async (req, res) => {
  const bitcoinClient = createBitcoinClient();
  const { walletName } = req.body;

  //   const result = await bitcoinClient.loadWallet(walletName);

  bitcoinClient
    .dumpWallet()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getWalletAddress = async (req, res) => {
  const bitcoinClient = createBitcoinClient();
  const { walletName } = req.body;

  try {
    let privateKey = new PrivateKey();
    let address = privateKey.toAddress(testnet);

    res.status(200).json({
      privateKey: privateKey.toString(),
      address: address.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createNewWallet,
  listWallets,
  getWalletInfo,
  createNewWalletTemp,
  getWalletBalance,
  getWalletAddress,
};
