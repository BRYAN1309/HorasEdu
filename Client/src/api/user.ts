import api from './api';

const viewUser = async (id: string) => {
	try {
		const res = await api.get(`/user/view?id=${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

const viewUserProgress = async (id: string) => {
	try {
		const res = await api.get(`/user/user_progress?user_id=${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
