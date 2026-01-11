import express from 'express';
import { getServices } from '../controllers/serviceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/services', authMiddleware, getServices);

export default router;
