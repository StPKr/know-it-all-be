import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.replace('Bearer ', '');
  const payload = verifyJwt<{ id: string; email?: string }>(token);
  if (!payload) return res.status(401).json({ message: 'Invalid token' });

  req.user = { id: payload.id, email: payload.email };
  next();
};
