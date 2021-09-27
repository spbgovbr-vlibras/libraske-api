import GameSession from "../models/GameSession";
import AppError from "../errors/AppError";
import GameSessionRepository from "../repositories/GameSessionRepository";
import CalculatePontuations from '../utils/CalculatePontuation';
import UsersService from "./UsersService";
import SongsService from "./SongsService";

interface ICreatePontuation {
  idGameSession: number;
  pontuation: number;
}
interface ICreateGameSession {
  idUser: number;
  idSong: number;
}

interface IGetPontuation {
  id: number;
}

interface CloseGameSessionResponse {
  gameSession: GameSession;
  sessionScore: number;
}

export interface IScore {
  sessionScore: number;
  pontuations: number[];
}

class GameSessionService {

  constructor(
    private usersService: typeof UsersService = UsersService,
    private songsService: typeof SongsService = SongsService) { }


  async findGameSession(gameSessionId: number): Promise<GameSession> {

    const gameSession = await GameSessionRepository.findOneById(gameSessionId);

    if (!gameSession) {
      throw new AppError("Game session not found!", 404);
    }

    return gameSession;
  }

  async getScore(gameSessionId: number): Promise<IScore> {
    const gameSession = await this.findGameSession(gameSessionId);

    if (gameSession.isClosed) {
      throw new AppError('The game session is already closed.', 400)
    }

    const sessionScore = CalculatePontuations(gameSession.pontuation);

    return {
      sessionScore,
      pontuations: gameSession.pontuation
    }
  }

  async closeGameSession({ id }: IGetPontuation): Promise<CloseGameSessionResponse> {

    const gameSession = await this.findGameSession(id);

    if (gameSession.isClosed) {
      throw new AppError('The game session is already closed.', 400)
    }

    const sessionScore = CalculatePontuations(gameSession.pontuation);
    await GameSessionRepository.closeGameSession(gameSession.id);

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
      isClosed: false,
      pontuation: []
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

  async countByUserIdAndSongId(userId: number, songId: number): Promise<number> {
    return await GameSessionRepository.countByUserIdAndSongId(userId, songId);
  }

}

export default new GameSessionService();