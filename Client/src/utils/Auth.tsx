import {AuthContext} from '../contexts/AuthContext';
import {Navigate, Outlet} from 'react-router-dom';

const isTokenExpired = (token: string) => {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		const currentime = Math.floor(Date.now() / 1000);
		return payload.exp < currentime;
	} catch (err) {
		return true;
	}
};

// fix protected routes
const ProtectedRoute = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (isTokenExpired(token)) {
		return <Navigate to="/login" replace />;
	}

	return (
		<AuthContext.Provider value={{token}}>
			<Outlet />
		</AuthContext.Provider>
	);
};

export default ProtectedRoute;
