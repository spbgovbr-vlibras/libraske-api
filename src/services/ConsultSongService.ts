import Song from '../models/Song';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}
class ConsultSongService {
  public async execute({ id }: IRequest): Promise<Song> {
    const songRepository = getRepository(Song);

    const song = await songRepository.findOne(id);

    if (!song) {
      throw new AppError('Song does not exists.', 404);
    }

    return song;
  }
}

export default new ConsultSongService();
