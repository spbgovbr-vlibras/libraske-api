import BoughtPersonalization from "@models/BoughtPersonalization";
import AppError from "src/errors/AppError";
import BoughtPersonalizationRepository from "src/repository/BoughtPersonalizationRepository";
import { groupBy } from 'lodash';



class BoughtPersonalizationService {

    async addBoughtPersonalization(boughtPersonalization: BoughtPersonalization) {
        return await BoughtPersonalizationRepository.addBoughtPersonalization(boughtPersonalization);
    }

    async checkAlreadyPurchased(userId: number, personalizationId: number, color: string) {

        const amount = await BoughtPersonalizationRepository.checkAlreadyPurchased(userId, personalizationId, color);

        if (amount > 0) {
            throw new AppError("Personalization for this color has already been purchased.", 400)
        }

        return amount;
    }

    async removeActivePersonalizationByPersonalizationandUser(personalizationId: number, userId: number) {
        await BoughtPersonalizationRepository.removeActivePersonalizationByPersonalizationandUser(personalizationId, userId);
    }

    async getAvailablePersonalization(userId: number) {

        const allBoughtPersonalization = await BoughtPersonalizationRepository.findBoughtPersonalization(userId);

        return groupBy(allBoughtPersonalization, 'personalization_id');
    }


}

export default new BoughtPersonalizationService();