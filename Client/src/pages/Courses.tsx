import {useEffect, useState} from 'react';
import {Search, Plus, BookOpen, Users, Clock, Award, Grid, List, Copyright} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import type {Course, CourseDetails} from '../types/types';
import {viewAllCourse, viewCourseDetails} from '../api/courses';
import {viewUserCourse} from '../api/userCourse';
import {Link, useLoaderData, useLocation, useNavigate} from 'react-router-dom';

const Courses = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState('grid');
	const [filterStatus, setFilterStatus] = useState('all');
	const [courses, setCourses] = useState<CourseDetails[]>([]);
	const [userCourse, setUserCourse] = useState<Course[]>([]);
	const location = useLocation();

	const icons = [
		'📚', // books
		'👨‍🏫', // teacher
		'🧠', // brain
		'📝', // writing
		'📖', // open book
		'🎓', // graduation
		'📺', // video lessons
		'🎯', // target
		'📐', // geometry
		'📊', // analytics
		'🧑‍🎓', // student
		'🔤', // letters
		'💡', // idea
		'🗣️', // speaking
		'✍️', // writing hand
	];

	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());

		const enrolled = userCourse.some((c) => c.id === course.id);

		return matchesSearch && enrolled;
	});

	const getStatusColor = (status: any) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'completed':
				return 'bg-blue-100 text-blue-800';
			case 'draft':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	// const getStatusText = (status: any) => {
	// 	switch (status) {
	// 		case 'active':
	// 			return 'Aktif';
	// 		case 'completed':
	// 			return 'Selesai';
	// 		case 'draft':
	// 			return 'Draft';
	// 		default:
	// 			return 'Unknown';
	// 	}
	// };

	useEffect(() => {
		const viewAll = async () => {
			try {
				await viewUserCourse(setUserCourse);
				const res = await viewCourseDetails();

				setCourses(res.data);
			} catch (err) {
				alert(`Error : ${err}`);
				console.log('Error : ', err);
			}
		};

		viewAll();
	}, []);

	const CourseCard = ({course}: {course: CourseDetails}) => (
		<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
			<img src={course.url_image} alt="" className="w-full h-auto object-contain mx-auto" />
			{/* <div className={`${course.color} h-2`}></div> */}
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						{/* <div className={`${course.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold`}>{}</div> */}
						<div>
							<h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
							<p className="text-sm text-gray-500">{course.kesulitan}</p>
						</div>
					</div>
					{/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
						{getStatusText(course.status)}
					</span> */}
				</div>

				<p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

				<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
					<div className="flex items-center space-x-4">
						<span className="flex items-center">
							<Clock className="w-4 h-4 mr-1" />
							{course.durasi}
						</span>
						<span className="flex items-center">
							<BookOpen className="w-4 h-4 mr-1" />
							{course.modules.length} modul
						</span>
						{/* <span className="flex items-center">
							<Users className="w-4 h-4 mr-1" />
							{course.students}
						</span> */}
					</div>
				</div>
				{/* 
				<div className="mb-4">
					<div className="flex items-center justify-between text-sm mb-2">
						<span className="text-gray-600">Progress</span>
						<span className="font-medium">{course.progress}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${course.progress}%`}}></div>
					</div>
				</div> */}

				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-500">Instruktur: {course.author}</span>
					<div className="flex space-x-2">
						<Link to={`${location.pathname}/${course.id}`}>
							<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm hover:cursor-pointer">
								"Lanjutkan"
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);

	const CourseRow = ({course}: {course: any}) => {
		console.log('Course row : ', course);

		return (
			<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 mb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<img src={course.url_image} alt="" className="max-w-full max-h-full object-contain" />
						{/* <div className={`${course.color} w-10 h-10 rounded-lg flex items-center justify-center text-black text-lg font-bold`}></div> */}
						<div>
							<h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
							<p className="text-sm text-gray-500">{course.description}</p>
						</div>
					</div>

					<div className="flex items-center space-x-6">
						<div className="text-center">
							<div className="text-sm text-gray-500">Durasi</div>
							<div className="font-medium">{course.durasi}</div>
						</div>
						<div className="text-center">
							<div className="text-sm text-gray-500">Modul</div>
							<div className="font-medium">{course.modules}</div>
						</div>
						{/* <div className="text-center">
							<div className="text-sm text-gray-500">Siswa</div>
							<div className="font-medium">{course.students}</div>
						</div> */}
						<div className="text-center min-w-20">
							<div className="text-sm text-gray-500">Progress</div>
							<div className="font-medium">{course.progress}%</div>
						</div>
						{/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
							{getStatusText(course.status)}
						</span> */}
						<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
							{course.status === 'completed' ? 'Tinjau Kembali' : 'Lanjutkan'}
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 lg:ml-0">
				{/* Header */}
				<Navbar />

				<main className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500">Total Kursus</p>
									<p className="text-2xl font-bold text-gray-900">{courses.length}</p>
								</div>
								<BookOpen className="w-8 h-8 text-blue-500" />
							</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								{/* <div>
									<p className="text-sm text-gray-500">Aktif</p>
									<p className="text-2xl font-bold text-green-600">{courses.filter((c) => c.status === 'active').length}</p>
								</div> */}
								<BookOpen className="w-8 h-8 text-green-500" />
							</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								{/* <div>
									<p className="text-sm text-gray-500">Selesai</p>
									<p className="text-2xl font-bold text-blue-600">{courses.filter((c) => c.status === 'completed').length}</p>
								</div> */}
								<Award className="w-8 h-8 text-blue-500" />
							</div>
						</div>
						{/* <div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500">Total Siswa</p>
									<p className="text-2xl font-bold text-gray-900">{courses.reduce((total, course) => total + course.students, 0)}</p>
								</div>
								<Users className="w-8 h-8 text-purple-500" />
							</div>
						</div> */}
					</div>

					{/* Controls */}
					<div className="bg-white p-6 rounded-lg shadow-md mb-8">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-4">
								<div className="relative">
									<Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										placeholder="Cari kursus..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									/>
								</div>
								{/* <select
									value={filterStatus}
									onChange={(e) => setFilterStatus(e.target.value)}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								>
									<option value="all">Semua Status</option>
									<option value="active">Aktif</option>
									<option value="completed">Selesai</option>
									<option value="draft">Draft</option>
								</select> */}
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<button
										onClick={() => setViewMode('grid')}
										className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
									>
										<Grid className="w-4 h-4" />
									</button>
									<button
										onClick={() => setViewMode('list')}
										className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
									>
										<List className="w-4 h-4" />
									</button>
								</div>
								<button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
									<Plus className="w-4 h-4" />
									<span>Tambah Kursus</span>
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
						<div>
							{filteredCourses.map((course) => (
								<CourseRow key={course.id} course={course} />
							))}
						</div>
					)}

					{filteredCourses.length === 0 && (
						<div className="text-center py-12">
							<BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-500">Tidak ada kursus yang ditemukan</p>
						</div>
					)}
				</main>
				{/* Stats Cards */}
			</div>
		</div>
	);
};

export default Courses;
