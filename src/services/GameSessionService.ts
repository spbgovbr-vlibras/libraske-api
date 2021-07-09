import GameSession from "@models/GameSession";
import AppError from "src/errors/AppError";
import GameSessionRepository from "src/repository/GameSessionRepository";
import CalculatePontuations from '../utils/CalculatePontuation';
import UsersService from "./UsersService";
import SongsService from "./SongsService";

interface ICreatePontuation {
    idGameSession: string;
    pontuation: number;
}
interface ICreateGameSession {
    idUser: number;
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
            throw new AppError("Game session not found!", 404);
        }

        return gameSession;
    }

    async closeGameSession({ id }: IGetPontuation): Promise<CloseGameSessionResponse> {

        const gameSession = await this.findGameSession(id);

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

        //TODO Validar se o usuário tem a música liberada.

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

    async countByUserIdAndSongId(userId: number, songId: string): Promise<number> {
        return await GameSessionRepository.countByUserIdAndSongId(userId, songId);
    }

}

export default new GameSessionService();