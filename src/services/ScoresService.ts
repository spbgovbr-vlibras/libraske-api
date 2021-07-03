import ScoresRepository from '../repository/ScoresRepository';

interface IRequest {
    id: string;
    sessionScore: number;
}

class ScoresService {


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
