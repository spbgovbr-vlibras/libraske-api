import UsersService from '../services/UsersService';
import User from '../models/User';
import { Router } from 'express';

const userRouter = Router();

function maskCpf(cpf: string): string {
  if (!cpf || cpf.length < 2) {
    return '***.***.***-**';
  }

  return `***.***.***-${cpf.slice(-2)}`;
}

function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    cpf: maskCpf(user.cpf),
    credit: user.credit,
    isGuest: user.isGuest,
    pele: user.pele,
    olhos: user.olhos,
    cabelo: user.cabelo,
    camisa: user.camisa,
    calca: user.calca,
  };
}

userRouter.delete('', async (request, response) => {

  const result = await UsersService.deleteUser(request.user.id);

  response.json(result);

})

userRouter.get('', async (request, response) => {
  return response.json(toPublicUser(request.user));
});

export default userRouter;