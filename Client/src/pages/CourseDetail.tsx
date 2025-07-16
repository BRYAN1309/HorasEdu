import React, { useState } from "react";
import { BookOpen, Play, Clock, Award, CheckCircle, Lock, FileText, Video, Image, ArrowLeft, Star, Calendar, Target } from "lucide-react";
import type { Module, Course, Material } from "../types/types";
import { Link } from "react-router-dom";
// TypeScript interfaces

const CourseDetailsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"overview" | "modules" | "progress">("overview");

    // Sample course data
    const course: Course = {
        id: 1,
        title: "Aksara Batak Fundamentals",
        description:
            "Master the ancient Batak script with comprehensive lessons covering history, writing techniques, and cultural significance. This course provides a solid foundation for reading and writing traditional Batak characters.",
        created_by: "Dr. Mangihut Sirait",
        created_at: "2024-01-15",
        instructor: "Dr. Mangihut Sirait",
        duration: "4 hours",
        level: "Beginner",
        students: 245,
        rating: 4.8,
        progress: 65,
        modules: [
            {
                id: 1,
                title: "Introduction to Aksara Batak",
                description: "Learn the basics of Batak script, its history and cultural importance",
                course_id: 1,
                completed: true,
                progress: 100,
                materials: [
                    {
                        id: 1,
                        title: "History of Batak Script",
                        content: "The origins and evolution of Aksara Batak...",
                        type: "article",
                        created_at: "2024-01-15",
                    },
                    {
                        id: 2,
                        title: "Batak Script Overview",
                        content: "",
                        media_url: "https://example.com/batak-overview.jpg",
                        type: "image",
                        created_at: "2024-01-15",
                    },
                ],
                quiz: {
                    id: 1,
                    title: "Introduction Quiz",
                    module_id: 1,
                    created_at: "2024-01-15",
                    score: 85,
                    completed: true,
                },
            },
            {
                id: 2,
                title: "Basic Characters and Symbols",
                description: "Master the fundamental characters used in Batak writing",
                course_id: 1,
                completed: true,
                progress: 100,
                materials: [
                    {
                        id: 3,
                        title: "Basic Consonants",
                        content: "Learn the primary consonant characters...",
                        type: "article",
                        created_at: "2024-01-16",
                    },
                    {
                        id: 4,
                        title: "Writing Practice Video",
                        content: "",
                        media_url: "https://www.youtube.com/watch?v=example",
                        type: "youtube",
                        created_at: "2024-01-16",
                    },
                ],
                quiz: {
                    id: 2,
                    title: "Basic Characters Quiz",
                    module_id: 2,
                    created_at: "2024-01-16",
                    score: 92,
                    completed: true,
                },
            },
            {
                id: 3,
                title: "Vowels and Diacritics",
                description: "Understanding vowel marks and their proper usage",
                course_id: 1,
                completed: false,
                progress: 60,
                materials: [
                    {
                        id: 5,
                        title: "Vowel Systems",
                        content: "Complete guide to Batak vowel marks...",
                        type: "article",
                        created_at: "2024-01-17",
                    },
                    {
                        id: 6,
                        title: "Diacritics Tutorial",
                        content: "",
                        media_url: "https://example.com/diacritics.mp4",
                        type: "video",
                        created_at: "2024-01-17",
                    },
                ],
                quiz: {
                    id: 3,
                    title: "Vowels and Diacritics Quiz",
                    module_id: 3,
                    created_at: "2024-01-17",
                    completed: false,
                },
            },
            {
                id: 4,
                title: "Word Formation",
                description: "Learn to combine characters into meaningful words",
                course_id: 1,
                completed: false,
                progress: 0,
                materials: [
                    {
                        id: 7,
                        title: "Word Structure Rules",
                        content: "Understanding how Batak words are formed...",
                        type: "article",
                        created_at: "2024-01-18",
                    },
                ],
                quiz: {
                    id: 4,
                    title: "Word Formation Quiz",
                    module_id: 4,
                    created_at: "2024-01-18",
                    completed: false,
                },
            },
        ],
    };

    const completedModules = course.modules.filter((module) => module.completed).length;
    const totalMaterials = course.modules.reduce((total, module) => total + module.materials.length, 0);

    const getModuleIcon = (module: Module) => {
        if (module.completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
        if (module.progress > 0) return <Play className="w-5 h-5 text-blue-500" />;
        return <Lock className="w-5 h-5 text-gray-400" />;
    };

    const getMaterialIcon = (type: Material["type"]) => {
        switch (type) {
            case "article":
                return <FileText className="w-4 h-4 text-blue-500" />;
            case "video":
                return <Video className="w-4 h-4 text-red-500" />;
            case "youtube":
                return <Video className="w-4 h-4 text-red-500" />;
            case "image":
                return <Image className="w-4 h-4 text-green-500" />;
            default:
                return <FileText className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="w-5 h-5" />
                                <Link to={"/courses"}>
                                    <span>Back to Courses</span>
                                </Link>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">{course.students} students</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                                    <p className="text-gray-600 text-lg">{course.description}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{course.level}</span>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.modules.length} modules</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FileText className="w-4 h-4" />
                                    <span>{totalMaterials} materials</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Created {new Date(course.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=10b981&color=fff`} alt={course.instructor} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-medium text-gray-900">{course.instructor}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="text-sm text-gray-500">Progress: {course.progress}%</div>
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-sm mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6">
                                    <button
                                        onClick={() => setActiveTab("overview")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "overview" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("modules")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "modules" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Modules
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("progress")}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "progress" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Progress
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Master the fundamentals of Aksara Batak writing system</span>
                                                </li>
                                                <li className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Understand the historical and cultural significance</span>
                                                </li>
                                                <li className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Learn proper character formation and writing techniques</span>
                                                </li>
                                                <li className="flex items-start space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Practice with authentic Batak texts and examples</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Course Requirements</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start space-x-2">
                                                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Basic understanding of Indonesian language</span>
                                                </li>
                                                <li className="flex items-start space-x-2">
                                                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Interest in Batak culture and traditions</span>
                                                </li>
                                                <li className="flex items-start space-x-2">
                                                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">Willingness to practice writing exercises</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "modules" && (
                                    <div className="space-y-4">
                                        {course.modules.map((module, index) => (
                                            <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        {getModuleIcon(module)}
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">
                                                                Module {index + 1}: {module.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-600">{module.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <span>{module.progress}%</span>
                                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${module.progress}%` }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ml-8 space-y-2">
                                                    <div className="text-sm font-medium text-gray-700 mb-2">Materials:</div>
                                                    {module.materials.map((material) => (
                                                        <div key={material.id} className="flex items-center space-x-2 text-sm">
                                                            {getMaterialIcon(material.type)}
                                                            <span className="text-gray-700">{material.title}</span>
                                                        </div>
                                                    ))}

                                                    <div className="flex items-center space-x-2 text-sm mt-3">
                                                        <Award className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-gray-700">{module.quiz.title}</span>
                                                        {module.quiz.completed && <span className="text-green-600 font-medium">(Score: {module.quiz.score}%)</span>}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex space-x-2">
                                                    <button
                                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                                                        disabled={!module.completed && index > 0 && !course.modules[index - 1].completed}
                                                    >
                                                        {module.completed ? "Review Module" : "Start Module"}
                                                    </button>
                                                    {module.quiz.completed && <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">Retake Quiz</button>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "progress" && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{completedModules}</div>
                                                <div className="text-sm text-gray-600">Modules Completed</div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{course.progress}%</div>
                                                <div className="text-sm text-gray-600">Overall Progress</div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{course.modules.filter((m) => m.quiz.completed).length}</div>
                                                <div className="text-sm text-gray-600">Quizzes Passed</div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
                                            <div className="space-y-3">
                                                {course.modules.map((module, index) => (
                                                    <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center space-x-3">
                                                            {getModuleIcon(module)}
                                                            <span className="font-medium">
                                                                Module {index + 1}: {module.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${module.progress}%` }} />
                                                            </div>
                                                            <span className="text-sm font-medium w-12 text-right">{module.progress}%</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                            <h3 className="text-lg font-semibold mb-4">Course Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Total Progress</span>
                                    <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Completed Modules</span>
                                    <span className="font-medium">
                                        {completedModules}/{course.modules.length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Total Materials</span>
                                    <span className="font-medium">{totalMaterials}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Quizzes Passed</span>
                                    <span className="font-medium">{course.modules.filter((m) => m.quiz.completed).length}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold mb-3">Next Steps</h4>
                                <div className="text-sm text-gray-600">
                                    {course.progress < 100 ? (
                                        <div>
                                            Continue with <span className="font-medium text-gray-900">{course.modules.find((m) => !m.completed)?.title}</span>
                                        </div>
                                    ) : (
                                        <div className="text-green-600 font-medium">Course completed! 🎉</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;
