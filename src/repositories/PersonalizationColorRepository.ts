import { getRepository, Repository } from 'typeorm';
import Personalization from '../models/Personalization';

interface ColorsByPersonalization {
  personalizationId: number;
  personalizationGroupId: number;
  price: number;
  isDefault: boolean;
  code: string;
}
interface IPersonalizationColorRepository {
  getInstance(): Repository<Personalization>;
}

class PersonalizationColorRepository implements IPersonalizationColorRepository {
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

  getInstance(): Repository<Personalization> {
    return getRepository(Personalization);
  }
}

export default new PersonalizationColorRepository();