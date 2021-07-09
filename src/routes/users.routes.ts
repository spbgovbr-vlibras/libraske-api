import UsersService from '@services/UsersService';
import { Router } from 'express';

const userRouter = Router();

userRouter.delete('', async (request, response) => {

    const result = await UsersService.deleteUser(request.user.id);

    response.json(result);

})

export default userRouter;