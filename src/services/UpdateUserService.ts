import { getRepository } from 'typeorm';

import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  profilePhoto: string;
  cpf: string;
  refreshToken: string;
}

class UpdateUserService {
  public async execute({ name, email, cpf, profilePhoto, refreshToken }: IRequest): Promise<void> {

    const userRepository = getRepository(User);

    await userRepository.update({ cpf }, {
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken
    });

  }
}

export default new UpdateUserService();
