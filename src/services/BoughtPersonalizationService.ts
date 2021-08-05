import BoughtPersonalization from "@models/BoughtPersonalization";
import AppError from "src/errors/AppError";
import BoughtPersonalizationRepository from "src/repositories/BoughtPersonalizationRepository";
import { groupBy } from 'lodash';



class BoughtPersonalizationService {

  async addBoughtPersonalization(boughtPersonalization: BoughtPersonalization) {
    return await BoughtPersonalizationRepository.addBoughtPersonalization(boughtPersonalization);
  }

  async checkAlreadyPurchased(userId: number, personalizationGroup: number, personalizationId: number) {

    const amount = await BoughtPersonalizationRepository.checkAlreadyPurchased(userId, personalizationGroup);
    const defaultPersonalization = [1, 2]; // Pele e Olhos

    console.log(defaultPersonalization.includes(personalizationId), personalizationId);


    if (amount > 0 || defaultPersonalization.includes(personalizationId)) {
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