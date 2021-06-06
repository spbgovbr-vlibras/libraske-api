import { Router } from 'express';

import gameOperationsRoutes from './gameOperations.routes';
import songsRoutes from './song.routes';
import authRoutes from './authetication.routes';

const routes = Router();

routes.use('/game', gameOperationsRoutes);
routes.use('/songs', songsRoutes);
routes.use('/auth', authRoutes);

export default routes;
