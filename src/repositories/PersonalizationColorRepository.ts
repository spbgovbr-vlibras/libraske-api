import { AppDataSource } from 'src/database';
import PersonalizationColor from '../models/PersonalizationColor';
import { Repository } from 'typeorm';

interface ColorsByPersonalization {
  personalizationId: number;
  personalizationGroupId: number;
  price: number;
  isDefault: boolean;
  code: string;
}
interface IPersonalizationColorRepository {
  findOneById(id: number): Promise<PersonalizationColor | undefined>;
  findAll(): Promise<PersonalizationColor[]>;
  getInstance(): Repository<PersonalizationColor>;
}

class PersonalizationColorRepository implements IPersonalizationColorRepository {
  private readonly ormRepository: Repository<PersonalizationColor>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(PersonalizationColor);
  }

  async findOneById(id: number): Promise<PersonalizationColor | undefined> {
    return (await this.getInstance().findOne({ where: { personalizationGroup: { id } } })) ?? undefined;
  }

  async findAll(): Promise<PersonalizationColor[]> {
    return await this.getInstance().find();
  }

  async findColorsByPersonalization(personalizationId: number): Promise<ColorsByPersonalization> {
    const query = `select 
                            p.id as personalizationId, 
                            pg.id as personalizationGroupId,
                            pg.price,
                            pc."isDefault",
                            pc.code
                        from personalizations p 
                        inner join personalization_group pg on p.id = pg.personalization_id 
                        inner join personalization_color pc on pc.personalization_group_id = pg.id 
                        where p.id = ${personalizationId}`;

    return await this.getInstance().query(query);
  }

  getInstance(): Repository<PersonalizationColor> {
    return this.ormRepository;
  }
}

export default new PersonalizationColorRepository();