import dtoValidationMiddleware from '@middlewares/dtoValidation';
import Personalization from '@models/Personalization';
import User from '@models/User';
import PersonalizationService from '@services/PersonalizationService';
import { Router } from 'express';
import { PersonalizationSaveDTO } from '../dto/PersonalizationSaveDTO';

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

personalizationsRouter.get('/', async (request, response) => {

    const result = await PersonalizationService.findAll();

    response.status(200).json(result);

})

personalizationsRouter.get('/:id', async (request, response) => {

    const { id } = request.params;
    const intId = parseInt(id);

    const result = await PersonalizationService.findById(intId);

    response.status(200).json(result);

})

export default personalizationsRouter;