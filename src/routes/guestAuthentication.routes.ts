import { Router } from 'express';
import dtoValidationMiddleware from '../middlewares/dtoValidation';
import { GuestLoginDTO } from '../dto/GuestLoginDTO';
import GuestAuthService from '../services/GuestAuthService';
import AppError from '../errors/AppError';

const guestAuthRouter = Router();


guestAuthRouter.post('/', dtoValidationMiddleware(GuestLoginDTO), async (request, response) => {
  const { guestName } = request.body;

  let user;
  let accessToken;

  try {
    ({ user, accessToken } = await GuestAuthService.createGuestAccount(guestName));
  } catch (error) {
    console.error(error);
    throw new AppError('Não foi possível criar a conta de convidado.', 400);
  }

  response.status(200).json({
    ...user,
    accessToken,
    refreshToken: user.refreshToken
  });
});

export default guestAuthRouter;
