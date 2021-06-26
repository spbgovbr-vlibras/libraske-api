import { createConnection, getConnection, getRepository, SimpleConsoleLogger } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import ConsultUserService from '../services/ConsultUserService';
import { unformattedCpfFactory } from '../utils/CPFFactory';
import TokenService from '../services/TokenService';
import { emailFactory, firstNameFactory, profilePhotoUrlFactory, uuidFactory } from '../utils/UsersInformationsFactory'


describe('Users Service', () => {

    const setupFactory = () => {
        const cpf = unformattedCpfFactory();

        return {
            cpf,
            refreshToken: TokenService.createRefreshToken({ cpf }),
            email: emailFactory(),
            profilePhoto: profilePhotoUrlFactory(),
            name: firstNameFactory(),
        }
    }

    beforeAll(() => {
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User],
            synchronize: true,
            logging: false,
        })
    })

    afterAll(() => {
        const connection = getConnection();
        return connection.close();
    })

    afterEach(() => {
        const userRepository = getRepository(User);
        return userRepository.delete({});
    })

    it('should create a new user', async () => {

        const userRepository = getRepository(User);
        const { cpf, refreshToken, email, profilePhoto, name } = setupFactory();

        const allUsersBeforeCreation = await userRepository.find();

        const createdUser = await CreateUserService.execute({
            cpf, refreshToken, email, profilePhoto, name
        })

        const allUsersAfterCreation = await userRepository.find();

        expect(allUsersBeforeCreation.length).toBe(0);
        expect(allUsersAfterCreation.length).toBe(1);
        expect(createdUser).not.toBeNull();
        expect(createdUser).toBeDefined();
        expect(createdUser.cpf).toBe(cpf);
        expect(createdUser.refreshToken).toBe(refreshToken);
        expect(createdUser.email).toBe(email);
        expect(createdUser.name).toBe(name);
        expect(createdUser.profilePhoto).toBe(profilePhoto);

    })

    it('should find a user by cpf', async () => {

        const { cpf, refreshToken, email, profilePhoto, name } = setupFactory();

        const createdUser = await CreateUserService.execute({
            cpf, refreshToken, email, profilePhoto, name
        })

        const user = await ConsultUserService.execute({ cpf });

        expect(user).not.toBeNull();
        expect(user).toBeDefined();
        expect(user?.cpf).toBe(createdUser.cpf);
        expect(user?.refreshToken).toBe(createdUser.refreshToken);
        expect(user?.email).toBe(createdUser.email);
        expect(user?.name).toBe(createdUser.name);
        expect(user?.profilePhoto).toBe(createdUser.profilePhoto);

    })

    it('should find a user by id', async () => {

        const { cpf, refreshToken, email, profilePhoto, name } = setupFactory();

        const createdUser = await CreateUserService.execute({
            cpf, refreshToken, email, profilePhoto, name
        })

        const user = await ConsultUserService.execute({ id: createdUser.id });

        expect(user).not.toBeNull();
        expect(user).toBeDefined();
        expect(user?.cpf).toBe(cpf);
        expect(user?.refreshToken).toBe(refreshToken);
        expect(user?.email).toBe(email);
        expect(user?.name).toBe(name);
        expect(user?.profilePhoto).toBe(profilePhoto);

    })

    it('should update an user', async () => {

        const firstUser = setupFactory();
        const secondUser = setupFactory();

        const oldUser = await CreateUserService.execute({
            cpf: firstUser.cpf,
            email: firstUser.email,
            name: firstUser.name,
            profilePhoto: firstUser.profilePhoto,
            refreshToken: firstUser.refreshToken
        })

        await UpdateUserService.execute({
            cpf: firstUser.cpf,
            email: secondUser.email,
            name: secondUser.name,
            profilePhoto: secondUser.profilePhoto,
            refreshToken: secondUser.refreshToken
        });

        const updatedUser = await ConsultUserService.execute({ cpf: firstUser.cpf });

        expect(updatedUser?.cpf).toBe(firstUser.cpf);
        expect(oldUser.email).not.toBe(updatedUser?.email)
        expect(oldUser.name).not.toBe(updatedUser?.name)
        expect(oldUser.profilePhoto).not.toBe(updatedUser?.profilePhoto)
        expect(oldUser.email).not.toBe(updatedUser?.email)
        expect(oldUser.email).not.toBe(updatedUser?.email)

    })

    it('should throw an error when not finding a user', async () => {

        try {
            await ConsultUserService.execute({ cpf: unformattedCpfFactory() })
        } catch (error) {
            expect(error.statusCode).toBe(404)
        }

        try {
            await ConsultUserService.execute({ id: uuidFactory() })
        } catch (error) {
            expect(error.statusCode).toBe(404)
        }

    })

})

