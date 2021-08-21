import PersonalizationGroup from "../models/PersonalizationGroup";
import AppError from "../errors/AppError";
import PersonalizationGroupRepository from '../repositories/PersonalizationGroupRepository'

class PersonalizationGroupService {

  async findOneById(id: number): Promise<PersonalizationGroup> {

    const group = await PersonalizationGroupRepository.findOneById(id);

    if (!group) {
      throw new AppError('Personalization group not found', 404);
    }

    return group;
  }

  async findAllByPersonalizationId(personalizationId: number) {
    return await PersonalizationGroupRepository.findByPersonalizationId(personalizationId);
  }

  async findAll() {
    return await PersonalizationGroupRepository.findAll();
  }

}

export default new PersonalizationGroupService();
