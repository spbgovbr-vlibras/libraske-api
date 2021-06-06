import { Router } from 'express';
import LoginUnico from '../services/LoginUnicoService';
import CreateUserServiceService from '../services/CreateUserService';
import TokenService from '../services/TokenService';
import UpdateUserService from '../services/UpdateUserService';

const authRouter = Router();


authRouter.post('/', async (request, response) => {

	const { code, request_uri } = request.body;
	const LoginUnicoInstance = new LoginUnico();

	try {

		let { name, email, cpf, profilePhoto } = await LoginUnicoInstance.signUp({ code, redirectUri: request_uri });

		const user = await CreateUserServiceService.execute({ name, email, cpf, profilePhoto, refreshToken: "null" })

		const accessToken = TokenService.createToken({ cpf });
		const refreshToken = TokenService.createRefreshToken({ cpf });

		await UpdateUserService.execute({ name: user.name, email: user.email, cpf: user.cpf, profilePhoto: user.profilePhoto, refreshToken })

		response.status(200).json({
			...user,
			accessToken,
			refreshToken
		});

	} catch (error) {
		console.log(error);

		response.status(500).send("Deu pau")
	}


});

authRouter.post('/refresh', async (request, response) => {

});



export default authRouter;
