import { getRepository } from 'typeorm';
import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  profilePhoto: string;
  cpf: string;
  refreshToken: string | null;
}

class CreatePontuationSession {
  public async execute({ name, email, cpf, profilePhoto, refreshToken }: IRequest): Promise<User> {

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ cpf });

    if (!user) {

      const newUser = userRepository.create({
        name,
        email,
        profilePhoto,
        cpf,
        refreshToken
      })

      return await userRepository.save(newUser);
    }
    return user;
  }
}

export default new CreatePontuationSession();
