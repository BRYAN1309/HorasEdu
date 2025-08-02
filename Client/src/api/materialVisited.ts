import type React from 'react';
import api from './api';
import type {IMaterialsVisited} from '../types/types';

export const viewMaterialsVisited = async (materialIds: number[], setter: React.Dispatch<React.SetStateAction<IMaterialsVisited[]>>) => {
	try {
		const query = materialIds.map((id) => `material_ids=${id}`).join('&');
		const res = await api.get(`/material/view/visited?${query}`);
		setter(res.data.data);
	} catch (err) {
		throw err;
	}
};
