import jwt from 'jsonwebtoken';
import env from '../environment/environment';

import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class TokenService {
  public createToken(cpf: object): string {
    return jwt.sign(cpf, env?.ACCESS_SECRET as string, {
      expiresIn: env?.ACCESS_TOKEN_EXPIRATION,
    });

  }

  public createRefreshToken(cpf: object): string {
    return jwt.sign(cpf, env?.REFRESH_SECRET as string, {
      expiresIn: env?.ACCESS_TOKEN_EXPIRATION,
    });
  }

  private verifyRefreshToken(refreshToken: string) {
    try {
      jwt.verify(refreshToken, env?.REFRESH_SECRET as string);
    } catch (error) {
      if (error.message.includes("expired")) {
        throw new AppError("RefreshToken expirou!")
      }
      throw new AppError("Refresh token inválido!");
    }
  }

  public async updateToken(refreshToken: string): Promise<string> {

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ refreshToken });


    this.verifyRefreshToken(refreshToken);

    return this.createToken({ cpf: user.cpf })

  }
}

export default new TokenService();

