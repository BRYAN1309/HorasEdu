import React, { useState } from "react";
import { ArrowLeft, Clock, CheckCircle, XCircle, Award, ChevronRight, ChevronLeft, RotateCcw, Trophy, Target, AlertCircle } from "lucide-react";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<any>({});
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
    const [quizStarted, setQuizStarted] = useState(false);

    // Sample quiz data based on your database design
    const quizData = {
        id: 1,
        title: "Introduction Quiz",
        module_id: 1,
        created_at: "2024-01-15T10:00:00Z",
        score: null,
        questions: [
            {
                id: 1,
                quiz_id: 1,
                question_text: "What is the traditional name for the Batak script?",
                options: ["Aksara Batak", "Surat Batak", "Pustaha", "All of the above"],
                correct_answer: 3,
                explanation: "Aksara Batak is also known as Surat Batak, and Pustaha refers to the traditional books written in this script.",
                created_at: "2024-01-15T10:00:00Z",
            },
            {
                id: 2,
                quiz_id: 1,
                question_text: "In which century is the Batak script believed to have originated?",
                options: ["11th century", "12th century", "13th century", "14th century"],
                correct_answer: 2,
                explanation: "The Batak script is believed to have originated around the 13th century, influenced by Indian scripts.",
                created_at: "2024-01-15T10:00:00Z",
            },
            {
                id: 3,
                quiz_id: 1,
                question_text: "What were traditional Batak books called?",
                options: ["Lontar", "Pustaha", "Codex", "Manuscript"],
                correct_answer: 1,
                explanation: "Pustaha were traditional Batak books made from tree bark and written in Aksara Batak.",
                created_at: "2024-01-15T10:00:00Z",
            },
            {
                id: 4,
                quiz_id: 1,
                question_text: "Who traditionally used Aksara Batak to record sacred knowledge?",
                options: ["Merchants", "Datu (traditional healers)", "Farmers", "Children"],
                correct_answer: 1,
                explanation: "Datu (traditional healers and spiritual leaders) used Aksara Batak to record sacred knowledge and traditional medicine.",
                created_at: "2024-01-15T10:00:00Z",
            },
            {
                id: 5,
                quiz_id: 1,
                question_text: "What type of material were Pustaha traditionally made from?",
                options: ["Paper", "Stone", "Tree bark", "Metal"],
                correct_answer: 2,
                explanation: "Pustaha were traditionally made from tree bark, specifically from the Alstonia scholaris tree.",
                created_at: "2024-01-15T10:00:00Z",
            },
        ],
    };

    const formatTime = (seconds: any) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (questionId: any, answerIndex: any) => {
        setSelectedAnswers((prev: any) => ({
            ...prev,
            [questionId]: answerIndex,
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        quizData.questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correct_answer) {
                correct++;
            }
        });
        return Math.round((correct / quizData.questions.length) * 100);
    };

    const getScoreColor = (score: any) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreIcon = (score: any) => {
        if (score >= 80) return <Trophy className="w-6 h-6 text-green-600" />;
        if (score >= 60) return <Target className="w-6 h-6 text-yellow-600" />;
        return <AlertCircle className="w-6 h-6 text-red-600" />;
    };

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Module</span>
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

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{quizData.title}</h1>
                        <p className="text-gray-600 mb-8 text-lg">Test your understanding of Batak script fundamentals</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-green-600 mb-2">{quizData.questions.length}</div>
                                <div className="text-gray-600">Questions</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-blue-600 mb-2">15</div>
                                <div className="text-gray-600">Minutes</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-purple-600 mb-2">80%</div>
                                <div className="text-gray-600">Pass Score</div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 text-left">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        <strong>Instructions:</strong> Read each question carefully and select the best answer. You can review your answers before submitting. Good luck!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setQuizStarted(true)} className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults) {
        const score = calculateScore();
        const correctAnswers = quizData.questions.filter((q) => selectedAnswers[q.id] === q.correct_answer).length;

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Module</span>
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
                                <div className="text-3xl font-bold text-blue-600 mb-2">{quizData.questions.length - correctAnswers}</div>
                                <div className="text-gray-600">Incorrect</div>
                            </div>
                        </div>

                        {/* Answer Review */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Answers</h2>
                            <div className="space-y-4">
                                {quizData.questions.map((question, index) => {
                                    const isCorrect = selectedAnswers[question.id] === question.correct_answer;
                                    const userAnswer = selectedAnswers[question.id];

                                    return (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3 mb-3">
                                                {isCorrect ? <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 mb-2">
                                                        {index + 1}. {question.question_text}
                                                    </h3>
                                                    <div className="space-y-1 text-sm">
                                                        <p className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>Your answer: {question.options[userAnswer]}</p>
                                                        {!isCorrect && <p className="text-green-600">Correct answer: {question.options[question.correct_answer]}</p>}
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
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Retake Quiz
                            </button>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">Continue to Next Module</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const question = quizData.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Module</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{formatTime(timeLeft)}</span>
                            </div>

                            <div className="text-sm text-gray-600">
                                Question {currentQuestion + 1} of {quizData.questions.length}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Question */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">{question.question_text}</h2>

                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(question.id, index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    selectedAnswers[question.id] === index ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[question.id] === index ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                                        {selectedAnswers[question.id] === index && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="text-lg">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${currentQuestion === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {quizData.questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                                    index === currentQuestion ? "bg-green-600 text-white" : selectedAnswers[quizData.questions[index].id] !== undefined ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    {currentQuestion === quizData.questions.length - 1 ? (
                        <button
                            onClick={() => setShowResults(true)}
                            disabled={Object.keys(selectedAnswers).length !== quizData.questions.length}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                                Object.keys(selectedAnswers).length !== quizData.questions.length ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                        >
                            Submit Quiz
                            <Award className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQuestion(Math.min(quizData.questions.length - 1, currentQuestion + 1))}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
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

export default Quiz;
