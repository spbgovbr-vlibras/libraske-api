import { AppDataSource } from 'src/database';
import PersonalizationGroup from '../models/PersonalizationGroup';
import { Repository } from 'typeorm';

interface IPersonalizationGroupRepository {
  getInstance(): Repository<PersonalizationGroup>;
}

class PersonalizationGroupRepository implements IPersonalizationGroupRepository {
  private readonly ormRepository: Repository<PersonalizationGroup>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(PersonalizationGroup);
  }

  async findOneById(id: number): Promise<PersonalizationGroup | undefined> {
    return (await this.getInstance().findOne({ where: { id } })) ?? undefined;
  }

  async findByPersonalizationId(personalizationId: number): Promise<PersonalizationGroup[]> {
    return await this.getInstance().find({ where: { personalization_id: personalizationId } });
  }

  async findAll(): Promise<PersonalizationGroup[]> {
    return await this.getInstance().find();
  }

  getInstance(): Repository<PersonalizationGroup> {
    return this.ormRepository;
  }
}

export default new PersonalizationGroupRepository();