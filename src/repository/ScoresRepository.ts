import { getRepository } from 'typeorm';
import Scores from '../models/Scores';

const getInstance = () => {
    return getRepository(Scores);
}

export default {
    getInstance
}