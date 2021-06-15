import uploadConfig from '@config/uploadConfig';
import CloseGameSessionService from '@services/CloseGameSessionService';
import ConsultGameSessionService from '@services/ConsultGameSessionService';
import CreateGameSessionService from '@services/CreateGameSessionService';
import SenderMessageService from '@services/SenderMessageService';
import { Router } from 'express';
import multer from 'multer';

const gameOperationsRouter = Router();

const uploadFrame = multer(uploadConfig({ folder: 'img' }));

gameOperationsRouter.post(
  '/frame/:idSession',
  uploadFrame.single('frame'),
  async (request, response) => {
    const { idSession } = request.params;
    const { idFrame } = request.body;

    const sendMessageService = new SenderMessageService();

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
  async (request, response) => {
    const { idSong } = request.body;

    const { id } = await CreateGameSessionService.execute({
      idUser: request.user.id,
      idSong,
    });

    return response.status(201).json({ idGameSession: id });
  },
);

gameOperationsRouter.patch(
  '/pontuation/session/:id',
  async (request, response) => {
    const { id } = request.params;

    await CloseGameSessionService.execute({ id });

    return response.status(204).send();
  },
);

gameOperationsRouter.get(
  '/pontuation/session/:id',
  async (request, response) => {
    const { id } = request.params;

    const pontuation = await ConsultGameSessionService.execute({
      id,
    });

    return response.json({ pontuation });
  },
);

export default gameOperationsRouter;
