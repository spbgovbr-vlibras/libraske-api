import User from '../models/User';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
    id?: string;
    cpf?: string;
}

class ConsultUserService {
    public async execute({ id, cpf }: IRequest): Promise<User> {

        const userRepository = getRepository(User);

        if (cpf) {
            const result = await userRepository.findOne({ cpf });

            if (result == undefined) {
                throw new AppError('Usuário não encontrado!', 404)
            }

            return result;

        } else if (id) {

            const result = await userRepository.findOne({ id });

            if (result == undefined) {
                throw new AppError('Usuário não encontrado!', 404)
            }

            return result;
        }

        throw new AppError('Não foi possível encontrar um usuário com os dados informados!', 400);
    }
}

export default new ConsultUserService();
