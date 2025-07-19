import React, {createContext, useContext, useEffect, useState} from 'react';
import type {IAuthContext} from '../types/types';
import api from '../api/api';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		const authenticate = async () => {
			try {
				const response = await api.get<IAuthContext>('/user/authenticate');
				setName(response.data.name);
				setEmail(response.data.email);
			} catch (err) {
				alert('Authenticate error');
				navigate('/login');
			}
		};

		authenticate();
	}, []);

	return <AuthContext.Provider value={{email: email, name: name}}>children</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
