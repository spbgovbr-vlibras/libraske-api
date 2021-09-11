import LoginUnico from "../services/LoginUnicoService";
import DataGenerator from "../utils/DataGenerator";
import AuthorizationService from "../services/AuthorizationService";

jest.mock('../services/LoginUnicoService');

const LoginUnicoMock = LoginUnico as jest.Mock<LoginUnico>;
const MockedLoginUnico = new LoginUnicoMock() as jest.Mocked<LoginUnico>;

const setupFactory = () => {
  return {
    cpf: DataGenerator.getUnformattedCpf(),
    email: DataGenerator.getEmail(),
    name: DataGenerator.getFirstName(),
    phoneNumber: DataGenerator.getUnformattedCpf(),
    profilePhoto: DataGenerator.getUrl(),
    code: DataGenerator.getRandomWord(),
    redirectUri: DataGenerator.getUrl()
  }
}


describe('Authorization Service', () => {
  it('should call LoginUnico.call and return correct values', async () => {

    const {
      cpf,
      email,
      name,
      phoneNumber,
      profilePhoto,
      code,
      redirectUri
    } = setupFactory();

    MockedLoginUnico.signUp.mockClear();
    MockedLoginUnico.signUp.mockResolvedValue({ cpf, email, name, phoneNumber, profilePhoto });

    const Authorization = new AuthorizationService(MockedLoginUnico);

    const result = await Authorization.authenticateOnLoginUnico({ code, redirectUri });

    expect(MockedLoginUnico.signUp).toBeCalledTimes(1);
    expect(MockedLoginUnico.signUp).toBeCalledWith({ code, redirectUri });
    expect(result).toBeDefined();
    expect(result.cpf).toBe(cpf);
    expect(result.email).toBe(email);
    expect(result.name).toBe(name);
    expect(result.profilePhoto).toBe(profilePhoto);

  })

  it('should fail when calling LoginUnico.signUp', async () => {

    const {
      code,
      redirectUri
    } = setupFactory()

    MockedLoginUnico.signUp.mockClear();
    MockedLoginUnico.signUp.mockRejectedValueOnce(() => Promise.reject());

    const Authorization = new AuthorizationService(MockedLoginUnico);

    try {
      await Authorization.authenticateOnLoginUnico({ code, redirectUri });
    } catch (error) {
      expect(error.statusCode).toBe(500);
      expect(MockedLoginUnico.signUp).toBeCalledTimes(1);
      expect(MockedLoginUnico.signUp).toBeCalledWith({ code, redirectUri });
    }
  })
})