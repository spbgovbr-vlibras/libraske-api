import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/uploadConfig';
import CreatePontuationSessionService from '../services/CreatePontuationSessionService';
import SendingMessageService from '../services/SendingMessageService';

const gameOperationsRouter = Router();

const uploadFrame = multer(uploadConfig({ folder: 'song' }));

gameOperationsRouter.get('/frame/:id', (request, response) => {
  return response.status(200).send();
});

gameOperationsRouter.post(
  '/frame/:idSession',
  uploadFrame.single('frame'),
  (request, response) => {
    const { idSession } = request.params;
    const { idSong, idFrame, frame } = request.body;

    const sendingMessageService = new SendingMessageService();

    sendingMessageService.execute({
      id: '1',
      idSession,
      idSong,
      idFrame,
      frame,
    });

    return response.send(204);
  },
);

// Pontuation
gameOperationsRouter.post('/pontuation/session', (request, response) => {
  const { idSong } = request.body;

  const createPontuationSessionService = new CreatePontuationSessionService();

  const pontuationSession = createPontuationSessionService.execute({
    idUser: request.user.id,
    idSong,
  });

  return response.json({ pontuationSession });
});

gameOperationsRouter.get('/pontuation/session/:id', (request, response) => {
  return response.json({ pontuation: 130 });
});

gameOperationsRouter.patch('/pontuation/:id', (request, response) => {
  const { id } = request.user;
  const { pontuation } = request.body;

  console.log(request.body);
});

export default gameOperationsRouter;
