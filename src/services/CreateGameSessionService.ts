import GameSession from '@models/GameSession';
import Song from '@models/Song';
import User from '@models/User';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  idUser: string;
  idSong: string;
}

class CreatePontuationSession {
  public async execute({ idUser, idSong }: IRequest): Promise<GameSession> {
    const gameSessionRepository = getRepository(GameSession);
    const songRepository = getRepository(Song);
    const userRepository = getRepository(User);

    const song = await songRepository.findOne({ id: idSong });
    const user = await userRepository.findOne({ id: idUser });

    if (!song) {
      throw new AppError('Song doesnt exists');
    }

    if (!user) {
      throw new AppError('User does not exists');
    }

    const gameSession = gameSessionRepository.create({
      user,
      song,
    });

    await gameSessionRepository.save(gameSession);

    return gameSession;
  }
}

export default new CreatePontuationSession();
