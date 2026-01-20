import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import env from '../environment/environment';
import AppError from '../errors/AppError';
import UsersService from './UsersService';

export interface IJwtToken {
  cpf: string;
  iat: string;
  exp: string;
}
class TokenService {

  private userService: typeof UsersService;

  constructor() {
    this.userService = UsersService;
  }

  public set UserService(userService: typeof UsersService) {
    this.userService = userService;
  }

  public createToken(cpf: object): string {
    const accessSecret = env.ACCESS_SECRET as Secret;
    const expiresIn = env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn'];

    if (!accessSecret) {
      throw new AppError('ACCESS_SECRET is not configured', 500);
    }

    return jwt.sign(cpf, accessSecret, {
      expiresIn,
    });
  }

  public createRefreshToken(cpf: object): string {
    const refreshSecret = env.REFRESH_SECRET as Secret;
    const expiresIn = env.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn'];

    if (!refreshSecret) {
      throw new AppError('REFRESH_SECRET is not configured', 500);
    }

    return jwt.sign(cpf, refreshSecret, {
      expiresIn,
    });
  }

  public verifyRefreshToken(refreshToken: string) {
    try {
      const refreshSecret = env.REFRESH_SECRET as Secret;

      if (!refreshSecret) {
        throw new AppError('REFRESH_SECRET is not configured', 500);
      }

      jwt.verify(refreshToken, refreshSecret);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("expired")) {
        throw new AppError("RefreshToken expirou!", 401)
      }
      throw new AppError("Refresh token inválido!", 403);
    }
  }

  public decodeToken(refreshToken: string): IJwtToken {
    return jwt.decode(refreshToken) as unknown as IJwtToken;
  }

  public async updateToken(refreshToken: string): Promise<string> {

    this.verifyRefreshToken(refreshToken);
    const { cpf } = this.decodeToken(refreshToken);

    await this.userService.findUserByCpfOrId({ cpf });

    return this.createToken({ cpf })
  }

  public async deleteToken(refreshToken: string): Promise<void> {

    this.verifyRefreshToken(refreshToken);
    const { cpf } = this.decodeToken(refreshToken);

    const user = await this.userService.findUserByCpfOrId({ cpf });

    await this.userService.updateUser({ ...user, refreshToken: null });

  }
}

export default new TokenService();

