import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Courses from '../pages/Courses';
import CourseDetailsPage from '../pages/CourseDetail';

import QuizPage from '../pages/Quiz';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/Profile';
import ModulePage from '../pages/Module';
import MaterialPage from '../pages/Material';
import FinalExamPage from '../pages/FinalExam';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
		children: [
			{
				children: [
					{
						index: true,
						element: <LandingPage />,
						path: '/',
					},
					{
						// element: <ProtectedRoute />,
						children: [
							{
								element: <Navigate to="/dashboard" replace />,
							},
							{
								element: <Dashboard />,
								path: '/dashboard',
							},
							{
								element: <Courses />,
								path: '/courses',
							},
							{
								path: '/courses/:id_course',
								element: <CourseDetailsPage />,
							},
							{
								path: '/courses/:id_course/module/:id_module',
								element: <ModulePage />,
							},
							{
								path: '/courses/:id_course/module/:id_module/material/:id_material',
								element: <MaterialPage />,
							},
							{
								path: '/courses/:id_course/module/:id_module/quiz/:id_quiz',
								element: <QuizPage />,
							},
							{
								path: '/courses/:id_course/final_exam/:id_final_exam',
								element: <FinalExamPage />,
							},
							{
								path: '/profile/:user_id',
								element: <ProfilePage />,
							},
						],
					},
				],
			},
		],
		// errorElement: <NotFound />,
	},
	{
		element: <Login />,
		path: '/login',
	},
	{
		element: <Register />,
		path: '/register',
	},
]);

export default router;
