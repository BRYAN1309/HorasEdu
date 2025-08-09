import React, {useEffect, useState} from 'react';
import {
	ArrowLeft,
	Clock,
	CheckCircle,
	XCircle,
	Award,
	ChevronRight,
	ChevronLeft,
	RotateCcw,
	Trophy,
	Target,
	AlertCircle,
	BookOpen,
	GraduationCap,
	Shield,
	FileText,
} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {submitFinalExam, viewFinalExam} from '../api/finalExam';
import type {OptionKey, FinalExam} from '../types/types';

const FinalExamPage = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
	const [showResults, setShowResults] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0); // Will be set from exam duration
	const [examStarted, setExamStarted] = useState(false);
	const [finalExam, setFinalExam] = useState<FinalExam>();
	const {id_final_exam} = useParams();

	useEffect(() => {
		if (!id_final_exam) return;

		const viewFinalExamPage = async () => {
			try {
				await viewFinalExam(Number(id_final_exam), setFinalExam);
			} catch (err) {
				alert('Error loading final exam');
				console.log('Error view final exam page : ', err);
			}
		};

		viewFinalExamPage();
	}, []);

	useEffect(() => {
		if (finalExam) {
			console.log('FINAL EXAM : ', finalExam);
			// Set timer based on exam duration (convert minutes to seconds)
			setTimeLeft(finalExam.duration * 60);
		}
	}, [finalExam]);

	// Timer countdown effect
	useEffect(() => {
		if (!examStarted || timeLeft <= 0 || showResults) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					// Auto-submit when time runs out
					handleSubmitFinalExam();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [examStarted, timeLeft, showResults]);

	if (!finalExam || !finalExam.questions) return null;

	const formatTime = (seconds: any) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const handleAnswerSelect = (questionId: any, answer: string) => {
		setSelectedAnswers((prev: any) => ({
			...prev,
			[questionId]: answer,
		}));
	};

	const handleSubmitFinalExam = async () => {
		try {
			const res = await submitFinalExam(calculateScore(), finalExam.id);
			console.log('Submit final exam response : ', res);
		} catch (err) {
			alert('Error submitting final exam');
			console.log('Error submit final exam : ', err);
		} finally {
			setShowResults(true);
		}
	};

	const calculateScore = () => {
		let correct = 0;
		finalExam.questions.forEach((question) => {
			if (selectedAnswers[question.id] === question.correct_answer_value) {
				correct++;
			}
		});
		return Math.round((correct / finalExam.questions.length) * 100);
	};

	const getScoreColor = (score: any) => {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	const getScoreIcon = (score: any) => {
		if (score >= 80) return <GraduationCap className="w-8 h-8 text-green-600" />;
		if (score >= 60) return <Target className="w-8 h-8 text-yellow-600" />;
		return <AlertCircle className="w-8 h-8 text-red-600" />;
	};

	const optionKeys: OptionKey[] = ['option_a', 'option_b', 'option_c', 'option_d'];

	if (!examStarted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
				{/* Header */}
				<div className="bg-white border-b-2 border-indigo-200 shadow-sm">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Course</span>
								</Link>
							</button>
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
								<div className="text-3xl font-bold text-blue-600 mb-2">{finalExam.questions.length}</div>
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
										<li>• You have {finalExam.duration} minutes to complete all questions</li>
										<li>• Once started, the timer cannot be paused</li>
										<li>• Review your answers carefully before submitting</li>
										<li>• A minimum score of {finalExam.pass_score}% is required to pass</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="flex justify-center gap-4">
							<button
								onClick={() => setExamStarted(true)}
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
		const correctAnswers = finalExam.questions.filter((q) => selectedAnswers[q.id] === q.correct_answer_value).length;
		const isPassed = score >= finalExam.pass_score;

		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
				{/* Header */}
				<div className="bg-white border-b-2 border-indigo-200 shadow-sm">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Course</span>
								</Link>
							</button>
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
								<div className="text-4xl font-bold text-red-600 mb-2">{finalExam.questions.length - correctAnswers}</div>
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
								{finalExam.questions.map((question, index) => {
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
									onClick={() => {
										setShowResults(false);
										setCurrentQuestion(0);
										setSelectedAnswers({});
										setExamStarted(false);
										setTimeLeft(finalExam.duration * 60);
									}}
									className="flex items-center gap-3 bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
								>
									<RotateCcw className="w-5 h-5" />
									Retake Exam
								</button>
							)}
							{isPassed && (
								<button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg">
									Continue to Certificate
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	const question = finalExam.questions[currentQuestion];
	const progress = ((currentQuestion + 1) / finalExam.questions.length) * 100;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
			{/* Header */}
			<div className="bg-white border-b-2 border-indigo-200 sticky top-0 z-10 shadow-sm">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Course</span>
								</Link>
							</button>
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
								Question {currentQuestion + 1} of {finalExam.questions.length}
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
						{finalExam.questions.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentQuestion(index)}
								className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
									index === currentQuestion
										? 'bg-indigo-600 text-white shadow-lg'
										: selectedAnswers[finalExam.questions[index].id] !== undefined
										? 'bg-green-100 text-green-700 border-2 border-green-300'
										: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>

					{currentQuestion === finalExam.questions.length - 1 ? (
						<button
							onClick={async () => await handleSubmitFinalExam()}
							disabled={Object.keys(selectedAnswers).length !== finalExam.questions.length}
							className={`flex items-center gap-3 px-8 py-3 rounded-xl transition-all font-semibold ${
								Object.keys(selectedAnswers).length !== finalExam.questions.length
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
							}`}
						>
							Submit Final Exam
							<GraduationCap className="w-5 h-5" />
						</button>
					) : (
						<button
							onClick={() => setCurrentQuestion(Math.min(finalExam.questions.length - 1, currentQuestion + 1))}
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
