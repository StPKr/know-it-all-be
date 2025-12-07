import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signJwt = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyJwt = <T extends object>(token: string): T | null => {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch (e) {
    return null;
  }
};
