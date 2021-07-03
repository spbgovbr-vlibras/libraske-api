import { getRepository, Repository } from 'typeorm';
import Song from '../models/Song';

interface ISongsRepository {
    findOneById(id: string): Promise<Song | undefined>;
    deleteSongById(id: string): Promise<void>;
    createSong(song: Song): Promise<Song>;
    listSongs(): Promise<Song[]>;
    getInstance(): Repository<Song>;
}

class SongsRepository implements ISongsRepository {

    async findOneById(id: string): Promise<Song | undefined> {
        return await getRepository(Song).findOne(id);
    }

    async deleteSongById(id: string): Promise<void> {
        await getRepository(Song).delete(id);
    }

    async createSong(song: Song): Promise<Song> {
        return await getRepository(Song).save(song);
    }

    async listSongs(): Promise<Song[]> {
        return await getRepository(Song).find({
            select: ['id', 'name', 'description', 'singers', 'thumbnail', 'subtitle'],
        });
    }


    getInstance(): Repository<Song> {
        return getRepository(Song);
    }
}

export default new SongsRepository();