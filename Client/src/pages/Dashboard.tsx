import { useEffect, useState } from "react";
import { Search, BookOpen, Trophy, Clock, Star, Play, CheckCircle, MoreHorizontal } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import type { Course } from "../types/types";
import { viewAllCourse } from "../api/courses";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    // Sample course data
    // const courses = [
    //     {
    //         id: 1,
    //         title: "Aksara Batak Dasar",
    //         description: "Pelajari dasar-dasar aksara Batak tradisional",
    //         progress: 75,
    //         finalScore: 85,
    //         chapters: 12,
    //         completedChapters: 9,
    //         duration: "4 jam",
    //         difficulty: "Pemula",
    //         image: "📚",
    //         color: "bg-blue-500",
    //     },
    //     {
    //         id: 2,
    //         title: "Aksara Batak Menengah",
    //         description: "Tingkatkan kemampuan menulis aksara Batak",
    //         progress: 45,
    //         finalScore: 78,
    //         chapters: 16,
    //         completedChapters: 7,
    //         duration: "6 jam",
    //         difficulty: "Menengah",
    //         image: "✍️",
    //         color: "bg-purple-500",
    //     },
    //     {
    //         id: 3,
    //         title: "Sejarah Aksara Batak",
    //         description: "Memahami sejarah dan budaya aksara Batak",
    //         progress: 100,
    //         finalScore: 92,
    //         chapters: 8,
    //         completedChapters: 8,
    //         duration: "3 jam",
    //         difficulty: "Pemula",
    //         image: "📜",
    //         color: "bg-green-500",
    //     },
    //     {
    //         id: 4,
    //         title: "Aksara Batak Lanjutan",
    //         description: "Menguasai teknik penulisan aksara Batak kompleks",
    //         progress: 20,
    //         finalScore: 0,
    //         chapters: 20,
    //         completedChapters: 4,
    //         duration: "8 jam",
    //         difficulty: "Lanjutan",
    //         image: "🎓",
    //         color: "bg-red-500",
    //     },
    // ];

    const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Pemula":
                return "bg-green-100 text-green-800";
            case "Menengah":
                return "bg-yellow-100 text-yellow-800";
            case "Lanjutan":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    useEffect(() => {
        try {
            viewAllCourse(setCourses);
        } catch (err) {
            console.error(`View all course : ${err}`);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                {/* Top Navigation */}
                <Navbar />

                <main className="p-6">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari kursus..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Kursus Selesai</p>
                                    <p className="text-3xl font-bold text-gray-900">1</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CheckCircle size={24} className="text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sedang Belajar</p>
                                    <p className="text-3xl font-bold text-gray-900">2</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <BookOpen size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Rata-rata Nilai</p>
                                    <p className="text-3xl font-bold text-gray-900">85</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <Trophy size={24} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                                <div className="p-6 hover:cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-full">
                                            <img src={course.url_image} alt="" className="w-full rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{course.title}</h3>

                                        <div className="flex items-center">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.kesulitan)}`}>{course.kesulitan}</span>
                                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                                <MoreHorizontal size={16} className="text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <Clock size={16} className="mr-1" />
                                            {course.durasi} Menit
                                        </div>
                                        <div className="flex items-center">
                                            <BookOpen size={16} className="mr-1" />
                                            {/* {course.completedChapters}/{course.chapters} bab */}
                                        </div>
                                    </div>

                                    <p className="flex items-center justify-between text-sm text-gray-500 mb-4">Instruktor : {course.author}</p>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        {/* <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-600">Progress</span>
                                            <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                                        </div> */}
                                        {/* <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }}></div>
                                        </div> */}
                                    </div>

                                    {/* Score */}
                                    {/* {course.finalScore > 0 && (
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium text-gray-600">Nilai Akhir</span>
                                            <div className="flex items-center">
                                                <Star size={16} className="text-yellow-500 mr-1" />
                                                <span className="font-medium text-gray-900">{course.finalScore}</span>
                                            </div>
                                        </div>
                                    )} */}

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                                        <Play size={18} className="mr-2" />
                                        {/* {course.progress === 100 ? "Tinjau Kembali" : "Lanjutkan"} */}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
