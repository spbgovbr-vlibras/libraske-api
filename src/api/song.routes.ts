import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/uploadConfig';

const songsRouter = Router();

const uploadSong = multer(uploadConfig({ folder: 'song' }));

songsRouter.get('/', (request, response) => {});

songsRouter.get('/:id', (request, response) => {});

songsRouter.post('/', uploadSong.single('thumbnail'), (request, response) => {
  const { songName, file } = request.body;
});

songsRouter.put('/:id', (request, response) => {});

songsRouter.delete('/:id', (request, response) => {});

export default songsRouter;
