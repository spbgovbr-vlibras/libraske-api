import dtoValidationMiddleware from '@middlewares/dtoValidation';
import Personalization from '@models/Personalization';
import User from '@models/User';
import PersonalizationService from '@services/PersonalizationService';
import { Router } from 'express';
import { PersonalizationSaveDTO } from 'src/dto/PersonalizationSaveDTO';

const personalizationsRouter = Router();

personalizationsRouter.post('/', dtoValidationMiddleware(PersonalizationSaveDTO), async (request, response) => {

    const user = request.user as User;
    const { name, description, price } = request.body;
    const personalization = {
        user_id: user.id,
        name,
        description,
        price
    } as Personalization;

    const result = await PersonalizationService.createPersonalization(personalization);

    return response.status(201).json({ ...result })

})

export default personalizationsRouter;