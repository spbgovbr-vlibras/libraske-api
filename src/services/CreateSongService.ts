import Song from '../models/Song';
import { getRepository } from 'typeorm';
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
  async execute({
    idSong,
    idUser,
    name,
    description,
    singers,
    thumbnail,
    subtitle,
  }: IRequest): Promise<Song> {

    const songRepository = getRepository(Song);

    const song = songRepository.create({
      id: idSong,
      user_id: idUser,
      name,
      description,
      singers,
      thumbnail,
      subtitle,
    });

    await songRepository.save(song);

    return song
  }
}

export default new CreateSong();
