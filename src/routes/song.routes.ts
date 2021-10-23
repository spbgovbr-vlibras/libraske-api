import uploadConfig from '../config/multer/uploadConfig';
import createSongFolder from '../middlewares/createSongFolder';
import SongsService from '../services/SongsService';
import { Router } from 'express';
import multer from 'multer';
import AppError from '../errors/AppError';
import { SONG_STORAGE } from '../config/applicationFolders';
import path from 'path';
import fs from 'fs';
import { MulterValidationError } from '../config/multer/validators';

const songsRouter = Router();

const removeSongFolder = (songId: string) => {
  const folder = path.resolve(SONG_STORAGE, songId);
  if (fs.existsSync(folder)) {
    console.log(`Removing folder : ${folder}`);
    fs.rmdirSync(folder, { recursive: true });
  }
}

const songIsNotValid = (multerErrors: MulterValidationError[]) => {
  const result = multerErrors.filter(item => item.errors.length > 0);
  return result.length > 0;
}

const songIsNotComplete = (multerFiles: Express.Request) => {
  const files = multerFiles.files;
  return !files || !files.thumbnail || !files.subtitle || !files.song || !files.animation
    || !files.trainingAnimation1 || !files.trainingAnimation2 || !files.trainingAnimation3 || !files.trainingAnimation4
    || !files.trainingAnimation5;
}


songsRouter.get('/', async (request, response) => {
  const songs = await SongsService.listSongs();
  return response.json({ Items: songs });
});

songsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const song = await SongsService.findById({ id: parseInt(id) });

  return response.json({ song });
});

songsRouter.post('/', createSongFolder, (request, response) => {
  const { idSong } = request;
  const currentSongStorage = path.resolve(SONG_STORAGE, idSong);
  const uploadSong = multer(uploadConfig({ folder: currentSongStorage, request }));

  uploadSong.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'subtitle', maxCount: 1 },
    { name: 'animation', maxCount: 1 },
    { name: 'song', maxCount: 1 },
    { name: 'trainingAnimation1', maxCount: 1 },
    { name: 'trainingAnimation2', maxCount: 1 },
    { name: 'trainingAnimation3', maxCount: 1 },
    { name: 'trainingAnimation4', maxCount: 1 },
    { name: 'trainingAnimation5', maxCount: 1 },
  ])(request, response, async () => {
    const { name, description, singers, price } = request.body;
    const { multerErrors } = request;

    if (songIsNotValid(multerErrors)) {
      removeSongFolder(idSong);
      return response.status(400).json(multerErrors);
    }
    if (songIsNotComplete(request)) {
      console.log({ files: request.files });

      removeSongFolder(idSong);
      return response.status(400).json({ error: 'Missing properties.' });
    }

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
        animation: request.files.animation[0].filename,
        song: request.files.song[0].filename,
        trainingAnimation1: request.files.trainingAnimation1[0].filename,
        trainingAnimation2: request.files.trainingAnimation2[0].filename,
        trainingAnimation3: request.files.trainingAnimation3[0].filename,
        trainingAnimation4: request.files.trainingAnimation4[0].filename,
        trainingAnimation5: request.files.trainingAnimation5[0].filename,
        price: parseInt(price)
      });
      return response.json(song);
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  });
});

songsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await SongsService.deleteSongAndClearFolder({ id: parseInt(id) });

  return response.status(200).send();
});

export default songsRouter;
