import type React from 'react';
import api from './api';
import type {IUserQuiz} from '../types/types';

export const viewUserQuiz = async (quizId: number, setter: React.Dispatch<React.SetStateAction<IUserQuiz | undefined>>) => {
	try {
		const res = await api.get(`/quiz/${quizId}`);

		if (!res) {
			return;
		}

		console.log(res.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};
