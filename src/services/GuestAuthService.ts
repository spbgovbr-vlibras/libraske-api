import User from "../models/User";
import DataGenerator from "../utils/DataGenerator";
import FakeCpfGenerator from "../utils/FakeCpfGenerator";
import TokenService from "./TokenService";
import UsersService from "./UsersService";

interface IGuestCreateAccount {
  user: User;
  accessToken: string;
}

class GuestAuthService {
  /**
   * 
   * @param guestName 
   * @return{IGuestCreateAccount}
   */
  async createGuestAccount(guestName: string): Promise<IGuestCreateAccount> {
    let fakeCpf;
    const fakeEmail = DataGenerator.getUUID() + DataGenerator.getEmail();

    do {
      fakeCpf = FakeCpfGenerator();
    } while (await UsersService.existsByCpf(fakeCpf));

    const accessToken = TokenService.createToken({ cpf: fakeCpf });
    const refreshToken = TokenService.createRefreshToken({ cpf: fakeCpf });

    const user = await UsersService.createUser({
      name: guestName,
      email: fakeEmail,
      cpf: fakeCpf,
      profilePhoto: null,
      refreshToken,
      isGuest: true
    });

    return {
      user,
      accessToken
    }
  }
}

export default new GuestAuthService();