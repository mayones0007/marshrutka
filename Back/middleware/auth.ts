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

export const authMiddleware = function (req: Request, res: Response, next: NextFunction): Response | void {
  if(req.method === 'OPTIONS') {
    next()
  }
    const authHeader = req.headers.authorization
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1]
      try {
        const decoded = <jwt.verifiedUser>jwt.verify(accessToken, config.jwtSecret)
        req.user = { userId: decoded.userId, role: decoded.role }
        next()
      } catch (e) {
        return res.status(401).send({ message: "Для продолжения авторизуйтесь" })
      }
    } else {
      return res.status(400).send({ message: "Для продолжения авторизуйтесь" })
    }
}
