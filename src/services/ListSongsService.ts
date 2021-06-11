import Song from '@models/Song';
import { getRepository } from 'typeorm';

class ListSongService {
  public async execute(): Promise<Song[]> {
    const songsRepository = getRepository(Song);

    const songs = await songsRepository.find();

    return songs;
  }
}

export default ListSongService;
