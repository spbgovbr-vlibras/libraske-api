import AppError from "../errors/AppError";
import { createConnection, getConnection } from "typeorm";
import User from "../models/User";
import TokenService from "../services/TokenService";
import UsersService from "../services/UsersService";
import DataGenerator from "../utils/DataGenerator";

describe('Users Service', () => {

  const createUser = (id: number, name: string, email: string, profilePhoto: string, cpf: string, refreshToken: string, credit: number): User => {
    return {
      id,
      name,
      email,
      profilePhoto,
      cpf,
      refreshToken,
      credit,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  const getDefaultData = () => {

    const cpf = DataGenerator.getUnformattedCpf();
    const refreshToken = TokenService.createRefreshToken({ cpf });
    const id = DataGenerator.getInteger();
    const email = DataGenerator.getEmail();
    const profilePhoto = DataGenerator.getUrl();
    const name = DataGenerator.getFirstName();
    const credit = DataGenerator.getInteger();

    const defaultUser = createUser(id, name, email, profilePhoto, cpf, refreshToken, credit);

    return {
      cpf,
      refreshToken,
      id,
      email,
      profilePhoto,
      name,
      credit,
      defaultUser
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

  it('should create an user', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });

    expect(createdUser.name).toBe(name);
    expect(createdUser.email).toBe(email);
    expect(createdUser.cpf).toBe(cpf);
    expect(createdUser.profilePhoto).toBe(profilePhoto);
    expect(createdUser.refreshToken).toBe(refreshToken);
    expect(createdUser.credit).toBe(0);
    expect(createdUser.id).toBe(1);

  });

  it('should find a user by id', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });

    const userFound = await UsersService.findUserByCpfOrId({ id: createdUser.id });

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe(userFound.name);
    expect(createdUser.email).toBe(userFound.email);
    expect(createdUser.cpf).toBe(userFound.cpf);
    expect(createdUser.profilePhoto).toBe(userFound.profilePhoto);
    expect(createdUser.refreshToken).toBe(userFound.refreshToken);
    expect(createdUser.credit).toBe(userFound.credit);
    expect(createdUser.id).toBe(userFound.id);
  });

  it('should find a user by cpf', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });

    const userFound = await UsersService.findUserByCpfOrId({ cpf: createdUser.cpf }) as User;

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe(userFound.name);
    expect(createdUser.email).toBe(userFound.email);
    expect(createdUser.cpf).toBe(userFound.cpf);
    expect(createdUser.profilePhoto).toBe(userFound.profilePhoto);
    expect(createdUser.refreshToken).toBe(userFound.refreshToken);
    expect(createdUser.credit).toBe(userFound.credit);
    expect(createdUser.id).toBe(userFound.id);
  });

  it('should update a user', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const { name: name2, email: email2, profilePhoto: profilePhoto2, refreshToken: refreshToken2 } = getDefaultData();

    await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    await UsersService.updateUser({ cpf, name: name2, email: email2, profilePhoto: profilePhoto2, refreshToken: refreshToken2 })
    const updatedUser = await UsersService.findUserByCpfOrId({ cpf });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(name2);
    expect(updatedUser.email).toBe(email2);
    expect(updatedUser.cpf).toBe(cpf);
    expect(updatedUser.profilePhoto).toBe(profilePhoto2);
    expect(updatedUser.refreshToken).toBe(refreshToken2);

  });

  it('should delete a user', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();

    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const beforeDelete = await UsersService.findUserByCpfOrId({ id: createdUser.id });
    await UsersService.deleteUser(createdUser.id);

    try {
      await UsersService.findUserByCpfOrId({ id: createdUser.id });
    } catch (error) {
      expect(beforeDelete).toBeDefined();
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
    }


  });

  it('should check if a user has enough credits.', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });

    const result = await UsersService.checkInsufficientCreditsAndThrow(0, createdUser.id);

    expect(result).toBe(0);

  });

  it('should check if a user does not have enough credits.', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });

    try {
      await UsersService.checkInsufficientCreditsAndThrow(1, createdUser.id);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
    }

  });

  it('should generate an error if it is an unsupported user', async () => {
    try {
      await UsersService.findUserByCpfOrId({});
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(500);
    }
  });

  it('should add credit for a user', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const creditsToAdd = 1234;

    const updatedUser = await UsersService.changeCredit({ creditsToChange: creditsToAdd, user: createdUser });

    expect(updatedUser.name).toBe(createdUser.name);
    expect(updatedUser.email).toBe(createdUser.email);
    expect(updatedUser.cpf).toBe(createdUser.cpf);
    expect(updatedUser.profilePhoto).toBe(createdUser.profilePhoto);
    expect(updatedUser.refreshToken).toBe(createdUser.refreshToken);
    expect(updatedUser.credit).toBe(creditsToAdd);

  });

  it('should remove credit from a user', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const creditsToAdd = 1234;
    const creditsToRemove = 234;
    const finalCredit = creditsToAdd - creditsToRemove;

    await UsersService.changeCredit({ creditsToChange: creditsToAdd, user: createdUser });
    const updatedUser = await UsersService.removeCredit({ creditsToChange: creditsToRemove, user: createdUser });

    expect(updatedUser.name).toBe(createdUser.name);
    expect(updatedUser.email).toBe(createdUser.email);
    expect(updatedUser.cpf).toBe(createdUser.cpf);
    expect(updatedUser.profilePhoto).toBe(createdUser.profilePhoto);
    expect(updatedUser.refreshToken).toBe(createdUser.refreshToken);
    expect(updatedUser.credit).toBe(finalCredit);

  });

  it('should throw an error when there are not enough credits', async () => {

    const { name, email, cpf, profilePhoto, refreshToken } = getDefaultData();
    const createdUser = await UsersService.createUser({ name, email, cpf, profilePhoto, refreshToken });
    const creditsToRemove = 234;

    try {
      await UsersService.removeCredit({ creditsToChange: creditsToRemove, user: createdUser });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(AppError);
    }

  });

})