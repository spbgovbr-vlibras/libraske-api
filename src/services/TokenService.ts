import jwt from 'jsonwebtoken';
import env from '../environment/environment';

import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

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
        throw new AppError("RefreshToken expirou!", 401)
      }
      throw new AppError("Refresh token inválido!", 403);
    }
  }

  public async updateToken(refreshToken: string): Promise<string> {

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ refreshToken });

    this.verifyRefreshToken(refreshToken);

    return this.createToken({ cpf: user.cpf })
  }

  public async deleteToken(refreshToken: string): Promise<void> {

    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ refreshToken });

    await userRepository.update(user.id, { refreshToken: null });

  }
}

export default new TokenService();

