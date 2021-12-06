import ScoresService from '../services/ScoresService';
import { Router } from 'express';

const scoreRouter = Router();


scoreRouter.get('/song/:id', async (request, response) => {

  const { id } = request.params;
  const result = await ScoresService.getBestScoreBySong(id);

  response.json({
    maxSongScore: result[0].maxsongscore
  });

})

scoreRouter.get('/song/:id/history', async (request, response) => {

  const { id: songId } = request.params;
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