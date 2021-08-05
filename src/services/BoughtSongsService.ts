import BoughtSongs from "@models/BoughtSongs";
import AppError from "src/errors/AppError";
import BoughtSongsRepository from '../repositories/BoughtSongsRepository'

class BoughtSongsService {

  async checkAlreadyPurchased(userId: number, songId: string) {

    const alreadyBought = await BoughtSongsRepository.existsBySongIdAndUserId(userId, songId);

    if (alreadyBought) {
      throw new AppError("The song has already been purchased.", 400);
    }

  }

  async getBoughtSongsByUser(userId: number): Promise<BoughtSongs[]> {

    const boughtSongs = await BoughtSongsRepository.findByUserId(userId);

    return boughtSongs;
  }

  async addBoughtSong(userId: number, songId: string) {

    await this.checkAlreadyPurchased(userId, songId);

    const boughtSong = BoughtSongsRepository.getInstance().create({
      song_id: songId,
      user_id: userId
    })

    await BoughtSongsRepository.addBoughtSong(boughtSong);
  }


  async getAvailableSongs(userId: number) {

    return await BoughtSongsRepository.findByUserId(userId);

  }
}

export default new BoughtSongsService();
