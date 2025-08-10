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
} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {submitQuiz, viewQuiz} from '../api/quiz';
import type {OptionKey, Quiz} from '../types/types';

const QuizPage = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
	const [showResults, setShowResults] = useState(false);
	const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
	const [quizStarted, setQuizStarted] = useState(false);
	const [quiz, setQuiz] = useState<Quiz>();
	const {id_quiz} = useParams();

	useEffect(() => {
		if (!id_quiz) return;

		const viewQuizPage = async () => {
			try {
				await viewQuiz(Number(id_quiz), setQuiz);
			} catch (err) {
				alert('Error view quiz page');
				console.log('Error view quiz page : ', err);
			}
		};

		viewQuizPage();
	}, []);

	useEffect(() => {
		if (quiz) {
			console.log('QUIZ : ', quiz);
		}
	}, [quiz]);

	if (!quiz || !quiz.questions) return null;

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

	const handleSubmitQuiz = async () => {
		try {
			const res = await submitQuiz(calculateScore(), quiz.id);
			console.log('Submit quiz response : ', res);
		} catch (err) {
			alert('Error submit quiz');
			console.log('Error submit quiz : ', err);
		} finally {
			setShowResults(true);
		}
	};

	const calculateScore = () => {
		let correct = 0;
		quiz.questions.forEach((question) => {
			if (selectedAnswers[question.id] === question.correct_answer_value) {
				correct++;
			}
		});
		return Math.round((correct / quiz.questions.length) * 100);
	};

	const getScoreColor = (score: any) => {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	const getScoreIcon = (score: any) => {
		if (score >= 80) return <Trophy className="w-6 h-6 text-green-600" />;
		if (score >= 60) return <Target className="w-6 h-6 text-yellow-600" />;
		return <AlertCircle className="w-6 h-6 text-red-600" />;
	};

	const optionKeys: OptionKey[] = ['option_a', 'option_b', 'option_c', 'option_d'];

	if (!quizStarted) {
		return (
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<div className="bg-white border-b border-gray-200">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Module</span>
								</Link>
							</button>
						</div>
					</div>
				</div>

				{/* Quiz Introduction */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
						<div className="p-4 bg-yellow-100 text-yellow-600 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
							<Award className="w-8 h-8" />
						</div>

						<h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
						<p className="text-gray-600 mb-8 text-lg">{quiz.description}</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="text-2xl font-bold text-green-600 mb-2">{quiz.questions.length || ''}</div>
								<div className="text-gray-600">Pertanyaan</div>
							</div>
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="text-2xl font-bold text-blue-600 mb-2">{quiz.duration}</div>
								<div className="text-gray-600">Menit</div>
							</div>
							<div className="bg-gray-50 rounded-lg p-4">
								<div className="text-2xl font-bold text-purple-600 mb-2">{quiz.pass_score}%</div>
								<div className="text-gray-600">Skor kelulusan</div>
							</div>
						</div>

						<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 text-left">
							<div className="flex">
								<div className="flex-shrink-0">
									<AlertCircle className="h-5 w-5 text-blue-400" />
								</div>
								<div className="ml-3">
									<p className="text-sm text-blue-700">
										<strong>Instruksi:</strong> Bacalah setiap pertanyaan dengan cermat dan pilih jawaban yang paling tepat. Anda dapat
										meninjau kembali jawaban Anda sebelum mengirimkan. Semoga berhasil!
									</p>
								</div>
							</div>
						</div>

						<button
							onClick={() => setQuizStarted(true)}
							className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium hover:cursor-pointer"
						>
							Start Quiz
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (showResults) {
		const score = calculateScore();
		const correctAnswers = quiz.questions.filter((q) => selectedAnswers[q.id] === q.correct_answer).length;

		return (
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<div className="bg-white border-b border-gray-200">
					<div className="max-w-4xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Module</span>
								</Link>
							</button>
						</div>
					</div>
				</div>

				{/* Results */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
						<div className="text-center mb-8">
							<div className="mb-4">{getScoreIcon(score)}</div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
							<p className="text-gray-600 text-lg">Here are your results</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="bg-gray-50 rounded-lg p-6 text-center">
								<div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</div>
								<div className="text-gray-600">Final Score</div>
							</div>
							<div className="bg-gray-50 rounded-lg p-6 text-center">
								<div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}</div>
								<div className="text-gray-600">Correct Answers</div>
							</div>
							<div className="bg-gray-50 rounded-lg p-6 text-center">
								<div className="text-3xl font-bold text-blue-600 mb-2">{quiz.questions.length - correctAnswers}</div>
								<div className="text-gray-600">Incorrect</div>
							</div>
						</div>

						{/* Answer Review */}
						<div className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Answers</h2>
							<div className="space-y-4">
								{quiz.questions.map((question, index) => {
									const isCorrect = selectedAnswers[question.id] === question.correct_answer_value;

									console.log('Selected answer : ', selectedAnswers[question.id]);
									const userAnswer = selectedAnswers[question.id];

									return (
										<div key={question.id} className=" border border-gray-200 rounded-lg p-4">
											<div className="flex items-start gap-3 mb-3">
												{isCorrect ? (
													<CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
												) : (
													<XCircle className="w-5 h-5 text-red-500 mt-0.5" />
												)}
												<div className="flex-1">
													<h3 className="font-medium text-gray-900 mb-2">
														{index + 1}. {question.questions_text}
													</h3>
													<div className="space-y-1 text-sm">
														<p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>Your answer: {userAnswer}</p>
														{!isCorrect && (
															<p className="text-green-600">
																Correct answer: {question.correct_answer}, {question.correct_answer_value}
															</p>
														)}
													</div>
												</div>
											</div>
											<div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
												<strong>Explanation:</strong> {question.explanation}
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="flex justify-center gap-4">
							<button
								onClick={() => {
									setShowResults(false);
									setCurrentQuestion(0);
									setSelectedAnswers({});
									setQuizStarted(false);
								}}
								className="hover:cursor-pointer flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
							>
								<RotateCcw className="w-5 h-5" />
								Retake Quiz
							</button>
							<button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
								Continue to Next Module
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const question = quiz.questions[currentQuestion];
	const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
								<ArrowLeft className="w-5 h-5" />
								<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
									<span>Back to Module</span>
								</Link>
							</button>
						</div>

						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Clock className="w-4 h-4" />
								<span>{formatTime(timeLeft)}</span>
							</div>

							<div className="text-sm text-gray-600">
								Question {currentQuestion + 1} of {quiz.questions.length}
							</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="mt-4">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Question */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
					{question.url_image && (
						<img src={question.url_image} alt="" className="w-full min-h-64 max-h-72 object-cover mb-4 rounded-md object-center" />
					)}

					<h2 className="text-2xl font-semibold text-gray-900 mb-6">{question.questions_text}</h2>

					<div className="space-y-3">
						{optionKeys.map((key, index) => {
							const option = question[key];
							return (
								<button
									key={index}
									onClick={() => handleAnswerSelect(question.id, option)}
									className={`w-full text-left p-4 rounded-lg border-2 hover:cursor-pointer transition-all ${
										selectedAnswers[question.id] === option
											? 'border-green-500 bg-green-50 text-green-700'
											: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
									}`}
								>
									<div className="flex items-center gap-3">
										<div
											className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
												selectedAnswers[question.id] === option ? 'border-green-500 bg-green-500' : 'border-gray-300'
											}`}
										>
											{selectedAnswers[question.id] === option && <CheckCircle className="w-4 h-4 text-white" />}
										</div>
										<span className="text-lg">{option}</span>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Navigation */}
				{/* <div className="flex justify-between items-center">
					<button
						onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
						disabled={currentQuestion === 0}
						className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
							currentQuestion === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						<ChevronLeft className="w-5 h-5" />
						Previous
					</button>

					<div className="flex items-center gap-2">
						{quiz.questions.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentQuestion(index)}
								className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
									index === currentQuestion
										? 'bg-green-600 text-white'
										: selectedAnswers[quiz.questions[index].id] !== undefined
										? 'bg-green-100 text-green-700'
										: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>

					{currentQuestion === quiz.questions.length - 1 ? (
						<button
							onClick={async () => await handleSubmitQuiz()}
							disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
							className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors hover:cursor-pointer ${
								Object.keys(selectedAnswers).length !== quiz.questions.length
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-green-600 text-white hover:bg-green-700'
							}`}
						>
							Submit Quiz
							<Award className="w-5 h-5" />
						</button>
					) : (
						<button
							onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
							className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
						>
							Next
							<ChevronRight className="w-5 h-5" />
						</button>
					)}
				</div> */}
				{/* Responsive Quiz Navigation */}
				<div className="space-y-4">
					{/* Progress Section */}
					<div className="flex items-center justify-between text-sm">
						<span className="text-gray-600 font-medium">
							Question {currentQuestion + 1} of {quiz.questions.length}
						</span>
						<span className="text-green-600 font-medium">{Object.keys(selectedAnswers).length} answered</span>
					</div>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-green-600 h-2 rounded-full transition-all duration-300"
							style={{width: `${(Object.keys(selectedAnswers).length / quiz.questions.length) * 100}%`}}
						/>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-between gap-2 sm:gap-4">
						{/* Previous Button */}
						<button
							onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
							disabled={currentQuestion === 0}
							className={`flex items-center gap-2 px-3 sm:px-6 py-2 rounded-lg transition-colors flex-shrink-0 ${
								currentQuestion === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
							<span className="hidden sm:inline text-sm font-medium">Previous</span>
						</button>

						{/* Question Numbers - Scrollable */}
						<div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4">
							<div className="relative">
								<div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-1 px-1">
									{quiz.questions.map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentQuestion(index)}
											className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
												index === currentQuestion
													? 'bg-green-600 text-white shadow-lg scale-110'
													: selectedAnswers[quiz.questions[index].id] !== undefined
													? 'bg-green-100 text-green-700 border border-green-200'
													: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
											}`}
										>
											{index + 1}
										</button>
									))}
								</div>

								{/* Scroll Fade Indicators - Only show if many questions */}
								{quiz.questions.length > 6 && (
									<>
										<div className="absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
										<div className="absolute inset-y-0 right-0 w-3 sm:w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
									</>
								)}
							</div>
						</div>

						{/* Next/Submit Button */}
						{currentQuestion === quiz.questions.length - 1 ? (
							<button
								onClick={async () => await handleSubmitQuiz()}
								disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
								className={`flex items-center gap-2 px-3 sm:px-6 py-2 rounded-lg transition-colors flex-shrink-0 ${
									Object.keys(selectedAnswers).length !== quiz.questions.length
										? 'bg-gray-100 text-gray-400 cursor-not-allowed'
										: 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
								}`}
							>
								<span className="text-sm font-medium">Submit</span>
								<Award className="w-4 h-4 sm:w-5 sm:h-5" />
							</button>
						) : (
							<button
								onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
								className="flex items-center gap-2 bg-green-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex-shrink-0 shadow-lg"
							>
								<span className="hidden sm:inline text-sm font-medium">Next</span>
								<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizPage;
