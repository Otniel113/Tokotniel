import express from 'express';
import { getBalance, topUp } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', authMiddleware, getBalance);
router.post('/topup', authMiddleware, topUp);

export default router;
