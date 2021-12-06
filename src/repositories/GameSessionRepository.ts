import { getRepository, Repository } from 'typeorm';
import GameSession from '../models/GameSession';
interface IGameSessionsRepository {
  closeGameSession(id: number): Promise<void>
  findOneById(id: number): Promise<GameSession | undefined>;
  findGameSessionByUserId(id: number): Promise<number>;
  saveGameSession(gameSession: GameSession): Promise<GameSession>
  countByUserIdAndSongId(userId: number, songId: number): Promise<number>;
  getInstance(): Repository<any>;
}

class GameSessionsRepository implements IGameSessionsRepository {
  async closeGameSession(id: number): Promise<void> {
    await getRepository(GameSession).update(id, { isClosed: true })
  }

  async findOneById(id: number): Promise<GameSession | undefined> {
    return await getRepository(GameSession).findOne(id);
  }

  async saveGameSession(gameSession: GameSession): Promise<GameSession> {
    return await getRepository(GameSession).save(gameSession);
  }

  async countByUserIdAndSongId(userId: number, songId: number): Promise<number> {
    return await getRepository(GameSession).count({ user_id: userId, song_id: songId });

  }
  async findGameSessionByUserId(userId: number): Promise<number> {
    const query = `
      select max(id) from game_sessions
      where user_id = ${userId}
    `
    return await getRepository(GameSession).query(query);
  }

  getInstance(): Repository<GameSession> {
    return getRepository(GameSession);
  }
}

export default new GameSessionsRepository();