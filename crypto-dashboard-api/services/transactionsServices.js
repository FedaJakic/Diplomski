import asyncHandler from 'express-async-handler';
import createBitcoinClient from '../config/btcServer.js';

// @desc    Get Latest Transactions
// @route   GET /api/transactions/latest-transactions
// @access  Public
const getLatestTransactions = asyncHandler(async (req, res) => {
  try {
    const client = createBitcoinClient();

    const transactions = await client.listTransactions('*', 10);

    const latestTransactions = transactions.map((tx) => {
      return {
        txid: tx.txid,
        amount: tx.amount,
        category: tx.category,
        confirmations: tx.confirmations,
        blockhash: tx.blockhash,
        blockindex: tx.blockindex,
        blocktime: tx.blocktime,
        time: tx.time,
      };
    });

    res.status(200).json({ latestTransactions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default getLatestTransactions;
