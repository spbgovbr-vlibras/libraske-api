import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ScoresService from './ScoresService';
import CalculatePontuations from '../utils/CalculatePontuation';

interface IRequest {
  id: string;
}



class CloseGameSessionService {

  constructor(private scoresService: typeof ScoresService = ScoresService) { }


  async execute({ id }: IRequest): Promise<void> {
    const gameSessionRepository = getRepository(GameSession);

    const gameSession = await gameSessionRepository.findOne(id);

    if (!gameSession) {
      throw new AppError('Game session does not exists.');
    }

    const sessionScore = CalculatePontuations(gameSession.pontuation);
    await this.scoresService.createScore({ id, sessionScore });

    await gameSessionRepository.save({ ...gameSession, isClosed: true });

  }
}

export default new CloseGameSessionService();
