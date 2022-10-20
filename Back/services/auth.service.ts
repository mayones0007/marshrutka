import { config } from "../config/default"
import jwt, { verifiedUser } from 'jsonwebtoken';

interface AuthServiceResponse {
  accessToken: string,
  refreshToken: string
}

export class AuthService {
  constructor() {}
  private accessTokenExpiresIn = '15m';
  private refreshTokenExpiresIn = '14d';

  getTokens(userId: number, role: string): AuthServiceResponse {
    const accessToken = jwt.sign(
      { userId, role }, config.jwtSecret, { expiresIn: this.accessTokenExpiresIn }
    )
    const refreshToken = jwt.sign(
      { userId, role }, config.jwtSecret, { expiresIn: this.refreshTokenExpiresIn }
    )
    return { accessToken, refreshToken}
  }

  updateTokens(accessToken: string): AuthServiceResponse | void{
    const decoded = <verifiedUser>jwt.verify(accessToken, config.jwtSecret)
    if (decoded) {
      return this.getTokens(decoded.userId, decoded.role)
    }
  }
}