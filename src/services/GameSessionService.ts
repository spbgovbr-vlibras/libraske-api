import GameSession from "@models/GameSession";
import Songs from "@models/Song";
import User from "@models/User";
import AppError from "src/errors/AppError";
import GameSessionRepository from "src/repository/GameSessionRepository";
import CalculatePontuations from '../utils/CalculatePontuation';
import { getRepository } from "typeorm";
interface ICreatePontuation {
    idGameSession: string;
    pontuation: number;
}
interface ICreateGameSession {
    idUser: string;
    idSong: string;
}

interface IGetPontuation {
    id: string;
}

interface CloseGameSessionResponse {
    gameSession: GameSession;
    sessionScore: number;
}


class GameSessionService {

    async closeGameSession({ id }: IGetPontuation): Promise<CloseGameSessionResponse> {

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

    async getPontuation({ id }: IGetPontuation): Promise<number> {

        // TODO Modificar pra pegar resultado da tabela Scores
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

    async createGameSession({ idUser, idSong }: ICreateGameSession): Promise<GameSession> {
        const gameSessionRepository = getRepository(GameSession);
        const songRepository = getRepository(Songs);
        const userRepository = getRepository(User);

        const song = await songRepository.findOne({ id: idSong });
        const user = await userRepository.findOne({ id: idUser });

        if (!song) {
            throw new AppError('Song doesnt exists', 404);
        }

        if (!user) {
            throw new AppError('User does not exists', 404);
        }

        const gameSession = gameSessionRepository.create({
            user,
            song,
        });

        await gameSessionRepository.save(gameSession);

        return gameSession;
    }

    async addPontuation({ idGameSession, pontuation }: ICreatePontuation): Promise<GameSession> {

        const gameSession = await GameSessionRepository.findOneById(idGameSession);

        if (!gameSession) {
            throw new AppError('Game session does not exists');
        }

        const oldArray = gameSession.pontuation ? gameSession.pontuation : [];

        const newGameSession = {
            ...gameSession,
            pontuation: [...oldArray, pontuation],
        };

        await GameSessionRepository.saveGameSession(newGameSession);

        return gameSession;
    }

    async countByUserIdAndSongId(userId: string, songId: string): Promise<number> {
        return await GameSessionRepository.countByUserIdAndSongId(userId, songId);
    }

}

export default new GameSessionService();