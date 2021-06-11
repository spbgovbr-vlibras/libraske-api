import Song from '@models/Song';
import User from '@models/User';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface IRequest {
  idSong: string;
  idUser: string;
  name: string;
  description: string;
  singers: string;
  thumbnail: string;
  subtitle: string;
}

class CreateSong {
  public async execute({
    idSong,
    idUser,
    name,
    description,
    singers,
    thumbnail,
    subtitle,
  }: IRequest): Promise<Song> {
    const userRepository = getRepository(User);
    const songRepository = getRepository(Song);

    const user = await userRepository.findOne({ id: idUser });

    if (!user) {
      throw new AppError('User does not exists');
    }

    const song = songRepository.create({
      id: idSong,
      user_id: user.id,
      name,
      description,
      singers,
      thumbnail,
      subtitle,
    });

    await songRepository.save(song);

    return song;
  }
}

export default CreateSong;
