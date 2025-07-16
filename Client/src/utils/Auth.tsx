import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// fix protected routes
const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AuthContext.Provider value={{ token }}>
            <Outlet />
        </AuthContext.Provider>
    );
};

export default ProtectedRoute;
