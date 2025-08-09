import type React from 'react';
import api from './api';
import type {IUserQuiz} from '../types/types';

export const viewUserQuiz = async (quizId: number, setter: React.Dispatch<React.SetStateAction<IUserQuiz | undefined>>) => {
	try {
		const res = await api.get(`/quiz/user/${quizId}`);

		if (!res) {
			return;
		}

		const data = res.data.data;

		if (data.length < 1) {
			return;
		}

		setter(res.data.data[0]);
	} catch (err) {
		throw err;
	}
};
