import { tmpFolder } from '../config/uploadConfig';
import Song from '../models/Song';
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}
class DeleteSongService {
  public async execute({ id }: IRequest): Promise<Song> {
    const songRepository = getRepository(Song);

    const song = await songRepository.findOne(id);

    if (!song) {
      throw new AppError('Song does not exists.', 404);
    }

    await songRepository.delete(song.id);

    const dir = path.resolve(tmpFolder, 'song', id);

    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }

    return song;
  }
}

export default new DeleteSongService();
