import { getRepository, Repository } from 'typeorm';
import Personalization from '../models/Personalization';

interface IPersonalizationsRepository {

    findOne(id: number): Promise<Personalization | undefined>;
    save(personalization: Personalization): Promise<Personalization>;
    findAll(): Promise<Personalization[]>;
    getInstance(): Repository<Personalization>;
}

class PersonalizationsRepository implements IPersonalizationsRepository {

    async findOne(id: number): Promise<Personalization | undefined> {
        return await getRepository(Personalization).findOne(id, {
            select: ['id', 'name', 'description', 'price']
        });
    }

    async save(personalization: Personalization): Promise<Personalization> {
        return await getRepository(Personalization).save(personalization);
    }

    async findAll(): Promise<Personalization[]> {
        return await this.getInstance().find({
            select: ['id', 'name', 'description', 'price']
        })
    }

    getInstance(): Repository<Personalization> {
        return getRepository(Personalization);
    }
}

export default new PersonalizationsRepository();