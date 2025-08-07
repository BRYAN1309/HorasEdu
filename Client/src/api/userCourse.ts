import type React from 'react';
import api from './api';
import type {Course} from '../types/types';

export const enrollCourse = async (courseId: number) => {
	try {
		console.log('Course ID : ', courseId);
		const res = await api.post('/user/courses/enroll', {course_id: courseId});
		console.log(res.data);
	} catch (err) {
		throw err;
	}
};

export const viewUserCourse = async (setter: React.Dispatch<React.SetStateAction<Course[]>>) => {
	try {
		const res = await api.get('/user/courses');
		console.log(res.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};
