import type React from 'react';
import api from './api';
import type {IModuleVisited} from '../types/types';

export const viewModulesVisited = async (moduleIds: number[], setter?: React.Dispatch<React.SetStateAction<IModuleVisited[]>>) => {
	try {
		const query = moduleIds.map((id) => `module_ids=${id}`).join('&');
		const res = await api.get(`/module/view/visited?${query}`);

		if (setter) {
			setter(res.data.data);
			console.log('IS SET', res.data.data);
		}
		return res.data.data;
	} catch (err) {
		console.error('Error in viewModuleVisited:', err);
		throw err;
	}
};

export const createModuleVisited = async (module_id: number) => {
	try {
		const res = await api.post('/module/visited', {module_ids: module_id});
		console.log(res.data.data);
	} catch (err) {
		throw err;
	}
};
