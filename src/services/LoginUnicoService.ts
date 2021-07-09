import { AxiosInstance } from 'axios';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import jwtToPem, { JWK } from 'jwk-to-pem';
import qs from 'qs';
import AppError from '../errors/AppError';
import env from '../environment/environment'

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
	private jwt: object;
	private jwtToPemInstance: JWK;

	constructor(http: AxiosInstance, jwt: object, jwtToPemInstance: JWK) {
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
		} catch (error) {

			const { response } = error;

			if (response) {
				const description = response.data && response.data.error_description;
				const errors = {
					error: 'User could not be authenticated on Login Único.',
					...(description && { description }),
				};
				throw new AppError(errors);
			} else {

				throw new AppError('Internal Error');
			}
		}
	}
}
