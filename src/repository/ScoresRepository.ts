import { getRepository, Repository } from 'typeorm';
import Scores from '../models/Scores';

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

  async getHistoryBySong(userId: number, songId: string): Promise<IHistoryBySong[]> {
    const query = ` select so.name, s.session_score from scores s 
                        inner join game_sessions gs on gs.id = s.game_session_id 
                        inner join songs so on gs.song_id = so.id 
                        where gs.song_id = '${songId}' and gs.user_id = '${userId}' 
                        order by s.session_score desc`

    return await getRepository(Scores).query(query);

  }

  async findOneById(id: string): Promise<Scores | undefined> {
    return await getRepository(Scores).findOne({ id });
  }

  async findBestScoreBySong(songId: string): Promise<IMaxSessionScore[]> {
    const query = ` select max(s.session_score) as maxSongScore from "scores" s 
                        inner join "game_sessions" gs on gs.id = s.game_session_id 
                        where gs.song_id = '${songId}'`

    return await getRepository(Scores).query(query);
  }

  async getBestScoresByUser(userId: number): Promise<IBestScoresByUser[]> {
    const query = ` select distinct s.name as song_name, s.id as song_id, max(sc.session_score) over(partition by gs.song_id) as best_score from scores sc 
                        inner join game_sessions gs on gs.id = sc.game_session_id 
                        inner join songs s on gs.song_id = s.id 
                        where gs.user_id = '${userId}'`

    return await getRepository(Scores).query(query);
  }

  getInstance(): Repository<Scores> {
    return getRepository(Scores);
  }
}

export default new ScoresRepository();