import {useEffect, useState} from 'react';
import {
	Search,
	BookOpen,
	Trophy,
	Clock,
	Play,
	CheckCircle,
	MoreHorizontal,
	Filter,
	TrendingUp,
	Users,
	Award,
	Star,
	ChevronRight,
	Zap,
	GraduationCap,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import type {Course, CourseDetails} from '../types/types';
import {viewAllCourse, viewCourseDetails} from '../api/courses';
import CoursePreviewModal from '../components/CoursePreview';
import {enrollCourse, viewUserCourse} from '../api/userCourse';
import {viewMaterialsVisited} from '../api/materialVisited';
import {useAlert} from '../components/Alert';

const Dashboard = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [courses, setCourses] = useState<Course[]>([]);
	const [isPreview, setIsPreview] = useState<boolean>(false);
	const [selectedCourse, setSelectedCourse] = useState<CourseDetails>();
	const [userCourses, setUserCourses] = useState<Course[]>([]);
	const [activeFilter, setActiveFilter] = useState('all');
	const {showError} = useAlert();

	const filteredCourses = courses.filter((course) => {
		const matchedSearch =
			course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(course.description.toLowerCase().includes(searchQuery.toLowerCase()) && course.id);

		const enrolled = userCourses.some((userCourse) => userCourse.id === course.id);

		const difficultyFilter = activeFilter === 'all' || course.kesulitan.toLowerCase() === activeFilter.toLowerCase();

		return matchedSearch && !enrolled && difficultyFilter;
	});

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'Pemula':
				return 'bg-emerald-50 text-emerald-700 border-emerald-200';
			case 'Menengah':
				return 'bg-amber-50 text-amber-700 border-amber-200';
			case 'Lanjutan':
				return 'bg-rose-50 text-rose-700 border-rose-200';
			default:
				return 'bg-gray-50 text-gray-700 border-gray-200';
		}
	};

	const getDifficultyIcon = (difficulty: string) => {
		switch (difficulty) {
			case 'Pemula':
				return <BookOpen size={12} />;
			case 'Menengah':
				return <TrendingUp size={12} />;
			case 'Lanjutan':
				return <Award size={12} />;
			default:
				return <BookOpen size={12} />;
		}
	};

	useEffect(() => {
		const viewAll = async () => {
			try {
				await viewUserCourse(setUserCourses);
				await viewAllCourse(setCourses);
			} catch (err) {
				console.error(`View all course : ${err}`);
			}
		};

		viewAll();
	}, []);

	useEffect(() => {
		if (selectedCourse) {
			setIsPreview(true);
		}
	}, [selectedCourse]);

	useEffect(() => {
		if (isPreview) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isPreview]);

	const handleSelectCourse = async (courseId: number) => {
		try {
			const res = await viewCourseDetails(courseId);
			console.log(res.data);
			setSelectedCourse(res.data);
		} catch (err) {
			showError('Terjadi kesalahan.');
		}
	};

	const filterOptions = [
		{key: 'all', label: 'Semua Kursus', icon: <GraduationCap size={16} />},
		{key: 'pemula', label: 'Pemula', icon: <BookOpen size={16} />},
		{key: 'menengah', label: 'Menengah', icon: <TrendingUp size={16} />},
		{key: 'lanjutan', label: 'Lanjutan', icon: <Award size={16} />},
	];

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex">
				{isPreview && selectedCourse && (
					<CoursePreviewModal
						isOpen={isPreview}
						onClose={() => {
							setIsPreview(!isPreview);
						}}
						course={selectedCourse}
						onAddCourse={enrollCourse}
					/>
				)}

				{/* Sidebar */}
				<Sidebar />

				{/* Main Content */}
				<div className="flex-1 min-h-screen w-full">
					{/* Top Navigation */}
					<Navbar />

					<main className="p-4 md:p-6 lg:p-8 max-w-7xl w-full">
						{/* Header Section */}
						<div className="mb-8">
							<h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Pembelajaran</h1>
							<p className="text-gray-600">Temukan dan ikuti kursus aksara Batak yang menarik</p>
						</div>

						{/* Search and Filter Section */}
						<div className="mb-8 space-y-4">
							<div className="flex flex-col sm:flex-row gap-4">
								{/* Search Bar */}
								<div className="relative flex-1 max-w-md">
									<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
										<Search className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type="text"
										placeholder="Cari kursus aksara Batak..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
									/>
								</div>

								{/* Filter Dropdown */}
								<div className="relative">
									<select
										value={activeFilter}
										onChange={(e) => setActiveFilter(e.target.value)}
										className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm hover:shadow-md cursor-pointer"
									>
										{filterOptions.map((option) => (
											<option key={option.key} value={option.key}>
												{option.label}
											</option>
										))}
									</select>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<Filter className="h-5 w-5 text-gray-400" />
									</div>
								</div>
							</div>

							{/* Active Filter Tags */}
							{activeFilter !== 'all' && (
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">Filter aktif:</span>
									<span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200">
										{filterOptions.find((f) => f.key === activeFilter)?.icon}
										{filterOptions.find((f) => f.key === activeFilter)?.label}
										<button onClick={() => setActiveFilter('all')} className="ml-1 hover:bg-emerald-100 rounded-full p-0.5">
											×
										</button>
									</span>
								</div>
							)}
						</div>

						{/* Stats Cards */}
						{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 mb-1">Kursus Selesai</p>
										<p className="text-3xl font-bold text-gray-900">1</p>
										<p className="text-xs text-emerald-600 font-medium mt-1">↗ +12% bulan ini</p>
									</div>
									<div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-4 rounded-2xl shadow-lg">
										<CheckCircle size={24} className="text-white" />
									</div>
								</div>
							</div>

							<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 mb-1">Sedang Belajar</p>
										<p className="text-3xl font-bold text-gray-900">2</p>
										<p className="text-xs text-blue-600 font-medium mt-1">↗ +8% bulan ini</p>
									</div>
									<div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-2xl shadow-lg">
										<BookOpen size={24} className="text-white" />
									</div>
								</div>
							</div>

							<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 mb-1">Rata-rata Nilai</p>
										<p className="text-3xl font-bold text-gray-900">85</p>
										<p className="text-xs text-amber-600 font-medium mt-1">↗ +5% bulan ini</p>
									</div>
									<div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-2xl shadow-lg">
										<Trophy size={24} className="text-white" />
									</div>
								</div>
							</div>
						</div> */}

						{/* Results Summary */}
						{searchQuery && (
							<div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
								<p className="text-sm text-gray-600">
									Menampilkan <span className="font-semibold text-gray-900">{filteredCourses.length}</span> kursus
									{searchQuery && (
										<>
											{' '}
											untuk "<span className="font-semibold text-gray-900">{searchQuery}</span>"
										</>
									)}
									{activeFilter !== 'all' && (
										<>
											{' '}
											dengan tingkat{' '}
											<span className="font-semibold text-gray-900">{filterOptions.find((f) => f.key === activeFilter)?.label}</span>
										</>
									)}
								</p>
							</div>
						)}

						{/* Course Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredCourses.map((course) => (
								<div
									key={course.id}
									className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 cursor-pointer"
									onClick={() => {
										handleSelectCourse(course.id);
									}}
								>
									{/* Course Image */}
									<div className="relative overflow-hidden">
										<img
											src={course.url_image}
											alt={course.title}
											className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<div className="absolute top-4 right-4">
											<button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<MoreHorizontal size={16} className="text-gray-600" />
											</button>
										</div>
									</div>

									<div className="p-6">
										{/* Course Header */}
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
													{course.title}
												</h3>
											</div>
										</div>

										{/* Course Description */}
										<p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

										{/* Course Meta Info */}
										<div className="space-y-3 mb-6">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<Clock size={16} className="text-gray-400" />
													<span className="text-sm text-gray-600">{course.durasi} Menit</span>
												</div>
												<span
													className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(
														course.kesulitan
													)}`}
												>
													{getDifficultyIcon(course.kesulitan)}
													{course.kesulitan}
												</span>
											</div>

											<div className="flex items-center justify-between text-sm">
												<div className="flex items-center gap-1 text-gray-600">
													<Users size={16} className="text-gray-400" />
													<span>Instruktor: {course.author}</span>
												</div>
											</div>
										</div>

										{/* Action Button */}
										<button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group/btn">
											<Play size={18} className="transition-transform group-hover/btn:translate-x-0.5" />
											Mulai Belajar
											<ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Empty State */}
						{filteredCourses.length === 0 && (
							<div className="text-center py-16 mx-auto">
								<div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
									<Search size={32} className="text-gray-400" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
								<p className="text-gray-600 mb-6 max-w-md mx-auto">
									{searchQuery
										? `Tidak ada kursus yang cocok dengan pencarian "${searchQuery}"`
										: 'Coba ubah filter atau kata kunci pencarian Anda'}
								</p>
								{(searchQuery || activeFilter !== 'all') && (
									<button
										onClick={() => {
											setSearchQuery('');
											setActiveFilter('all');
										}}
										className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
									>
										Reset Filter
									</button>
								)}
							</div>
						)}
					</main>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
