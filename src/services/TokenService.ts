import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';
import env from '../environment/environment';

interface IRequest {
  id: string;
}

class TokenService {
  public createToken(cpf: object): string {

    console.log(env)

    return jwt.sign(cpf, env?.ACCESS_SECRET as string, {
      expiresIn: "30m",
    });

  }

  public createRefreshToken(cpf: object): string {
    return jwt.sign(cpf, env?.REFRESH_SECRET as string, {
      expiresIn: "30m",
    });
  }
}

export default new TokenService();
