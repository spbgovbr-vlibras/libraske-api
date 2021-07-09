import BoughtSongs from "@models/BoughtSongs";
import AppError from "src/errors/AppError";
import BoughtSongsRepository from '../repository/BoughtSongsRepository'

class BoughtSongsService {

    async checkAlreadyPurchased(userId: string, songId: string) {

        const alreadyBought = await BoughtSongsRepository.existsBySongIdAndUserId(userId, songId);

        if (alreadyBought) {
            throw new AppError("The song has already been purchased.", 400);
        }

    }

    async getBoughtSongsByUser(userId: string): Promise<BoughtSongs[]> {

        const boughtSongs = await BoughtSongsRepository.findByUserId(userId);

        return boughtSongs;
    }

    async addBoughtSong(userId: string, songId: string) {

        await this.checkAlreadyPurchased(userId, songId);

        const boughtSong = BoughtSongsRepository.getInstance().create({
            song_id: songId,
            user_id: userId
        })

        await BoughtSongsRepository.addBoughtSong(boughtSong);
    }


    async getAvailableSongs(userId: string) {

        return await BoughtSongsRepository.findByUserId(userId);

    }
}

export default new BoughtSongsService();
