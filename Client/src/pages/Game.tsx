import React, {useState, useEffect, useRef} from 'react';
import {Home, Book, Settings, Trophy, Star, Clock, Target, Zap, Heart, RotateCcw, Volume2, CheckCircle} from 'lucide-react';

const BatakGames = () => {
	const [currentGame, setCurrentGame] = useState('menu');
	const [score, setScore] = useState(0);
	const [lives, setLives] = useState(3);
	const [timeLeft, setTimeLeft] = useState(60);
	const [gameActive, setGameActive] = useState(false);
	const [level, setLevel] = useState(1);
	const [streak, setStreak] = useState(0);
	const [showResult, setShowResult] = useState(false);

	// Memory Game States
	const [memoryCards, setMemoryCards] = useState<any[]>([]);
	const [flippedCards, setFlippedCards] = useState<any[]>([]);
	const [matchedCards, setMatchedCards] = useState<any[]>([]);

	// Typing Game States
	const [currentWord, setCurrentWord] = useState<any>('');
	const [userInput, setUserInput] = useState<any>('');
	const [typedWords, setTypedWords] = useState<any[]>([]);

	// Matching Game States
	const [draggedItem, setDraggedItem] = useState<any>(null);
	const [matchingPairs, setMatchingPairs] = useState<any[]>([]);
	const [completedMatches, setCompletedMatches] = useState<any[]>([]);

	const timerRef = useRef(0);

	// Sample Batak data (in real app, this would come from your API)
	const batakData = {
		characters: [
			{batak: 'ᯀ', latin: 'A', meaning: 'Alif'},
			{batak: 'ᯂ', latin: 'BA', meaning: 'Ba'},
			{batak: 'ᯃ', latin: 'CA', meaning: 'Ca'},
			{batak: 'ᯄ', latin: 'DA', meaning: 'Da'},
			{batak: 'ᯅ', latin: 'GA', meaning: 'Ga'},
			{batak: 'ᯆ', latin: 'HA', meaning: 'Ha'},
			{batak: 'ᯇ', latin: 'JA', meaning: 'Ja'},
			{batak: 'ᯈ', latin: 'KA', meaning: 'Ka'},
			{batak: 'ᯉ', latin: 'LA', meaning: 'La'},
			{batak: 'ᯊ', latin: 'MA', meaning: 'Ma'},
		],
		words: [
			{batak: 'ᯀᯔᯉᯱ', latin: 'Adat', meaning: 'Tradition'},
			{batak: 'ᯅᯩᯔᯅᯰᯀ', latin: 'Gondang', meaning: 'Music'},
			{batak: 'ᯞᯂᯮ', latin: 'Ulos', meaning: 'Traditional cloth'},
			{batak: 'ᯉᯩᯔᯅ', latin: 'Dohot', meaning: 'And/with'},
			{batak: 'ᯅᯩᯔᯅᯰᯀ', latin: 'Horas', meaning: 'Hello/Goodbye'},
		],
	};

	useEffect(() => {
		if (gameActive && timeLeft > 0) {
			timerRef.current = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
		} else if (timeLeft === 0 && gameActive) {
			endGame();
		}
		return () => clearTimeout(timerRef.current);
	}, [timeLeft, gameActive]);

	const startTimer = () => {
		setGameActive(true);
		setTimeLeft(60);
	};

	const endGame = () => {
		setGameActive(false);
		setShowResult(true);
		clearTimeout(timerRef.current);
	};

	const resetGame = () => {
		setScore(0);
		setLives(3);
		setTimeLeft(60);
		setGameActive(false);
		setLevel(1);
		setStreak(0);
		setShowResult(false);
		setFlippedCards([]);
		setMatchedCards([]);
		setUserInput('');
		setTypedWords([]);
		setCompletedMatches([]);
	};

	// Memory Card Game Logic
	const initMemoryGame = () => {
		const cards = [...batakData.characters.slice(0, 6), ...batakData.characters.slice(0, 6)]
			.sort(() => Math.random() - 0.5)
			.map((card, index) => ({...card, id: index, isFlipped: false}));
		setMemoryCards(cards);
		setFlippedCards([]);
		setMatchedCards([]);
	};

	const handleCardFlip = (cardId: any) => {
		if (!gameActive || flippedCards.length === 2) return;

		const newFlipped = [...flippedCards, cardId];
		setFlippedCards(newFlipped);

		if (newFlipped.length === 2) {
			const [first, second] = newFlipped;
			const firstCard = memoryCards.find((c) => c.id === first);
			const secondCard = memoryCards.find((c) => c.id === second);

			if (firstCard.batak === secondCard.batak) {
				setMatchedCards([...matchedCards, first, second]);
				setScore(score + 10);
				setStreak(streak + 1);
				setTimeout(() => setFlippedCards([]), 500);

				if (matchedCards.length + 2 === memoryCards.length) {
					endGame();
				}
			} else {
				setLives(lives - 1);
				setStreak(0);
				setTimeout(() => setFlippedCards([]), 1000);

				if (lives <= 1) {
					endGame();
				}
			}
		}
	};

	// Typing Game Logic
	const initTypingGame = () => {
		setCurrentWord(batakData.words[Math.floor(Math.random() * batakData.words.length)]);
		setUserInput('');
		setTypedWords([]);
	};

	const handleTypingInput = (e: any) => {
		const value = e.target.value;
		setUserInput(value);

		if (value.toLowerCase() === currentWord.latin.toLowerCase()) {
			setScore(score + 15);
			setStreak(streak + 1);
			setTypedWords([...typedWords, currentWord]);
			setCurrentWord(batakData.words[Math.floor(Math.random() * batakData.words.length)]);
			setUserInput('');
		}
	};

	// Drag and Drop Matching Game
	const initMatchingGame = () => {
		const pairs = batakData.characters.slice(0, 5).map((char) => ({
			id: Math.random(),
			batak: char.batak,
			latin: char.latin,
			matched: false,
		}));
		setMatchingPairs(pairs);
		setCompletedMatches([]);
	};

	const handleDragStart = (e: any, item: any) => {
		setDraggedItem(item);
	};

	const handleDrop = (e: any, targetItem: any) => {
		e.preventDefault();
		if (draggedItem && draggedItem.latin === targetItem.latin && !targetItem.matched) {
			setCompletedMatches([...completedMatches, draggedItem.id, targetItem.id]);
			setScore(score + 20);
			setStreak(streak + 1);

			if (completedMatches.length + 2 >= matchingPairs.length * 2) {
				endGame();
			}
		} else if (draggedItem && draggedItem.latin !== targetItem.latin) {
			setLives(lives - 1);
			setStreak(0);
			if (lives <= 1) {
				endGame();
			}
		}
		setDraggedItem(null);
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
	};

	const GameMenu = () => (
		<div className="min-h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="fixed left-0 top-0 h-full w-48 bg-white shadow-lg border-r">
				<div className="p-6">
					<h2 className="text-xl font-bold text-gray-800">Aksara Batak</h2>
				</div>
				<nav className="mt-6">
					<div className="px-6 py-3 bg-teal-50 border-r-4 border-teal-500 text-teal-700 flex items-center">
						<Home className="w-5 h-5 mr-3" />
						<span>Dashboard</span>
					</div>
					<div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center">
						<Book className="w-5 h-5 mr-3" />
						<span>Courses</span>
					</div>
					<div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center">
						<Settings className="w-5 h-5 mr-3" />
						<span>Settings</span>
					</div>
				</nav>
			</div>

			{/* Main Content */}
			<div className="ml-48 p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Interactive Games</h1>
					<p className="text-gray-600 mt-2">Belajar Aksara Batak dengan cara yang menyenangkan!</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Memory Card Game */}
					<div
						onClick={() => {
							setCurrentGame('memory');
							initMemoryGame();
							resetGame();
						}}
						className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					>
						<div className="flex items-center justify-between mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Target className="w-6 h-6 text-white" />
							</div>
							<Star className="w-6 h-6 text-yellow-500" />
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">Memory Cards</h3>
						<p className="text-gray-600 mb-4">Temukan pasangan kartu Aksara Batak yang sama!</p>
						<div className="flex items-center text-sm text-gray-500">
							<Clock className="w-4 h-4 mr-1" />
							<span>60 detik</span>
							<span className="mx-2">•</span>
							<Heart className="w-4 h-4 mr-1" />
							<span>3 nyawa</span>
						</div>
					</div>

					{/* Speed Typing Game */}
					<div
						onClick={() => {
							setCurrentGame('typing');
							initTypingGame();
							resetGame();
						}}
						className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					>
						<div className="flex items-center justify-between mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
								<Zap className="w-6 h-6 text-white" />
							</div>
							<Star className="w-6 h-6 text-yellow-500" />
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">Speed Typing</h3>
						<p className="text-gray-600 mb-4">Ketik kata Latin dari Aksara Batak secepat mungkin!</p>
						<div className="flex items-center text-sm text-gray-500">
							<Clock className="w-4 h-4 mr-1" />
							<span>60 detik</span>
							<span className="mx-2">•</span>
							<Trophy className="w-4 h-4 mr-1" />
							<span>Speed challenge</span>
						</div>
					</div>

					{/* Drag & Drop Matching */}
					<div
						onClick={() => {
							setCurrentGame('matching');
							initMatchingGame();
							resetGame();
						}}
						className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					>
						<div className="flex items-center justify-between mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
								<Target className="w-6 h-6 text-white" />
							</div>
							<Star className="w-6 h-6 text-yellow-500" />
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">Drag & Match</h3>
						<p className="text-gray-600 mb-4">Cocokkan Aksara Batak dengan huruf Latin!</p>
						<div className="flex items-center text-sm text-gray-500">
							<Target className="w-4 h-4 mr-1" />
							<span>Drag & Drop</span>
							<span className="mx-2">•</span>
							<Heart className="w-4 h-4 mr-1" />
							<span>3 nyawa</span>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
								<CheckCircle className="w-5 h-5 text-green-600" />
							</div>
							<div>
								<p className="text-2xl font-bold text-gray-800">12</p>
								<p className="text-gray-600">Games Completed</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
								<Trophy className="w-5 h-5 text-yellow-600" />
							</div>
							<div>
								<p className="text-2xl font-bold text-gray-800">2,450</p>
								<p className="text-gray-600">Best Score</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
								<Star className="w-5 h-5 text-blue-600" />
							</div>
							<div>
								<p className="text-2xl font-bold text-gray-800">Level 5</p>
								<p className="text-gray-600">Current Level</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const MemoryGame = () => (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<button onClick={() => setCurrentGame('menu')} className="flex items-center text-gray-600 hover:text-gray-800">
						← Kembali ke Menu
					</button>
					<h1 className="text-3xl font-bold text-gray-800">Memory Cards</h1>
					<div className="flex space-x-4">
						<button onClick={resetGame} className="p-2 text-gray-600 hover:text-gray-800">
							<RotateCcw className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Game Stats */}
				<div className="flex justify-between items-center mb-8 bg-white rounded-lg p-6 shadow">
					<div className="flex space-x-8">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">{score}</div>
							<div className="text-gray-600">Score</div>
						</div>
						<div className="text-center">
							<div className="flex items-center justify-center text-2xl font-bold text-red-600">
								{[...Array(3)].map((_, i) => (
									<Heart key={i} className={`w-6 h-6 ${i < lives ? 'fill-current' : 'text-gray-300'}`} />
								))}
							</div>
							<div className="text-gray-600">Lives</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">{timeLeft}</div>
							<div className="text-gray-600">Time</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">{streak}</div>
							<div className="text-gray-600">Streak</div>
						</div>
					</div>
					{!gameActive && !showResult && (
						<button onClick={startTimer} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
							Start Game
						</button>
					)}
				</div>

				{/* Memory Cards Grid */}
				<div className="grid grid-cols-4 gap-4 mb-8">
					{memoryCards.map((card) => (
						<div
							key={card.id}
							onClick={() => handleCardFlip(card.id)}
							className={`aspect-square bg-white rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 flex items-center justify-center ${
								flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'bg-blue-50 border-2 border-blue-200' : 'hover:scale-105'
							} ${matchedCards.includes(card.id) ? 'opacity-50' : ''}`}
						>
							{flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
								<div className="text-center">
									<div className="text-4xl font-bold text-blue-600 mb-2">{card.batak}</div>
									<div className="text-lg text-gray-600">{card.latin}</div>
								</div>
							) : (
								<div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
									<div className="text-white text-2xl">?</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Result Modal */}
				{showResult && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-8 max-w-md mx-4">
							<div className="text-center">
								<Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
								<h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
								<div className="space-y-2 mb-6">
									<p>
										Final Score: <span className="font-bold text-blue-600">{score}</span>
									</p>
									<p>
										Best Streak: <span className="font-bold text-purple-600">{streak}</span>
									</p>
									<p>
										Cards Matched: <span className="font-bold text-green-600">{matchedCards.length / 2}</span>
									</p>
								</div>
								<div className="flex space-x-4">
									<button
										onClick={() => {
											resetGame();
											startTimer();
										}}
										className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
									>
										Main Lagi
									</button>
									<button
										onClick={() => setCurrentGame('menu')}
										className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
									>
										Menu
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	const TypingGame = () => (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<button onClick={() => setCurrentGame('menu')} className="flex items-center text-gray-600 hover:text-gray-800">
						← Kembali ke Menu
					</button>
					<h1 className="text-3xl font-bold text-gray-800">Speed Typing</h1>
					<div className="flex space-x-4">
						<button onClick={resetGame} className="p-2 text-gray-600 hover:text-gray-800">
							<RotateCcw className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Game Stats */}
				<div className="flex justify-between items-center mb-8 bg-white rounded-lg p-6 shadow">
					<div className="flex space-x-8">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">{score}</div>
							<div className="text-gray-600">Score</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">{timeLeft}</div>
							<div className="text-gray-600">Time</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">{typedWords.length}</div>
							<div className="text-gray-600">Words</div>
						</div>
					</div>
					{!gameActive && !showResult && (
						<button onClick={startTimer} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
							Start Game
						</button>
					)}
				</div>

				{/* Current Word Display */}
				{gameActive && (
					<div className="bg-white rounded-lg p-8 mb-8 shadow-lg text-center">
						<div className="mb-6">
							<div className="text-6xl font-bold text-blue-600 mb-4">{currentWord.batak}</div>
							<div className="text-xl text-gray-600 mb-2">"{currentWord.meaning}"</div>
							<button className="text-gray-500 hover:text-gray-700">
								<Volume2 className="w-5 h-5" />
							</button>
						</div>

						<div className="max-w-md mx-auto">
							<input
								type="text"
								value={userInput}
								onChange={handleTypingInput}
								placeholder="Ketik kata dalam huruf Latin..."
								className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center"
								autoFocus
							/>
							<div className="mt-2 text-sm text-gray-600">
								Target: <span className="font-bold">{currentWord.latin}</span>
							</div>
						</div>
					</div>
				)}

				{/* Completed Words */}
				{typedWords.length > 0 && (
					<div className="bg-white rounded-lg p-6 shadow">
						<h3 className="text-lg font-bold text-gray-800 mb-4">Kata yang Berhasil:</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{typedWords.map((word, index) => (
								<div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
									<CheckCircle className="w-5 h-5 text-green-600" />
									<div>
										<div className="font-bold text-green-700">{word.latin}</div>
										<div className="text-sm text-gray-600">{word.meaning}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Result Modal */}
				{showResult && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-8 max-w-md mx-4">
							<div className="text-center">
								<Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
								<h2 className="text-2xl font-bold text-gray-800 mb-4">Time's Up!</h2>
								<div className="space-y-2 mb-6">
									<p>
										Final Score: <span className="font-bold text-blue-600">{score}</span>
									</p>
									<p>
										Words Typed: <span className="font-bold text-green-600">{typedWords.length}</span>
									</p>
									<p>
										WPM: <span className="font-bold text-purple-600">{typedWords.length}</span>
									</p>
								</div>
								<div className="flex space-x-4">
									<button
										onClick={() => {
											resetGame();
											startTimer();
										}}
										className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
									>
										Main Lagi
									</button>
									<button
										onClick={() => setCurrentGame('menu')}
										className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
									>
										Menu
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	const MatchingGame = () => (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<button onClick={() => setCurrentGame('menu')} className="flex items-center text-gray-600 hover:text-gray-800">
						← Kembali ke Menu
					</button>
					<h1 className="text-3xl font-bold text-gray-800">Drag & Match</h1>
					<div className="flex space-x-4">
						<button onClick={resetGame} className="p-2 text-gray-600 hover:text-gray-800">
							<RotateCcw className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Game Stats */}
				<div className="flex justify-between items-center mb-8 bg-white rounded-lg p-6 shadow">
					<div className="flex space-x-8">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">{score}</div>
							<div className="text-gray-600">Score</div>
						</div>
						<div className="text-center">
							<div className="flex items-center justify-center text-2xl font-bold text-red-600">
								{[...Array(3)].map((_, i) => (
									<Heart key={i} className={`w-6 h-6 ${i < lives ? 'fill-current' : 'text-gray-300'}`} />
								))}
							</div>
							<div className="text-gray-600">Lives</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">{completedMatches.length / 2}</div>
							<div className="text-gray-600">Matches</div>
						</div>
					</div>
					{!gameActive && !showResult && (
						<button onClick={startTimer} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
							Start Game
						</button>
					)}
				</div>

				{gameActive && (
					<div className="grid grid-cols-2 gap-8">
						{/* Batak Characters */}
						<div className="bg-white rounded-lg p-6 shadow">
							<h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Aksara Batak</h3>
							<div className="space-y-4">
								{matchingPairs.map((pair) => (
									<div
										key={`batak-${pair.id}`}
										draggable={!completedMatches.includes(pair.id)}
										onDragStart={(e) => handleDragStart(e, pair)}
										className={`p-4 rounded-lg border-2 cursor-move transform transition-all duration-200 ${
											completedMatches.includes(pair.id)
												? 'bg-green-50 border-green-200 opacity-50'
												: 'bg-blue-50 border-blue-200 hover:scale-105 hover:shadow-md'
										}`}
									>
										<div className="text-center">
											<div className="text-4xl font-bold text-blue-600 mb-2">{pair.batak}</div>
											<div className="text-sm text-gray-600">Drag me!</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Latin Characters Drop Zone */}
						<div className="bg-white rounded-lg p-6 shadow">
							<h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Huruf Latin</h3>
							<div className="space-y-4">
								{matchingPairs.map((pair) => (
									<div
										key={`latin-${pair.id}`}
										onDrop={(e) => handleDrop(e, pair)}
										onDragOver={handleDragOver}
										className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
											completedMatches.includes(pair.id)
												? 'bg-green-50 border-green-400 border-solid'
												: 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
										}`}
									>
										<div className="text-center">
											<div className="text-2xl font-bold text-gray-700 mb-2">{pair.latin}</div>
											<div className="text-sm text-gray-500">{completedMatches.includes(pair.id) ? '✓ Matched!' : 'Drop here'}</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Instructions */}
				{!gameActive && !showResult && (
					<div className="bg-white rounded-lg p-6 shadow mt-8">
						<h3 className="text-lg font-bold text-gray-800 mb-4">Cara Bermain:</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-blue-600 font-bold">1</span>
								</div>
								<span>Drag Aksara Batak dari kolom kiri</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<span className="text-green-600 font-bold">2</span>
								</div>
								<span>Drop ke huruf Latin yang sesuai</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<span className="text-purple-600 font-bold">3</span>
								</div>
								<span>Cocokkan semua pasangan untuk menang!</span>
							</div>
						</div>
					</div>
				)}

				{/* Result Modal */}
				{showResult && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-8 max-w-md mx-4">
							<div className="text-center">
								<Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
								<h2 className="text-2xl font-bold text-gray-800 mb-4">
									{completedMatches.length === matchingPairs.length * 2 ? 'Selamat!' : 'Game Over!'}
								</h2>
								<div className="space-y-2 mb-6">
									<p>
										Final Score: <span className="font-bold text-blue-600">{score}</span>
									</p>
									<p>
										Matches:{' '}
										<span className="font-bold text-green-600">
											{completedMatches.length / 2}/{matchingPairs.length}
										</span>
									</p>
									<p>
										Lives Left: <span className="font-bold text-red-600">{lives}</span>
									</p>
								</div>
								<div className="flex space-x-4">
									<button
										onClick={() => {
											resetGame();
											initMatchingGame();
										}}
										className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
									>
										Main Lagi
									</button>
									<button
										onClick={() => setCurrentGame('menu')}
										className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
									>
										Menu
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	// Main render logic
	if (currentGame === 'menu') {
		return <GameMenu />;
	} else if (currentGame === 'memory') {
		return <MemoryGame />;
	} else if (currentGame === 'typing') {
		return <TypingGame />;
	} else if (currentGame === 'matching') {
		return <MatchingGame />;
	}

	return <GameMenu />;
};

export default BatakGames;
