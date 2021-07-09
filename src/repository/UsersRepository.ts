import { getRepository, Repository } from 'typeorm';
import User from '../models/User';

interface IUsersRepository {
    findOneById(id: number): Promise<User | undefined>
    findOneByCpf(cpf: string): Promise<User | undefined>
    getInstance(): Repository<User>;
}

class UsersRepository implements IUsersRepository {
    async findOneById(id: number): Promise<User | undefined> {
        return await getRepository(User).findOne({ id });
    }

    async findOneByCpf(cpf: string): Promise<User | undefined> {
        return await getRepository(User).findOne({ cpf });
    }

    getInstance(): Repository<User> {
        return getRepository(User);
    }
}

export default new UsersRepository();