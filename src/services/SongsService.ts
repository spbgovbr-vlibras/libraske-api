import AppError from "../errors/AppError";
import Song from "../models/Song";
import SongsRepository from '../repositories/SongsRepository';
import { tmpFolder } from '../config/uploadConfig';
import fs from 'fs';
import path from 'path';

interface IFindById {
  id: string;
}

interface ICreateSong {
  idSong: string;
  idUser: number;
  name: string;
  description: string;
  singers: string;
  thumbnail: string;
  subtitle: string;
  price: number;
}

const URI = process.env.BASE_URI_API || 'http://localhost:3333/info/';

class SongsService {

  public async deleteSongAndClearFolder({ id }: IFindById): Promise<Song> {

    const song = await this.findById({ id });

    await SongsRepository.deleteSongById(song.id);

    const dir = path.resolve(tmpFolder, 'song', id);

    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    return song;
  }

  async createSong({ idSong, idUser, name, description, singers, thumbnail, subtitle, price }: ICreateSong): Promise<Song> {

    const song = SongsRepository.getInstance().create({
      id: idSong,
      user_id: idUser,
      name,
      description,
      singers,
      thumbnail,
      subtitle,
      price
    });

    return await SongsRepository.createSong(song);

  }

  public async findById({ id }: IFindById): Promise<Song> {

    const song = await SongsRepository.findOneById(id);

    if (!song) {
      throw new AppError('Song does not exists.', 404);
    }

    return song;
  }

  public async listSongs(): Promise<Song[]> {

    const songs = await SongsRepository.listSongs();

    const songModified = songs.map(song => ({
      ...song,
      thumbnail: new URL(`${song.id}/${song.thumbnail}`, URI).href,
      subtitle: new URL(`${song.id}/${song.subtitle}`, URI).href,
    }));

    return songModified;
  }

}

export default new SongsService();