import TokenService from '../services/TokenService';
import User from '../models/User';
import { createConnection, getConnection, Entity, getRepository } from 'typeorm';
import faker from 'faker';
import jwt from 'jsonwebtoken'

const TokenServiceMock = TokenService as jest.Mocked<typeof TokenService>;

interface IJwtToken {
    cpf: string;
    iat: string;
    exp: string;
}

const setupFactory = () => {
    const cpf = "12345678900";
    const accessToken = '000000000';

    return {
        cpf,
        accessToken,
        refreshToken: TokenServiceMock.createRefreshToken({ cpf }),
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        profilePhoto: faker.internet.url(),
        name: faker.name.firstName(),
    }
}


describe('Token Service', () => {

    it('should create a token once and return correct value', async () => {

        const { cpf, accessToken } = setupFactory();

        TokenServiceMock.createToken.mockReturnValue(accessToken);
        TokenServiceMock.createToken({ cpf });

        expect(TokenServiceMock.createToken).toHaveBeenCalledTimes(1);
        expect(TokenServiceMock.createToken).toHaveReturnedWith(accessToken);
    })

    it('should create a refresh token once and return correct value', async () => {

        const { cpf, refreshToken } = setupFactory();

        TokenServiceMock.createRefreshToken.mockReturnValue(refreshToken);
        TokenServiceMock.createRefreshToken({ cpf });

        expect(TokenServiceMock.createRefreshToken).toHaveBeenCalledTimes(1);
        expect(TokenServiceMock.createRefreshToken).toHaveReturnedWith(refreshToken);
    })


    it.only('should update an access token', async () => {

        await createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User],
            synchronize: true,
            logging: false
        })

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
        const decodedToken = jwt.decode(newAccessToken) as IJwtToken;

        expect(cpf).toBe(decodedToken['cpf']);
    })

})

