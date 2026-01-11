import express from 'express';
import { getBalance, topUp, createTransaction } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', authMiddleware, getBalance);
router.post('/topup', authMiddleware, topUp);
router.post('/transaction', authMiddleware, createTransaction);

export default router;
