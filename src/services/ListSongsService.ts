import Song from '@models/Song';
import { getRepository } from 'typeorm';

const URI = process.env.BASE_URI_API || 'http://localhost:3333/info/';

class ListSongService {
  public async execute(): Promise<Song[]> {
    const songsRepository = getRepository(Song);

    const songs = await songsRepository.find({
      select: ['id', 'name', 'description', 'singers', 'thumbnail', 'subtitle'],
    });

    const songModified = songs.map(song => ({
      ...song,
      thumbnail: new URL(`${song.id}/${song.thumbnail}`, URI).href,
      subtitle: new URL(`${song.id}/${song.subtitle}`, URI).href,
    }));

    return songModified;
  }
}

export default ListSongService;
