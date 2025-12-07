import { Router } from 'express';
import { createRoom, joinRoom, getRoom } from '../controllers/roomController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.post('/create', authMiddleware, createRoom);
router.post('/:roomId/join', authMiddleware, joinRoom);
router.get('/:roomId', authMiddleware, getRoom);

export default router;
