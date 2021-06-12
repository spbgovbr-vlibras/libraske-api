import e, { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import env from '../environment/environment';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface ITokenPayload {
  authorization: number;
  iat: number;
  exp: number;
  sub: string;
  cpf: string;
}
export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {

  if (!env?.DISABLE_AUTH) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader?.split(' ');

    try {
      const decoded = verify(token, env?.ACCESS_SECRET as string);
      const { cpf } = decoded as ITokenPayload;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ cpf });

      request.user = user;

      return next();
    } catch (error) {
      throw new AppError('invalid jwt token', 400);
    }
  } else {
    next();
  }

}
