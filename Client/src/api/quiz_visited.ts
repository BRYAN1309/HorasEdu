import type React from 'react';
import type {IQuizVisited} from '../types/types';
import api from './api';

export const quizVisited = async (moduleIds: number[], setter: React.Dispatch<React.SetStateAction<IQuizVisited[]>>) => {
	try {
		const query = moduleIds.map((id) => `material_ids=${id}`).join('&');
		const res = await api.get(`/quiz/view/visited?${query}`);
		console.log(res.data.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};
