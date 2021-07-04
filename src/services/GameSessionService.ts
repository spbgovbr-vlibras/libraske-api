import GameSession from "@models/GameSession";
import Songs from "@models/Song";
import User from "@models/User";
import AppError from "src/errors/AppError";
import GameSessionRepository from "src/repository/GameSessionRepository";
import CalculatePontuations from '../utils/CalculatePontuation';
import { getRepository } from "typeorm";
import SongsRepository from "src/repository/SongsRepository";
import UsersRepository from "src/repository/UsersRepository";
import UsersService from "./UsersService";
import SongsService from "./SongsService";
import ScoresService from "./ScoresService";
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

    constructor(
        private usersService: typeof UsersService = UsersService,
        private songsService: typeof SongsService = SongsService) { }


    async findGameSession(gameSessionId: string): Promise<GameSession> {

        const gameSession = await GameSessionRepository.findOneById(gameSessionId);

        if (!gameSession) {
            throw new AppError("Game session not found!");
        }

        return gameSession;
    }

    async closeGameSession({ id }: IGetPontuation): Promise<CloseGameSessionResponse> {

        const gameSession = await GameSessionRepository.findOneById(id);

        if (!gameSession) {
            throw new AppError('Game session does not exists.', 404);
        } else if (gameSession.isClosed) {
            throw new AppError('The game session is already closed.', 400)
        }

        await GameSessionRepository.closeGameSession(gameSession.id);

        const sessionScore = CalculatePontuations(gameSession.pontuation);

        return {
            gameSession,
            sessionScore
        }

    }

    async createGameSession({ idUser, idSong }: ICreateGameSession): Promise<GameSession> {

        const song = await this.songsService.findById({ id: idSong });
        const user = await this.usersService.findUserByCpfOrId({ id: idUser });

        const gameSession = GameSessionRepository.getInstance().create({
            user,
            song,
        });

        await GameSessionRepository.saveGameSession(gameSession);

        return gameSession;
    }

    async addPontuation({ idGameSession, pontuation }: ICreatePontuation): Promise<GameSession> {

        const gameSession = await this.findGameSession(idGameSession);

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