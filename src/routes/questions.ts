import { Router } from 'express';
import { createQuestion, listApproved } from '../controllers/questionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public: list approved questions optionally by topic/difficulty
router.get('/', listApproved);

// Authenticated: submit new question (isApproved=false)
router.post('/submit', authMiddleware, createQuestion);

export default router;
