import ScoresService from '../services/ScoresService';
import AppError from '../errors/AppError';
import { Router } from 'express';

const scoreRouter = Router();

const SONG_ID_PATTERN = /^\d+$/;

const ensureValidSongId = (id: string): void => {
  if (!SONG_ID_PATTERN.test(id)) {
    throw new AppError('Invalid song id.', 400);
  }
};

scoreRouter.get('/song/:id', async (request, response) => {

  const { id } = request.params;
  ensureValidSongId(id);

  const result = await ScoresService.getBestScoreBySong(id);

  response.json({
    maxSongScore: result[0].maxsongscore
  });

})

scoreRouter.get('/song/:id/history', async (request, response) => {

  const { id: songId } = request.params;
  ensureValidSongId(songId);

  const user = request.user;
  const result = await ScoresService.getHistoryBySong(user.id, songId);

  response.json({
    result
  });

})

scoreRouter.get('/user', async (request, response) => {

  const user = request.user;
  const result = await ScoresService.getBestScoresByUser(user.id);

  response.json({
    result
  });

})


export default scoreRouter;