import React, { useState } from "react";
import { ArrowLeft, BookOpen, Play, Image, CheckCircle, Clock, FileText, Award, ChevronRight, PlayCircle } from "lucide-react";

const Module = () => {
    const [completedItems, setCompletedItems] = useState<string[]>([]);

    const moduleData = {
        title: "Module 1: Introduction to Aksara Batak",
        description: "Learn the basics of Batak script, its history and cultural importance",
        progress: 60,
        duration: "45 minutes",
        materials: [
            {
                id: "article-1",
                type: "article",
                title: "History of Batak Script",
                description: "Explore the origins and evolution of Aksara Batak",
                duration: "8 min read",
                completed: true,
            },
            {
                id: "video-1",
                type: "video",
                title: "Batak Script Overview",
                description: "Video introduction to the fundamentals of Batak writing",
                duration: "12 min",
                completed: true,
            },
            {
                id: "image-1",
                type: "image",
                title: "Basic Batak Characters",
                description: "Visual guide to fundamental Aksara Batak symbols",
                duration: "5 min",
                completed: false,
            },
            {
                id: "article-2",
                type: "article",
                title: "Cultural Significance",
                description: "Understanding the cultural context of Batak script",
                duration: "10 min read",
                completed: false,
            },
            {
                id: "video-2",
                type: "video",
                title: "Writing Techniques",
                description: "Learn proper stroke order and writing methods",
                duration: "15 min",
                completed: false,
            },
        ],
        quiz: {
            title: "Introduction Quiz",
            description: "Test your understanding of Batak script fundamentals",
            questions: 10,
            score: 85,
            completed: true,
        },
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "article":
                return <FileText className="w-5 h-5" />;
            case "video":
                return <PlayCircle className="w-5 h-5" />;
            case "image":
                return <Image className="w-5 h-5" />;
            default:
                return <BookOpen className="w-5 h-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "article":
                return "bg-blue-100 text-blue-600";
            case "video":
                return "bg-red-100 text-red-600";
            case "image":
                return "bg-purple-100 text-purple-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Course</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Module Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{moduleData.title}</h1>
                            <p className="text-gray-600 mb-4">{moduleData.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{moduleData.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{moduleData.materials.length} materials</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Progress</div>
                            <div className="text-2xl font-bold text-green-600">{moduleData.progress}%</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${moduleData.progress}%` }}></div>
                    </div>
                </div>

                {/* Materials Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Materials</h2>
                    <div className="space-y-3">
                        {moduleData.materials.map((material, index) => (
                            <div key={material.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>{getIcon(material.type)}</div>

                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{material.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-500">{material.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {material.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>}
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment</h2>
                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                            <Award className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{moduleData.quiz.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{moduleData.quiz.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-500">{moduleData.quiz.questions} questions</span>
                                {moduleData.quiz.completed && <span className="text-sm text-green-600 font-medium">Score: {moduleData.quiz.score}%</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {moduleData.quiz.completed ? (
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="text-sm text-green-600 font-medium">Completed</span>
                                </div>
                            ) : (
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Start Quiz</button>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Previous Module</button>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">Next Module</button>
                </div>
            </div>
        </div>
    );
};

export default Module;
