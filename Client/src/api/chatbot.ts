import api from './api';

const generateQuestion = async (question: string) => {
	try {
		const res = await api.post('/chatbot/send_question', question);
		return res.data;
	} catch (err) {
		throw err;
	}
};
