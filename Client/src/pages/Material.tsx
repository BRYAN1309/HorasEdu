import {useEffect, useRef, useState} from 'react';
import {
	ArrowLeft,
	BookOpen,
	Play,
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
	Divide,
	ExternalLink,
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import type {IMaterialsVisited, Material} from '../types/types';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {viewMaterials} from '../api/material';
import {createMaterialVisited, viewMaterialsVisited} from '../api/materialVisited';

const MaterialPage = () => {
	// const [currentMaterial, setCurrentMaterial] = useState('article');
	const [isPlaying, setIsPlaying] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [material, setMaterial] = useState<Material>();
	const [materials, setMaterials] = useState<Material[]>([]);
	const {id_module, id_material} = useParams();
	const navigate = useNavigate();
	const videoRef = useRef<HTMLVideoElement>(null);

	const location = useLocation();

	useEffect(() => {
		if (!id_material) {
			return;
		}

		const viewMaterialPage = async () => {
			try {
				const materialsVisited: IMaterialsVisited[] = (await viewMaterialsVisited([Number(id_material)])) || [];

				if (!materialsVisited.find((material) => material.materials_id === Number(id_material))) {
					await createMaterialVisited(Number(id_material));
				}

				setIsCompleted(true);
				await viewMaterials(Number(id_module), setMaterials);
			} catch (err) {
				alert('Error view material');
				console.log(`Error view material : ${err}`);
			}
		};

		viewMaterialPage();
	}, [id_material]);

	useEffect(() => {
		if (materials.length > 0) {
			const material = materials.find((m) => m.id === Number(id_material));
			if (!material) return;

			setMaterial(material);
		}
	}, [materials, id_material]);

	const currentIndex = materials.findIndex((material) => material.id === Number(id_material));

	const navigateMaterial = (next: boolean) => {
		if (!(materials.length > 0)) return;

		const id = next ? materials[currentIndex + 1].id : materials[currentIndex - 1].id;
		navigate(`${location.pathname.split('/').slice(0, -1).join('/')}/${id}`);
	};

	const togglePlay = () => {
		if (!videoRef.current) return;

		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};

	const renderArticleContent = () => (
		<div className="prose max-w-none">
			<div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{__html: material?.content || ''}} />
		</div>
	);

	const renderVideoContent = () => {
		// Function to extract video ID from YouTube URL
		const getYouTubeVideoId = (url: string): string | null => {
			if (!url) return null;

			// Handle various YouTube URL formats
			const regexPatterns = [
				/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
				/youtube\.com\/v\/([^&\n?#]+)/,
				/youtube\.com\/shorts\/([^&\n?#]+)/,
			];

			for (const pattern of regexPatterns) {
				const match = url.match(pattern);
				if (match && match[1]) {
					return match[1];
				}
			}

			return null;
		};

		// Function to create YouTube embed URL
		const getYouTubeEmbedUrl = (url: string): string => {
			// If it's already an embed URL, return as is
			if (url.includes('youtube.com/embed/')) {
				// Add autoplay parameter if not present
				const separator = url.includes('?') ? '&' : '?';
				return url.includes('autoplay=') ? url : `${url}${separator}autoplay=0&rel=0&modestbranding=1`;
			}

			const videoId = getYouTubeVideoId(url);
			if (!videoId) return url;

			return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1`;
		};

		const embedUrl = material?.media_url ? getYouTubeEmbedUrl(material.media_url) : '';

		return (
			<div className="space-y-6">
				{/* YouTube Video Player */}
				<div className="bg-black rounded-lg overflow-hidden shadow-lg">
					<div className="aspect-video bg-gray-900 relative">
						{embedUrl ? (
							<iframe
								src={embedUrl}
								className="w-full h-full"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title={material?.title || 'Video content'}
							/>
						) : (
							// Fallback when no valid URL is provided
							<div className="w-full h-full flex items-center justify-center bg-gray-800">
								<div className="text-center text-white">
									<Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
									<p className="text-lg font-medium">Video not available</p>
									<p className="text-sm text-gray-400 mt-2">Please check the video URL</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Video Information */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">{material?.title}</h3>
							{material?.description && <p className="text-gray-600 leading-relaxed">{material.description}</p>}
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-500 ml-4">
							<Clock className="w-4 h-4" />
							<span>{material?.duration || 0} minutes</span>
						</div>
					</div>

					{/* Video Stats */}
					<div className="flex items-center space-x-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
						<div className="flex items-center space-x-1">
							<Play className="w-4 h-4" />
							<span>Video Lesson</span>
						</div>
						<div className="flex items-center space-x-1">
							<Eye className="w-4 h-4" />
							<span>Interactive Content</span>
						</div>
						{embedUrl && (
							<a
								href={material?.media_url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
							>
								<ExternalLink className="w-4 h-4" />
								<span>Watch on YouTube</span>
							</a>
						)}
					</div>
				</div>

				{/* Optional: Video Notes Section */}
				<div className="bg-blue-50 rounded-lg p-6">
					<h4 className="font-semibold text-blue-900 mb-3 flex items-center">
						<BookOpen className="w-5 h-5 mr-2" />
						Video Notes
					</h4>
					<div className="text-blue-800 text-sm space-y-2">
						<p>• Take notes while watching to better retain the information</p>
						<p>• You can pause and rewind the video as needed</p>
						<p>• Consider watching at different speeds for optimal learning</p>
						{material?.duration && <p>• Estimated completion time: {material.duration} minutes</p>}
					</div>
				</div>

				{/* Video Transcript (if available) */}
				{/* {material?.transcript && (
					<div className="bg-gray-50 rounded-lg p-6">
						<h3 className="font-semibold text-gray-900 mb-3 flex items-center">
							<FileText className="w-5 h-5 mr-2" />
							Transcript
						</h3>
						<div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{material.transcript}</div>
					</div>
				)} */}
			</div>
		);
	};

	const renderImageContent = () => {
		console.log('Image content is rendered');

		return (
			<div className="space-y-6">
				<div className="bg-gray-50 rounded-lg overflow-hidden">
					<img src={material?.image_url} alt={''} className="w-full h-auto" />
					<div className="p-6">
						<h3 className="font-semibold text-gray-900 mb-2 text-xl">Konten</h3>
						<p className="text-gray-600">{material?.content}</p>
					</div>
				</div>
			</div>
		);
	};

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

	return material ? (
		<div className="min-h-screen bg-gray-50">
			<Chatbot material={material} />

			{/* Header */}
			<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link to={`${location.pathname.split('/').slice(0, -2).join('/')}`}>
								<button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors hover:cursor-pointer">
									<ArrowLeft className="w-5 h-5" />
									<span>Back to Module</span>
								</button>
							</Link>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<Clock className="w-4 h-4" />
								<span>{material?.duration} Menit</span>
							</div>

							<button
								className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
									isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								<CheckCircle className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
								<span>Completed</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Material Header */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-green-100 text-green-600 rounded-lg">{getIcon(material?.type)}</div>
						<div className="flex-1">
							<h1 className="text-2xl font-bold text-gray-900 mb-2">{material?.title}</h1>
							<p className="text-gray-600 mb-4">{material?.description}</p>
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">{material?.type}</span>
								<span>•</span>
								<span>{material?.duration} Menit</span>
							</div>
						</div>
					</div>
				</div>

				{/* Material Content */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
					{material?.type === 'article' && renderArticleContent()}
					{material?.type === 'video' && renderVideoContent()}
					{material?.type === 'image' && renderImageContent()}
				</div>

				{/* Navigation */}
				<div className="flex justify-between items-center">
					{materials[currentIndex - 1] ? (
						<button
							className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors hover:cursor-pointer"
							onClick={() => {
								navigateMaterial(false);
							}}
						>
							<ChevronLeft className="w-5 h-5" />
							<span>Previous Material</span>
						</button>
					) : (
						<div className="w-[160px]"></div>
					)}

					<div className="flex items-center gap-4">
						{/* Material Type Switcher (for demo) */}
						<div className="flex bg-gray-100 rounded-lg p-1">
							<button
								className={`px-3 py-1 rounded capitalize text-sm transition-colors ${
									material?.type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'
								}`}
							>
								{material?.type}
							</button>
							{/* {['article', 'video', 'image'].map((type) => (
								<button
									key={type}
									// onClick={() => setCurrentMaterial(type)}
									className={`px-3 py-1 rounded capitalize text-sm transition-colors ${
										material?.t === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'
									}`}
								>
									{type}
								</button>
							))} */}
						</div>
					</div>

					{materials[currentIndex + 1] ? (
						<button
							className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors hover:cursor-pointer"
							onClick={() => {
								navigateMaterial(true);
							}}
						>
							<span>Next Material</span>
							<ChevronRight className="w-5 h-5" />
						</button>
					) : (
						<div className="w-[160px]"></div>
					)}
				</div>
			</div>
		</div>
	) : (
		''
	);
};

export default MaterialPage;
