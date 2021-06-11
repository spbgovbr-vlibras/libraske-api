import uploadConfig from '@config/uploadConfig';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import ConsultGameSessionService from '@services/ConsultGameSessionService';
import CreateGameSessionService from '@services/CreateGameSessionService';
import SendingMessageService from '@services/SendMessageService';
import { Router } from 'express';
import multer from 'multer';

const gameOperationsRouter = Router();

const uploadFrame = multer(uploadConfig({ folder: 'img' }));

gameOperationsRouter.post(
  '/frame/:idSession',
  uploadFrame.single('frame'),
  (request, response) => {
    const { idSession } = request.params;
    const { idFrame } = request.body;

    const sendingMessageService = new SendingMessageService();

    sendingMessageService.execute({
      queue: idSession,
      idFrame,
      frameImageUri: request.file.filename,
    });

    return response.send(204);
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

    return response.status(204).json({ idGameSession: id });
  },
);

gameOperationsRouter.get(
  '/pontuation/session/:id',
  async (request, response) => {
    const { id } = request.params;

    const gameSession = ConsultGameSessionService.execute({
      id,
    });

    return response.json({ gameSession });
  },
);

gameOperationsRouter.patch('/pontuation/:id', (request, response) => {
  const { id } = request.user;
  const { pontuation } = request.body;

  console.log(request.body);
});

export default gameOperationsRouter;
