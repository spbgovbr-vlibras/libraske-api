import { AxiosInstance } from 'axios';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import jwtToPem, { JWK } from 'jwk-to-pem';
import qs from 'qs';
import AppError from '../errors/AppError';
import env from '../environment/environment'

type AxiosErrorLike = {
  response?: {
    data?: {
      error_description?: string;
    };
  };
};

export interface ILoginUnico {
  name: string;
  cpf: string
  email: string
  phoneNumber: string;
  profilePhoto: string;
}

export interface IRequestSingUp {
  code: string;
  redirectUri: string;
}

export const loginUnicoAxiosInstance = axios.create({
  baseURL: env.LOGIN_UNICO_BASE_URL,
  timeout: 5000,
  auth: {
    username: env.LOGIN_UNICO_CLIENT,
    password: env.LOGIN_UNICO_SECRET,
  },
});

export default class LoginUnico {

  private http: AxiosInstance;
  private jwt: any;
  private jwtToPemInstance: any;

  constructor(http: AxiosInstance, jwt: any, jwtToPemInstance: any) {
    this.http = http;
    this.jwt = jwt;
    this.jwtToPemInstance = jwtToPemInstance;
  }

  async signUp({ code, redirectUri }: IRequestSingUp): Promise<ILoginUnico> {
    const query = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    };
    try {
      const {
        data: { keys },
      } = await this.http.get('jwk');

      const [key] = keys;
      const response = await this.http.post('token', qs.stringify(query), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const {
        data: { id_token: clientToken },
      } = response;
      const decoded = this.jwt.verify(clientToken, this.jwtToPemInstance(key));
      const {
        sub: cpf,
        name,
        email,
        email_verified: emailExists,
        phone_number: phoneNumber,
      } = decoded;

      return {
        name,
        cpf,
        ...(emailExists && { email }),
        phoneNumber,
        profilePhoto: decoded.profilePhoto,
      };
    } catch (error: unknown) {
      const axiosLikeError = error as AxiosErrorLike;
      const hasResponse =
        (axios.isAxiosError(error) && !!error.response) ||
        (!!axiosLikeError && typeof axiosLikeError === 'object' && !!axiosLikeError.response);

      if (hasResponse && axiosLikeError.response) {
        const description = axiosLikeError.response.data?.error_description;
        const errors = {
          error: 'User could not be authenticated on Login Único.',
          ...(description && { description }),
        };
        throw new AppError(errors as any);
      }

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('Internal Error');
    }
  }
}
