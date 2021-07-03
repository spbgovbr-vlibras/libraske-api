import GameSessionRepository from "src/repository/GameSessionRepository";



class GameSessionService {

    public async countByUserIdAndSongId(userId: string, songId: string): Promise<number> {

        const gameSessionRepository = GameSessionRepository.getInstance();

        return gameSessionRepository.count({ user_id: userId, song_id: songId });
    }

}

export default new GameSessionService();