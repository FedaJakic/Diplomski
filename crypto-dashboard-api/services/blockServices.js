import asyncHandler from 'express-async-handler';
import createBitcoinClient from '../config/btcServer.js';

// @desc    Get Blockchain Height and Information about Recent Blocks
// @route   GET /api/blocks/getLastSixBlockchainInfo
// @access  Public
const getLastSixBlocksInfo = asyncHandler(async (req, res) => {
  try {
    const client = createBitcoinClient();

    const blockCount = await client.getBlockCount();

    const recentBlockHashes = [];
    const recentBlockHeights = [];
    for (
      let blockHeight = blockCount;
      blockHeight > blockCount - 10;
      blockHeight--
    ) {
      const hash = await client.getBlockHash(blockHeight);
      recentBlockHashes.push(hash);
      recentBlockHeights.push(blockHeight);
    }

    const combinedBlocksInfo = recentBlockHeights.map(async (height, index) => {
      const responseBlockStats = await client.getBlockStats(height);
      const blockInfo = await client.getBlock(recentBlockHashes[index], 2);

      return {
        height: responseBlockStats.height,
        time: responseBlockStats.time,
        totalSent: responseBlockStats.total_out,
        totalFees: responseBlockStats.totalfee,
        transactions: blockInfo.tx.length,
        blockSize: blockInfo.size,
      };
    });

    const result = await Promise.all(combinedBlocksInfo);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', error });
  }
});

// @desc    Get block info
// @route   Post /api/blocks/getBlockInfo
// @access  Public
const getBlockInfo = asyncHandler(async (req, res) => {
  try {
    const { blockHeight } = req.body;
    const client = createBitcoinClient();

    const hash = await client.getBlockHash(parseInt(blockHeight));
    const responseBlockStats = await client.getBlockStats(hash);
    const blockInfo = await client.getBlock(hash, 2);

    const transactionInfos = blockInfo.tx.map((transactionInfo) => {
      const transactionId = transactionInfo.txid;

      const transactionIn = transactionInfo.vin.map((v) => {
        return {
          txId: v.txid,
        };
      });

      const transactionOut = transactionInfo.vout.map((o) => {
        return {
          value: o.value,
          address: o.scriptPubKey.address,
        };
      });

      return {
        transactionId,
        transactionIn,
        transactionOut,
      };
    });

    const result = {
      hash: hash,
      height: responseBlockStats.height,
      time: responseBlockStats.time,
      totalSent: responseBlockStats.total_out,
      totalFees: responseBlockStats.totalfee,
      transactions: blockInfo.tx.length,
      transactionInfos,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @desc    Get block info by Hash
// @route   Post /api/blocks/getBlockInfoByHash
// @access  Public
const getBlockHeightByHash = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.body;
    const client = createBitcoinClient();

    const responseBlockStats = await client.getBlockStats(hash);

    const result = {
      hash: hash,
      height: responseBlockStats.height,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { getLastSixBlocksInfo, getBlockInfo, getBlockHeightByHash };
