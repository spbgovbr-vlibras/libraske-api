import uploadConfig from '@config/uploadConfig';
import CloseGameSessionService from '@services/CloseGameSessionService';
import ConsultGameSessionService from '@services/ConsultGameSessionService';
import CreateGameSessionService from '@services/CreateGameSessionService';
import SenderMessageService from '@services/SenderMessageService';
import ScoresService from '../services/ScoresService'
import { Router } from 'express';
import multer from 'multer';
import environment from 'src/environment/environment';
import GameSessionRepository from 'src/repository/GameSessionRepository';
import GameSessionService from '@services/GameSessionService';
import CalculateCredits from 'src/utils/CalculateCredits';
import UsersService from '@services/UsersService';

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
    const bonusValue = parseInt(environment.BONUS_VALUE);

    // Finalizando a GameSession
    const { gameSession, sessionScore } = await CloseGameSessionService.execute({ id });

    // Criando Score
    await ScoresService.createScore({ id, sessionScore });

    // Verificando quantas vezes foram jogadas
    const timesPlayed = await GameSessionService.countByUserIdAndSongId(gameSession.user_id, gameSession.song_id);

    // Calculando créditos do usuário
    const creditsToChange = CalculateCredits(timesPlayed, sessionScore, bonusValue);

    // Atualizando dados do usuário
    const { credit } = await UsersService.changeCredit({ creditsToChange, user: request.user });

    return response.status(201).json({ credit });
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
