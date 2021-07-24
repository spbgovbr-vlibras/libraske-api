import jwt from 'jsonwebtoken';
import { createConnection, getConnection } from 'typeorm';
import env, { loadEnvironments } from '../src/environment/environment';
import User from '../src/models/User';
import UsersRepository from '../src/repository/UsersRepository';
import TokenService from '../src/services/TokenService';
import UsersService from '../src/services/UsersService';
import DataGenerator from '../src/utils/DataGenerator';
interface IJwtToken {
    cpf: string;
    iat: string;
    exp: string;
}

jest.mock('../src/services/UsersService')

const mockedUsersService = UsersService as jest.Mocked<typeof UsersService>;

describe('Token Service', () => {

    const setupFactory = () => {
        const cpf = DataGenerator.getUnformattedCpf();

        return {
            cpf,
            refreshToken: TokenService.createRefreshToken({ cpf }),
            id: DataGenerator.getUUID(),
            email: DataGenerator.getEmail(),
            profilePhoto: DataGenerator.getUrl(),
            name: DataGenerator.getFirstName(),
            credit: 0
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

        const { cpf, refreshToken, profilePhoto, name, email } = setupFactory();

        await UsersRepository.getInstance().insert({
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken,
            credit: 0
        })

        const newAccessToken = await TokenService.updateToken(refreshToken);
        const { cpf: decodedCpf } = jwt.decode(newAccessToken) as IJwtToken;

        expect(decodedCpf).not.toBeNull();
        expect(decodedCpf).toBeDefined();
        expect(cpf).toBe(decodedCpf);
    })

    it('should remove a refresh token', async () => {

        const cpf = DataGenerator.getUnformattedCpf();
        const { refreshToken, profilePhoto, name, email, credit } = setupFactory();

        mockedUsersService.findUserByCpfOrId.mockClear();
        mockedUsersService.findUserByCpfOrId.mockResolvedValueOnce({ name, cpf, refreshToken, email, credit, profilePhoto } as User);

        TokenService.UserService = mockedUsersService;

        await UsersRepository.getInstance().insert({
            name,
            email,
            profilePhoto,
            cpf,
            refreshToken,
            credit: 0
        })

        await TokenService.deleteToken(refreshToken);

        expect(mockedUsersService.findUserByCpfOrId).toBeCalledTimes(1);
        expect(mockedUsersService.updateUser).toBeCalledTimes(1);
        expect(mockedUsersService.updateUser).toHaveBeenCalledWith({ name, cpf, email, credit, profilePhoto, refreshToken: null });


    })

    it('should fail when token expires', async () => {

        env['REFRESH_TOKEN_EXPIRATION'] = '0s';

        const cpf = DataGenerator.getUnformattedCpf();
        const refreshToken = TokenService.createRefreshToken({ cpf });

        try {
            TokenService.verifyRefreshToken(refreshToken);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message.toLowerCase()).toContain("expirou");
        }
    })

    it('should fail when a valid token is not passed', async () => {

        try {
            TokenService.verifyRefreshToken(DataGenerator.getFirstName());
        } catch (error) {
            expect(error.statusCode).toBe(403);
            expect(error.message.toLowerCase()).toContain("inválido");
        }

    })

})

