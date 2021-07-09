import BoughtSongs from '@models/BoughtSongs';
import User from '@models/User';
import BoughtSongsService from '@services/BoughtSongsService';
import SongsService from '@services/SongsService';
import UsersService from '@services/UsersService';
import { Router } from 'express';
import BoughtSongsRepository from 'src/repository/BoughtSongsRepository';
import UsersRepository from 'src/repository/UsersRepository';
import { getConnection } from 'typeorm';


const songStore = Router();

songStore.post("/song/:id/buy", async (request, response) => {

    const { id } = request.params;
    const user = request.user as User;

    const song = await SongsService.findById({ id });

    await BoughtSongsService.checkAlreadyPurchased(user.id, song.id);
    const credit = await UsersService.checkInsufficientCreditsAndThrow(song.price, user.id);

    const updatedUser = UsersRepository.getInstance().create({
        ...user, credit
    });

    const boughtSong = BoughtSongsRepository.getInstance().create({
        song_id: song.id,
        user_id: user.id
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    let err;

    await queryRunner.startTransaction();

    try {

        await queryRunner.manager.save(updatedUser);
        await queryRunner.manager.save(boughtSong);

        await queryRunner.commitTransaction();
    } catch (error) {
        err = error;
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }

    if (err) {
        throw err;
    }

    response.status(200).send()
});

songStore.get("/song/bought", async (request, response) => {

    const user = request.user;
    const res = await BoughtSongsService.getBoughtSongsByUser(user.id);

    response.json(res);
});


export default songStore;