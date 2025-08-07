import type React from 'react';
import api from './api';
import type {IMaterialsVisited} from '../types/types';

export const viewMaterialsVisited = async (materialIds: number[], setter?: React.Dispatch<React.SetStateAction<IMaterialsVisited[]>>) => {
	try {
		console.log('Called viewMaterialsVisited');
		const query = materialIds.map((id) => `material_ids=${id}`).join('&');
		const res = await api.get(`/material/view/visited?${query}`);

		if (setter) {
			setter(res.data.data);
			console.log('IS SET', res.data.data);
		}
		return res.data.data;
	} catch (err) {
		console.error('Error in viewMaterialsVisited:', err);
		throw err;
	}
};

export const createMaterialVisited = async (materialId: number) => {
	try {
		const res = await api.post('/material/visited', {materials_id: materialId});
		console.log(res.data.data);
	} catch (err) {
		throw err;
	}
};
