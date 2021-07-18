import CreateSongService from '../services/CreateSongService';
import CreateUserService from '../services/CreateUserService';
import ListSongsService from '../services/ListSongsService';
import ConsultSongService from '../services/ConsultSongService';
import Song from '../models/Song';
import User from '../models/User';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { unformattedCpfFactory } from '../utils/CPFFactory';
import { emailFactory, uuidFactory, firstNameFactory, profilePhotoUrlFactory } from '../utils/UsersInformationsFactory'
import faker from 'faker';
import DeleteSongService from '../services/DeleteSongService';
import AppError from '../errors/AppError';
import fs from 'fs';


describe('Song Service', () => {

    const setupFactory = () => {

        const cpf = unformattedCpfFactory();

        return {
            cpf,
            idSong: uuidFactory(),
            email: emailFactory(),
            profilePhoto: profilePhotoUrlFactory(),
            name: firstNameFactory(),
            songName: firstNameFactory(),
            description: faker.music.genre(),
            singers: firstNameFactory(),
            thumbnail: faker.image.imageUrl(),
            subtitle: faker.image.imageUrl(),
        }
    }


    beforeAll(() => {
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [Song, User],
            synchronize: true,
            logging: false
        })
    })

    afterAll(() => {
        const connection = getConnection();
        return connection.close();
    })

    afterEach(async () => {
        const userRepository = getRepository(User);
        const songRepository = getRepository(Song);
        await songRepository.delete({});
        await userRepository.delete({});
    })

    it('should create a song', async () => {

        const { cpf, email, songName, profilePhoto, idSong, description, singers, thumbnail, subtitle, name } = setupFactory();

        const user = await CreateUserService.execute({
            cpf, email, profilePhoto, name, refreshToken: null
        });

        const createdSong = await CreateSongService.execute({ idSong, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });

        expect(createdSong.id).toBe(idSong);
        expect(createdSong.user_id).toBe(user.id);
        expect(createdSong.description).toBe(description);
        expect(createdSong.singers).toBe(singers);
        expect(createdSong.thumbnail).toBe(thumbnail);
        expect(createdSong.subtitle).toBe(subtitle);
        expect(createdSong.name).toBe(songName);
    })


    it('should return a list of songs', async () => {

        const { cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name } = setupFactory();
        const firstIdSong = uuidFactory(), secondIdSong = uuidFactory();

        const user = await CreateUserService.execute({ cpf, email, profilePhoto, name, refreshToken: null });

        await CreateSongService.execute({ idSong: firstIdSong, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });
        await CreateSongService.execute({ idSong: secondIdSong, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });

        const listOfSongs = await ListSongsService.execute();

        expect(listOfSongs).toBeDefined();
        expect(listOfSongs).not.toBeNull();
        expect(listOfSongs.length).toBe(2);
        expect(listOfSongs[0].id).toBe(firstIdSong);
        expect(listOfSongs[1].id).toBe(secondIdSong);

    })

    it('should find a song by id', async () => {

        const id = uuidFactory();
        const { cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name } = setupFactory();

        const user = await CreateUserService.execute({ cpf, email, profilePhoto, name, refreshToken: null });
        await CreateSongService.execute({ idSong: id, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });

        const song = await ConsultSongService.execute({ id });

        expect(song).not.toBeNull();
        expect(song).toBeDefined();
        expect(song).toBeInstanceOf(Song);
        expect(song.id).toBe(id);
        expect(song.description).toBe(description);
        expect(song.singers).toBe(singers);
        expect(song.name).toBe(songName);
    })


    it('should fail if a song does not exists', async () => {

        const id = uuidFactory();

        try {
            await ConsultSongService.execute({ id });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(404);
        }
    })

    it('should delete a song', async () => {
        const { cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name } = setupFactory();
        const id = uuidFactory();

        const user = await CreateUserService.execute({ cpf, email, profilePhoto, name, refreshToken: null });
        await CreateSongService.execute({ idSong: id, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });
        const beforeTestSongs = await ListSongsService.execute();

        await DeleteSongService.execute({ id });

        const afterTestSongs = await ListSongsService.execute();

        expect(beforeTestSongs.length).toBe(1);
        expect(afterTestSongs.length).toBe(0);

    })

    it(`should fail when trying to delete a song that doesn't exist`, async () => {

        const id = uuidFactory();

        try {
            await DeleteSongService.execute({ id });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(404);
        }

    })

    it('should delete a fold when deleting a song', async () => {

        const { cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name } = setupFactory();
        const id = uuidFactory();
        const user = await CreateUserService.execute({ cpf, email, profilePhoto, name, refreshToken: null });
        await CreateSongService.execute({ idSong: id, idUser: user.id, description, singers, thumbnail, subtitle, name: songName });

        fs.existsSync = jest.fn().mockReturnValue(true);
        fs.rmdirSync = jest.fn();

        await DeleteSongService.execute({ id });

        expect(fs.existsSync).toBeCalledTimes(1);
        expect(fs.existsSync).toHaveReturnedWith(true);
        expect(fs.rmdirSync).toBeCalledTimes(1);

    })

})

