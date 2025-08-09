import {useEffect, useState} from 'react';
import {
	ArrowLeft,
	Clock,
	CheckCircle,
	XCircle,
	ChevronRight,
	ChevronLeft,
	RotateCcw,
	Target,
	AlertCircle,
	BookOpen,
	GraduationCap,
	Shield,
	FileText,
	Loader,
} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {submitFinalExam, viewFinalExam} from '../api/finalExam';
import type {OptionKey, FinalExam} from '../types/types';
import {useAlert} from '../components/Alert';
import {updateCourse} from '../api/courses';

const FinalExamPage = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
	const [showResults, setShowResults] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);
	const [examStarted, setExamStarted] = useState(false);
	const [finalExam, setFinalExam] = useState<FinalExam>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>('');
	const {id_course, id_final_exam} = useParams();
	const {showError} = useAlert();
	// Debug logging fuction
	const debugLog = (message: string, data?: any) => {
		console.log(`🎯 FinalExam: ${message}`, data || '');
	};

	useEffect(() => {
		debugLog('Component mounted', {id_course, id_final_exam});

		if (!id_final_exam || !id_course) {
			debugLog('❌ Missing required parameters');
			setError('Missing course or exam ID');
			setLoading(false);
			return;
		}

		const viewFinalExamPage = async () => {
			try {
				debugLog('📡 Fetching final exam data...');
				setLoading(true);
				setError('');

				await viewFinalExam(setFinalExam, Number(id_course));
				debugLog('✅ API call completed successfully');
			} catch (err) {
				debugLog('❌ Error loading final exam', err);
				setError('Failed to load final exam. Please try again.');
				console.error('Error view final exam page:', err);
			} finally {
				setLoading(false);
			}
		};

		viewFinalExamPage();
	}, [id_course, id_final_exam]); // Added dependencies

	useEffect(() => {
		debugLog('Final exam data updated', {
			hasFinalExam: !!finalExam,
			hasQuestions: !!finalExam?.final_exam_questions,
			questionsLength: finalExam?.final_exam_questions?.length,
			duration: finalExam?.duration,
		});

		if (finalExam && finalExam.duration) {
			// Set timer based on exam duration (convert minutes to seconds)
			const timeInSeconds = finalExam.duration * 60;
			setTimeLeft(timeInSeconds);
			debugLog('⏰ Timer set', {duration: finalExam.duration, timeInSeconds});
		}
	}, [finalExam]);

	// Timer countdown effect
	useEffect(() => {
		if (!examStarted || timeLeft <= 0 || showResults) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					debugLog('⏰ Time expired - auto submitting');
					// Auto-submit when time runs out
					handleSubmitFinalExam();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [examStarted, timeLeft, showResults]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const handleAnswerSelect = (questionId: any, answer: string) => {
		debugLog('Answer selected', {questionId, answer});
		setSelectedAnswers((prev) => ({
			...prev,
			[questionId]: answer,
		}));
	};

	const handleSubmitFinalExam = async () => {
		try {
			debugLog('📤 Submitting final exam...');
			const score = calculateScore();
			const res = await submitFinalExam(score, finalExam!.id);
			await updateCourse({status: 'selesai'}, Number(id_course));
			debugLog('✅ Submit successful', {score, response: res});
		} catch (err) {
			debugLog('❌ Submit failed', err);
			showError('Error \n');
			console.error('Error submit final exam:', err);
		} finally {
			setShowResults(true);
		}
	};

	const calculateScore = () => {
		if (!finalExam?.final_exam_questions) return 0;

		let correct = 0;
		finalExam.final_exam_questions.forEach((question) => {
			if (selectedAnswers[question.id] === question.correct_answer_value) {
				correct++;
			}
		});
		const score = Math.round((correct / finalExam.final_exam_questions.length) * 100);
		debugLog('📊 Score calculated', {correct, total: finalExam.final_exam_questions.length, score});
		return score;
	};

	const getScoreColor = (score: number) => {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	const getScoreIcon = (score: number) => {
		if (score >= 80) return <GraduationCap className="w-8 h-8 text-green-600" />;
		if (score >= 60) return <Target className="w-8 h-8 text-yellow-600" />;
		return <AlertCircle className="w-8 h-8 text-red-600" />;
	};

	const resetExam = () => {
		debugLog('🔄 Resetting exam');
		setShowResults(false);
		setCurrentQuestion(0);
		setSelectedAnswers({});
		setExamStarted(false);
		setTimeLeft(finalExam!.duration * 60);
	};

	const optionKeys: OptionKey[] = ['option_a', 'option_b', 'option_c', 'option_d'];

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<Loader className="animate-spin rounded-full h-12 w-12 text-indigo-600 mx-auto mb-4" />
					<p className="text-gray-600 text-lg">Loading exam data...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
				<div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Exam</h2>
					<p className="text-gray-600 mb-6">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// Check if exam data is valid
	if (!finalExam) {
		debugLog('❌ No final exam data available');
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
				<div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
					<AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-4">No Exam Data</h2>
					<p className="text-gray-600 mb-6">Unable to load exam information.</p>
					<Link
						to={`${location.pathname.split('/').slice(0, -2).join('/')}`}
						className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Back to Course
					</Link>
				</div>
			</div>
		);
	}

	if (!finalExam.final_exam_questions || finalExam.final_exam_questions.length === 0) {
		debugLog('❌ No final_exam_questions available', {final_exam_questions: finalExam.final_exam_questions});
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
				<div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
					<AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h2>
					<p className="text-gray-600 mb-6">This exam doesn't have any final_exam_questions yet.</p>
					<Link
						to={`${location.pathname.split('/').slice(0, -2).join('/')}`}
						className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Back to Course
					</Link>
				</div>
			</div>
		);
	}

	if (!examStarted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
				{/* Header */}
				<div className="bg-white border-b-2 border-indigo-200 shadow-sm">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<Link
								to={`${location.pathname.split('/').slice(0, -2).join('/')}`}
								className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors"
							>
								<ArrowLeft className="w-5 h-5" />
								<span>Back to Course</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Final Exam Introduction */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="bg-white rounded-xl shadow-lg border-2 border-indigo-100 p-8 text-center">
						<div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
							<GraduationCap className="w-10 h-10" />
						</div>

						<div className="mb-6">
							<div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
								<Shield className="w-4 h-4 mr-2" />
								FINAL EXAMINATION
							</div>
							<h1 className="text-4xl font-bold text-gray-900 mb-4">{finalExam.title}</h1>
							<p className="text-gray-600 mb-8 text-lg leading-relaxed">{finalExam.description}</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
								<FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
								<div className="text-3xl font-bold text-blue-600 mb-2">{finalExam.final_exam_questions.length}</div>
								<div className="text-gray-600 font-medium">Questions</div>
							</div>
							<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
								<Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
								<div className="text-3xl font-bold text-purple-600 mb-2">{finalExam.duration}</div>
								<div className="text-gray-600 font-medium">Minutes</div>
							</div>
							<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
								<Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
								<div className="text-3xl font-bold text-green-600 mb-2">{finalExam.pass_score}%</div>
								<div className="text-gray-600 font-medium">Passing Score</div>
							</div>
						</div>

						<div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 text-left rounded-lg">
							<div className="flex">
								<div className="flex-shrink-0">
									<AlertCircle className="h-6 w-6 text-red-400" />
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-semibold text-red-800 mb-2">Important Instructions</h3>
									<ul className="text-sm text-red-700 space-y-1">
										<li>• This is a proctored final examination</li>
										<li>• You have {finalExam.duration} minutes to complete all final_exam_questions</li>
										<li>• Once started, the timer cannot be paused</li>
										<li>• Review your answers carefully before submitting</li>
										<li>• A minimum score of {finalExam.pass_score}% is required to pass</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="flex justify-center gap-4">
							<button
								onClick={() => {
									debugLog('🚀 Starting exam');
									setExamStarted(true);
								}}
								className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								Begin Final Exam
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (showResults) {
		const score = calculateScore();
		const correctAnswers = finalExam.final_exam_questions.filter((q) => selectedAnswers[q.id] === q.correct_answer_value).length;
		const isPassed = score >= finalExam.pass_score;

		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
				{/* Header */}
				<div className="bg-white border-b-2 border-indigo-200 shadow-sm">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<Link
								to={`${location.pathname.split('/').slice(0, -2).join('/')}`}
								className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors"
							>
								<ArrowLeft className="w-5 h-5" />
								<span>Back to Course</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="bg-white rounded-xl shadow-lg border-2 border-indigo-100 p-8">
						<div className="text-center mb-8">
							<div className="mb-6">{getScoreIcon(score)}</div>
							<div
								className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-4 ${
									isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
								}`}
							>
								{isPassed ? 'EXAM PASSED' : 'EXAM FAILED'}
							</div>
							<h1 className="text-4xl font-bold text-gray-900 mb-2">Final Exam Complete</h1>
							<p className="text-gray-600 text-lg">Your examination results are ready</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
								<div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</div>
								<div className="text-gray-600 font-medium">Final Score</div>
							</div>
							<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
								<div className="text-4xl font-bold text-green-600 mb-2">{correctAnswers}</div>
								<div className="text-gray-600 font-medium">Correct</div>
							</div>
							<div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 text-center border border-red-100">
								<div className="text-4xl font-bold text-red-600 mb-2">{finalExam.final_exam_questions.length - correctAnswers}</div>
								<div className="text-gray-600 font-medium">Incorrect</div>
							</div>
							<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
								<div className="text-4xl font-bold text-purple-600 mb-2">{finalExam.pass_score}%</div>
								<div className="text-gray-600 font-medium">Required</div>
							</div>
						</div>

						{/* Answer Review */}
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
								<BookOpen className="w-6 h-6 text-indigo-600" />
								Answer Review
							</h2>
							<div className="space-y-6">
								{finalExam.final_exam_questions.map((question, index) => {
									const isCorrect = selectedAnswers[question.id] === question.correct_answer_value;
									const userAnswer = selectedAnswers[question.id];

									return (
										<div key={question.id} className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
											<div className="flex items-start gap-4 mb-4">
												{isCorrect ? (
													<CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
												) : (
													<XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
												)}
												<div className="flex-1">
													<h3 className="font-semibold text-gray-900 mb-3 text-lg">
														Question {index + 1}: {question.questions_text}
													</h3>
													{question.url_image && (
														<img src={question.url_image} alt="Question image" className="mb-4 rounded-lg max-w-md shadow-sm" />
													)}
													<div className="space-y-2 text-base">
														<p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>Your answer: {userAnswer}</p>
														{!isCorrect && <p className="text-green-600 font-medium">Correct answer: {question.correct_answer_value}</p>}
													</div>
												</div>
											</div>
											<div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
												<h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
												<p className="text-blue-700">{question.explanation}</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="flex justify-center gap-4">
							{!isPassed && (
								<button
									onClick={resetExam}
									className="flex items-center gap-3 bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
								>
									<RotateCcw className="w-5 h-5" />
									Retake Exam
								</button>
							)}
							{isPassed && (
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg">
										Back to course
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	const question = finalExam.final_exam_questions[currentQuestion];
	const progress = ((currentQuestion + 1) / finalExam.final_exam_questions.length) * 100;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
			{/* Header */}
			<div className="bg-white border-b-2 border-indigo-200 sticky top-0 z-10 shadow-sm">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link
								to={`${location.pathname.split('/').slice(0, -2).join('/')}`}
								className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors"
							>
								<ArrowLeft className="w-5 h-5" />
								<span>Back to Course</span>
							</Link>
						</div>

						<div className="flex items-center gap-8">
							<div
								className={`flex items-center gap-3 px-4 py-2 rounded-full font-semibold ${
									timeLeft <= 300 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
								}`}
							>
								<Clock className="w-5 h-5" />
								<span className="text-lg">{formatTime(timeLeft)}</span>
							</div>

							<div className="text-base text-gray-600 font-medium">
								Question {currentQuestion + 1} of {finalExam.final_exam_questions.length}
							</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="mt-4">
						<div className="w-full bg-gray-200 rounded-full h-3">
							<div
								className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
								style={{width: `${progress}%`}}
							></div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Question */}
				<div className="bg-white rounded-xl shadow-lg border-2 border-indigo-100 p-8 mb-8">
					<div className="mb-6">
						<div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
							Question {currentQuestion + 1}
						</div>
						<h2 className="text-2xl font-semibold text-gray-900 leading-relaxed">{question.questions_text}</h2>
					</div>

					{question.url_image && (
						<div className="mb-6">
							<img src={question.url_image} alt="Question image" className="rounded-lg max-w-full shadow-md" />
						</div>
					)}

					<div className="space-y-4">
						{optionKeys.map((key, index) => {
							const option = question[key];
							const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

							if (!option) return null; // Skip if option doesn't exist

							return (
								<button
									key={index}
									onClick={() => handleAnswerSelect(question.id, option)}
									className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
										selectedAnswers[question.id] === option
											? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
											: 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
									}`}
								>
									<div className="flex items-center gap-4">
										<div
											className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
												selectedAnswers[question.id] === option
													? 'border-indigo-500 bg-indigo-500 text-white'
													: 'border-gray-300 text-gray-600'
											}`}
										>
											{optionLetter}
										</div>
										<span className="text-lg">{option}</span>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Navigation */}
				<div className="flex justify-between items-center">
					<button
						onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
						disabled={currentQuestion === 0}
						className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-semibold ${
							currentQuestion === 0
								? 'bg-gray-100 text-gray-400 cursor-not-allowed'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg'
						}`}
					>
						<ChevronLeft className="w-5 h-5" />
						Previous
					</button>

					<div className="flex items-center gap-3">
						{finalExam.final_exam_questions.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentQuestion(index)}
								className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
									index === currentQuestion
										? 'bg-indigo-600 text-white shadow-lg'
										: selectedAnswers[finalExam.final_exam_questions[index].id] !== undefined
										? 'bg-green-100 text-green-700 border-2 border-green-300'
										: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>

					{currentQuestion === finalExam.final_exam_questions.length - 1 ? (
						<button
							onClick={handleSubmitFinalExam}
							disabled={Object.keys(selectedAnswers).length !== finalExam.final_exam_questions.length}
							className={`flex items-center gap-3 px-8 py-3 rounded-xl transition-all font-semibold ${
								Object.keys(selectedAnswers).length !== finalExam.final_exam_questions.length
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
							}`}
						>
							Submit Final Exam
							<GraduationCap className="w-5 h-5" />
						</button>
					) : (
						<button
							onClick={() => setCurrentQuestion(Math.min(finalExam.final_exam_questions.length - 1, currentQuestion + 1))}
							className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
						>
							Next
							<ChevronRight className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FinalExamPage;
