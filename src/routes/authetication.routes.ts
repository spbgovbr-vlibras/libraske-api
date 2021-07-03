import { Router } from 'express';
import LoginUnicoInstance, { loginUnicoAxiosInstance } from '../services/LoginUnico';
import jwt from 'jsonwebtoken'
import jwtToPem from 'jwk-to-pem'
import CreateUserService from '../services/CreateUserService';
import TokenService from '../services/TokenService';
import UsersServices from '../services/UsersService';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import AuthorizationService from '../services/AuthorizationService';

const authRouter = Router();


authRouter.post('/', async (request, response) => {

	const { code, request_uri } = request.body;

	try {

		const authorization = new AuthorizationService(new LoginUnicoInstance(loginUnicoAxiosInstance, jwt, jwtToPem));

		let { name, email, cpf, profilePhoto } = await authorization.execute({ code, redirectUri: request_uri });

		const accessToken = TokenService.createToken({ cpf });
		const refreshToken = TokenService.createRefreshToken({ cpf });
		let user = await UsersServices.findUserByCpfOrId({ cpf });

		if (!user) {
			user = await CreateUserService.execute({ name, email, cpf, profilePhoto, refreshToken: null });

			if (!user) {
				throw new AppError("Ocorreu um erro ao registrar um novo usuário.");
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

	const userRepository = getRepository(User);

	try {

		const user = await userRepository.findOne();

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
