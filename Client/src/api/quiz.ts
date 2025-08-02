import api from './api';

const viewQuizDetails = async (id: number) => {
	try {
		const res = await api.get(`/quizes?id=${id}`);
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
