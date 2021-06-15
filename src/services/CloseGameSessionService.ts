import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class CloseGameSessionService {
  async execute({ id }: IRequest): Promise<void> {
    const gameSessionRepository = getRepository(GameSession);

    const gameSession = await gameSessionRepository.findOne(id);

    if (!gameSession) {
      throw new AppError('Game session does not exists.');
    }

    gameSession.isClosed = true;
    await gameSessionRepository.save(gameSession);
  }
}

export default new CloseGameSessionService();
