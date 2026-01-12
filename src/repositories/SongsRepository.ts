import { Repository } from 'typeorm';
import Song from '../models/Song';
import { AppDataSource } from '../database';

interface ISongsRepository {
  findOneById(id: number): Promise<Song | undefined>;
  deleteSongById(id: number): Promise<void>;
  createSong(song: Song): Promise<Song>;
  listSongs(): Promise<Song[]>;
  getInstance(): Repository<Song>;
}

class SongsRepository implements ISongsRepository {

  private readonly ormRepository: Repository<Song>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Song);
  }
  async findOneById(id: number): Promise<Song | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) ?? undefined;
  }

  async deleteSongById(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async createSong(song: Song): Promise<Song> {
    return await this.ormRepository.save(song);
  }

  async listSongs(): Promise<Song[]> {
    return await this.ormRepository.find({
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
    return this.ormRepository
  }
}

export default new SongsRepository();