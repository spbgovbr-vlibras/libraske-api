import uploadConfig from '../config/multer/uploadConfig';
import SenderMessageService from '../services/SenderMessageService';
import ScoresService from '../services/ScoresService'
import { Router } from 'express';
import multer from 'multer';
import environment from '../environment/environment';
import GameSessionService from '../services/GameSessionService';
import CalculateCredits from '../utils/CalculateCredits';
import UsersService from '../services/UsersService';
import AppError from '../errors/AppError';
import { IScore } from '../services/GameSessionService';
import { GAME_IMAGES_STORAGE } from '@config/applicationFolders';

const gameOperationsRouter = Router();

const uploadFrame = multer(uploadConfig({ folder: GAME_IMAGES_STORAGE }));

gameOperationsRouter.post(
  '/frame/:idSession',
  uploadFrame.single('frame'),
  async (request, response) => {
    const { idSession } = request.params;
    const { idFrame } = request.body;

    // GAMBIARRA PRA APRESENTACAO
    const sessionByUser = await GameSessionService.findGameSessionByUserId(request.user.id) as any;
    const sessionId = sessionByUser[0].max;
    const { song_id } = await GameSessionService.findGameSession(parseInt(sessionId));

    const sendMessageService = new SenderMessageService();
    const frameImageFilename = request?.file?.filename;

    if (!frameImageFilename) {
      throw new AppError("Image was not sent", 400);
    }

    await sendMessageService.execute({
      idSession: sessionId,
      idFrame,
      frameImageFilename,
      songId: song_id
    });

    return response.sendStatus(201);
  },
);

gameOperationsRouter.post(
  '/pontuation/session',
  async (request, response) => {
    const { idSong } = request.body;

    const { id } = await GameSessionService.createGameSession({
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
    const intId = parseInt(id);
    const bonusValue = parseInt(environment.BONUS_VALUE);

    // Finalizando a GameSession
    const { gameSession, sessionScore } = await GameSessionService.closeGameSession({ id: intId });

    // Criando Score
    await ScoresService.createScore({ id: intId, sessionScore });

    // Verificando quantas vezes foram jogadas
    const timesPlayed = await GameSessionService.countByUserIdAndSongId(gameSession.user_id, gameSession.song_id);

    // Calculando créditos do usuário
    const { score, bonusValue: bonus } = CalculateCredits(timesPlayed, sessionScore, bonusValue);

    // Atualizando dados do usuário
    const { credit } = await UsersService.changeCredit({ creditsToChange: score, user: request.user });

    return response.status(201).json({ credit, finalPontuation: score, bonus });
  },
);

gameOperationsRouter.get(
  '/pontuation/session/:id',
  async (request, response) => {
    const { id } = request.params;

    const pontuation = await ScoresService.getScoreBySession(parseInt(id));

    return response.json({ sessionScore: pontuation.sessionScore });
  },
);

gameOperationsRouter.get("/:id/pontuation", async (request, response) => {
  const { id } = request.params;
  const pontuationData: IScore = await GameSessionService.getScore(parseInt(id));
  return response.status(200).json(pontuationData);
});

export default gameOperationsRouter;
