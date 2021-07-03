import User from "../models/User";
import UserRepository from '../repository/UsersRepository'

interface ICreditChange {
    creditsToChange: number;
    user: User;
}

class UsersService {


    public async changeCredit({ creditsToChange, user }: ICreditChange): Promise<User> {

        const userRepository = UserRepository.getInstance();

        const userToChange = await userRepository.findOneOrFail({ id: user.id });
        const newCredit = userToChange.credit + creditsToChange;

        return await userRepository.save({ ...userToChange, credit: newCredit });

    }

}

export default new UsersService();