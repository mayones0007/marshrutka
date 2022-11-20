import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { Request, Response } from 'express';

declare module 'jsonwebtoken' {
  export interface verifiedUser extends jwt.JwtPayload {
    userId: number,
    role: string,
  }
}

export const roleMiddleware = function (req: Request, res: Response, next: NextFunction): Response | void {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1]
      const decoded = <jwt.verifiedUser>jwt.verify(accessToken, config.jwtSecret)
      req.user = { userId: decoded.userId, role: decoded.role }
    } else {
      req.user = {role: 'user'}
    }
    next()
  } catch (e) {
    req.user = {role: 'user'}
    next()
  }
}
