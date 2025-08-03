import React, {useEffect, useState} from 'react';
import {ArrowLeft, BookOpen, Play, Image, CheckCircle, Clock, FileText, Award, ChevronRight, PlayCircle, Lock} from 'lucide-react';
import type {IMaterialsVisited, IUserQuiz, Module} from '../types/types';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {viewModule} from '../api/module';
import {viewMaterialsVisited} from '../api/materialVisited';
import {updateQuiz} from '../api/quiz';
import {viewUserQuiz} from '../api/userQuiz';

const ModulePage = () => {
	const [completedItems, setCompletedItems] = useState<string[]>([]);
	const [module, setModule] = useState<Module>();
	const [materialVisited, setMaterialVisited] = useState<IMaterialsVisited[]>([]);
	const [userQuiz, setUserQuiz] = useState<IUserQuiz>();
	const {id_module} = useParams();
	const location = useLocation();

	useEffect(() => {
		if (!id_module) {
			return;
		}

		const viewAll = async () => {
			try {
				const res = await viewModule(Number(id_module));
				setModule({
					...res,
					quiz: Array.isArray(res.quiz) ? res.quiz[0] : res.quiz,
				});
			} catch (err) {
				alert(`Error : ${err}`);
				console.log('Error view moduel : ', err);
			}
		};

		viewAll();
		console.log('IM here');
	}, [id_module]);

	useEffect(() => {
		if (!module) {
			return;
		}
		console.log('Module : ', module);

		const viewMaterialVisited = async () => {
			try {
				const materialIds = module.materials.map((m) => m.id);
				const materialsVisited: IMaterialsVisited[] = await viewMaterialsVisited(materialIds, setMaterialVisited);

				if (materialIds.length === materialsVisited.length && module.quiz.lock) {
					// update quiz
					await updateQuiz({lock: false}, module.quiz.id);
					console.log('Quiz updated');
				}

				await viewUserQuiz(module.quiz.id, setUserQuiz);
			} catch (err) {
				alert('Erro view material visited');
				console.log('Error view material visited : ', err);
			}
		};

		viewMaterialVisited();
	}, [module]);

	useEffect(() => {
		if (materialVisited.length > 0 && module) {
			if (materialVisited.length === module.materials.length && module.quiz.lock) {
				const updateQuizLock = async () => {
					try {
						await updateQuiz({lock: false}, module.quiz.id);
					} catch (err) {
						alert('Error update quiz');
						console.log('Error update quiz : ', err);
					}
				};

				updateQuizLock();
			}
		}
	}, [materialVisited, module]);

	// Moved this useEffect up before any early returns
	useEffect(() => {
		if (materialVisited.length > 0) {
			console.log('Materials visited : ', materialVisited);
		}
	}, [materialVisited]);

	const progress = () => {
		if (!materialVisited || !module) {
			console.log('Data is undefined');
			return 0; // Return 0 instead of undefined
		}

		const materialVisitedIds = materialVisited.map((m) => m.id);
		const moduleMaterialIds = module?.materials.map((m) => m.id);

		const totalVisited = moduleMaterialIds?.filter((id) => materialVisitedIds.includes(id)).length || 0;
		const progressPercentage = moduleMaterialIds?.length ? (totalVisited / moduleMaterialIds?.length) * 100 : 0;

		return progressPercentage;
	};

	const getIcon = (type: string) => {
		switch (type) {
			case 'article':
				return <FileText className="w-5 h-5" />;
			case 'video':
				return <PlayCircle className="w-5 h-5" />;
			case 'image':
				return <Image className="w-5 h-5" />;
			default:
				return <BookOpen className="w-5 h-5" />;
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'article':
				return 'bg-blue-100 text-blue-600';
			case 'video':
				return 'bg-red-100 text-red-600';
			case 'image':
				return 'bg-purple-100 text-purple-600';
			default:
				return 'bg-gray-100 text-gray-600';
		}
	};

	useEffect(() => {
		if (userQuiz) {
			console.log('User QUIZ : ', userQuiz);
		}
	}, [userQuiz]);

	// Early returns moved to after all hooks
	if (!module) return null;

	const filteredModule: Module = {
		...module!,
		materials: (module?.materials ?? []).map((m) => ({
			...m,
			completed: materialVisited.some((e) => e.materials_id === m.id),
		})),
	};

	if (!filteredModule) return null;

	console.log('Filtered Module : ', filteredModule);
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
							<h1 className="text-2xl font-bold text-gray-900 mb-2">{filteredModule?.title}</h1>
							<p className="text-gray-600 mb-4">{filteredModule?.description}</p>
							<div className="flex items-center gap-4 text-sm text-gray-500">
								<div className="flex items-center gap-1">
									<Clock className="w-4 h-4" />
									<span>{filteredModule?.duration}</span>
								</div>
								<div className="flex items-center gap-1">
									<BookOpen className="w-4 h-4" />
									<span>{filteredModule?.materials.length} materials</span>
								</div>
							</div>
						</div>
						<div className="text-right">
							<div className="text-sm text-gray-500 mb-1">Progress</div>
							<div className="text-2xl font-bold text-green-600">{progress()}%</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress()}%`}}></div>
					</div>
				</div>

				{/* Materials Section */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Materials</h2>
					<div className="space-y-3">
						{filteredModule?.materials.map((material) => {
							console.log('Material : ', material);
							return (
								<Link key={material.id} to={`${location.pathname}/material/${material.id}`}>
									<div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
											{material.completed ? (
												<CheckCircle className="w-6 h-6 text-green-500" />
											) : (
												<div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
											)}
											<ChevronRight className="w-5 h-5 text-gray-400" />
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>

				{/* Quiz Section */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment</h2>

					<Link to={!filteredModule.quiz.lock ? `${location.pathname}/quiz/${filteredModule.quiz.id}` : `#`}>
						<div
							className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
							onClick={() => {
								if (filteredModule.quiz.lock) {
									alert('Semua maeterial perlu dipelajari terlebih dahulu.');
									return;
								}
							}}
						>
							<div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
								<Award className="w-5 h-5" />
							</div>

							<div className="flex-1">
								<h3 className="font-medium text-gray-900">{filteredModule.quiz.title || ''}</h3>
								<p className="text-sm text-gray-600 mt-1">{filteredModule.quiz.description || ''}</p>
								<div className="flex items-center gap-4 mt-2">
									{!filteredModule.quiz.lock && (
										<span className="text-sm text-green-600 font-medium">Score: {filteredModule.quiz.score}%</span>
									)}
								</div>
							</div>

							<div className="flex items-center gap-2">
								{filteredModule.quiz.lock ? (
									<div className="flex items-center gap-1">
										<Lock className="w-6 h-6 text-gray-500" />
										<span className="text-sm text-gray-500 font-medium">Terkunci</span>
									</div>
								) : userQuiz ? (
									<div className="flex items-center gap-1">
										<CheckCircle className="w-6 h-6 text-gray-500" />
										<span className="text-sm text-gray-500 font-medium">{userQuiz.score}%</span>
									</div>
								) : (
									<button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors hover:cursor-pointer">
										Start Quiz
									</button>
								)}
								<ChevronRight className="w-5 h-5 text-gray-400" />
							</div>
						</div>
					</Link>
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

export default ModulePage;
