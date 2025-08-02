import axios from 'axios';
import type React from 'react';
import type {Module} from '../types/types';
import api from './api';

export const viewModule = async (moduleId: number, setter: React.Dispatch<React.SetStateAction<Module | undefined>>) => {
	try {
		const res = await api.get(`/modules/${moduleId}`);
		console.log(res.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};

const viewAllModules = async () => {
	try {
		const res = await axios.get(`/modules`);
		return res.data;
	} catch (err) {
		throw err;
	}
};
