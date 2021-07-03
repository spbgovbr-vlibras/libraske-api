import { getRepository } from 'typeorm';
import Users from '../models/User';

const getInstance = () => {
    return getRepository(Users);
}

export default {
    getInstance
}