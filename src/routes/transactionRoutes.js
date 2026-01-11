import express from 'express';
import { getBalance } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', authMiddleware, getBalance);

export default router;
