import express from 'express';
import {
  getLastSixBlocksInfo,
  getBlockInfo,
} from '../services/blockServices.js';

const router = express.Router();

router.route('/getLastSixBlockchainInfo').get(getLastSixBlocksInfo);
router.route('/getBlockInfo').post(getBlockInfo);

export default router;
