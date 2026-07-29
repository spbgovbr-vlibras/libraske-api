import { Repository } from 'typeorm';
import Scores from '../models/Scores';
import { AppDataSource } from '../database';

interface IScoresRepository {
  findBestScoreBySong(songId: string): Promise<IMaxSessionScore[]>;
  getHistoryBySong(userId: number, songId: string): Promise<IMaxSessionScore[]>;
  getInstance(): Repository<Scores>;
}

export interface IMaxSessionScore {
  maxsongscore: number | null;
}

export interface IHistoryBySong extends IMaxSessionScore {
  songName: string;
}
export interface IBestScoresByUser {
  best_score: number;
  song_id: string;
  song_name: number;

}
class ScoresRepository implements IScoresRepository {
  private readonly ormRepository: Repository<Scores>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Scores);
  }

  async getHistoryBySong(userId: number, songId: string): Promise<IHistoryBySong[]> {
    const query = ` select so.name, s.session_score from scores s
                        inner join game_sessions gs on gs.id = s.game_session_id
                        inner join songs so on gs.song_id = so.id
                        where gs.song_id = $1 and gs.user_id = $2
                        order by s.session_score desc`

    return await this.ormRepository.query(query, [songId, userId]);

  }

  async findOneById(id: string): Promise<Scores | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) ?? undefined;
  }

  async findBestScoreBySong(songId: string): Promise<IMaxSessionScore[]> {
    const query = ` select max(s.session_score) as maxSongScore from "scores" s
                        inner join "game_sessions" gs on gs.id = s.game_session_id
                        where gs.song_id = $1`

    return await this.ormRepository.query(query, [songId]);
  }

  async getBestScoresByUser(userId: number): Promise<IBestScoresByUser[]> {
    const query = ` select distinct s.name as song_name, s.id as song_id, max(sc.session_score) over(partition by gs.song_id) as best_score from scores sc
                        inner join game_sessions gs on gs.id = sc.game_session_id
                        inner join songs s on gs.song_id = s.id
                        where gs.user_id = $1`

    return await this.ormRepository.query(query, [userId]);
  }

  getInstance(): Repository<Scores> {
    return this.ormRepository;
  }
}

export default new ScoresRepository();