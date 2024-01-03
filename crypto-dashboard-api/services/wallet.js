import asyncHandler from 'express-async-handler';
import createBitcoinClient from '../config/btcServer.js';

// @desc    Get BlockchainHeiht
// @route   GET /api/dashboard/blockchain-height
// @access  Public
const getBlockchainHeight = asyncHandler(async (req, res) => {
  const client = createBitcoinClient();
  client
    .getBlockCount()
    .then((blockCount) => {
      res.status(200).json({ blockCount });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

export default getBlockchainHeight;
