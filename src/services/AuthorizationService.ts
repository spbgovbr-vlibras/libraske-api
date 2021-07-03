
import AppError from '../errors/AppError';
import LoginUnicoService from './LoginUnico';
import env from '../environment/environment'

interface IRequest {
    code: string;
    redirectUri: string;
}

interface IResponse {
    name: string;
    email: string;
    cpf: string;
    profilePhoto: string;
}

class AuthorizationService {

    private loginUnicoService: LoginUnicoService;

    constructor(loginUnicoService: LoginUnicoService) {
        this.loginUnicoService = loginUnicoService;
    }

    async execute({ code, redirectUri }: IRequest): Promise<IResponse> {
        try {
            const { name, email, cpf, profilePhoto } = await this.loginUnicoService.signUp({ code, redirectUri });

            return {
                name,
                email,
                cpf,
                profilePhoto
            }
        } catch (error) {
            throw new AppError("Ocorreu um erro ao tentar realizar a comunicação com o LoginUnico.", 500);
        }
    }
}

export default AuthorizationService;