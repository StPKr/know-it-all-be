import { Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword, comparePassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email and password required' });
  }

  // check existing
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) return res.status(409).json({ message: 'Email or username already registered' });

  const passwordHash = await hashPassword(password);
  const user = new User({ username, email, passwordHash });
  await user.save();

  const token = signJwt({ id: user._id, email: user.email });

  res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signJwt({ id: user._id, email: user.email });
  res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
};

export const meController = async (req: Request, res: Response) => {
  // authMiddleware sets req.user
  return res.json({ user: req.user });
};
