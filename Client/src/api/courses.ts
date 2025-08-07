import type React from 'react';
import api from './api';
import type {Course} from '../types/types';

export const viewCourseDetails = async (courseId?: number) => {
	let query = '';

	if (courseId) {
		query = `/${courseId}`;
	}

	try {
		const res = await api.get(`/courses${query}/all`);
		console.log(res.data);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const viewAllCourse = async (setter: React.Dispatch<React.SetStateAction<Course[]>>) => {
	try {
		const res = await api.get(`/courses`);
		console.log(res.data);
		setter(res.data.data);
		// return res.data;
	} catch (err) {
		throw err;
	}
};
