import dtoValidationMiddleware from "@middlewares/dtoValidation";
import BoughtPersonalization from "@models/BoughtPersonalization";
import User from "@models/User";
import BoughtPersonalizationService from "@services/BoughtPersonalizationService";
import PersonalizationService from "@services/PersonalizationService";
import UsersService from "@services/UsersService";
import { Router } from "express";
import { BoughtPersonalizationBuyDTO } from "src/dto/BoughtPersonalizationBuyDTO";
import BoughtPersonalizationRepository from "src/repository/BoughtPersonalizationRepository";
import UsersRepository from "src/repository/UsersRepository";
import { getConnection } from "typeorm";

const boughtPersonalizationRouter = Router();

boughtPersonalizationRouter.post('/personalizations/:id/buy', dtoValidationMiddleware(BoughtPersonalizationBuyDTO), async (request, response) => {

    const { id } = request.params;
    const { color, isActive } = request.body;
    const user = request.user as User;

    const personalization = await PersonalizationService.findById(parseInt(id));

    await BoughtPersonalizationService.checkAlreadyPurchased(user.id, personalization.id, color);
    const credit = await UsersService.checkInsufficientCreditsAndThrow(personalization.price, user.id);

    const updatedUser = UsersRepository.getInstance().create({
        ...user, credit
    });

    const boughtpersonalization = BoughtPersonalizationRepository.getInstance().create({
        personalization_id: personalization.id,
        user_id: user.id,
        color,
        isActive,
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    let err;


    if (isActive) {
        await BoughtPersonalizationService.removeActivePersonalizationByPersonalizationandUser(personalization.id, user.id);
    }

    await queryRunner.startTransaction();

    try {

        await queryRunner.manager.save(updatedUser);
        await queryRunner.manager.save(boughtpersonalization);

        await queryRunner.commitTransaction();
    } catch (error) {
        err = error;
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }

    if (err) {
        throw err;
    }

    response.status(200).send()


})

export default boughtPersonalizationRouter;