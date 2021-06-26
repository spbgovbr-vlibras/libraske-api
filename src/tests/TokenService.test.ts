import TokenService from '../services/TokenService';
import User from '../models/User';
import { createConnection, getConnection, getRepository } from 'typeorm';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { unformattedCpfFactory } from '../utils/CPFFactory';
import env, { loadEnvironments } from '../environment/environment';
import { firstNameFactory } from '../utils/UsersInformationsFactory';
interface IJwtToken {
    cpf: string;
    iat: string;
    exp: string;
}

describe('Token Service', () => {

    const setupFactory = () => {
        const cpf = unformattedCpfFactory();

        return {
            cpf,
            refreshToken: TokenService.createRefreshToken({ cpf }),
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            profilePhoto: faker.internet.url(),
            name: faker.name.firstName(),
        }
    }

    beforeAll(() => {
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User],
            synchronize: true,
            logging: false
        })
    })

    afterAll(() => {

        const defaultVariable = loadEnvironments('test')
        env['REFRESH_TOKEN_EXPIRATION'] = defaultVariable['REFRESH_TOKEN_EXPIRATION'];

        const connection = getConnection();
        return connection.close();
    })

    it('should create a token once and return correct value', async () => {

        const { cpf } = setupFactory();

        const result = TokenService.createToken({ cpf });
        const { cpf: decodedCpf } = jwt.decode(result) as IJwtToken;

        expect(decodedCpf).not.toBeNull();
        expect(decodedCpf).toBeDefined();
        expect(cpf).toBe(decodedCpf);
    })

    it('should create a refresh token once and return correct value', async () => {

        const { cpf } = setupFactory();

        const result = TokenService.createRefreshToken({ cpf });
        const { cpf: decodedCpf } = jwt.decode(result) as IJwtToken;

        expect(decodedCpf).not.toBeNull();
        expect(decodedCpf).toBeDefined();
        expect(cpf).toBe(decodedCpf);

    })

    it('should update an access token', async () => {

        const userRepository = getRepository(User);
        const { cpf, refreshToken, profilePhoto, name, email } = setupFactory();

        await userRepository.insert({
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken
        })

        const newAccessToken = await TokenService.updateToken(refreshToken);
        const { cpf: decodedCpf } = jwt.decode(newAccessToken) as IJwtToken;

        expect(decodedCpf).not.toBeNull();
        expect(decodedCpf).toBeDefined();
        expect(cpf).toBe(decodedCpf);
    })

    it('should remove a refresh token', async () => {

        const userRepository = getRepository(User);
        const cpf = unformattedCpfFactory();
        const { refreshToken, profilePhoto, name, email } = setupFactory();

        await userRepository.insert({
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken
        })

        await TokenService.deleteToken(refreshToken);
        const { refreshToken: userRefreshToken } = await userRepository.findOne({ cpf }) as User;

        expect(userRefreshToken).toBeNull();

    })

    it('should fail when token expires', async () => {

        env['REFRESH_TOKEN_EXPIRATION'] = '0s';

        const cpf = unformattedCpfFactory();
        const refreshToken = TokenService.createRefreshToken({ cpf });

        try {
            TokenService.verifyRefreshToken(refreshToken);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message.toLowerCase()).toContain("expirou");
        }
    })

    it('should fail when a valid token is not passed', async () => {

        const cpf = unformattedCpfFactory();
        const refreshToken = TokenService.createRefreshToken({ cpf });

        try {
            TokenService.verifyRefreshToken(firstNameFactory());
        } catch (error) {
            expect(error.statusCode).toBe(403);
            expect(error.message.toLowerCase()).toContain("inválido");
        }

    })

})

