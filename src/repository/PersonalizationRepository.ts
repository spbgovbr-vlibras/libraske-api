import { getRepository, Repository } from 'typeorm';
import Personalization from '../models/Personalization';

interface IPersonalizationsRepository {

    findOne(id: number): Promise<Personalization | undefined>;
    save(personalization: Personalization): Promise<Personalization>;
    getInstance(): Repository<Personalization>;
}

class PersonalizationsRepository implements IPersonalizationsRepository {

    async findOne(id: number): Promise<Personalization | undefined> {
        return await getRepository(Personalization).findOne(id);
    }

    async save(personalization: Personalization): Promise<Personalization> {
        return await getRepository(Personalization).save(personalization);
    }

    getInstance(): Repository<Personalization> {
        return getRepository(Personalization);
    }
}

export default new PersonalizationsRepository();