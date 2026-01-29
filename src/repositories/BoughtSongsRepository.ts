import { Repository } from 'typeorm';
import BoughtSongs from '../models/BoughtSongs';
import { AppDataSource } from '../database';

interface IBoughtSongsRepository {

  addBoughtSong(boughtSongs: BoughtSongs): Promise<BoughtSongs>
  findByUserId(userId: number): Promise<BoughtSongs[]>;
  existsBySongIdAndUserId(userId: number, songId: number): Promise<boolean>;
  getInstance(): Repository<BoughtSongs>;
}

class BoughtSongsRepository implements IBoughtSongsRepository {

  private readonly ormRepository: Repository<BoughtSongs>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(BoughtSongs);
  }

  async addBoughtSong(boughtSongs: BoughtSongs): Promise<BoughtSongs> {
    return await this.ormRepository.save(boughtSongs);
  }

  async findByUserId(userId: number): Promise<BoughtSongs[]> {
    return this.ormRepository.find({ where: { user_id: userId } });
  }

  async existsBySongIdAndUserId(userId: number, songId: number): Promise<boolean> {
    const result = await this.ormRepository.find({ where: { user_id: userId, song_id: songId } });

    return result.length > 0;
  }

  getInstance(): Repository<BoughtSongs> {
    return this.ormRepository;
  }
}

export default new BoughtSongsRepository();