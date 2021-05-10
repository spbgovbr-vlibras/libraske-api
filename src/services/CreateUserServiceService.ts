import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Pontuation from '../models/GameSession';
import Song from '../models/Song';
import User from '../models/User';

interface IRequest {
  idUser: string;
  idSong: string;
}

class CreatePontuationSession {
  public async execute({ idUser, idSong }: IRequest): Promise<Pontuation> {
    const pontuationRepository = getRepository(Pontuation);
    const songRepository = getRepository(Song);
    const userRepository = getRepository(User);

    const song = await songRepository.findOne({ id: idSong });
    const user = await userRepository.findOne({ id: idUser });

    if (!song) {
      throw new AppError('Song doesnt exists');
    }

    if (!user) {
      throw new AppError('User doenst exists');
    }

    const pontuation = pontuationRepository.create({
      user,
      song,
      pontuation: 0,
    });

    await pontuationRepository.save(pontuation);

    return pontuation;
  }
}

export default CreatePontuationSession;
