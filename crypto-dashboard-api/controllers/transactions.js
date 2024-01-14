import express from 'express';
import getLatestTransactions from '../services/transactionsServices.js';

const router = express.Router();

router.route('/latest-transactions').get(getLatestTransactions);
router.route('/latest-transactions').get(getLatestTransactions);

export default router;
