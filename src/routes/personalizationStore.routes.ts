import dtoValidationMiddleware from "@middlewares/dtoValidation";
import User from "@models/User";
import BoughtPersonalizationService from "@services/BoughtPersonalizationService";
import PersonalizationGroupService from "@services/PersonalizationGroupService";
import UsersService from "@services/UsersService";
import { Router } from "express";
import { BoughtPersonalizationBuyDTO } from "src/dto/BoughtPersonalizationBuyDTO";
import BoughtPersonalizationRepository from "src/repositories/BoughtPersonalizationRepository";
import UsersRepository from "src/repositories/UsersRepository";
import { getConnection } from "typeorm";

const boughtPersonalizationRouter = Router();

boughtPersonalizationRouter.post('/personalizations-group/:id', dtoValidationMiddleware(BoughtPersonalizationBuyDTO), async (request, response) => {
  const { id } = request.params;
  const { isActive } = request.body;
  const user = request.user as User;

  // TODO Recuperar o preço correto
  const personalizationGroupId = parseInt(id);
  const personalizationGroup = await PersonalizationGroupService.findOneById(personalizationGroupId);

  await BoughtPersonalizationService.checkAlreadyPurchased(user.id, personalizationGroup.id, personalizationGroup.personalization_id);
  const credit = await UsersService.checkInsufficientCreditsAndThrow(personalizationGroup.price, user.id);

  const updatedUser = UsersRepository.getInstance().create({
    ...user, credit
  });

  const boughtpersonalization = BoughtPersonalizationRepository.getInstance().create({
    personalization_group_id: personalizationGroupId,
    user_id: user.id,
    isActive,
  });

  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  let err;

  if (isActive) {
    await BoughtPersonalizationService.removeActivePersonalizationByPersonalizationandUser(personalizationGroup.personalization_id, user.id);
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