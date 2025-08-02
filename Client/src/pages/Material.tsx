import React, {useState} from 'react';
import {
	ArrowLeft,
	BookOpen,
	Play,
	Image,
	CheckCircle,
	Clock,
	FileText,
	PlayCircle,
	Pause,
	Volume2,
	Maximize,
	ChevronRight,
	ChevronLeft,
	Eye,
} from 'lucide-react';
// import Chatbot from '../components/ChatBot';

const Material = () => {
	const [currentMaterial, setCurrentMaterial] = useState('article');
	const [isPlaying, setIsPlaying] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	// Sample material data
	const materialData: any = {
		article: {
			id: 'article-1',
			type: 'article',
			title: 'History of Batak Script',
			description: 'Explore the origins and evolution of Aksara Batak',
			duration: '8 min read',
			content: `
        <h2>The Ancient Origins of Aksara Batak</h2>
        <p>Aksara Batak, also known as Surat Batak, is an ancient script used by the Batak people of North Sumatra, Indonesia. This traditional writing system has been used for centuries to preserve important cultural knowledge, including traditional medicine, genealogies, and religious texts.</p>
        
        <h3>Historical Development</h3>
        <p>The script is believed to have originated around the 13th century, influenced by Indian scripts brought to Southeast Asia through trade and cultural exchange. The Batak people adapted these scripts to suit their own language and cultural needs.</p>
        
        <h3>Cultural Significance</h3>
        <p>Aksara Batak was traditionally used by <em>datu</em> (traditional healers and spiritual leaders) to record sacred knowledge. The script was considered sacred and was used to write pustaha (traditional books made from tree bark).</p>
        
        <h3>Modern Preservation</h3>
        <p>Today, efforts are being made to preserve and revitalize Aksara Batak through education programs and digital initiatives. Learning this script helps connect modern Batak people with their cultural heritage.</p>
      `,
		},
		video: {
			id: 'video-1',
			type: 'video',
			title: 'Batak Script Overview',
			description: 'Video introduction to the fundamentals of Batak writing',
			duration: '12 min',
			videoUrl: 'https://example.com/batak-script-overview.mp4',
			transcript:
				"Welcome to this introduction to Aksara Batak. In this video, we'll explore the fundamental aspects of this ancient writing system...",
		},
		image: {
			id: 'image-1',
			type: 'image',
			title: 'Basic Batak Characters',
			description: 'Visual guide to fundamental Aksara Batak symbols',
			duration: '5 min',
			images: [
				{
					id: 1,
					title: 'Consonant Characters',
					description: 'Basic consonant symbols in Aksara Batak',
					url: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Consonant+Characters',
				},
				{
					id: 2,
					title: 'Vowel Markers',
					description: 'Vowel diacritical marks used with consonants',
					url: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Vowel+Markers',
				},
				{
					id: 3,
					title: 'Number System',
					description: 'Traditional Batak numerical symbols',
					url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Number+System',
				},
			],
		},
	};

	const currentData = materialData[currentMaterial];

	const renderArticleContent = () => (
		<div className="prose max-w-none">
			<div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{__html: currentData.content}} />
		</div>
	);

	const renderVideoContent = () => (
		<div className="space-y-6">
			{/* Video Player */}
			<div className="bg-black rounded-lg overflow-hidden">
				<div className="aspect-video bg-gray-900 flex items-center justify-center relative">
					<div className="text-white text-center">
						<PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
						<p className="text-lg">Video Player Placeholder</p>
						<p className="text-sm text-gray-400 mt-2">Click to play: {currentData.title}</p>
					</div>

					{/* Video Controls */}
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
						<div className="flex items-center gap-4">
							<button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-green-400 transition-colors">
								{isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
							</button>
							<div className="flex-1 bg-gray-600 rounded-full h-1">
								<div className="bg-green-500 h-1 rounded-full w-1/3"></div>
							</div>
							<span className="text-white text-sm">4:32 / 12:00</span>
							<Volume2 className="w-5 h-5 text-white" />
							<Maximize className="w-5 h-5 text-white" />
						</div>
					</div>
				</div>
			</div>

			{/* Video Transcript */}
			<div className="bg-gray-50 rounded-lg p-6">
				<h3 className="font-semibold text-gray-900 mb-3">Transcript</h3>
				<p className="text-gray-700 leading-relaxed">{currentData.transcript}</p>
			</div>
		</div>
	);

	const renderImageContent = () => (
		<div className="space-y-6">
			{currentData.images.map((image: any, index: any) => (
				<div key={image.id} className="bg-gray-50 rounded-lg overflow-hidden">
					<img src={image.url} alt={image.title} className="w-full h-auto" />
					<div className="p-6">
						<h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
						<p className="text-gray-600">{image.description}</p>
					</div>
				</div>
			))}
		</div>
	);

	const getIcon = (type: any) => {
		switch (type) {
			case 'article':
				return <FileText className="w-5 h-5" />;
			case 'video':
				return <PlayCircle className="w-5 h-5" />;
			case 'image':
				return <Eye className="w-5 h-5" />;
			default:
				return <BookOpen className="w-5 h-5" />;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Chatbot />

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

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<Clock className="w-4 h-4" />
								<span>{currentData.duration}</span>
							</div>

							<button
								onClick={() => setIsCompleted(!isCompleted)}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
									isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								<CheckCircle className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
								<span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Material Header */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-green-100 text-green-600 rounded-lg">{getIcon(currentData.type)}</div>
						<div className="flex-1">
							<h1 className="text-2xl font-bold text-gray-900 mb-2">{currentData.title}</h1>
							<p className="text-gray-600 mb-4">{currentData.description}</p>
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{currentData.type}</span>
								<span>•</span>
								<span>{currentData.duration}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Material Content */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					{currentData.type === 'article' && renderArticleContent()}
					{currentData.type === 'video' && renderVideoContent()}
					{currentData.type === 'image' && renderImageContent()}
				</div>

				{/* Navigation */}
				<div className="flex justify-between items-center">
					<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
						<ChevronLeft className="w-5 h-5" />
						<span>Previous Material</span>
					</button>

					<div className="flex items-center gap-4">
						{/* Material Type Switcher (for demo) */}
						<div className="flex bg-gray-100 rounded-lg p-1">
							{['article', 'video', 'image'].map((type) => (
								<button
									key={type}
									onClick={() => setCurrentMaterial(type)}
									className={`px-3 py-1 rounded capitalize text-sm transition-colors ${
										currentMaterial === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'
									}`}
								>
									{type}
								</button>
							))}
						</div>
					</div>

					<button className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
						<span>Next Material</span>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Material;
