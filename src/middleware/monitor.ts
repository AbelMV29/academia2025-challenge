import express, { Request, Response, NextFunction } from 'express';
import { requestCounter, requestDuration } from '../config/monitoring';

// Middleware para Prometheus
export const monitorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const end = requestDuration.startTimer({ method: req.method, endpoint: req.path });

  res.on('finish', () => {
    requestCounter.inc({ method: req.method, endpoint: req.path, status: res.statusCode });
    end({ method: req.method, endpoint: req.path });
  });

  next();
};
