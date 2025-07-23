import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../pages/Protected";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Courses from "../pages/Courses";
import CourseDetailsPage from "../pages/CourseDetail";
import Module from "../pages/Module";
import Material from "../pages/Material";
import Quiz from "../pages/Quiz";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [
            {
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                        path: "/",
                    },
                    {
                        // element: <ProtectedRoute />,
                        children: [
                            {
                                element: <Navigate to="/dashboard" replace />,
                            },
                            {
                                element: <Dashboard />,
                                path: "/dashboard",
                            },
                            {
                                element: <Courses />,
                                path: "/courses",
                            },
                            {
                                path: "/courses/:id_course",
                                element: <CourseDetailsPage />,
                            },
                            {
                                path: "/courses/:id_course/module/:id_module",
                                element: <Module />,
                            },
                            {
                                path: "/courses/:id_course/module/:id_module/material/:id_material",
                                element: <Material />,
                            },
                            {
                                path: "/courses/:id_course/module/:id_module/quiz/:id_quiz",
                                element: <Quiz />,
                            },
                        ],
                    },
                ],
            },
        ],
        errorElement: <NotFound />,
    },
    {
        element: <Login />,
        path: "/login",
    },
    {
        element: <Register />,
        path: "/register",
    },
]);

export default router;
