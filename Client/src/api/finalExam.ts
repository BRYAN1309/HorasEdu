import type React from 'react';
import type {FinalExam, IUserFinalExam} from '../types/types';
import api from './api';

export const viewFinalExam = async (setter: React.Dispatch<React.SetStateAction<FinalExam | undefined>>, courseId: number) => {
	try {
		const res = await api.get(`/final_exam/view/${courseId}`);
		console.log('FINAL EXAM : ', res.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};

export const viewUserFinalExam = async (
	setter: React.Dispatch<React.SetStateAction<IUserFinalExam | undefined>>,
	final_exam_id: number
) => {
	try {
		const res = await api.get(`/final_exam/user/${final_exam_id}`);
		console.log('User FINAL EXAM : ', res.data);

		if (res.data.data.length < 1) {
			return;
		}

		setter(res.data.data[0]);
	} catch (err) {
		throw err;
	}
};

export const submitFinalExam = async (score: number, id: number) => {
	try {
		const res = await api.post(`/final_exam/submit/${id}`, {score: score});
		console.log(res.data);
	} catch (err) {
		throw err;
	}
};
