import uploadConfig from '@config/uploadConfig';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import ConsultGameSessionService from '@services/ConsultGameSessionService';
import CreateGameSessionService from '@services/CreateGameSessionService';
import SenderMessageService from '@services/SenderMessageService';
import { Channel } from 'amqplib';
import { Router } from 'express';
import multer from 'multer';

import Rabbitmq from '../queue/Rabbitmq';

const gameOperationsRouter = Router();

const uploadFrame = multer(uploadConfig({ folder: 'img' }));

let sendChannel: Channel;

gameOperationsRouter.post(
  '/frame/:idSession',
  uploadFrame.single('frame'),
  async (request, response) => {
    const { idSession } = request.params;
    const { idFrame } = request.body;

    sendChannel = await Rabbitmq.createChannel(sendChannel);
    const sendMessageService = new SenderMessageService(sendChannel);

    await sendMessageService.execute({
      idSession,
      idFrame,
      frameImageFilename: request.file.filename,
    });

    return response.sendStatus(204);
  },
);

gameOperationsRouter.post(
  '/pontuation/session',
  // ensureAuthenticated,
  async (request, response) => {
    const { idSong } = request.body;
    const { idUser } = request.body; // remove later

    const { id } = await CreateGameSessionService.execute({
      // idUser: request.user.id,
      idUser, // remote later
      idSong,
    });

    return response.status(201).json({ idGameSession: id });
  },
);

gameOperationsRouter.get(
  '/pontuation/session/:id',
  async (request, response) => {
    const { id } = request.params;

    const gameSession = await ConsultGameSessionService.execute({
      id,
    });

    return response.json({ pontuation: gameSession.pontuation });
  },
);

export default gameOperationsRouter;
