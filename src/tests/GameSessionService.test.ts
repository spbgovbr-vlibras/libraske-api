import GameSession from "../models/GameSession"
import Songs from "../models/Song"
import { createConnection, getConnection } from "typeorm"
import User from "../models/User"
import GameSessionService from "../services/GameSessionService"
import SongsService from "../services/SongsService"
import TokenService from "../services/TokenService"
import UsersService from "../services/UsersService"
import DataGenerator from "../utils/DataGenerator"
import Scores from "../models/Scores"
import AppError from "../errors/AppError"

describe('Game Session Service', () => {

  const createUser = (id: number, name: string, email: string, profilePhoto: string, cpf: string, refreshToken: string, credit: number): User => {
    return {
      id,
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken,
      credit,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  const getDefaultData = () => {

    const cpf = DataGenerator.getUnformattedCpf();
    const refreshToken = TokenService.createRefreshToken({ cpf });
    const id = DataGenerator.getInteger();
    const email = DataGenerator.getEmail();
    const profilePhoto = DataGenerator.getUrl();
    const name = DataGenerator.getFirstName();
    const credit = DataGenerator.getInteger();
    const idSong = DataGenerator.getUUID();
    const songName = DataGenerator.getFirstName();
    const description = DataGenerator.getSongGenre();
    const singers = DataGenerator.getFirstName();
    const thumbnail = DataGenerator.getRandomFilePath();
    const subtitle = DataGenerator.getRandomFilePath();
    const price = DataGenerator.getInteger();

    const defaultUser = createUser(id, name, email, profilePhoto, cpf, refreshToken, credit);

    return {
      cpf,
      refreshToken,
      id,
      email,
      profilePhoto,
      name,
      credit,
      defaultUser,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    }
  }

  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [User, Songs, GameSession, Scores],
      synchronize: true,
      logging: false,
    })
  })

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  })

  it('should should create a new game session', async () => {

    const {
      cpf,
      refreshToken,
      email,
      profilePhoto,
      name,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    } = getDefaultData();

    const user = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const song = await SongsService.createSong({ idUser: user.id, name: songName, price, description, idSong, singers, subtitle, thumbnail });

    const result = await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    expect(result).toBeDefined();
    expect(result.song_id).toBe(song.id);
    expect(result.user_id).toBe(user.id);
    expect(result.isClosed).toBeFalsy();
  })

  it('should find a game session', async () => {

    const {
      cpf,
      refreshToken,
      email,
      profilePhoto,
      name,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    } = getDefaultData();

    const user = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const song = await SongsService.createSong({ idUser: user.id, name: songName, price, description, idSong, singers, subtitle, thumbnail });

    const gameSession = await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    const foundGameSession = await GameSessionService.findGameSession(gameSession.id);

    expect(foundGameSession).toBeDefined();
    expect(foundGameSession.song_id).toBe(song.id);
    expect(foundGameSession.user_id).toBe(user.id);

  })

  it('should throw an error when not finding a game session', async () => {

    const { id } = getDefaultData();

    try {
      await GameSessionService.findGameSession(id);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
    }

  })

  it('should count how many times a user played the song', async () => {

    const {
      cpf,
      refreshToken,
      email,
      profilePhoto,
      name,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    } = getDefaultData();

    const user = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const song = await SongsService.createSong({ idUser: user.id, name: songName, price, description, idSong, singers, subtitle, thumbnail });

    const firstResult = await GameSessionService.countByUserIdAndSongId(user.id, song.id);

    await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    const secondResult = await GameSessionService.countByUserIdAndSongId(user.id, song.id);

    await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });
    await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });
    await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    const thirdResult = await GameSessionService.countByUserIdAndSongId(user.id, song.id);

    expect(firstResult).toBe(0);
    expect(secondResult).toBe(1);
    expect(thirdResult).toBe(4);

  })

  it('should close a game session', async () => {
    const {
      cpf,
      refreshToken,
      email,
      profilePhoto,
      name,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    } = getDefaultData();

    const user = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const song = await SongsService.createSong({ idUser: user.id, name: songName, price, description, idSong, singers, subtitle, thumbnail });
    const gameSession = await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    await GameSessionService.closeGameSession({ id: gameSession.id });

    const closedGameSession = await GameSessionService.findGameSession(gameSession.id);

    expect(closedGameSession.id).toBe(gameSession.id)
    expect(closedGameSession.song_id).toBe(gameSession.song_id)
    expect(closedGameSession.user_id).toBe(gameSession.user_id)
    expect(closedGameSession.isClosed).toBeTruthy();

  });

  it('should throw an error when trying to close an already closed game session.', async () => {
    const {
      cpf,
      refreshToken,
      email,
      profilePhoto,
      name,
      idSong,
      songName,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    } = getDefaultData();

    const user = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const song = await SongsService.createSong({ idUser: user.id, name: songName, price, description, idSong, singers, subtitle, thumbnail });
    const gameSession = await GameSessionService.createGameSession({ idSong: song.id, idUser: user.id });

    await GameSessionService.closeGameSession({ id: gameSession.id });


    try {
      await GameSessionService.closeGameSession({ id: gameSession.id });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400)
    }

  });
})