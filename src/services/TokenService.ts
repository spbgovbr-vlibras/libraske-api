import jwt from 'jsonwebtoken';
import env from '../environment/environment';

import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import UsersService from './UsersService';

interface IJwtToken {
  cpf: string;
  iat: string;
  exp: string;
}
class TokenService {

  public createToken(cpf: object): string {
    return jwt.sign(cpf, env.ACCESS_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRATION,
    });
  }

  public createRefreshToken(cpf: object): string {
    return jwt.sign(cpf, env.REFRESH_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRATION,
    });
  }

  public verifyRefreshToken(refreshToken: string) {
    try {
      jwt.verify(refreshToken, env.REFRESH_SECRET);
    } catch (error) {
      if (error.message.includes("expired")) {
        throw new AppError("RefreshToken expirou!", 401)
      }
      throw new AppError("Refresh token inválido!", 403);
    }
  }

  public decodeToken(refreshToken: string): IJwtToken {
    return jwt.decode(refreshToken) as IJwtToken;
  }

  public async updateToken(refreshToken: string): Promise<string> {

    this.verifyRefreshToken(refreshToken);
    const { cpf } = this.decodeToken(refreshToken);

    await UsersService.findUserByCpfOrId({ cpf });

    return this.createToken({ cpf })
  }

  public async deleteToken(refreshToken: string): Promise<void> {

    this.verifyRefreshToken(refreshToken);
    const { cpf } = this.decodeToken(refreshToken);

    const user = await UsersService.findUserByCpfOrId({ cpf });

    await UsersService.updateUser({ ...user, refreshToken: null });

  }
}

export default new TokenService();

