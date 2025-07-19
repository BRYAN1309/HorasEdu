import type {LoginPayload, RegisterPayload} from '../types/types';
import api from './api';

export const login = async (loginPayload: LoginPayload) => {
	try {
		await api.post('/user/login', loginPayload);
	} catch (err) {
		throw err;
	}
};

export const register = async (registerPayload: RegisterPayload) => {
	try {
		const res = await api.post('/user/register', registerPayload);
		return res.data;
	} catch (err) {
		throw err;
	}
};
