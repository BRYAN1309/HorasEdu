// src/pages/Protected.tsx
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext'; // adjust the path if needed

const ProtectedRoute: React.FC = () => {
	const {email} = useAuth();

	if (!email) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
