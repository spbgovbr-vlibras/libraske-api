import Songs from '@models/Song';
import User from '@models/User';
import { getRepository, Repository } from 'typeorm';
import GameSession from '../models/GameSession';
interface IGameSessionsRepository {
    closeGameSession(id: string): Promise<void>
    findOneById(id: string): Promise<GameSession | undefined>;
    saveGameSessionWithUserAndSong(user: User, song: Songs): Promise<GameSession>
    saveGameSession(gameSession: GameSession): Promise<GameSession>
    countByUserIdAndSongId(userId: string, songId: string): Promise<number>;
    getInstance(): Repository<any>;
}

class GameSessionsRepository implements IGameSessionsRepository {

    async closeGameSession(id: string): Promise<void> {
        await getRepository(GameSession).update(id, { isClosed: true })
    }

    async findOneById(id: string): Promise<GameSession | undefined> {
        return await getRepository(GameSession).findOne(id);
    }

    async saveGameSessionWithUserAndSong(user: User, song: Songs): Promise<GameSession> {
        return await getRepository(GameSession).save({ user, song });
    }

    async saveGameSession(gameSession: GameSession): Promise<GameSession> {
        return await getRepository(GameSession).save(gameSession);
    }

    async countByUserIdAndSongId(userId: string, songId: string): Promise<number> {
        return await getRepository(GameSession).count({ user_id: userId, song_id: songId });
    }

    getInstance(): Repository<GameSession> {
        return getRepository(GameSession);
    }
}

export default new GameSessionsRepository();