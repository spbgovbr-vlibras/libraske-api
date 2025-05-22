import { Repository } from 'typeorm';
import Personalization from '../models/Personalization';
import { AppDataSource } from 'src/database';

interface IPersonalizationsRepository {

  findOne(id: number): Promise<Personalization | undefined>;
  save(personalization: Personalization): Promise<Personalization>;
  findAll(): Promise<Personalization[]>;
  getInstance(): Repository<Personalization>;
}

class PersonalizationsRepository implements IPersonalizationsRepository {
  private readonly ormRepository: Repository<Personalization>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Personalization);
  }

  async findOne(id: number): Promise<Personalization | undefined> {
    return (await this.getInstance().findOne({
      where: { id },
      select: ['id', 'name', 'description']
    })) ?? undefined;
  }

  async save(personalization: Personalization): Promise<Personalization> {
    return await this.getInstance().save(personalization);
  }

  async findAll(): Promise<Personalization[]> {
    return await this.getInstance().find({
      select: ['id', 'name', 'description']
    })
  }

  getInstance(): Repository<Personalization> {
    return this.ormRepository;
  }
}

export default new PersonalizationsRepository();  