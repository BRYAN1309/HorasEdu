import type {Material} from '../types/types';
import api from './api';

export const generateAnswer = async (question: string) => {
	try {
		const res = await api.post('/chatbot/generate_answer', question);
		return res.data.data;
	} catch (err) {
		throw err;
	}
};

export const startChat = async (material: Material) => {
	try {
		const res = await api.post('/chatbot/start_conversation', material);
		return res.data;
	} catch (err) {
		throw err;
	}
};
