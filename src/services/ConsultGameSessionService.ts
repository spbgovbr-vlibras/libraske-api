import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class CreatePontuationSession {
  public async execute({ id }: IRequest): Promise<GameSession> {
    const gameSessionRepository = getRepository(GameSession);

    const gameSession = await gameSessionRepository.findOne(id);

    if (!gameSession) {
      throw new AppError('Game session does not exists.');
    }

    return gameSession;
  }
}

export default new CreatePontuationSession();
