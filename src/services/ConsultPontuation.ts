import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Pontuation from '../models/GameSession';

interface IRequest {
  id: string;
}

class CreatePontuationSession {
  public async execute({ id }: IRequest): Promise<Pontuation> {
    const pontuationRepository = getRepository(Pontuation);

    const pontuation = await pontuationRepository.findOne(id);

    if (!pontuation) {
      throw new AppError('Game session doesnt exists');
    }

    return pontuation;
  }
}

export default CreatePontuationSession;
