import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API || 'http://127.0.0.1:5000',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
	withCredentials: true,
});

export default api;
