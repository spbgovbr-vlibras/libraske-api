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
import BoughtSongsService from '@services/BoughtSongsService';
import { sanitize } from 'class-sanitizer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SongCreateDTO } from '../dto/SongCreateDTO';

const songsRouter = Router();

const sanitizeSvgContent = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.toLowerCase().includes('<svg')) {
      const sanitized = content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags
        .replace(/\bon[a-z]+\s*=\s*(['"]?)(?:(?!\1).)*\1/gi, ''); // Remove event handlers
      fs.writeFileSync(filePath, sanitized);
    }
  } catch (error) {
    console.error(`Error sanitizing SVG: ${error}`);
  }
};

const removeSongFolder = (songId: string) => {
  const folder = path.resolve(SONG_STORAGE, songId);
  if (fs.existsSync(folder)) {
    console.log(`Removing folder : ${folder}`);
    fs.rmSync(folder, { recursive: true, force: true });
  }
}

const songIsNotValid = (multerErrors?: MulterValidationError[]) => {
  try {
    if (!Array.isArray(multerErrors)) return false;

    const result = multerErrors.filter(item => item.errors.length > 0);
    return result.length > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const songIsNotComplete = (multerFiles: Express.Request) => {
  const files = multerFiles.files;
  return !files || !files.thumbnail || !files.subtitle || !files.song || !files.animation
    || !files.trainingAnimation1 || !files.trainingAnimation2 || !files.trainingAnimation3 || !files.trainingAnimation4;
}


songsRouter.get('/', async (request, response) => {
  const { id } = request.user;
  const songs = await SongsService.listSongs();
  const boughtSongs = await BoughtSongsService.getAvailableSongs(parseInt(id));
  const unlockedSongIds = boughtSongs.map(song => song.song_id);

  const unlockedSongs = songs.map(item => {
    return {
      ...item,
      isUnlocked: unlockedSongIds.includes(item.id) || item.price === 0 // Se a música foi comprada ou o valor é 0
    }
  }).sort((first, second) => first.price < second.price ? -1 : 1)

  return response.json({ Items: unlockedSongs });
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
  ])(request, response, async () => {
    const { price } = request.body;
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

    const songMetadata = plainToInstance(SongCreateDTO, request.body);
    const validationErrors = await validate(songMetadata);

    if (validationErrors.length > 0) {
      removeSongFolder(idSong);
      const dtoErrors = validationErrors.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints || {}),
      }));
      return response.status(400).json(dtoErrors);
    }

    sanitize(songMetadata);

    try {
      if (request.files) {
        Object.values(request.files).forEach((fileArray: any) => {
          fileArray.forEach((file: any) => {
            sanitizeSvgContent(file.path);
          });
        });
      }

      if (!price) {
        throw new AppError("price is required", 400);
      }

      const song = await SongsService.createSong({
        idSong: parseInt(idSong),
        idUser: request.user.id,
        name: songMetadata.name,
        description: songMetadata.description,
        singers: songMetadata.singers,
        thumbnail: request.files.thumbnail[0].filename,
        subtitle: request.files.subtitle[0].filename,
        animation: request.files.animation[0].filename,
        song: request.files.song[0].filename,
        trainingAnimation1: request.files.trainingAnimation1[0].filename,
        trainingAnimation2: request.files.trainingAnimation2[0].filename,
        trainingAnimation3: request.files.trainingAnimation3[0].filename,
        trainingAnimation4: request.files.trainingAnimation4[0].filename,
        price: parseInt(price),
        trainingPhrase1: songMetadata.trainingPhrase1,
        trainingPhrase2: songMetadata.trainingPhrase2,
        trainingPhrase3: songMetadata.trainingPhrase3,
        trainingPhrase4: songMetadata.trainingPhrase4
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
