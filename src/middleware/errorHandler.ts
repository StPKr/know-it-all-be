import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // For production, avoid leaking stack traces
  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}
