import { Router } from 'express';
import LoginUnicoInstance, { loginUnicoAxiosInstance } from '../services/LoginUnicoService';
import jwt from 'jsonwebtoken'
import jwtToPem from 'jwk-to-pem'
import TokenService from '../services/TokenService';
import UsersServices from '../services/UsersService';
import AppError from '../errors/AppError';
import AuthorizationService from '../services/AuthorizationService';
import UsersRepository from '../repositories/UsersRepository';
import dtoValidationMiddleware from '../middlewares/dtoValidation';
import { LoginUnicoDTO } from '../dto/LoginUnicoDTO';

const authRouter = Router();


authRouter.post('/', dtoValidationMiddleware(LoginUnicoDTO), async (request, response) => {
  const { code, redirectUri } = request.body;

  try {
    const authorization = new AuthorizationService(new LoginUnicoInstance(loginUnicoAxiosInstance, jwt, jwtToPem));
    let { name, email, cpf, profilePhoto } = await authorization.authenticateOnLoginUnico({ code, redirectUri });
    const accessToken = TokenService.createToken({ cpf });
    const refreshToken = TokenService.createRefreshToken({ cpf });
    let user;

    try {
      user = await UsersServices.findUserByCpfOrId({ cpf });
    } catch (error) {
      if (error instanceof AppError && error.statusCode == 404) {
        if (!user) {
          user = await UsersServices.createUser({ name, email, cpf, profilePhoto, refreshToken: null, isGuest: false });

          if (!user) {
            throw new AppError("Ocorreu um erro ao registrar um novo usuário.");
          }
        }
      } else {
        throw error;
      }
    }

    await UsersServices.updateUser({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      profilePhoto: user.profilePhoto,
      refreshToken
    });

    response.status(200).json({
      ...user,
      accessToken,
      refreshToken
    });


  } catch (error) {
    console.log(error);
    response.status(500).send("Ocorreu um erro ao realizar a autenticação.");
  }
});

authRouter.post('/refresh', async (request, response) => {
  const { refreshToken } = request.body;

  const token = await TokenService.updateToken(refreshToken);

  response.status(200).json({ token, refreshToken });

});

authRouter.post('/logout', async (request, response) => {
  const { refreshToken } = request.body;

  await TokenService.deleteToken(refreshToken);

  response.status(204).send();

});

authRouter.post('/fake-login', async (request, response) => {
  try {
    // TODO Remover endpoint futuramente.
    const user = await UsersRepository.getInstance().findOne();

    if (!user) {
      throw new AppError('Cadastre pelo menos um usuário no banco.')
    }

    const accessToken = TokenService.createToken({ cpf: user.cpf });
    const refreshToken = TokenService.createRefreshToken({ cpf: user.cpf });

    await UsersServices.updateUser({ name: user.name, email: user.email, cpf: user.cpf, profilePhoto: user.profilePhoto, refreshToken });

    response.status(200).json({
      ...user,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.log(error);

    response.status(500).send("Ocorreu um erro ao realizar a autenticação.");
  }
})


export default authRouter;
