import GameSession from '@models/GameSession';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ScoresService from './ScoresService';
import CalculatePontuations from '../utils/CalculatePontuation';
import UsersService from '../services/UsersService';
import env from '../environment/environment';

interface IRequest {
  id: string;
}

interface CloseGameSessionResponse {
  gameSession: GameSession;
  sessionScore: number;
}
class CloseGameSessionService {
  async execute({ id }: IRequest): Promise<CloseGameSessionResponse> {

    const gameSessionRepository = getRepository(GameSession);
    const gameSession = await gameSessionRepository.findOne(id);

    if (!gameSession) {
      throw new AppError('Game session does not exists.', 404);
    }

    if (gameSession.isClosed) {
      throw new AppError('The game session is already closed.', 400)
    }


    await gameSessionRepository.update(gameSession.id, { isClosed: true })

    const sessionScore = CalculatePontuations(gameSession.pontuation);

    return {
      gameSession,
      sessionScore
    }

  }
}

export default new CloseGameSessionService();
