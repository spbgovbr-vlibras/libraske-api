import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import { tmpFolder } from '../config/uploadConfig';
import AppError from '../errors/AppError';
import Song from '../models/Song';

interface IRequest {
  id: string;
}
class DeleteSong {
  public async execute({ id }: IRequest): Promise<Song> {
    const songRepository = getRepository(Song);

    const song = await songRepository.findOne(id);

    if (!song) {
      throw new AppError('Song does not exists.');
    }

    await songRepository.delete(song.id);

    const dir = path.resolve(tmpFolder, 'song', id);

    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    return song;
  }
}

export default DeleteSong;
