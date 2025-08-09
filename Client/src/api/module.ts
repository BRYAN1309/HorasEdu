import axios from 'axios';
import type React from 'react';
import type {Module} from '../types/types';
import api from './api';

export const viewModule = async (moduleId: number) => {
	try {
		const res = await api.get(`/modules/${moduleId}`);
		return res.data.data;
	} catch (err) {
		throw err;
	}
};

export const viewAllModules = async (setter: React.Dispatch<React.SetStateAction<Module[]>>) => {
	try {
		const res = await axios.get(`/modules/view`);
		setter(res.data.data);
		return res.data;
	} catch (err) {
		throw err;
	}
};
