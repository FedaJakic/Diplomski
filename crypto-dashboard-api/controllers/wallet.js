import express from 'express';
import {
  createNewWallet,
  listWallets,
  getWalletInfo,
} from '../services/walletServices.js';

const router = express.Router();

router.route('/create').post(createNewWallet);
router.route('/list-wallet').get(listWallets);
router.route('/get-wallet-info').post(getWalletInfo);

export default router;
