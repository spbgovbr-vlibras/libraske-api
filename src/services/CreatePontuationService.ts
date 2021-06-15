import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  idGameSession: string;
  pontuation: number;
}

class CreatePontuationSession {
  async execute({ idGameSession, pontuation }: IRequest): Promise<GameSession> {
    const gameSessionRepository = getRepository(GameSession);
    const gameSession = await gameSessionRepository.findOne({
      id: idGameSession,
    });

    if (!gameSession) {
      throw new AppError('Game session does not exists');
    }

    const oldArray = gameSession.pontuation ? gameSession.pontuation : [];

    const newGameSession = {
      ...gameSession,
      pontuation: [...oldArray, pontuation],
    };

    await gameSessionRepository.save(newGameSession);

    return gameSession;
  }
}

export default new CreatePontuationSession();
