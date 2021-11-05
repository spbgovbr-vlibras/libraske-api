import { getRepository, Repository } from 'typeorm';
import Song from '../models/Song';

interface ISongsRepository {
  findOneById(id: number): Promise<Song | undefined>;
  deleteSongById(id: number): Promise<void>;
  createSong(song: Song): Promise<Song>;
  listSongs(): Promise<Song[]>;
  getInstance(): Repository<Song>;
}

class SongsRepository implements ISongsRepository {
  async findOneById(id: number): Promise<Song | undefined> {
    return await getRepository(Song).findOne(id);
  }

  async deleteSongById(id: number): Promise<void> {
    await getRepository(Song).delete(id);
  }

  async createSong(song: Song): Promise<Song> {
    return await getRepository(Song).save(song);
  }

  async listSongs(): Promise<Song[]> {
    return await getRepository(Song).find({
      select: ['id',
        'name',
        'description',
        'singers',
        'thumbnail',
        'subtitle',
        'price',
        'animation',
        'song',
        'trainingAnimation1',
        'trainingAnimation2',
        'trainingAnimation3',
        'trainingAnimation4',
        'trainingPhrase1',
        'trainingPhrase2',
        'trainingPhrase3',
        'trainingPhrase4',
      ],
      order: { "id": "ASC", }
    });
  }

  getInstance(): Repository<Song> {
    return getRepository(Song);
  }
}

export default new SongsRepository();