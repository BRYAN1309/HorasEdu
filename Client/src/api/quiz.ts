import type React from 'react';
import type {Quiz} from '../types/types';
import api from './api';

export const viewQuiz = async (quizId: number, setter: React.Dispatch<React.SetStateAction<Quiz | undefined>>) => {
	try {
		const res = await api.get(`/quiz/${quizId}`);
		console.log(res.data.data);
		setter(res.data.data);
		return res.data;
	} catch (err) {
		throw err;
	}
};

const viewQuizzes = async () => {
	try {
		const res = await api.get('/quizes');
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const updateQuiz = async (payload: Partial<Quiz>, quiz_id: number) => {
	try {
		const res = await api.patch(`/quiz?quiz_id=${quiz_id}`, payload);
		console.log(res.data);
		return res.data;
	} catch (err) {
		throw err;
	}
};
