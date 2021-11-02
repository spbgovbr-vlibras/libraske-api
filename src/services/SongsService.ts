import AppError from "../errors/AppError";
import Song from "../models/Song";
import SongsRepository from '../repositories/SongsRepository';
import { songsFolder } from '../config/multer/uploadConfig';
import env from '../environment/environment';
import fs from 'fs';
import path from 'path';

interface IFindById {
  id: number;
}

interface ICreateSong {
  idSong: number;
  idUser: number;
  name: string;
  description: string;
  singers: string;
  animation: string;
  song: string;
  trainingAnimation1: string;
  trainingAnimation2: string;
  trainingAnimation3: string;
  trainingAnimation4: string;
  trainingAnimation5: string;
  trainingPhrase1: string;
  trainingPhrase2: string;
  trainingPhrase3: string;
  trainingPhrase4: string;
  trainingPhrase5: string;
  thumbnail: string;
  subtitle: string;
  price: number;
}
class SongsService {

  public async deleteSongAndClearFolder({ id }: IFindById): Promise<Song> {

    const song = await this.findById({ id });

    await SongsRepository.deleteSongById(song.id);

    const dir = path.resolve(songsFolder, `${id}`);

    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    return song;
  }

  async createSong({
    idSong,
    idUser,
    name,
    description,
    singers,
    thumbnail,
    animation,
    song,
    trainingAnimation1,
    trainingAnimation2,
    trainingAnimation3,
    trainingAnimation4,
    trainingAnimation5,
    trainingPhrase1,
    trainingPhrase2,
    trainingPhrase3,
    trainingPhrase4,
    trainingPhrase5,
    subtitle,
    price }: ICreateSong): Promise<Song> {

    const createdSong = SongsRepository.getInstance().create({
      id: idSong,
      user_id: idUser,
      name,
      description,
      singers,
      thumbnail,
      animation,
      song,
      trainingAnimation1,
      trainingAnimation2,
      trainingAnimation3,
      trainingAnimation4,
      trainingAnimation5,
      trainingPhrase1,
      trainingPhrase2,
      trainingPhrase3,
      trainingPhrase4,
      trainingPhrase5,
      subtitle,
      price
    });

    return await SongsRepository.createSong(createdSong);

  }

  public async findById({ id }: IFindById): Promise<Song> {

    const song = await SongsRepository.findOneById(id);

    if (!song) {
      throw new AppError('Song does not exists.', 404);
    }

    return song;
  }

  public async listSongs(): Promise<Song[]> {

    const URI = env.BASE_URI_API;
    const songs = await SongsRepository.listSongs();

    const songModified = songs.map(song => ({
      ...song,
      thumbnail: new URL(`songs/${song.id}/${song.thumbnail}`, URI).href,
      subtitle: new URL(`songs/${song.id}/${song.subtitle}`, URI).href,
      animation: new URL(`songs/${song.id}/${song.animation}`, URI).href,
      song: new URL(`songs/${song.id}/${song.song}`, URI).href,
      trainingAnimation1: new URL(`songs/${song.id}/${song.trainingAnimation1}`, URI).href,
      trainingAnimation2: new URL(`songs/${song.id}/${song.trainingAnimation2}`, URI).href,
      trainingAnimation3: new URL(`songs/${song.id}/${song.trainingAnimation3}`, URI).href,
      trainingAnimation4: new URL(`songs/${song.id}/${song.trainingAnimation4}`, URI).href,
      trainingAnimation5: new URL(`songs/${song.id}/${song.trainingAnimation5}`, URI).href,
    }));
    return songModified;
  }

}

export default new SongsService();