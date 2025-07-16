import {useState} from 'react';
import {Search, Plus, BookOpen, Users, Clock, Award, Grid, List} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Courses = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState('grid');
	const [filterStatus, setFilterStatus] = useState('all');

	const courses = [
		{
			id: 1,
			title: 'Aksara Batak Dasar',
			description: 'Pelajari dasar-dasar aksara Batak tradisional',
			image: '📚',
			color: 'bg-blue-500',
			duration: '4 jam',
			modules: 12,
			students: 245,
			progress: 75,
			status: 'active',
			level: 'Pemula',
			created_at: '2024-01-15',
			instructor: 'Dr. Mangihut Sirait',
		},
		{
			id: 2,
			title: 'Aksara Batak Menengah',
			description: 'Tingkatkan kemampuan menulis aksara Batak',
			image: '👨‍🏫',
			color: 'bg-purple-500',
			duration: '6 jam',
			modules: 16,
			students: 189,
			progress: 45,
			status: 'active',
			level: 'Menengah',
			created_at: '2024-02-10',
			instructor: 'Prof. Sari Matondang',
		},
		{
			id: 3,
			title: 'Sejarah Aksara Batak',
			description: 'Memahami sejarah dan budaya aksara Batak',
			image: '📖',
			color: 'bg-green-500',
			duration: '3 jam',
			modules: 8,
			students: 156,
			progress: 100,
			status: 'completed',
			level: 'Pemula',
			created_at: '2024-01-20',
			instructor: 'Dr. Poltak Sinaga',
		},
		{
			id: 4,
			title: 'Aksara Batak Lanjutan',
			description: 'Menguasai teknik penulisan aksara Batak kompleks',
			image: '🎓',
			color: 'bg-red-500',
			duration: '8 jam',
			modules: 20,
			students: 98,
			progress: 20,
			status: 'active',
			level: 'Lanjutan',
			created_at: '2024-03-05',
			instructor: 'Dr. Rina Sitorus',
		},
		{
			id: 5,
			title: 'Kaligrafi Aksara Batak',
			description: 'Seni menulis aksara Batak dengan indah',
			image: '✍️',
			color: 'bg-yellow-500',
			duration: '5 jam',
			modules: 10,
			students: 67,
			progress: 0,
			status: 'draft',
			level: 'Menengah',
			created_at: '2024-03-20',
			instructor: 'Prof. Maruli Situmorang',
		},
		{
			id: 6,
			title: 'Aksara Batak Digital',
			description: 'Implementasi aksara Batak di era digital',
			image: '💻',
			color: 'bg-indigo-500',
			duration: '4 jam',
			modules: 14,
			students: 134,
			progress: 60,
			status: 'active',
			level: 'Menengah',
			created_at: '2024-02-25',
			instructor: 'Dr. Togar Simanungkalit',
		},
	];

	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
		return matchesSearch && matchesFilter;
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

	const getStatusText = (status: any) => {
		switch (status) {
			case 'active':
				return 'Aktif';
			case 'completed':
				return 'Selesai';
			case 'draft':
				return 'Draft';
			default:
				return 'Unknown';
		}
	};

	const CourseCard = ({course}: {course: any}) => (
		<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
			<div className={`${course.color} h-2`}></div>
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div className={`${course.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold`}>
							{course.image}
						</div>
						<div>
							<h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
							<p className="text-sm text-gray-500">{course.level}</p>
						</div>
					</div>
					<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
						{getStatusText(course.status)}
					</span>
				</div>

				<p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

				<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
					<div className="flex items-center space-x-4">
						<span className="flex items-center">
							<Clock className="w-4 h-4 mr-1" />
							{course.duration}
						</span>
						<span className="flex items-center">
							<BookOpen className="w-4 h-4 mr-1" />
							{course.modules} modul
						</span>
						<span className="flex items-center">
							<Users className="w-4 h-4 mr-1" />
							{course.students}
						</span>
					</div>
				</div>

				<div className="mb-4">
					<div className="flex items-center justify-between text-sm mb-2">
						<span className="text-gray-600">Progress</span>
						<span className="font-medium">{course.progress}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${course.progress}%`}}></div>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-500">Instruktur: {course.instructor}</span>
					<div className="flex space-x-2">
						<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
							{course.status === 'completed' ? 'Tinjau Kembali' : 'Lanjutkan'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	const CourseRow = ({course}: {course: any}) => (
		<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 mb-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className={`${course.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold`}>
						{course.image}
					</div>
					<div>
						<h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
						<p className="text-sm text-gray-500">{course.description}</p>
					</div>
				</div>

				<div className="flex items-center space-x-6">
					<div className="text-center">
						<div className="text-sm text-gray-500">Durasi</div>
						<div className="font-medium">{course.duration}</div>
					</div>
					<div className="text-center">
						<div className="text-sm text-gray-500">Modul</div>
						<div className="font-medium">{course.modules}</div>
					</div>
					<div className="text-center">
						<div className="text-sm text-gray-500">Siswa</div>
						<div className="font-medium">{course.students}</div>
					</div>
					<div className="text-center min-w-20">
						<div className="text-sm text-gray-500">Progress</div>
						<div className="font-medium">{course.progress}%</div>
					</div>
					<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
						{getStatusText(course.status)}
					</span>
					<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
						{course.status === 'completed' ? 'Tinjau Kembali' : 'Lanjutkan'}
					</button>
				</div>
			</div>
		</div>
	);

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
								<div>
									<p className="text-sm text-gray-500">Aktif</p>
									<p className="text-2xl font-bold text-green-600">{courses.filter((c) => c.status === 'active').length}</p>
								</div>
								<BookOpen className="w-8 h-8 text-green-500" />
							</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500">Selesai</p>
									<p className="text-2xl font-bold text-blue-600">{courses.filter((c) => c.status === 'completed').length}</p>
								</div>
								<Award className="w-8 h-8 text-blue-500" />
							</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-500">Total Siswa</p>
									<p className="text-2xl font-bold text-gray-900">{courses.reduce((total, course) => total + course.students, 0)}</p>
								</div>
								<Users className="w-8 h-8 text-purple-500" />
							</div>
						</div>
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
								<select
									value={filterStatus}
									onChange={(e) => setFilterStatus(e.target.value)}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								>
									<option value="all">Semua Status</option>
									<option value="active">Aktif</option>
									<option value="completed">Selesai</option>
									<option value="draft">Draft</option>
								</select>
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
