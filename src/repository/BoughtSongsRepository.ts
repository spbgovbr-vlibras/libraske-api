import User from '@models/User';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import BoughtSongs from '../models/BoughtSongs';

interface IBoughtSongsRepository {

    addBoughtSong(boughtSongs: BoughtSongs): Promise<BoughtSongs>
    findByUserId(userId: string): Promise<BoughtSongs[]>;
    existsBySongIdAndUserId(userId: string, songId: string): Promise<boolean>;
    getInstance(): Repository<BoughtSongs>;
}

class BoughtSongsRepository implements IBoughtSongsRepository {

    async addBoughtSong(boughtSongs: BoughtSongs): Promise<BoughtSongs> {
        return await getRepository(BoughtSongs).save(boughtSongs);
    }

    async findByUserId(userId: string): Promise<BoughtSongs[]> {
        return getRepository(BoughtSongs).find({ user_id: userId });
    }

    async existsBySongIdAndUserId(userId: string, songId: string): Promise<boolean> {

        const result = await getRepository(BoughtSongs).find({ user_id: userId, song_id: songId });

        return result.length > 0;

    }

    getInstance(): Repository<BoughtSongs> {
        return getRepository(BoughtSongs);
    }



}

export default new BoughtSongsRepository();