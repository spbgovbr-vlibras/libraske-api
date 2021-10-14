import uploadConfig from '../config/uploadConfig';
import createSongFolder from '../middlewares/createSongFolder';
import SongsService from '../services/SongsService';
import { Router } from 'express';
import multer from 'multer';
import AppError from '../errors/AppError';

const songsRouter = Router();

songsRouter.get('/', async (request, response) => {
  const songs = await SongsService.listSongs();

  return response.json({ Items: songs });
});

songsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const song = await SongsService.findById({ id });

  return response.json({ song });
});

songsRouter.post('/', createSongFolder, (request, response) => {
  const uploadSong = multer(uploadConfig({ folder: 'song', request }));
  const { idSong } = request;

  uploadSong.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'subtitle', maxCount: 1 },
  ])(request, response, async () => {
    const { name, description, singers, price } = request.body;

    try {

      if (!price) {
        throw new AppError("price is required", 400);
      }

      // TODO Criar validador pros campos Thumbnail e subtitle
      const song = await SongsService.createSong({
        idSong: parseInt(idSong),
        idUser: request.user.id,
        name,
        description,
        singers,
        thumbnail: request.files.thumbnail[0].filename,
        subtitle: request.files.subtitle[0].filename,
        price: parseInt(price)
      });
      return response.json(song);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message })
    }
  });
});

// TODO PUT na songsRouter
// songsRouter.put('/:id', async (request, response) => {});

songsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await SongsService.deleteSongAndClearFolder({ id });

  return response.status(200).send();
});

export default songsRouter;
