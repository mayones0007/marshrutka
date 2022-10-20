
import { NextFunction, Request, Response } from 'express';
export const corsMiddleware = function (req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')

  next();
}
