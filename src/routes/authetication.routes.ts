import { Router } from 'express';
import LoginUnico from '../services/LoginUnicoService';
import CreateUserServiceService from '../services/CreateUserService';
import TokenService from '../services/TokenService';
import UpdateUserService from '../services/UpdateUserService';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

const authRouter = Router();


authRouter.post('/', async (request, response) => {

	const { code, request_uri } = request.body;
	const LoginUnicoInstance = new LoginUnico();

	try {

		let { name, email, cpf, profilePhoto } = await LoginUnicoInstance.signUp({ code, redirectUri: request_uri });

		const user = await CreateUserServiceService.execute({ name, email, cpf, profilePhoto, refreshToken: "null" })

		const accessToken = TokenService.createToken({ cpf });
		const refreshToken = TokenService.createRefreshToken({ cpf });

		await UpdateUserService.execute({ name: user.name, email: user.email, cpf: user.cpf, profilePhoto: user.profilePhoto, refreshToken });

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

		await UpdateUserService.execute({ name: user.name, email: user.email, cpf: user.cpf, profilePhoto: user.profilePhoto, refreshToken });

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