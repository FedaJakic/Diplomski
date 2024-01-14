import express from 'express';
import {
  getLatestTransactions,
  getTransactionInfo,
} from '../services/transactionsServices.js';

const router = express.Router();

router.route('/latest-transactions').get(getLatestTransactions);
router.route('/transaction-info').post(getTransactionInfo);

export default router;
