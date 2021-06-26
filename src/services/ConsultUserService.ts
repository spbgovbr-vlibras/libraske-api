import User from '../models/User';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
    id?: string;
    cpf?: string;
}

class ConsultUserService {
    public async execute({ id, cpf }: IRequest): Promise<User | undefined> {

        const userRepository = getRepository(User);

        if (cpf) {
            return await userRepository.findOne({ cpf });
        } else {
            return await userRepository.findOne({ id });
        }
    }
}

export default new ConsultUserService();
