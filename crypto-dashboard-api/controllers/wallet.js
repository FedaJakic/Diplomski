import express from 'express';
import {
  createNewWallet,
  listWallets,
  getWalletInfo,
  createNewWalletTemp,
  getWalletBalance,
  getWalletAddress,
} from '../services/walletServices.js';

const router = express.Router();

router.route('/create').post(createNewWallet);
router.route('/create-temp').post(createNewWalletTemp);
router.route('/list-wallet').get(listWallets);
router.route('/get-wallet-info').post(getWalletInfo);
router.route('/get-wallet-balance').post(getWalletBalance);
router.route('/get-wallet-address').post(getWalletAddress);

export default router;
