// import asyncHandler from 'express-async-handler';
// import createBitcoinClient from '../config/btcServer.js';
// import pkg from 'bitcore-lib';
// const { PrivateKey } = pkg;
// import { testnet } from 'bitcore-lib/lib/networks.js';

// // @desc    Get BlockchainHeiht
// // @route   GET /api/dashboard/blockchain-height
// // @access  Public
// const createNewWallet = async (req, res) => {
//   try {
//     const bitcoinClient = createBitcoinClient();
//     const { walletName } = req.body;

//     const walletExists = await bitcoinClient.listWallets();

//     if (walletExists.includes(walletName)) {
//       return res.status(400).json({ error: 'Wallet already exists' });
//     }

//     const result = await bitcoinClient.loadWallet(walletName);

//     if (result.name === walletName) {
//       return res
//         .status(200)
//         .json({ message: 'Wallet created successfully', walletName, result });
//     } else {
//       return res.status(500).json({ error: 'Failed to create wallet' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const createNewWalletTemp = async (req, res) => {
//   try {
//     const bitcoinClient = createBitcoinClient();
//     const { walletName } = req.body;

//     const result = await bitcoinClient.createWallet(walletName);

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const listWallets = async (req, res) => {
//   try {
//     const bitcoinClient = createBitcoinClient();

//     const walletList = await bitcoinClient.listWallets();

//     return res.status(200).json({ wallets: walletList });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const getWalletInfo = async (req, res) => {
//   const bitcoinClient = createBitcoinClient();
//   const { walletName } = req.body;

//   //   const result = await bitcoinClient.loadWallet(walletName);

//   bitcoinClient
//     .getWalletInfo(walletName)
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// };

// const getWalletBalance = async (req, res) => {
//   const bitcoinClient = createBitcoinClient();
//   const { walletName } = req.body;

//   //   const result = await bitcoinClient.loadWallet(walletName);

//   bitcoinClient
//     .dumpWallet()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// };

// const getWalletAddress = async (req, res) => {
//   const bitcoinClient = createBitcoinClient();
//   const { walletName } = req.body;

//   try {
//     let privateKey = new PrivateKey();
//     let address = privateKey.toAddress(testnet);

//     res.status(200).json({
//       privateKey: privateKey.toString(),
//       address: address.toString(),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export {
//   createNewWallet,
//   listWallets,
//   getWalletInfo,
//   createNewWalletTemp,
//   getWalletBalance,
//   getWalletAddress,
// };

import asyncHandler from 'express-async-handler'
import createBitcoinClient from '../config/btcServer.js'
import { loadOrCreateWallet } from '../utils/wallet/helpers.js'
// import QRCode from 'qrcode';

// Create a new wallet
const createNewWallet = asyncHandler(async (req, res) => {
  try {
    const { walletName } = req.body

    if (!walletName) {
      return res.status(400).json({ error: 'Wallet name is required' })
    }

    const bitcoinClient = createBitcoinClient()
    await bitcoinClient.command('createwallet', walletName)
    res.status(201).json({ message: 'Wallet created successfully', walletName })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// List all wallets
const listWallets = asyncHandler(async (req, res) => {
  try {
    const bitcoinClient = createBitcoinClient()
    const wallets = await bitcoinClient.command('listwallets')
    res.status(200).json({ wallets })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get wallet information
const getWalletInfo = asyncHandler(async (req, res) => {
  try {
    const { walletName } = req.body

    if (!walletName) {
      return res.status(400).json({ error: 'Wallet name is required' })
    }

    let bitcoinClient = createBitcoinClient()

    try {
      // Attempt to load the wallet
      await bitcoinClient.command('loadwallet', walletName)
    } catch (loadError) {
      if (loadError.code === -18) {
        // Wallet does not exist, create it
        await bitcoinClient.command('createwallet', walletName)
        // Wallet creation automatically loads it, no need to load again
      } else if (loadError.code !== -4 && loadError.code !== -35) {
        throw loadError
      }
    }
    console.log('daludghakzdgaskdugaskdjugbas')
    // Reinitialize the client with the new wallet
    bitcoinClient = createBitcoinClient(walletName)

    const walletInfo = await bitcoinClient.command('getwalletinfo')
    res.status(200).json(walletInfo)
  } catch (error) {
    console.error('Error fetching wallet info:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get wallet balance
const getWalletBalance = asyncHandler(async (req, res) => {
  try {
    const { walletName } = req.body

    if (!walletName) {
      return res.status(400).json({ error: 'Wallet name is required' })
    }

    const bitcoinClient = createBitcoinClient(walletName)
    const balance = await bitcoinClient.command('getbalance')
    res.status(200).json({ balance })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a new address for the wallet
const getWalletAddress = asyncHandler(async (req, res) => {
  try {
    const { walletName } = req.body

    if (!walletName) {
      return res.status(400).json({ error: 'Wallet name is required' })
    }

    const bitcoinClient = createBitcoinClient(walletName)
    const address = await bitcoinClient.command('getnewaddress')
    res.status(200).json({ address })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Generate QR code for the wallet address
// const getWalletQRCode = asyncHandler(async (req, res) => {
//   try {
//     const { address } = req.body;
//     const qrCodeUrl = await QRCode.toDataURL(address);

//     res.status(200).json({ qrCodeUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export {
  createNewWallet,
  listWallets,
  getWalletInfo,
  getWalletBalance,
  getWalletAddress,
  // getWalletQRCode,
}
