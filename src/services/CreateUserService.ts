import { getRepository } from 'typeorm';
import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  profilePhoto: string;
  cpf: string;
  refreshToken: string | null;
}

class CreateUserService {
  public async execute({ name, email, cpf, profilePhoto, refreshToken }: IRequest): Promise<User> {

    const userRepository = getRepository(User);

    return userRepository.save({
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken
    })

  }
}

export default new CreateUserService();
