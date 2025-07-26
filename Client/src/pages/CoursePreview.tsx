import React, {useState} from 'react';
import {X, Clock, User, BarChart3, Play, FileText, Video, Image, BookOpen, ChevronDown, ChevronRight} from 'lucide-react';
import type {CoursePreviewProps} from '../types/types';

interface Material {
	id: string;
	module_id: string;
	title: string;
	content: string;
	media_url?: string;
	image_url?: string;
	description: string;
	type: 'video' | 'text' | 'image' | 'quiz';
	duration: number;
	created_at: string;
}

interface Module {
	id: string;
	course_id: string;
	inserted_at: string;
	updated_at: string;
	title: string;
	description: string;
	duration: number;
	total_materials: number;
	image_url?: string;
	materials: Material[];
}

const CoursePreviewModal: React.FC<CoursePreviewProps> = ({course, isOpen, onClose, onAddCourse}) => {
	const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
	const [isAddingCourse, setIsAddingCourse] = useState(false);

	if (!isOpen) return null;

	const toggleModule = (moduleId: string) => {
		const newExpanded = new Set(expandedModules);
		if (newExpanded.has(moduleId)) {
			newExpanded.delete(moduleId);
		} else {
			newExpanded.add(moduleId);
		}
		setExpandedModules(newExpanded);
	};

	const handleAddCourse = async () => {
		setIsAddingCourse(true);
		try {
			await onAddCourse(course.id);
			// Show success message
			alert('Kursus berhasil ditambahkan!');
			onClose();
		} catch (error) {
			alert('Gagal menambahkan kursus. Silakan coba lagi.');
		} finally {
			setIsAddingCourse(false);
		}
	};

	const getDifficultyColor = (kesulitan: string) => {
		const colors = {
			pemula: 'bg-green-100 text-green-800',
			menengah: 'bg-yellow-100 text-yellow-800',
			lanjutan: 'bg-red-100 text-red-800',
		};
		return colors[kesulitan as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	};

	const getStatusColor = (status: string) => {
		return status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
	};

	const getMaterialIcon = (type: string) => {
		const icons = {
			video: Video,
			text: FileText,
			image: Image,
			quiz: BookOpen,
		};
		const Icon = icons[type as keyof typeof icons] || FileText;
		return <Icon className="w-4 h-4" />;
	};

	const formatDuration = (minutes: number) => {
		if (minutes < 60) {
			return `${minutes} menit`;
		}
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return remainingMinutes > 0 ? `${hours} jam ${remainingMinutes} menit` : `${hours} jam`;
	};

	const totalMaterials = course.modules.reduce((acc: any, module: any) => acc + module.total_materials, 0);

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				{/* Background overlay */}
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

				{/* Modal */}
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
					{/* Header */}
					<div className="bg-white px-6 pt-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900">Preview Kursus</h2>
							<button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
								<X className="w-6 h-6" />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="px-6 py-4 max-h-96 overflow-y-auto">
						{/* Course Header */}
						<div className="mb-6">
							<div className="flex flex-col lg:flex-row gap-6">
								{/* Course Image */}
								<div className="lg:w-1/3">
									<div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
										{course.url_image ? (
											<img src={course.url_image} alt={course.title} className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<BookOpen className="w-16 h-16 text-gray-400" />
											</div>
										)}
									</div>
								</div>

								{/* Course Info */}
								<div className="lg:w-2/3">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
									<p className="text-gray-600 mb-4">{course.description}</p>

									<div className="flex flex-wrap gap-2 mb-4">
										<span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.kesulitan)}`}>
											{course.kesulitan.charAt(0).toUpperCase() + course.kesulitan.slice(1)}
										</span>
										{/* <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
											{course.status === 'published' ? 'Tersedia' : 'Draft'}
										</span> */}
									</div>

									<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
										<div className="flex items-center">
											<User className="w-4 h-4 mr-2" />
											<span>Instruktur: {course.author}</span>
										</div>
										<div className="flex items-center">
											<Clock className="w-4 h-4 mr-2" />
											<span>Durasi: {formatDuration(course.durasi)}</span>
										</div>
										<div className="flex items-center">
											<BookOpen className="w-4 h-4 mr-2" />
											<span>{course.modules.length} Modul</span>
										</div>
										<div className="flex items-center">
											<FileText className="w-4 h-4 mr-2" />
											<span>{totalMaterials} Materi</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Modules and Materials */}
						<div className="mb-6">
							<h4 className="text-lg font-semibold text-gray-900 mb-4">Struktur Kursus</h4>
							<div className="space-y-3">
								{course.modules.map((module: any, index: any) => (
									<div key={module.id} className="border border-gray-200 rounded-lg">
										<button
											onClick={() => toggleModule(module.id)}
											className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors"
										>
											<div className="flex items-center flex-1">
												<div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3">
													{index + 1}
												</div>
												<div className="flex-1">
													<h5 className="font-medium text-gray-900">{module.title}</h5>
													<p className="text-sm text-gray-600">{module.description}</p>
													<div className="flex items-center text-xs text-gray-500 mt-1">
														<Clock className="w-3 h-3 mr-1" />
														<span>{formatDuration(module.duration)}</span>
														<span className="mx-2">•</span>
														<span>{module.total_materials} materi</span>
													</div>
												</div>
											</div>
											{expandedModules.has(module.id) ? (
												<ChevronDown className="w-5 h-5 text-gray-400" />
											) : (
												<ChevronRight className="w-5 h-5 text-gray-400" />
											)}
										</button>

										{expandedModules.has(module.id) && (
											<div className="px-4 pb-3">
												<div className="pl-11 space-y-2">
													{module.materials.map((material: any, materialIndex: any) => (
														<div key={material.id} className="flex items-center py-2 px-3 bg-gray-50 rounded-md">
															<div className="flex items-center justify-center w-6 h-6 bg-white rounded text-xs font-medium text-gray-600 mr-3">
																{materialIndex + 1}
															</div>
															<div className="flex items-center text-gray-600 mr-2">{getMaterialIcon(material.type)}</div>
															<div className="flex-1">
																<p className="text-sm font-medium text-gray-900">{material.title}</p>
																<p className="text-xs text-gray-600">{material.description}</p>
															</div>
															<div className="text-xs text-gray-500">{formatDuration(material.duration)}</div>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
						<div className="text-sm text-gray-600">
							<p>Mulai belajar aksara Batak dengan kursus ini</p>
						</div>
						<div className="flex space-x-3">
							<button
								onClick={onClose}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Tutup
							</button>
							<button
								onClick={handleAddCourse}
								disabled={isAddingCourse}
								className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isAddingCourse ? 'Menambahkan...' : 'Tambah Kursus'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursePreviewModal;
