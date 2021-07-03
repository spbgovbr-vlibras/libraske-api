import { getRepository } from 'typeorm';
import GameSession from '../models/GameSession';

const getInstance = () => {
    return getRepository(GameSession);
}

export default {
    getInstance
}