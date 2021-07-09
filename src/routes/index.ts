import { Router } from 'express';

import gameOperationsRoutes from './gameOperations.routes';
import songsRoutes from './song.routes';
import authRoutes from './authetication.routes';
import storeSongs from './songStore.routes';
import boughtSongs from './boughtSongs.routes';
import scores from './score.routes';
import userRouter from './users.routes';


import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();

routes.use('/game', ensureAuthenticated, gameOperationsRoutes);
routes.use('/songs', ensureAuthenticated, songsRoutes);
routes.use('/store', ensureAuthenticated, storeSongs);
routes.use('/bought-songs', ensureAuthenticated, boughtSongs);
routes.use('/scores', ensureAuthenticated, scores);
routes.use('/users', ensureAuthenticated, userRouter);
routes.use('/auth', authRoutes);

export default routes;
