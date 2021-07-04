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
        private userService: typeof UsersService = UsersService,
        private songsService: typeof SongsService = SongsService) { }

    async closeGameSession({ id }: IGetPontuation): Promise<CloseGameSessionResponse> {

        const gameSession = await GameSessionRepository.findOneById(id);

        if (!gameSession) {
            throw new AppError('Game session does not exists.', 404);
        }

        if (gameSession.isClosed) {
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

        const song = await SongsService.findById({ id: idSong });
        const user = await UsersService.findUserByCpfOrId({ id: idUser });

        if (!song) {
            throw new AppError('Song doesnt exists', 404);
        }

        if (!user) {
            throw new AppError('User does not exists', 404);
        }

        const gameSession = GameSessionRepository.getInstance().create({
            user,
            song,
        });

        await GameSessionRepository.saveGameSession(gameSession);

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