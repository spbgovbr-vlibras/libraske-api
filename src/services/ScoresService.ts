import Scores from '@models/Scores';
import AppError from 'src/errors/AppError';
import ScoresRepository from '../repository/ScoresRepository';

interface IRequest {
    id: string;
    sessionScore: number;
}

class ScoresService {

    async getScoreBySession(id: string): Promise<Scores> {

        const scoresRepository = ScoresRepository.getInstance();

        const result = await scoresRepository.findOne({ game_session_id: id });

        if (!result) {
            throw new AppError('Game session not found!', 404);
        }

        return result;

    }

    async createScore({ id, sessionScore }: IRequest): Promise<void> {

        const scoresRepository = ScoresRepository.getInstance();

        const createdScore = scoresRepository.create({
            game_session_id: id,
            sessionScore
        })

        await scoresRepository.save(createdScore);

    }
}

export default new ScoresService();
