import express from 'express'
import {
  createNewWallet,
  listWallets,
  getWalletInfo,
  getWalletBalance,
  getWalletAddress,
  deleteWallet,
  getUserWallets,
  addWallet,
} from '../services/walletServicesNew.js'

const router = express.Router()

router.route('/create').get(createNewWallet)
router.route('/list-wallet').get(listWallets)
router.route('/get-wallet-info').post(getWalletInfo)
router.route('/get-wallet-balance').post(getWalletBalance)
router.route('/get-wallet-address').post(getWalletAddress)
router.route('/delete-wallet').post(deleteWallet)
router.route('/user-wallets').post(getUserWallets)
router.route('/add-wallet').post(addWallet)

export default router
