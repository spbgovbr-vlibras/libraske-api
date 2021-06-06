import { getRepository } from 'typeorm';

import Song from '../models/Song';

class ListSongService {
  public async execute(): Promise<Song[]> {
    const songsRepository = getRepository(Song);

    const songs = await songsRepository.find();

    return songs;
  }
}

export default ListSongService;
