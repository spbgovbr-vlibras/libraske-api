import PersonalizationRepository from "src/repository/PersonalizationRepository";
import Personalization from "../models/Personalization";


class PersonalizationService {

    async createPersonalization(personalization: Personalization) {
        return await PersonalizationRepository.save(personalization);
    }

}

export default new PersonalizationService();