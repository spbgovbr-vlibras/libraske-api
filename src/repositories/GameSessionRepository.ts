import { Repository } from 'typeorm';
import GameSession from '../models/GameSession';
import { AppDataSource } from '../database';
interface IGameSessionsRepository {
  closeGameSession(id: number): Promise<void>
  findOneById(id: number): Promise<GameSession | undefined>;
  findGameSessionByUserId(id: number): Promise<number>;
  saveGameSession(gameSession: GameSession): Promise<GameSession>
  countByUserIdAndSongId(userId: number, songId: number): Promise<number>;
  getInstance(): Repository<any>;
}

class GameSessionsRepository implements IGameSessionsRepository {
  private readonly ormRepository: Repository<GameSession>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(GameSession);
  }

  async closeGameSession(id: number): Promise<void> {
    await this.ormRepository.update(id, { isClosed: true })
  }

  async findOneById(id: number): Promise<GameSession | undefined> {
    const result = await this.ormRepository.findOne({ where: { id } });
    return result === null ? undefined : result;
  }

  async saveGameSession(gameSession: GameSession): Promise<GameSession> {
    return await this.ormRepository.save(gameSession);
  }

  async countByUserIdAndSongId(userId: number, songId: number): Promise<number> {
    return await this.ormRepository.count({ where: { user_id: userId, song_id: songId } });

  }
  async findGameSessionByUserId(userId: number): Promise<number> {
    const query = `
      select max(id) from game_sessions
      where user_id = ${userId}
    `
    return await this.ormRepository.query(query);
  }

  getInstance(): Repository<GameSession> {
    return this.ormRepository;
  }
}

export default new GameSessionsRepository();