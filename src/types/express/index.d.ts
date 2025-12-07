import { IUserDoc } from '../../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email?: string }; // minimal
    }
  }
}
