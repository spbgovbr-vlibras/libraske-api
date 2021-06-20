import uploadConfig from '@config/uploadConfig';
import createSongFolder from '@middlewares/createSongFolder';
import ConsultSongService from '@services/ConsultSongService';
import CreateSongService from '@services/CreateSongService';
import DeleteSongService from '@services/DeleteSongService';
import ListSongsService from '@services/ListSongsService';
import { Router } from 'express';
import multer from 'multer';

const songsRouter = Router();

songsRouter.get('/', async (request, response) => {
  const songs = await ListSongsService.execute();

  return response.json({ Items: songs });
});

songsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const consultSongService = new ConsultSongService();
  const song = await consultSongService.execute({ id });

  return response.json({ song });
});

songsRouter.post('/', createSongFolder, (request, response) => {
  const uploadSong = multer(uploadConfig({ folder: 'song', request }));
  const { idSong } = request;

  uploadSong.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'subtitle', maxCount: 1 },
  ])(request, response, async () => {
    const { name, description, singers } = request.body;

    const song = await CreateSongService.execute({
      idSong,
      idUser: request.user.id,
      name,
      description,
      singers,
      thumbnail: request.files.thumbnail[0].filename,
      subtitle: request.files.subtitle[0].filename,
    });
    return response.json(song);
  });
});

// TODO PUT na songsRouter
// songsRouter.put('/:id', async (request, response) => {});

songsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteSongService = new DeleteSongService();

  await deleteSongService.execute({ id });

  return response.status(200).send();
});

export default songsRouter;
