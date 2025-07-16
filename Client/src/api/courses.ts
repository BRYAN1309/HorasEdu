import api from './api';

export const viewCourseDetails = async (id: number) => {
	try {
		const res = await api.get(`/courses/view_details?course_id=${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const viewAllCourse = async () => {
	try {
		const res = await api.get(`/courses`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
