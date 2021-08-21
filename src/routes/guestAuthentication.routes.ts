import { Router } from 'express';
import dtoValidationMiddleware from '@middlewares/dtoValidation';
import { GuestLoginDTO } from '../dto/GuestLoginDTO';
import GuestAuthService from '@services/GuestAuthService';

const guestAuthRouter = Router();


guestAuthRouter.post('/', dtoValidationMiddleware(GuestLoginDTO), async (request, response) => {
  const { guestName } = request.body;
  const { user, accessToken } = await GuestAuthService.createGuestAccount(guestName);

  response.status(200).json({
    ...user,
    accessToken,
    refreshToken: user.refreshToken
  });
});

export default guestAuthRouter;
