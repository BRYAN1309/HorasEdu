import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API || 'http://127.0.0.1:5000/user/login',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default api;
