import axios from 'axios';
import LoginUnico from '../services/LoginUnicoService';
import jsonwebtoken from 'jsonwebtoken';
import { unformattedCpfFactory } from '../utils/CPFFactory';
import { emailFactory, firstNameFactory, profilePhotoUrlFactory } from '../utils/UsersInformationsFactory';

jest.mock('axios')
jest.mock('jsonwebtoken')

const axiosMocked = axios as jest.Mocked<typeof axios>;
const jwtMocked = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;

describe('Login Unico', () => {

    const getUserInfo = () => {
        return {
            sub: unformattedCpfFactory(),
            name: firstNameFactory(),
            email: emailFactory(),
            email_verified: true,
            phone_number: unformattedCpfFactory(),
            code: firstNameFactory(),
            redirectUri: profilePhotoUrlFactory()
        }
    }

    it('should call sign up and return user data', async () => {

        const {
            sub,
            name,
            email,
            email_verified,
            phone_number,
            code,
            redirectUri
        } = getUserInfo();

        axiosMocked.get.mockResolvedValue({
            data: {
                keys: {}
            }
        });

        axiosMocked.post.mockResolvedValue({ data: { id_token: "randomToken" } });

        jwtMocked.verify = jest.fn().mockReturnValue({
            sub,
            name,
            email,
            email_verified,
            phone_number,
            profilePhoto: redirectUri
        })

        const jwtToPem = jest.fn().mockReturnValue({});

        const loginUnicoInstance = new LoginUnico(axiosMocked, jwtMocked, jwtToPem);

        const result = await loginUnicoInstance.signUp({ code, redirectUri });

        expect(result).toBeDefined();
        expect(result.cpf).toBe(sub);
        expect(result.name).toBe(name);
        expect(result.email).toBe(email);
        expect(result.profilePhoto).toBe(redirectUri);
    })

    it('should throw error when getting keys from LoginUnico', async () => {

        const {
            code,
            redirectUri
        } = getUserInfo();

        axiosMocked.get.mockRejectedValue(() => { Promise.reject() })

        const loginUnicoInstance = new LoginUnico(axiosMocked, jwtMocked, () => { });

        try {
            await loginUnicoInstance.signUp({ code, redirectUri });
        } catch (err) {
            expect(err.statusCode).toBe(500);
        }
    })

    it('should throw error when posting to LoginUnico', async () => {

        const {
            code,
            redirectUri
        } = getUserInfo();

        axiosMocked.get.mockResolvedValue({
            data: {
                keys: {}
            }
        });

        axiosMocked.post.mockClear();

        axiosMocked.post.mockImplementation(() => {
            return Promise.reject({
                response: {
                    data: {
                        error_description: ['error']
                    }
                }
            })
        })

        const loginUnicoInstance = new LoginUnico(axiosMocked, jwtMocked, () => { });

        try {
            await loginUnicoInstance.signUp({ code, redirectUri });
        } catch (err) {
            expect(err.statusCode).toBe(500);
            expect(err.message.error).toEqual('User could not be authenticated on Login Único.');
            expect(err.message.description.length).toBeGreaterThan(0);
        }
    })
})