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

    res.status(200).send({ latestTransactions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// @desc    Get Transaction by ID
// @route   POST /api/transactions/transaction-info
// @access  Public

const getTransactionInfo = asyncHandler(async (req, res) => {
  try {
    const { transactionId } = req.body;
    const client = createBitcoinClient();

    const transactionDetails = await client.getRawTransaction(
      transactionId.toString(),
      true
    );

    const transactionFee = await client.getRawTransaction(
      transactionId.toString(),
      2
    );

    const transactionHeight = await client.getBlockStats(
      transactionDetails.blockhash
    );

    const response = {
      transactionId: transactionDetails.txid,
      transactionHash: transactionDetails.hash,
      transactionHeight: transactionHeight.height,
      transactionBlockHash: transactionDetails.blockhash,
      transactionConfirmations: transactionDetails.confirmations,
      transactionRecieved: transactionDetails.time,
      transactionIn: transactionDetails.vin,
      transactionOut: transactionDetails.vout,
      transactionFee: transactionFee.fee,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export { getLatestTransactions, getTransactionInfo };
