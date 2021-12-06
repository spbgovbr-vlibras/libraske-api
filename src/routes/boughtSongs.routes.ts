import BoughtSongsService from '../services/BoughtSongsService';
import { Router } from 'express';

const songStore = Router();

songStore.get("/", async (request, response) => {

  const user = request.user;
  const res = await BoughtSongsService.getAvailableSongs(user.id);

  response.json(res.map(item => item.song_id));
});


export default songStore;