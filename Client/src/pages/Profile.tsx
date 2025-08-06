import React, { useState } from "react";
import { User, Mail, Calendar, Lock, Eye, EyeOff, Book, Trophy, Clock, CheckCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Course {
    id: string;
    title: string;
    description: string;
    progress: number;
    status: "Aktif" | "Selesai" | "Draft";
    instructor: string;
    totalModules: number;
    completedModules: number;
    duration: string;
    color: string;
}

interface UserProfile {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

const ProfilePage: React.FC = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Mock user data
    const user: UserProfile = {
        id: "1",
        name: "Aksara Batak",
        email: "aksara@batak.com",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-07-20T14:45:00Z",
    };

    // Mock courses data
    const courses: Course[] = [
        {
            id: "1",
            title: "Aksara Batak Dasar",
            description: "Belajar dasar-dasar aksara Batak tradisional",
            progress: 75,
            status: "Aktif",
            instructor: "Dr. Mangihut Siraji",
            totalModules: 12,
            completedModules: 9,
            duration: "4 jam",
            color: "blue",
        },
        {
            id: "2",
            title: "Aksara Batak Menengah",
            description: "Tingkatkan kemampuan menulis aksara Batak",
            progress: 45,
            status: "Aktif",
            instructor: "Prof. Sari Matondang",
            totalModules: 16,
            completedModules: 7,
            duration: "6 jam",
            color: "purple",
        },
        {
            id: "3",
            title: "Sejarah Aksara Batak",
            description: "Memahami sejarah dan budaya aksara Batak",
            progress: 100,
            status: "Selesai",
            instructor: "Dr. Poltak Sinaga",
            totalModules: 8,
            completedModules: 8,
            duration: "3 jam",
            color: "green",
        },
        {
            id: "4",
            title: "Aksara Batak Lanjutan",
            description: "Menguasai teknik penulisan aksara Batak kompleks",
            progress: 20,
            status: "Aktif",
            instructor: "Dr. Tumpal Siahaan",
            totalModules: 20,
            completedModules: 4,
            duration: "8 jam",
            color: "red",
        },
    ];

    const handlePasswordSubmit = () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Password baru dan konfirmasi password tidak cocok!");
            return;
        }
        // Handle password change logic here
        alert("Password berhasil diubah!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "bg-blue-500",
            purple: "bg-purple-500",
            green: "bg-green-500",
            red: "bg-red-500",
        };
        return colors[color as keyof typeof colors] || "bg-gray-500";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const completedCourses = courses.filter((course) => course.status === "Selesai").length;
    const activeCourses = courses.filter((course) => course.status === "Aktif").length;
    const totalProgress = Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div>
                <Navbar />
                {/* Header
				<div className="bg-white shadow-sm border-b">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center">
								<h1 className="text-xl font-semibold text-gray-900">Profil Pengguna</h1>
							</div>
						</div>
					</div>
				</div> */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 flex flex-1 flex-col">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <User className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h2>
                                    <p className="text-gray-600 mb-4">{user.email}</p>
                                    <div className="text-sm text-gray-500">
                                        <p>Bergabung sejak {formatDate(user.created_at)}</p>
                                    </div>
                                </div>

                                <nav className="mt-8">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${activeTab === "profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                                    >
                                        <User className="w-4 h-4 mr-3" />
                                        Informasi Profil
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("courses")}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${activeTab === "courses" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                                    >
                                        <Book className="w-4 h-4 mr-3" />
                                        Progress Kursus
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("password")}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === "password" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
                                    >
                                        <Lock className="w-4 h-4 mr-3" />
                                        Ubah Password
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {activeTab === "profile" && (
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-6 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Informasi Profil</h3>
                                        <p className="text-sm text-gray-600">Informasi dasar tentang akun Anda</p>
                                    </div>
                                    <div className="p-6">
                                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <User className="w-4 h-4 mr-2" />
                                                    Nama Lengkap
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    Email
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Tanggal Bergabung
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">{formatDate(user.created_at)}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Terakhir Diperbarui
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">{formatDate(user.updated_at)}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            )}

                            {activeTab === "courses" && (
                                <div className="space-y-6">
                                    {/* Stats Overview */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Book className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-600">Total Kursus</p>
                                                    <p className="text-2xl font-semibold text-gray-900">{courses.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                                                    <p className="text-2xl font-semibold text-gray-900">{completedCourses}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <Clock className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-600">Progress Rata-rata</p>
                                                    <p className="text-2xl font-semibold text-gray-900">{totalProgress}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course List */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <div className="p-6 border-b border-gray-200">
                                            <h3 className="text-lg font-medium text-gray-900">Progress Kursus</h3>
                                            <p className="text-sm text-gray-600">Detail kemajuan pembelajaran Anda</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-6">
                                                {courses.map((course) => (
                                                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center">
                                                                    <div className={`w-3 h-3 rounded-full ${getColorClasses(course.color)} mr-3`}></div>
                                                                    <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
                                                                    <span
                                                                        className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                                                                            course.status === "Selesai" ? "bg-green-100 text-green-800" : course.status === "Aktif" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                                        }`}
                                                                    >
                                                                        {course.status}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                                                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                                                                    <span>Instruktur: {course.instructor}</span>
                                                                    <span>•</span>
                                                                    <span>
                                                                        {course.completedModules}/{course.totalModules} modul
                                                                    </span>
                                                                    <span>•</span>
                                                                    <span>{course.duration}</span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-6 text-right">
                                                                <div className="text-2xl font-semibold text-gray-900">{course.progress}%</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                                <span>Progress</span>
                                                                <span>{course.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div className={`h-2 rounded-full ${getColorClasses(course.color)}`} style={{ width: `${course.progress}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "password" && (
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-6 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Ubah Password</h3>
                                        <p className="text-sm text-gray-600">Perbarui password Anda untuk keamanan akun</p>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-6">
                                            <div>
                                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                                    Password Saat Ini
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type={showCurrentPassword ? "text" : "password"}
                                                        id="currentPassword"
                                                        value={passwordForm.currentPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                                        {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                                    Password Baru
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type={showNewPassword ? "text" : "password"}
                                                        id="newPassword"
                                                        value={passwordForm.newPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowNewPassword(!showNewPassword)}>
                                                        {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                    Konfirmasi Password Baru
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        id="confirmPassword"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={handlePasswordSubmit}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Ubah Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
