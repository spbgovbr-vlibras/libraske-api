import BoughtPersonalizationService from '@services/BoughtPersonalizationService';
import { Router } from 'express';

const boughtPersonalizationRouter = Router();

boughtPersonalizationRouter.get("/", async (request, response) => {

    const user = request.user;
    const res = await BoughtPersonalizationService.getAvailablePersonalization(user.id);

    response.json(res);
});


export default boughtPersonalizationRouter;