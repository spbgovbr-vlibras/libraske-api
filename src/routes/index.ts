import { Router } from 'express';

import gameOperationsRoutes from './gameOperations.routes';
import songsRoutes from './song.routes';
import authRoutes from './authetication.routes';
import storeSongs from './songStore.routes';
import boughtSongs from './boughtSongs.routes';
import boughtPersonalization from './boughtPersonalization.routes';
import scores from './score.routes';
import userRouter from './users.routes';
import personalizationRoutes from './personalization.routes';
import personalizationStoreRoutes from './personalizationStore.routes';
import personalizationGroupRoutes from './personalizationGroup.routes';
import guestAuthRouter from './guestAuthentication.routes';
import personalizationColor from './personalizationColor.routes';

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();

routes.use('/game', ensureAuthenticated, gameOperationsRoutes);
routes.use('/songs', ensureAuthenticated, songsRoutes);
routes.use('/store', ensureAuthenticated, personalizationStoreRoutes);
routes.use('/store', ensureAuthenticated, storeSongs);
routes.use('/bought-songs', ensureAuthenticated, boughtSongs);
routes.use('/bought-personalizations', ensureAuthenticated, boughtPersonalization);
routes.use('/scores', ensureAuthenticated, scores);
routes.use('/users', ensureAuthenticated, userRouter);
routes.use('/personalizations', ensureAuthenticated, personalizationRoutes);
routes.use('/personalizations-group', ensureAuthenticated, personalizationGroupRoutes);
routes.use('/personalizations-color', ensureAuthenticated, personalizationColor);
routes.use('/auth', authRoutes);
routes.use('/guest-auth', guestAuthRouter);

export default routes;
