import User from '@models/User';
import AppError from 'src/errors/AppError';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import BoughtPersonalization from '../models/BoughtPersonalization';

interface BoughtIPersonalizationRepository {

    addBoughtPersonalization(boughtPersonalization: BoughtPersonalization): Promise<BoughtPersonalization>
    findByUserId(userId: number): Promise<BoughtPersonalization[]>;
    existsBySongIdAndUserId(userId: number, songId: number): Promise<boolean>;
    countByPersonalizationIdAndUserId(userId: number, personalizationId: number): Promise<number>;
    getInstance(): Repository<BoughtPersonalization>;
}

class BoughtPersonalizationRepository implements BoughtIPersonalizationRepository {

    async countByPersonalizationIdAndUserId(userId: number, personalizationId: number): Promise<number> {
        return await this.getInstance().count({
            user_id: userId,
            personalization_id: personalizationId
        })
    }

    async addBoughtPersonalization(boughtPersonalization: BoughtPersonalization): Promise<BoughtPersonalization> {
        return await this.getInstance().save(boughtPersonalization);
    }

    async findByUserId(userId: number): Promise<BoughtPersonalization[]> {
        return await this.getInstance().find({ user_id: userId });
    }

    async existsBySongIdAndUserId(userId: number, personalizationId: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async checkAlreadyPurchased(userId: number, personalizationId: number, color: string): Promise<number> {
        return await this.getInstance().count({ user_id: userId, personalization_id: personalizationId, color });
    }

    async removeActivePersonalizationByPersonalizationandUser(personalizationId: number, userId: number): Promise<BoughtPersonalization> {
        return await this.getInstance().query(` update "boughtPersonalization" 
                                                set "isActive" = false 
                                                where personalization_id = ${personalizationId} and user_id = ${userId}`)
    }

    async findBoughtPersonalization(userId: number): Promise<BoughtPersonalization> {
        return await this.getInstance().query(` select bp.personalization_id, bp.color, bp."isActive" from personalizations p 
                                                inner join "boughtPersonalization" bp on bp.personalization_id = p.id 
                                                where bp.user_id = ${userId}
                                                order by bp.personalization_id `)
    }

    getInstance(): Repository<BoughtPersonalization> {
        return getRepository(BoughtPersonalization);
    }

}

export default new BoughtPersonalizationRepository();