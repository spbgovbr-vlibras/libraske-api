import PersonalizationGroup from '@models/PersonalizationGroup';
import { getRepository, Repository } from 'typeorm';
import Personalization from '../models/Personalization';

interface IPersonalizationGroupRepository {
  getInstance(): Repository<PersonalizationGroup>;
}

class PersonalizationGroupRepository implements IPersonalizationGroupRepository {

  async findOneById(id: number): Promise<PersonalizationGroup | undefined> {
    return await this.getInstance().findOne(id);
  }

  async findByPersonalizationId(personalizationId: number): Promise<PersonalizationGroup[]> {
    return await this.getInstance().find({ personalization_id: personalizationId });
  }

  async findAll(): Promise<PersonalizationGroup[]> {
    return await this.getInstance().find();
  }

  getInstance(): Repository<PersonalizationGroup> {
    return getRepository(PersonalizationGroup);
  }
}

export default new PersonalizationGroupRepository();