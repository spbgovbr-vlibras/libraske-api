import uploadConfig from '../config/multer/uploadConfig';
import { matchesImageSignature } from '../config/multer/validators/FileSignatureValidator';
import SenderMessageService from '../services/SenderMessageService';
import ScoresService from '../services/ScoresService'
import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import environment from '../environment/environment';
import GameSessionService from '../services/GameSessionService';
import CalculateCredits from '../utils/CalculateCredits';
import UsersService from '../services/UsersService';
import AppError from '../errors/AppError';
import { IScore } from '../services/GameSessionService';
import { GAME_IMAGES_STORAGE } from '@config/applicationFolders';

const gameOperationsRouter = Router();

const FRAME_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const uploadFrame = multer(uploadConfig({ folder: GAME_IMAGES_STORAGE, maxFileSizeBytes: FRAME_MAX_FILE_SIZE_BYTES }));

const ensureGameSessionOwnership = async (request: Request, response: Response, next: NextFunction) => {
  const { idSession } = request.params;
  const gameSession = await GameSessionService.findGameSession(parseInt(idSession));

  if (gameSession.user_id !== request.user.id) {
    throw new AppError("You do not have access to this game session", 403);
  }

  request.gameSession = gameSession;
  next();
};

gameOperationsRouter.post(
  '/frame/:idSession',
  ensureGameSessionOwnership,
  uploadFrame.single('frame'),
  async (request, response) => {
    const { idSession } = request.params;
    const { idFrame } = request.body;
    const { multerErrors, file, gameSession } = request;

    const frameIsNotValid = Array.isArray(multerErrors) && multerErrors.some(item => item.errors.length > 0);

    if (frameIsNotValid || !file) {
      if (file) fs.rmSync(file.path, { force: true });
      throw new AppError("Invalid file. Only PNG and JPEG images up to 5MB are allowed.", 400);
    }

    if (!matchesImageSignature(file.path, file.mimetype)) {
      fs.rmSync(file.path, { force: true });
      throw new AppError("File content does not match a valid image.", 400);
    }

    const sendMessageService = new SenderMessageService();
    const frameImageFilename = file.filename;

    await sendMessageService.execute({
      idSession,
      idFrame,
      frameImageFilename,
      songId: gameSession.song_id
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

    return response.status(201).json({ credit, sessionScore: score - bonus, bonus });
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
