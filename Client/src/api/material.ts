import type React from 'react';
import api from './api';
import type {Material} from '../types/types';

export const viewMaterials = async (moduleId: number, setter: React.Dispatch<React.SetStateAction<Material[]>>) => {
	try {
		const res = await api.get(`/materials/${moduleId}`);
		console.log('View Material : ', res.data);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};
