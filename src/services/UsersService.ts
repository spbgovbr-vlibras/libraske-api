import AppError from "../errors/AppError";
import User from "../models/User";
import UserRepository from '../repository/UsersRepository';

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
  id?: number;
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

  private usersRepository: typeof UserRepository;

  constructor() {
    this.usersRepository = UserRepository;
  }

  public async createUser({ name, email, cpf, profilePhoto, refreshToken }: ICreateUser): Promise<User> {

    const userRepository = this.usersRepository.getInstance();

    return userRepository.save({
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken,
      credit: 0
    })

  }

  public async findUserByCpfOrId({ id, cpf }: IFindUserCpfOrId): Promise<User> {

    let user;

    if (cpf) {
      user = await this.usersRepository.findOneByCpf(cpf);
    } else if (id) {
      user = await this.usersRepository.findOneById(id);
    } else {
      throw new AppError('Unsupported User.', 500);
    }

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }

  public async updateUser({ name, email, cpf, profilePhoto, refreshToken }: IUpdateService): Promise<void> {

    const userRepository = this.usersRepository.getInstance();

    await userRepository.update({ cpf }, {
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken
    });

  }

  public async changeCredit({ creditsToChange, user }: ICreditChange): Promise<User> {

    const userRepository = this.usersRepository.getInstance();

    const userToChange = await this.findUserByCpfOrId({ id: user.id });
    const newCredit = userToChange.credit + creditsToChange;

    if (newCredit < 0) {
      throw new AppError("Credits are insufficient.", 400);
    }

    return await userRepository.save({ ...userToChange, credit: newCredit });

  }

  public async removeCredit({ creditsToChange, user }: ICreditChange): Promise<User> {
    return await this.changeCredit({ creditsToChange: -creditsToChange, user });
  }

  public async checkInsufficientCreditsAndThrow(creditToRemove: number, userId: number) {

    const userToChange = await this.findUserByCpfOrId({ id: userId });

    const newCredit = userToChange.credit - creditToRemove;

    if (newCredit < 0) {
      throw new AppError("Credits are insufficient.", 400);
    }

    return newCredit;
  }

  public async deleteUser(userId: number) {

    const defaultUserRepository = this.usersRepository.getInstance();

    const user = defaultUserRepository.create({
      id: userId
    })

    const deletedUser = await defaultUserRepository.remove(user);

    return deletedUser;
  }

}

export default new UsersService();
