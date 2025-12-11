import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'express-async-errors'; // gives us ability to throw in async handlers
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import roomRoutes from './routes/rooms';
import questionRoutes from './routes/questions';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true })); // refine origin in prod
app.use(express.json());
app.use(cookieParser());

// connect DB then start server
connectDB().then(() => {
  // routes
  app.use('/api/auth', authRoutes);
  app.use('/api/rooms', roomRoutes);
  app.use('/api/questions', questionRoutes);

  // health check
  app.get('/api/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

  // central error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
});

// optional graceful shutdown signals
process.on('SIGINT', () => {
  console.log('SIGINT received. Exiting gracefully.');
  process.exit();
});
