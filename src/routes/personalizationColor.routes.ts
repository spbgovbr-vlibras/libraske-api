import PersonalizationColorService from '../services/PersonalizationColorService';
import { Router } from 'express';
import PersonalizationGroupService from '@services/PersonalizationGroupService';
import UsersService from '@services/UsersService';
import BoughtPersonalization from '@models/BoughtPersonalization';
import BoughtPersonalizationService from '@services/BoughtPersonalizationService';
import AppError from 'src/errors/AppError';
import PersonalizationColor from '@models/PersonalizationColor';

const personalizationColor = Router();

const PELE = 1, OLHOS = 2;

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
  const user = request.user;

  const personalizationGroupIds = await BoughtPersonalizationService.getAvailablePersonalizationIds(user.id);
  const allColorsByPersonalization = await PersonalizationColorService.findAllColorsByPersonalization(intId);

  console.log(personalizationGroupIds);


  const isColorUnlocked = (color: PersonalizationColor): boolean => {
    return color.id >= 1 && color.id <= 100 || personalizationGroupIds.includes(color.personalization_group_id)
  }

  const allColorsWithUnlockValue = allColorsByPersonalization.map((color: PersonalizationColor) => {
    return {
      ...color,
      isUnlocked: isColorUnlocked(color)
    }
  })



  return response.status(200).json(allColorsWithUnlockValue)
})

personalizationColor.post('/:id/activate', async (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);
  const user = request.user;


  const personalizationColor = await PersonalizationColorService.findOneById(intId);
  const personalizationGroup = await PersonalizationGroupService.findOneById(personalizationColor.personalization_group_id);
  const personalization = personalizationGroup.personalization;
  const boughtPersonalization = await BoughtPersonalizationService.getAvailablePersonalization(user.id);
  const boughtPersonalizationByPersonalizationId = boughtPersonalization[`${personalization.id}`]

  console.log(boughtPersonalizationByPersonalizationId);


  if (boughtPersonalizationByPersonalizationId == undefined && (personalization.id != PELE && personalization.id != OLHOS)) {
    throw new AppError("Personalization not purchased.", 400);
  }
  await UsersService.activateColor(user.id, personalization.name, personalizationColor.code);

  return response.status(200).json()
})




export default personalizationColor;