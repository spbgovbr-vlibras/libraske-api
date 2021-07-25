import { getRepository, Repository } from 'typeorm';
import BoughtPersonalization from '../models/BoughtPersonalization';

interface BoughtIPersonalizationRepository {

    addBoughtPersonalization(boughtPersonalization: BoughtPersonalization): Promise<BoughtPersonalization>
    findByUserId(userId: number): Promise<BoughtPersonalization[]>;
    existsBySongIdAndUserId(userId: number, songId: number): Promise<boolean>;
    countByPersonalizationIdAndUserId(userId: number, personalizationId: number): Promise<number>;
    getInstance(): Repository<BoughtPersonalization>;
}

class BoughtPersonalizationRepository implements BoughtIPersonalizationRepository {

    async countByPersonalizationIdAndUserId(userId: number, personalizationGroupId: number): Promise<number> {
        return await this.getInstance().count({
            user_id: userId,
            personalization_group_id: personalizationGroupId
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

    async checkAlreadyPurchased(userId: number, personalizationGroupId: number): Promise<number> {
        return await this.getInstance().count({ user_id: userId, personalization_group_id: personalizationGroupId });
    }

    async removeActivePersonalizationByPersonalizationandUser(personalizationId: number, userId: number): Promise<BoughtPersonalization> {
        const query = ` update "boughtPersonalization"
                        set "isActive" = false 
                        from "boughtPersonalization" bp 
                        inner join personalization_group pg on pg.id = bp."personalization_group_id"
                        inner join personalizations p on p.id = pg."personalization_id"
                        where pg."personalization_id" = ${personalizationId} and p.user_id = ${userId}`

        return await this.getInstance().query(query);
    }

    async findBoughtPersonalization(userId: number): Promise<BoughtPersonalization> {
        const query = ` select 
                            p.id as personalization_id, 
                            pg.id as personalization_group_id,
                            pg."name", 
                            pg.price,
                            pc."isDefault",
                            pc.code
                        from personalizations p 
                        inner join personalization_group pg on p.id = pg.personalization_id 
                        inner join personalization_color pc on pc.personalization_group_id = pg.id 
                        inner join "boughtPersonalization" bp on bp.personalization_group_id = pg.id
                        where p.user_id = ${userId}
                        order by p.id, pg.id`

        return await this.getInstance().query(query);
    }

    getInstance(): Repository<BoughtPersonalization> {
        return getRepository(BoughtPersonalization);
    }

}

export default new BoughtPersonalizationRepository();