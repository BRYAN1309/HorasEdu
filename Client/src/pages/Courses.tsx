import {useEffect, useState} from 'react';
import {Search, Plus, BookOpen, Users, Clock, Award, Grid, List, Copyright, ShowerHead, Star, TrendingUp} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import type {Course, CourseDetails, IModuleVisited, Module} from '../types/types';
import {viewAllCourse, viewCourseDetails} from '../api/courses';
import {viewUserCourse} from '../api/userCourse';
import {Link, useLoaderData, useLocation, useNavigate} from 'react-router-dom';
import {viewModulesVisited} from '../api/moduleVisited';
import {viewAllModules} from '../api/module';
import {useAlert} from '../components/Alert';

const Courses = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState('grid');
	const [filterStatus, setFilterStatus] = useState('all');
	const [courses, setCourses] = useState<CourseDetails[]>([]);
	const [userCourse, setUserCourse] = useState<Course[]>([]);
	const location = useLocation();
	const {showSuccess, showError} = useAlert();

	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());

		const enrolled = userCourse.some((c) => c.id === course.id);
		return matchesSearch && enrolled;
	});

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty?.toLowerCase()) {
			case 'pemula':
			case 'beginner':
				return 'bg-green-100 text-green-700 border-green-200';
			case 'menengah':
			case 'intermediate':
				return 'bg-yellow-100 text-yellow-700 border-yellow-200';
			case 'mahir':
			case 'advanced':
				return 'bg-red-100 text-red-700 border-red-200';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-200';
		}
	};

	useEffect(() => {
		const viewAll = async () => {
			try {
				await viewUserCourse(setUserCourse);
				const res = await viewCourseDetails();
				setCourses(res.data);
			} catch (err) {
				showError('Error menampilkan data.');
				console.log('Error : ', err);
			}
		};

		viewAll();
	}, []);

	const CourseCard = ({course}: {course: CourseDetails}) => (
		<div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1">
			<div className="relative overflow-hidden">
				<img
					src={course.url_image}
					alt={course.title}
					className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div className="absolute top-4 right-4">
					<span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.kesulitan)}`}>
						{course.kesulitan}
					</span>
				</div>
			</div>

			<div className="p-6">
				<div className="mb-4">
					<h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{course.title}</h3>
					<p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{course.description}</p>
				</div>

				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-4 text-sm text-gray-500">
						<div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
							<Clock className="w-4 h-4 mr-2 text-green-500" />
							<span className="font-medium">{course.durasi} menit</span>
						</div>
						<div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
							<BookOpen className="w-4 h-4 mr-2 text-blue-500" />
							<span className="font-medium">{course.modules?.length || 0} modul</span>
						</div>
					</div>
				</div>

				<div className="border-t pt-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">{course.author?.charAt(0)?.toUpperCase() || 'A'}</span>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">{course.author}</p>
								<p className="text-xs text-gray-500">Instruktur</p>
							</div>
						</div>

						<Link to={`${location.pathname}/${course.id}`}>
							<button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
								Lanjutkan
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);

	const CourseRow = ({course}: {course: CourseDetails}) => (
		<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 mb-4 border border-gray-100 hover:border-green-200">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-6">
					<div className="relative">
						<img src={course.url_image} alt={course.title} className="w-20 h-20 rounded-lg object-cover" />
						<div className="absolute -top-2 -right-2">
							<span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.kesulitan)}`}>
								{course.kesulitan}
							</span>
						</div>
					</div>

					<div className="flex-1">
						<h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
						<p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
						<div className="flex items-center space-x-1">
							<div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">{course.author?.charAt(0)?.toUpperCase() || 'A'}</span>
							</div>
							<span className="text-sm text-gray-500">{course.author}</span>
						</div>
					</div>
				</div>

				<div className="flex items-center space-x-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-1">
							<Clock className="w-4 h-4 text-green-500 mr-1" />
						</div>
						<div className="text-xs text-gray-500">Durasi</div>
						<div className="font-semibold text-gray-900">{course.durasi} menit</div>
					</div>

					<div className="text-center">
						<div className="flex items-center justify-center mb-1">
							<BookOpen className="w-4 h-4 text-blue-500 mr-1" />
						</div>
						<div className="text-xs text-gray-500">Modul</div>
						<div className="font-semibold text-gray-900">{course.modules?.length || 0}</div>
					</div>

					<Link to={`${location.pathname}/${course.id}`}>
						<button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
							Lanjutkan
						</button>
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 lg:ml-0">
				{/* Header */}
				<Navbar />

				<main className="p-6 space-y-8">
					{/* Hero Section */}
					<div className="bg-gradient-to-r from-green-500 via-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-3xl font-bold mb-2">Selamat datang kembali!</h1>
								<p className="text-green-100 text-lg">Lanjutkan perjalanan belajar Anda</p>
							</div>
							<div className="hidden md:flex items-center space-x-4">
								{/* <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
									<TrendingUp className="w-8 h-8" />
								</div> */}
								{/* <div>
									<p className="text-sm text-green-100">Progress Hari Ini</p>
									<p className="text-2xl font-bold">+25%</p>
								</div> */}
							</div>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500 mb-1">Total Kursus</p>
									<p className="text-3xl font-bold text-gray-900">{filteredCourses.length}</p>
									<p className="text-xs text-green-600 font-medium mt-1">Kursus Terdaftar</p>
								</div>
								<div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
									<BookOpen className="w-6 h-6 text-white" />
								</div>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500 mb-1">Total Modul</p>
									<p className="text-3xl font-bold text-gray-900">
										{filteredCourses.reduce((total, course) => total + (course.modules?.length || 0), 0)}
									</p>
									<p className="text-xs text-yellow-600 font-medium mt-1">Siap Dipelajari</p>
								</div>
								<div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center">
									<Star className="w-6 h-6 text-white" />
								</div>
							</div>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500 mb-1">Instruktur</p>
									<p className="text-3xl font-bold text-gray-900">{new Set(filteredCourses.map((course) => course.author)).size}</p>
									<p className="text-xs text-purple-600 font-medium mt-1">Expert Mentor</p>
								</div>
								<div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center">
									<Users className="w-6 h-6 text-white" />
								</div>
							</div>
						</div>
					</div>

					{/* Controls */}
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
								<div className="relative">
									<Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										placeholder="Cari kursus..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
									/>
								</div>
							</div>

							<div className="flex items-center space-x-3">
								<div className="flex items-center bg-gray-100 rounded-xl p-1">
									<button
										onClick={() => setViewMode('grid')}
										className={`p-2 rounded-lg transition-all ${
											viewMode === 'grid' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
										}`}
									>
										<Grid className="w-4 h-4" />
									</button>
									<button
										onClick={() => setViewMode('list')}
										className={`p-2 rounded-lg transition-all ${
											viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
										}`}
									>
										<List className="w-4 h-4" />
									</button>
								</div>

								<button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 font-medium shadow-md hover:shadow-lg">
									<Plus className="w-4 h-4" />
									<Link to={'/dashboard'}>
										<span>Tambah Kursus</span>
									</Link>
								</button>
							</div>
						</div>
					</div>

					{/* Courses Grid/List */}
					{viewMode === 'grid' ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredCourses.map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
						</div>
					) : (
						<div className="space-y-4">
							{filteredCourses.map((course) => (
								<CourseRow key={course.id} course={course} />
							))}
						</div>
					)}

					{filteredCourses.length === 0 && (
						<div className="text-center py-16 bg-white rounded-xl border border-gray-100">
							<div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<BookOpen className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
							<p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau jelajahi kursus lainnya</p>
							<Link to={'/dashboard'}>
								<button className="hover:cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium">
									Jelajahi Semua Kursus
								</button>
							</Link>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default Courses;
