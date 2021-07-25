import AppError from "src/errors/AppError";
import PersonalizationRepository from "src/repository/PersonalizationRepository";
import Personalization from "../models/Personalization";


class PersonalizationService {

    async createPersonalization(personalization: Personalization) {
        return await PersonalizationRepository.save(personalization);
    }

    async findById(id: number): Promise<Personalization> {

        const personalization = await PersonalizationRepository.findOne(id);

        if (!personalization) {
            throw new AppError("Personalization not found", 404);
        }

        return personalization;
    }

    async findAll(): Promise<Personalization[]> {
        return await PersonalizationRepository.findAll();
    }

}

export default new PersonalizationService();