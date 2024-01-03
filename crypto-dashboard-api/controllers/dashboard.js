import express from 'express';
import getBlockchainHeight from '../services/dashboard.js';

const router = express.Router();

router.route('/blockchain-height').get(getBlockchainHeight);

export default router;
