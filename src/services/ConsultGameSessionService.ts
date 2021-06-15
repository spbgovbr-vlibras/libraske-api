import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class CreatePontuationSession {
  public async execute({ id }: IRequest): Promise<number> {
    const gameSessionRepository = getRepository(GameSession);

    const gameSession = await gameSessionRepository.findOne(id);

    if (!gameSession) {
      throw new AppError('Game session does not exists.');
    }

    console.log(gameSession);
    const pontuation = gameSession.pontuation
      ? gameSession.pontuation.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        )
      : 0;

    return pontuation;
  }
}

export default new CreatePontuationSession();
