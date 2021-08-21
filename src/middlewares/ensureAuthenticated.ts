import UsersService from '../services/UsersService';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import env from '../environment/environment';
import AppError from '../errors/AppError';


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

      request.user = await UsersService.findUserByCpfOrId({ cpf });

      return next();
    } catch (error) {
      throw new AppError('invalid jwt token', 400);
    }
  } else {
    next();
  }

}
