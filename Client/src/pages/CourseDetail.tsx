import React, {useEffect, useState} from 'react';
import {
	BookOpen,
	Play,
	Clock,
	Award,
	CheckCircle,
	Lock,
	FileText,
	Video,
	Image,
	ArrowLeft,
	Star,
	Calendar,
	Target,
	Trophy,
} from 'lucide-react';
import type {Module, Course, Material, CourseDetails, IMaterialsVisited, IModuleVisited, FinalExam, IUserFinalExam} from '../types/types';
import {Link, useAsyncError, useLocation, useParams} from 'react-router-dom';
import {viewCourseDetails} from '../api/courses';
import {viewMaterialsVisited} from '../api/materialVisited';
import {viewModulesVisited} from '../api/moduleVisited';
import {viewFinalExam, viewUserFinalExam} from '../api/finalExam';
import {useAlert} from '../components/Alert';

const CourseDetailsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'progress'>('overview');
	const [course, setCourses] = useState<CourseDetails>();
	const [materialVisited, setMaterialVisited] = useState<IMaterialsVisited[]>([]);
	const [moduleVisited, setModuleVisited] = useState<IModuleVisited[]>([]);
	const [modules, setModules] = useState<Module[]>([]);
	const [finalExam, setFinalExam] = useState<FinalExam>();
	const [userFinalExam, setUserFinalExam] = useState<IUserFinalExam>();
	const {showError, showSuccess} = useAlert();

	const location = useLocation();
	const {id_course} = useParams();

	useEffect(() => {
		if (!id_course) return;

		const viewAll = async () => {
			try {
				const res = await viewCourseDetails(Number(id_course));
				setCourses(res.data);
				await viewFinalExam(setFinalExam, Number(id_course));
			} catch (err) {
				showError('Error getting data.');
				console.log('Error : ', err);
			}
		};

		viewAll();
	}, []);

	useEffect(() => {
		if (!finalExam) return;

		const getUserFinalExam = async () => {
			try {
				await viewUserFinalExam(setUserFinalExam, finalExam.id);
			} catch (err) {
				showError('Error getting data');
				console.log('Error getting data : ', err);
			}
		};

		getUserFinalExam();
	}, [finalExam]);

	useEffect(() => {
		const getMaterialVisited = async () => {
			if (!course) {
				return;
			}

			try {
				const materialIds: number[] = course.modules.flatMap((m) => m.materials.map((material) => material.id));
				await viewMaterialsVisited(materialIds, setMaterialVisited);
				const modulesIds = course.modules.map((m) => m.id);
				await viewModulesVisited(modulesIds, setModuleVisited);
			} catch (err) {
				showError('Terjadi kesalahan.');
				console.log('Error getting material visited : ', err);
			}
		};

		getMaterialVisited();
	}, [course]);

	useEffect(() => {
		if (modules.length < 1) {
			return;
		}

		const getModulesVisited = async () => {
			try {
				const moduleIds = modules.map((module) => module.id);
				await viewModulesVisited(moduleIds, setModuleVisited);
			} catch (err) {
				showSuccess('Error mengambil data');
				console.log('Error getting all modules : ', err);
			}
		};

		getModulesVisited();
	}, [modules]);

	// Check if a module is visited (has any materials visited)
	const isModuleVisited = (moduleId: number): boolean => {
		const moduleData = course?.modules.find((m) => m.id === moduleId);
		if (!moduleData) return false;

		const moduleMaterialIds = moduleData.materials.map((m) => m.id);
		return moduleMaterialIds.some((materialId) => materialVisited.some((visited) => visited.materials_id === materialId));
	};

	// Check if a module is completed (all materials visited)
	const isModuleCompleted = (moduleId: number): boolean => {
		const moduleData = course?.modules.find((m) => m.id === moduleId);
		if (!moduleData) return false;

		const moduleMaterialIds = moduleData.materials.map((m) => m.id);
		return moduleMaterialIds.every((materialId) => materialVisited.some((visited) => visited.materials_id === materialId));
	};

	// Check if a module should be locked
	const isModuleLocked = (moduleIndex: number): boolean => {
		if (moduleIndex === 0) return false; // First module is always unlocked

		// Check if previous module is completed
		const previousModule = orderedModules[moduleIndex - 1];
		return !isModuleCompleted(previousModule.id);
	};

	// Check if all modules are completed (for final exam)
	const areAllModulesCompleted = (): boolean => {
		if (!course?.modules || course.modules.length === 0) return false;
		return course.modules.every((module) => isModuleCompleted(module.id));
	};

	// Order modules and materials
	const orderedModules = course?.modules
		? [...course.modules]
				.sort((a, b) => a.id - b.id) // Assuming id represents order, adjust if needed
				.map((module) => ({
					...module,
					materials: [...module.materials].sort((a, b) => a.order - b.order),
					completed: isModuleCompleted(module.id),
				}))
		: [];

	const progress = () => {
		if (!course) return 0;

		const allMaterialIds = course.modules.flatMap((m) => m.materials.map((material) => material.id));
		const visitedMaterialIds = materialVisited.map((v) => v.materials_id);

		const visitedCount = allMaterialIds.filter((id) => visitedMaterialIds.includes(id)).length;
		const totalCount = allMaterialIds.length;

		if (totalCount === 0) return 0;
		return Number(((visitedCount / totalCount) * 100).toFixed(2));
	};

	const getModuleProgress = (moduleId: number): number => {
		const moduleData = course?.modules.find((m) => m.id === moduleId);
		if (!moduleData) return 0;

		const moduleMaterialIds = moduleData.materials.map((m) => m.id);
		const visitedCount = moduleMaterialIds.filter((materialId) =>
			materialVisited.some((visited) => visited.materials_id === materialId)
		).length;

		if (moduleMaterialIds.length === 0) return 0;
		return Math.round((visitedCount / moduleMaterialIds.length) * 100);
	};

	const completedModules = orderedModules.filter((module) => module.completed).length;
	const totalMaterials = orderedModules.reduce((total, module) => total + module.materials.length, 0);

	const getModuleIcon = (module: Module, moduleIndex: number) => {
		if (isModuleLocked(moduleIndex)) return <Lock className="w-5 h-5 text-gray-400" />;
		if (module.completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
		if (isModuleVisited(module.id)) return <Play className="w-5 h-5 text-blue-500" />;
		return <Play className="w-5 h-5 text-gray-400" />;
	};

	const getMaterialIcon = (type: Material['type']) => {
		switch (type) {
			case 'article':
				return <FileText className="w-4 h-4 text-blue-500" />;
			case 'video':
				return <Video className="w-4 h-4 text-red-500" />;
			case 'youtube':
				return <Video className="w-4 h-4 text-red-500" />;
			case 'image':
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
								<Link to={'/courses'}>
									<span>Back to Courses</span>
								</Link>
							</button>
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
									<h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
									<p className="text-gray-600 text-lg">{course?.description}</p>
								</div>
								<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">{course?.kesulitan}</span>
							</div>

							<div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
								<div className="flex items-center space-x-1">
									<Clock className="w-4 h-4" />
									<span>{course?.durasi} hours</span>
								</div>
								<div className="flex items-center space-x-1">
									<BookOpen className="w-4 h-4" />
									<span>{orderedModules.length} modules</span>
								</div>
								<div className="flex items-center space-x-1">
									<FileText className="w-4 h-4" />
									<span>{totalMaterials} materials</span>
								</div>
								<div className="flex items-center space-x-1">
									<Calendar className="w-4 h-4" />
									<span>Created {new Date(course?.created_at || '').toLocaleDateString()}</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<img
										src={`https://ui-avatars.com/api/?name=${course?.author}&background=10b981&color=fff`}
										alt={course?.author}
										className="w-8 h-8 rounded-full"
									/>
									<span className="text-sm font-medium text-gray-900">{course?.author}</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="text-sm text-gray-500">Progress: {progress()}%</div>
									<div className="w-32 bg-gray-200 rounded-full h-2">
										<div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress()}%`}} />
									</div>
								</div>
							</div>
						</div>

						{/* Tabs */}
						<div className="bg-white rounded-lg shadow-sm mb-6">
							<div className="border-b border-gray-200">
								<nav className="flex space-x-8 px-6">
									<button
										onClick={() => setActiveTab('overview')}
										className={`py-4 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
										}`}
									>
										Overview
									</button>
									<button
										onClick={() => setActiveTab('modules')}
										className={`py-4 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'modules' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
										}`}
									>
										Modules
									</button>
									<button
										onClick={() => setActiveTab('progress')}
										className={`py-4 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'progress' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
										}`}
									>
										Progress
									</button>
								</nav>
							</div>

							<div className="p-6">
								{activeTab === 'overview' && (
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

								{activeTab === 'modules' && (
									<div className="space-y-4">
										{/* Regular Modules */}
										{orderedModules.map((module, index) => {
											const moduleProgress = getModuleProgress(module.id);
											const isLocked = isModuleLocked(index);

											return (
												<div key={module.id} className={`border border-gray-200 rounded-lg p-4 ${isLocked ? 'opacity-60' : ''}`}>
													<div className="flex items-start justify-between mb-3">
														<div className="flex items-center space-x-3">
															{getModuleIcon(module, index)}
															<div>
																<h4 className="font-semibold text-gray-900">
																	Module {index + 1}: {module.title}
																</h4>
																<p className="text-sm text-gray-600">{module.description}</p>
																{isLocked && <p className="text-xs text-red-500 mt-1">Complete the previous module to unlock this one</p>}
															</div>
														</div>
														<div className="flex items-center space-x-2 text-sm text-gray-500">
															<span>{moduleProgress}%</span>
															<div className="w-16 bg-gray-200 rounded-full h-2">
																<div
																	className="bg-green-500 h-2 rounded-full transition-all duration-300"
																	style={{width: `${moduleProgress}%`}}
																/>
															</div>
														</div>
													</div>

													<div className="ml-8 space-y-2">
														<div className="text-sm font-medium text-gray-700 mb-2">Materials:</div>
														{module.materials.map((material) => (
															<div key={material.id} className="flex items-center space-x-2 text-sm">
																{getMaterialIcon(material.type)}
																<span className="text-gray-700">{material.title}</span>
																<span className="text-xs text-gray-500">({material.duration} min)</span>
															</div>
														))}

														<div className="flex items-center space-x-2 text-sm mt-3">
															<Award className="w-4 h-4 text-yellow-500" />
															<span className="text-gray-700">{module.quiz.title}</span>
															{!module.quiz.lock && <span className="text-green-600 font-medium">(Score: {module.quiz.score}%)</span>}
														</div>
													</div>

													<div className="mt-4 flex space-x-2">
														<Link to={`${location.pathname}/module/${module.id}`}>
															<button
																className={`px-4 py-2 rounded-md transition-colors text-sm ${
																	isLocked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
																}`}
																disabled={isLocked}
															>
																{module.completed ? 'Review Module' : 'Start Module'}
															</button>
														</Link>
														{!module.quiz.lock && !isLocked && (
															<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
																Retake Quiz
															</button>
														)}
													</div>
												</div>
											);
										})}

										{/* Final Exam Section */}
										<div
											className={`border-2 rounded-lg p-6 bg-gradient-to-r from-purple-50 to-indigo-50 ${
												!areAllModulesCompleted() ? 'opacity-60' : 'border-purple-200'
											}`}
										>
											<div className="flex items-start justify-between mb-4">
												<div className="flex items-center space-x-3">
													{areAllModulesCompleted() ? (
														<Trophy className="w-6 h-6 text-purple-500" />
													) : (
														<Lock className="w-6 h-6 text-gray-400" />
													)}
													<div>
														<h4 className="font-bold text-xl text-gray-900 flex items-center space-x-2">
															<span>Final Exam</span>
															<Trophy className="w-5 h-5 text-yellow-500" />
														</h4>
														<p className="text-sm text-gray-600 mt-1">Comprehensive assessment covering all course modules</p>
														{!areAllModulesCompleted() && (
															<p className="text-sm text-red-500 mt-2 font-medium">Complete all modules to unlock the final exam</p>
														)}
													</div>
												</div>
												<div className="flex items-center space-x-2">
													<div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Final Assessment</div>
												</div>
											</div>

											<div className="ml-9 space-y-3">
												<div className="text-sm text-gray-700">
													<strong>Exam Details:</strong>
												</div>
												<ul className="text-sm text-gray-600 space-y-1 ml-4">
													<li>• Duration: 60 minutes</li>
													<li>• Questions: 50 multiple choice + 5 essay</li>
													<li>• Passing score: 70%</li>
													<li>• Attempts allowed: 3</li>
													<li>• Covers content from all {orderedModules.length} modules</li>
												</ul>

												{/* Score Section */}
												{userFinalExam && (
													<div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
														<div className="flex items-center space-x-2 text-blue-700 text-sm">
															<CheckCircle className="w-4 h-4" />
															<span>
																Your latest score: <strong>{userFinalExam.score}%</strong>
															</span>
														</div>
													</div>
												)}

												{areAllModulesCompleted() && (
													<div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
														<div className="flex items-center space-x-2 text-green-700 text-sm">
															<CheckCircle className="w-4 h-4" />
															<span>All prerequisites completed! You can now take the final exam.</span>
														</div>
													</div>
												)}

												{!areAllModulesCompleted() && (
													<div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
														<div className="flex items-center space-x-2 text-yellow-700 text-sm">
															<Clock className="w-4 h-4" />
															<span>
																Complete {orderedModules.length - completedModules} more module
																{orderedModules.length - completedModules !== 1 ? 's' : ''} to unlock
															</span>
														</div>
													</div>
												)}
											</div>

											<div className="mt-6 flex space-x-3">
												{finalExam && (
													<>
														<Link
															to={areAllModulesCompleted() ? `${location.pathname}/final_exam/${finalExam.id}` : '#'}
															className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
																areAllModulesCompleted()
																	? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
																	: 'bg-gray-300 text-gray-500 pointer-events-none'
															}`}
														>
															{areAllModulesCompleted() ? (userFinalExam ? 'Retake Final Exam' : 'Start Final Exam') : 'Final Exam Locked'}
														</Link>

														{areAllModulesCompleted() && (
															<button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
																View Exam Guidelines
															</button>
														)}
													</>
												)}
											</div>
										</div>
									</div>
								)}

								{activeTab === 'progress' && (
									<div className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="bg-gray-50 p-4 rounded-lg">
												<div className="text-2xl font-bold text-gray-900">{completedModules}</div>
												<div className="text-sm text-gray-600">Modules Completed</div>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<div className="text-2xl font-bold text-gray-900">{progress()}%</div>
												<div className="text-sm text-gray-600">Overall Progress</div>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<div className="text-2xl font-bold text-gray-900">{orderedModules.filter((m) => !m.quiz.lock).length}</div>
												<div className="text-sm text-gray-600">Quizzes Passed</div>
											</div>
										</div>

										<div>
											<h3 className="text-lg font-semibold mb-4">Module Progress</h3>
											<div className="space-y-3">
												{orderedModules.map((module, index) => {
													const moduleProgress = getModuleProgress(module.id);
													const isLocked = isModuleLocked(index);

													return (
														<div
															key={module.id}
															className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${isLocked ? 'opacity-60' : ''}`}
														>
															<div className="flex items-center space-x-3">
																{getModuleIcon(module, index)}
																<span className="font-medium">
																	Module {index + 1}: {module.title}
																</span>
																{isLocked && <span className="text-xs text-red-500">(Locked)</span>}
															</div>
															<div className="flex items-center space-x-3">
																<div className="w-32 bg-gray-200 rounded-full h-2">
																	<div
																		className="bg-green-500 h-2 rounded-full transition-all duration-300"
																		style={{width: `${moduleProgress}%`}}
																	/>
																</div>
																<span className="text-sm font-medium w-12 text-right">{moduleProgress}%</span>
															</div>
														</div>
													);
												})}

												{/* Final Exam Progress Item */}
												<div
													className={`flex items-center justify-between p-3 rounded-lg border-2 border-dashed ${
														areAllModulesCompleted() ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-300 opacity-60'
													}`}
												>
													<div className="flex items-center space-x-3">
														{areAllModulesCompleted() ? (
															<Trophy className="w-5 h-5 text-purple-500" />
														) : (
															<Lock className="w-5 h-5 text-gray-400" />
														)}
														<span className="font-medium">Final Exam</span>
														{!areAllModulesCompleted() && <span className="text-xs text-red-500">(Locked)</span>}
													</div>
													<div className="flex items-center space-x-3">
														<div className="text-sm font-medium text-purple-600">{areAllModulesCompleted() ? 'Available' : 'Locked'}</div>
													</div>
												</div>
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
									<span className="font-medium">{progress()}%</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Completed Modules</span>
									<span className="font-medium">
										{completedModules}/{orderedModules.length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Total Materials</span>
									<span className="font-medium">{totalMaterials}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Quizzes Passed</span>
									<span className="font-medium">{orderedModules.filter((m) => !m.quiz.lock).length}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Final Exam</span>
									<span className={`font-medium ${areAllModulesCompleted() ? 'text-purple-600' : 'text-gray-400'}`}>
										{finalExam ? 'Completed' : areAllModulesCompleted() ? 'Available' : 'Locked'}
									</span>
								</div>
							</div>

							<div className="mt-6 pt-6 border-t border-gray-200">
								<h4 className="font-semibold mb-3">Next Steps</h4>
								<div className="text-sm text-gray-600">
									{!areAllModulesCompleted() ? (
										<div>
											Continue with <span className="font-medium text-gray-900">{orderedModules.find((m) => !m.completed)?.title}</span>
										</div>
									) : progress() < 100 ? (
										<div className="text-purple-600 font-medium">Ready for Final Exam! 🎓</div>
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
