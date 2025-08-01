import PersonalizationColor from "../models/PersonalizationColor";
import AppError from "../errors/AppError";
import PersonalizationColorRepository from '../repositories/PersonalizationColorRepository'

class PersonalizationColorService {

  async findOneById(id: number): Promise<PersonalizationColor> {

    const group = await PersonalizationColorRepository.findColorById(id);

    if (!group) {
      throw new AppError('Personalization Color not found', 404);
    }

    return group;
  }

  async findAllByPersonalizationId(personalizationId: number) {
    return await PersonalizationColorRepository.getInstance().find({ where: { personalization_group_id: personalizationId } })
  }

  async findAll() {
    return await PersonalizationColorRepository.findAll();
  }

  async findAllColorsByPersonalization(personalizationId: number) {
    return await PersonalizationColorRepository.findAllColorsByPersonalization(personalizationId);
  }

}

export default new PersonalizationColorService();
