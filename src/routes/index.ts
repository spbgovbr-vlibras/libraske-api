import { Router } from 'express';

import gameOperationsRoutes from './gameOperations.routes';
import songsRoutes from './song.routes';

const routes = Router();

routes.use('/game', gameOperationsRoutes);
routes.use('/songs', songsRoutes);

export default routes;
