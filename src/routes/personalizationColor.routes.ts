import PersonalizationColorService from '../services/PersonalizationColorService';
import { Router } from 'express';

const personalizationColor = Router();

personalizationColor.get('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await PersonalizationColorService.findAllByPersonalizationId(parseInt(id));

  return response.status(200).json(result)
})

personalizationColor.get('/', async (request, response) => {
  return response.status(200).json(await PersonalizationColorService.findAll())
})


personalizationColor.get('/personalization/:id', async (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);

  return response.status(200).json(await PersonalizationColorService.findAllColorsByPersonalization(intId))
})

export default personalizationColor;