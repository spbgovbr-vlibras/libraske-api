import AppError from "src/errors/AppError";
import User from "../models/User";
import UserRepository from '../repository/UsersRepository'

interface ICreditChange {
    creditsToChange: number;
    user: User;
}
interface IUpdateService {
    name: string;
    email: string;
    profilePhoto: string;
    cpf: string;
    refreshToken: string | null;
}
interface IFindUserCpfOrId {
    id?: string;
    cpf?: string;
}
interface ICreateUser {
    name: string;
    email: string;
    profilePhoto: string;
    cpf: string;
    refreshToken: string | null;
}

class UsersService {

    public async createUser({ name, email, cpf, profilePhoto, refreshToken }: ICreateUser): Promise<User> {

        const userRepository = UserRepository.getInstance();

        return userRepository.save({
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken
        })

    }

    public async findUserByCpfOrId({ id, cpf }: IFindUserCpfOrId): Promise<User> {

        let user;

        if (cpf) {
            user = await UserRepository.findOneByCpf(cpf);
        } else if (id) {
            user = await UserRepository.findOneById(id);
        } else {
            throw new AppError('Unsupported User.', 500);
        }

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        return user;
    }

    public async updateUser({ name, email, cpf, profilePhoto, refreshToken }: IUpdateService): Promise<void> {

        const userRepository = UserRepository.getInstance();

        await userRepository.update({ cpf }, {
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken
        });

    }

    public async changeCredit({ creditsToChange, user }: ICreditChange): Promise<User> {

        const userRepository = UserRepository.getInstance();

        const userToChange = await userRepository.findOneOrFail({ id: user.id });
        const newCredit = userToChange.credit + creditsToChange;

        return await userRepository.save({ ...userToChange, credit: newCredit });

    }

}

export default new UsersService();