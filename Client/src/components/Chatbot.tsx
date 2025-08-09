import React, {useState, useRef, useEffect} from 'react';
import {MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, RotateCcw, HelpCircle} from 'lucide-react';
import {useAlert} from './Alert';
import {generateAnswer, startChat} from '../api/chatbot';
import type {IMessage, Material} from '../types/types';

const Chatbot: React.FC<{material: Material}> = ({material}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([
		{
			id: 1,
			type: 'bot',
			content: "Hello! I'm here to help you understand Aksara Batak. Feel free to ask me any questions about the material you're studying.",
			timestamp: new Date(),
		},
	]);
	const [inputValue, setInputValue] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const {showError, showSuccess} = useAlert();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (!material) return;

		if (isOpen && !isMinimized) {
			inputRef.current?.focus();
		}

		const startConversation = async () => {
			try {
				await startChat(material);
			} catch (err) {
				showError('Error starting conversation.');
			}
		};

		startConversation();
	}, [isOpen, isMinimized]);

	// Sample bot responses based on Aksara Batak content
	const getBotResponse = async (userMessage: any) => {
		try {
			const message = userMessage.toLowerCase();
			const res: string = await generateAnswer(message);

			if (!res) {
				return "I'm here to help you understand Aksara Batak! You can ask me about the script's history, writing techniques, cultural significance, or any specific characters you're having trouble with. What would you like to know?";
			} else {
				return res;
			}
		} catch (err) {
			showError('Something went wrong.');
		}

		return "I'm here to help you understand Aksara Batak! You can ask me about the script's history, writing techniques, cultural significance, or any specific characters you're having trouble with. What would you like to know?";
	};

	const handleSendMessage = async () => {
		try {
			if (inputValue.trim() === '') return;

			const userMessage = {
				id: messages.length + 1,
				type: 'user',
				content: inputValue,
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, userMessage]);
			setInputValue('');
			setIsTyping(true);

			const response = await getBotResponse(inputValue);

			// Simulate bot typing delay
			setTimeout(() => {
				const botResponse = {
					id: messages.length + 2,
					type: 'bot',
					content: response,
					timestamp: new Date(),
				};

				setMessages((prev) => [...prev, botResponse]);
				setIsTyping(false);
			}, 1000);
		} catch (err) {
			showError('Kirim pesan error.');
		}
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const clearChat = () => {
		setMessages([
			{
				id: 1,
				type: 'bot',
				content:
					"Hello! I'm here to help you understand Aksara Batak. Feel free to ask me any questions about the material you're studying.",
				timestamp: new Date(),
			},
		]);
	};

	const formatTime = (date: any) => {
		return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
	};

	const quickQuestions = ['What is Aksara Batak?', 'How do I write basic characters?', 'What is a pustaha?', 'Tell me about the history'];

	return (
		<>
			{/* Chat Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 z-50 hover:cursor-pointer"
				>
					<MessageCircle className="w-6 h-6" />
				</button>
			)}

			{/* Chat Window */}
			{isOpen && (
				<div
					className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 z-50 ${
						isMinimized ? 'w-72 h-14' : 'w-96 max-w-[90vw] h-[500px]'
					}`}
				>
					{/* Header */}
					<div className="bg-green-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-1 bg-white/20 rounded-full">
								<Bot className="w-5 h-5" />
							</div>
							<div>
								<h3 className="font-semibold">Aksara Batak Assistant</h3>
								<p className="text-xs text-green-100">Online • Ready to help</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded transition-colors">
								{isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
							</button>
							<button onClick={clearChat} className="p-1 hover:bg-white/20 rounded transition-colors">
								<RotateCcw className="w-4 h-4" />
							</button>
							<button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Chat Content */}
					{!isMinimized && (
						<>
							{/* Messages */}
							<div className="flex-1 p-4 overflow-y-auto max-h-[65%] min-h-48 bg-gray-50">
								<div className="space-y-4">
									{messages.map((message) => (
										<div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
											<div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
												<div
													className={`p-2 rounded-full ${
														message.type === 'user' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'
													}`}
												>
													{message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-green-600" />}
												</div>

												<div
													className={`rounded-lg p-3 ${
														message.type === 'user' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'
													} max-w-[75%] break-words`}
												>
													<p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
													<p className={`text-xs mt-1 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
														{formatTime(message.timestamp)}
													</p>
												</div>
											</div>
										</div>
									))}

									{/* Typing Indicator */}
									{isTyping && (
										<div className="flex justify-start">
											<div className="flex items-start gap-2">
												<div className="p-2 rounded-full bg-white border border-gray-200">
													<Bot className="w-4 h-4 text-green-600" />
												</div>
												<div className="bg-white border border-gray-200 rounded-lg p-3">
													<div className="flex space-x-1">
														<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
														<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
														<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
								<div ref={messagesEndRef} />
							</div>

							{/* Quick Questions */}
							{messages.length === 1 && (
								<div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
									<p className="text-xs text-gray-600 mb-2">Quick questions:</p>
									<div className="flex flex-wrap gap-1">
										{quickQuestions.map((question, index) => (
											<button
												key={index}
												onClick={() => setInputValue(question)}
												className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
											>
												{question}
											</button>
										))}
									</div>
								</div>
							)}

							{/* Input Area */}
							<div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
								<div className="flex items-center gap-2">
									<div className="flex-1 relative">
										<input
											ref={inputRef}
											type="text"
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Ask me about Aksara Batak..."
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
										/>
										<HelpCircle className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
									</div>
									<button
										onClick={handleSendMessage}
										disabled={inputValue.trim() === ''}
										className={`p-2 rounded-lg transition-colors ${
											inputValue.trim() === ''
												? 'bg-gray-100 text-gray-400 cursor-not-allowed'
												: 'bg-green-600 text-white hover:bg-green-700'
										}`}
									>
										<Send className="w-4 h-4" />
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Chatbot;
