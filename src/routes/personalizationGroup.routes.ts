import PersonalizationGroupService from '../services/PersonalizationGroupService';
import { Router } from 'express';

const personalizationGroupRouter = Router();

personalizationGroupRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await PersonalizationGroupService.findAllByPersonalizationId(parseInt(id));

  return response.status(200).json(result)
})

personalizationGroupRouter.get('/', async (request, response) => {
  return response.status(200).json(await PersonalizationGroupService.findAll())
})

export default personalizationGroupRouter;