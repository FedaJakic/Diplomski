import express from 'express';
import {
  getLastSixBlocksInfo,
  getBlockInfo,
  getBlockHeightByHash,
} from '../services/blockServices.js';

const router = express.Router();

router.route('/getLastSixBlockchainInfo').get(getLastSixBlocksInfo);
router.route('/getBlockInfo').post(getBlockInfo);
router.route('/getBlockHeightByHash').post(getBlockHeightByHash);

export default router;
