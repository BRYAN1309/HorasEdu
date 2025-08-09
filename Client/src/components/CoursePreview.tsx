import React, {useState} from 'react';
import {X, Clock, User, BookOpen, ChevronDown, ChevronRight, Play, FileText, Video, Image as ImageIcon, Youtube, Plus} from 'lucide-react';
import {useAlert} from './Alert';

export interface Material {
	id: number;
	title: string;
	module_id: number;
	content: string;
	media_url?: string;
	image_url?: string;
	description: string;
	duration: number;
	created_at: string;
	type: 'article' | 'video' | 'image' | 'youtube';
}

export interface Module {
	id: number;
	title: string;
	description: string;
	duration: number;
	total_materials: number;
	image_url: string;
	course_id: number;
	materials: Material[];
}

export interface CourseDetails {
	id: number;
	title: string;
	description: string;
	durasi: number;
	author: string;
	kesulitan: 'pemula' | 'menengah' | 'lanjutan';
	url_image: string;
	modules: Module[];
}

interface CoursePreviewModalProps {
	course?: CourseDetails;
	isOpen: boolean;
	onClose: () => void;
	onAddCourse: (courseId: number) => Promise<void>;
}

const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({course, isOpen, onClose, onAddCourse}) => {
	const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
	const [isAddingCourse, setIsAddingCourse] = useState(false);
	const {showSuccess, showError} = useAlert();

	if (!isOpen || !course) {
		return null;
	}

	const toggleModule = (moduleId: number) => {
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
			showSuccess('Kursus berhasil ditambahkan!');
			onClose();
		} catch (error) {
			showError('Gagal menambahkan kursus. Silakan coba lagi.');
			console.log('Error : ', error);
		} finally {
			setIsAddingCourse(false);
			window.location.reload();
		}
	};

	const getDifficultyColor = (kesulitan: string) => {
		const colors = {
			pemula: 'bg-green-100 text-green-800 border-green-200',
			menengah: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			lanjutan: 'bg-red-100 text-red-800 border-red-200',
		};
		return colors[kesulitan as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
	};

	const getMaterialIcon = (type: string) => {
		const iconProps = {className: 'w-4 h-4'};
		switch (type) {
			case 'video':
				return <Video {...iconProps} />;
			case 'youtube':
				return <Youtube {...iconProps} />;
			case 'image':
				return <ImageIcon {...iconProps} />;
			case 'article':
				return <FileText {...iconProps} />;
			default:
				return <FileText {...iconProps} />;
		}
	};

	const formatDuration = (minutes: number): string => {
		if (minutes < 60) {
			return `${minutes} menit`;
		}
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return remainingMinutes > 0 ? `${hours} jam ${remainingMinutes} menit` : `${hours} jam`;
	};

	const totalMaterials = course.modules.reduce((acc, module) => acc + module.total_materials, 0);
	const totalDuration = course.modules.reduce((acc, module) => acc + module.duration, 0);

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Background overlay */}
			<div className="fixed inset-0 bg-black opacity-50 transition-opacity" onClick={onClose} />

			{/* Modal Container */}
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
				{/* Modal */}
				<div className="relative bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-4xl">
					{/* Header */}
					<div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-1">Preview Kursus</h2>
								<p className="text-sm text-gray-600">Lihat detail lengkap kursus sebelum mendaftar</p>
							</div>
							<button
								onClick={onClose}
								className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="px-6 py-6 max-h-96 overflow-y-auto">
						{/* Course Header */}
						<div className="mb-8">
							<div className="flex flex-col lg:flex-row gap-6">
								{/* Course Image */}
								<div className="lg:w-1/3">
									<div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-sm">
										{course.url_image ? (
											<img src={course.url_image} alt={course.title} className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<BookOpen className="w-16 h-16 text-gray-300" />
											</div>
										)}
									</div>
								</div>

								{/* Course Info */}
								<div className="lg:w-2/3">
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-2xl font-bold text-gray-900 leading-tight">{course.title}</h3>
										<span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(course.kesulitan)}`}>
											{course.kesulitan.charAt(0).toUpperCase() + course.kesulitan.slice(1)}
										</span>
									</div>

									<p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>

									<div className="grid grid-cols-2 gap-4">
										<div className="flex items-center text-gray-600">
											<div className="bg-blue-100 p-2 rounded-lg mr-3">
												<User className="w-4 h-4 text-blue-600" />
											</div>
											<div>
												<p className="text-xs text-gray-500 uppercase tracking-wide">Instruktur</p>
												<p className="font-medium">{course.author}</p>
											</div>
										</div>

										<div className="flex items-center text-gray-600">
											<div className="bg-green-100 p-2 rounded-lg mr-3">
												<Clock className="w-4 h-4 text-green-600" />
											</div>
											<div>
												<p className="text-xs text-gray-500 uppercase tracking-wide">Durasi</p>
												<p className="font-medium">{formatDuration(course.durasi)}</p>
											</div>
										</div>

										<div className="flex items-center text-gray-600">
											<div className="bg-purple-100 p-2 rounded-lg mr-3">
												<BookOpen className="w-4 h-4 text-purple-600" />
											</div>
											<div>
												<p className="text-xs text-gray-500 uppercase tracking-wide">Modul</p>
												<p className="font-medium">{course.modules.length} Modul</p>
											</div>
										</div>

										<div className="flex items-center text-gray-600">
											<div className="bg-orange-100 p-2 rounded-lg mr-3">
												<FileText className="w-4 h-4 text-orange-600" />
											</div>
											<div>
												<p className="text-xs text-gray-500 uppercase tracking-wide">Materi</p>
												<p className="font-medium">{totalMaterials} Materi</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Modules and Materials */}
						<div className="mb-6">
							<h4 className="text-xl font-bold text-gray-900 mb-6">Struktur Kursus</h4>

							{course.modules.length === 0 ? (
								<div className="text-center py-12 bg-gray-50 rounded-xl">
									<BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
									<p className="text-gray-500 font-medium">Belum ada modul tersedia</p>
									<p className="text-gray-400 text-sm">Modul akan segera ditambahkan</p>
								</div>
							) : (
								<div className="space-y-4">
									{course.modules.map((module, index) => (
										<div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
											<button
												onClick={() => toggleModule(module.id)}
												className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
											>
												<div className="flex items-center flex-1">
													<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl text-sm font-bold mr-4 shadow-sm">
														{index + 1}
													</div>
													<div className="flex-1">
														<h5 className="font-semibold text-gray-900 mb-1">{module.title}</h5>
														<p className="text-sm text-gray-600 mb-2">{module.description}</p>
														<div className="flex items-center text-xs text-gray-500">
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
												<div className="px-6 pb-4 bg-gray-50">
													<div className="pl-14 space-y-3">
														{module.materials.length === 0 ? (
															<div className="text-center py-4 text-gray-500">
																<FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
																<p className="text-sm">Belum ada materi tersedia</p>
															</div>
														) : (
															module.materials.map((material, materialIndex) => (
																<div key={material.id} className="flex items-center py-3 px-4 bg-white rounded-lg border border-gray-100">
																	<div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs font-medium text-gray-600 mr-3">
																		{materialIndex + 1}
																	</div>
																	<div className="flex items-center text-gray-500 mr-3">{getMaterialIcon(material.type)}</div>
																	<div className="flex-1">
																		<p className="text-sm font-medium text-gray-900">{material.title}</p>
																		<p className="text-xs text-gray-600">{material.description}</p>
																	</div>
																	<div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
																		{formatDuration(material.duration)}
																	</div>
																</div>
															))
														)}
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
						<div className="text-sm text-gray-600">
							<p className="font-medium">Siap memulai pembelajaran aksara Batak?</p>
							<p className="text-xs text-gray-500">Daftar sekarang dan mulai belajar</p>
						</div>
						<div className="flex space-x-3">
							<button
								onClick={onClose}
								className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
							>
								Tutup
							</button>
							<button
								onClick={handleAddCourse}
								disabled={isAddingCourse}
								className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 border border-transparent rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
							>
								{isAddingCourse ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Menambahkan...
									</>
								) : (
									<>
										<Plus className="w-4 h-4 mr-2" />
										Tambah Kursus
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursePreviewModal;
