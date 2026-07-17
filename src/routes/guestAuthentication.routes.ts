import { Router } from 'express';
import dtoValidationMiddleware from '../middlewares/dtoValidation';
import { GuestLoginDTO } from '../dto/GuestLoginDTO';
import GuestAuthService from '../services/GuestAuthService';
import AppError from '../errors/AppError';

const guestAuthRouter = Router();


guestAuthRouter.post('/', dtoValidationMiddleware(GuestLoginDTO), async (request, response) => {
  const { guestName } = request.body;

  try {
    const { user, accessToken } = await GuestAuthService.createGuestAccount(guestName);

    return response.status(200).json({
      ...user,
      accessToken,
      refreshToken: user.refreshToken
    });
  } catch (error) {
    console.error(error);
    throw new AppError('Não foi possível criar a conta de convidado.', 400);
  }
});

export default guestAuthRouter;
