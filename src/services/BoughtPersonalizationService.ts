import BoughtPersonalization from "@models/BoughtPersonalization";
import AppError from "src/errors/AppError";
import BoughtPersonalizationRepository from "src/repository/BoughtPersonalizationRepository";
import { groupBy } from 'lodash';



class BoughtPersonalizationService {

    async addBoughtPersonalization(boughtPersonalization: BoughtPersonalization) {
        return await BoughtPersonalizationRepository.addBoughtPersonalization(boughtPersonalization);
    }

    async checkAlreadyPurchased(userId: number, personalizationGroup: number) {

        const amount = await BoughtPersonalizationRepository.checkAlreadyPurchased(userId, personalizationGroup);

        if (amount > 0) {
            throw new AppError("Personalization for this group has already been purchased.", 400)
        }

        return amount;
    }

    async removeActivePersonalizationByPersonalizationandUser(personalizationGroupId: number, userId: number) {
        await BoughtPersonalizationRepository.removeActivePersonalizationByPersonalizationandUser(personalizationGroupId, userId);
    }

    async getAvailablePersonalization(userId: number) {

        const allBoughtPersonalization = await BoughtPersonalizationRepository.findBoughtPersonalization(userId);

        return groupBy(allBoughtPersonalization, 'personalization_id');
    }
}

export default new BoughtPersonalizationService();