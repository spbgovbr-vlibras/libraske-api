import fs from 'fs';

import { AppDataSource } from '../database';
import AppError from '../errors/AppError';
import Song from '../models/Song';
import User from '../models/User';
import SongsService from '../services/SongsService';
import UsersService from '../services/UsersService';
import DataGenerator from '../utils/DataGenerator';
import {
  clearDatabaseEntities,
  closeTestDatabase,
  initializeTestDatabase,
} from './helpers/testDatabase';

describe('Song Service', () => {
  const setupFactory = () => {
    const cpf = DataGenerator.getUnformattedCpf();

    return {
      cpf,
      idSong: DataGenerator.getInteger(),
      email: DataGenerator.getEmail(),
      profilePhoto: DataGenerator.getUrl(),
      name: DataGenerator.getFirstName(),
      songName: DataGenerator.getFirstName(),
      description: DataGenerator.getSongGenre(),
      singers: DataGenerator.getFirstName(),
      thumbnail: DataGenerator.getRandomFilePath(),
      animation: DataGenerator.getRandomFilePath(),
      song: DataGenerator.getRandomFilePath(),
      subtitle: DataGenerator.getRandomFilePath(),
      trainingAnimation: DataGenerator.getRandomFilePath(),
      trainingPhrase: DataGenerator.getRandomWord(),
      price: DataGenerator.getInteger(),
    };
  };

  beforeAll(async () => {
    await initializeTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  afterEach(async () => {
    await clearDatabaseEntities([Song, User]);
  });

  it('should create a song', async () => {
    const {
      cpf,
      email,
      songName,
      profilePhoto,
      idSong,
      description,
      singers,
      thumbnail,
      animation,
      song,
      subtitle,
      name,
      price,
      trainingAnimation,
      trainingPhrase,
    } = setupFactory();

    const user = await UsersService.createUser({
      cpf,
      email,
      profilePhoto,
      name,
      refreshToken: null,
      isGuest: false,
    });

    const createdSong = await SongsService.createSong({
      idSong,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name: songName,
      price,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
    });

    expect(createdSong.id).toBe(idSong);
    expect(createdSong.user_id).toBe(user.id);
    expect(createdSong.description).toBe(description);
    expect(createdSong.singers).toBe(singers);
    expect(createdSong.thumbnail).toBe(thumbnail);
    expect(createdSong.subtitle).toBe(subtitle);
    expect(createdSong.name).toBe(songName);
    expect(createdSong.price).toBe(price);
  });

  it('should return a list of songs', async () => {
    const {
      cpf,
      email,
      songName,
      profilePhoto,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name,
      price,
      trainingAnimation,
      trainingPhrase,
    } = setupFactory();
    const firstIdSong = 0;
    const secondIdSong = 1;

    const user = await UsersService.createUser({
      cpf,
      email,
      profilePhoto,
      name,
      refreshToken: null,
      isGuest: false,
    });

    await SongsService.createSong({
      idSong: firstIdSong,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      animation,
      song,
      subtitle,
      name: songName,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
      price,
    });

    await SongsService.createSong({
      idSong: secondIdSong,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      animation,
      song,
      subtitle,
      name: songName,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
      price,
    });

    const listOfSongs = await SongsService.listSongs();

    expect(listOfSongs).toBeDefined();
    expect(listOfSongs).not.toBeNull();
    expect(listOfSongs.length).toBe(2);
    expect(listOfSongs[0].id).toBe(firstIdSong);
    expect(listOfSongs[1].id).toBe(secondIdSong);
  });

  it('should find a song by id', async () => {
    const id = DataGenerator.getInteger();
    const {
      cpf,
      email,
      songName,
      profilePhoto,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name,
      price,
      trainingAnimation,
      trainingPhrase,
    } = setupFactory();

    const user = await UsersService.createUser({
      cpf,
      email,
      profilePhoto,
      name,
      refreshToken: null,
      isGuest: false,
    });
    await SongsService.createSong({
      idSong: id,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name: songName,
      price,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
    });

    const song1 = await SongsService.findById({ id });

    expect(song1).not.toBeNull();
    expect(song1).toBeDefined();
    expect(song1).toBeInstanceOf(Song);
    expect(song1.id).toBe(id);
    expect(song1.description).toBe(description);
    expect(song1.singers).toBe(singers);
    expect(song1.name).toBe(songName);
  });

  it('should fail if a song does not exists', async () => {
    const id = DataGenerator.getInteger();

    try {
      await SongsService.findById({ id });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
    }
  });

  it('should delete a song', async () => {
    const {
      cpf,
      email,
      songName,
      profilePhoto,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name,
      price,
      trainingAnimation,
      trainingPhrase,
    } = setupFactory();
    const id = DataGenerator.getInteger();

    const user = await UsersService.createUser({
      cpf,
      email,
      profilePhoto,
      name,
      refreshToken: null,
      isGuest: false,
    });
    await SongsService.createSong({
      idSong: id,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name: songName,
      price,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
    });
    const beforeTestSongs = await SongsService.listSongs();

    await SongsService.deleteSongAndClearFolder({ id });

    const afterTestSongs = await SongsService.listSongs();

    expect(beforeTestSongs.length).toBe(1);
    expect(afterTestSongs.length).toBe(0);
  });

  it(`should fail when trying to delete a song that doesn't exist`, async () => {
    const id = DataGenerator.getInteger();

    try {
      await SongsService.deleteSongAndClearFolder({ id });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
    }
  });

  it('should delete a fold when deleting a song', async () => {
    const id = DataGenerator.getInteger();
    const {
      cpf,
      email,
      songName,
      profilePhoto,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name,
      price,
      trainingAnimation,
      trainingPhrase,
    } = setupFactory();

    const user = await UsersService.createUser({
      cpf,
      email,
      profilePhoto,
      name,
      refreshToken: null,
      isGuest: false,
    });
    await SongsService.createSong({
      idSong: id,
      idUser: user.id,
      description,
      singers,
      thumbnail,
      subtitle,
      animation,
      song,
      name: songName,
      price,
      trainingAnimation1: trainingAnimation,
      trainingAnimation2: trainingAnimation,
      trainingAnimation3: trainingAnimation,
      trainingAnimation4: trainingAnimation,
      trainingPhrase1: trainingPhrase,
      trainingPhrase2: trainingPhrase,
      trainingPhrase3: trainingPhrase,
      trainingPhrase4: trainingPhrase,
    });

    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const rmSpy = jest.spyOn(fs, 'rmSync').mockImplementation();

    await SongsService.deleteSongAndClearFolder({ id });

  expect(existsSpy).toHaveBeenCalledTimes(1);
    expect(existsSpy).toHaveReturnedWith(true);
  expect(rmSpy).toHaveBeenCalledTimes(1);

    existsSpy.mockRestore();
    rmSpy.mockRestore();
  });
});
