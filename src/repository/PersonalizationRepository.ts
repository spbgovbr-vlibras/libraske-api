import { getRepository, Repository } from 'typeorm';
import Personalization from '../models/Personalization';

interface IPersonalizationsRepository {

    save(personalization: Personalization): Promise<Personalization>;
    getInstance(): Repository<Personalization>;
}

class PersonalizationsRepository implements IPersonalizationsRepository {
    async save(personalization: Personalization): Promise<Personalization> {
        return await getRepository(Personalization).save(personalization);
    }


    getInstance(): Repository<Personalization> {
        return getRepository(Personalization);
    }
}

export default new PersonalizationsRepository();