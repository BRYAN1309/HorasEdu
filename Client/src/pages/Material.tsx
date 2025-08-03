import {useEffect, useState} from 'react';
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

	// Sample material data
	// const materialData: any = {
	// 	article: {
	// 		id: 'article-1',
	// 		type: 'article',
	// 		title: 'History of Batak Script',
	// 		description: 'Explore the origins and evolution of Aksara Batak',
	// 		duration: '8 min read',
	// 		content: `
	//     <h2>The Ancient Origins of Aksara Batak</h2>
	//     <p>Aksara Batak, also known as Surat Batak, is an ancient script used by the Batak people of North Sumatra, Indonesia. This traditional writing system has been used for centuries to preserve important cultural knowledge, including traditional medicine, genealogies, and religious texts.</p>

	//     <h3>Historical Development</h3>
	//     <p>The script is believed to have originated around the 13th century, influenced by Indian scripts brought to Southeast Asia through trade and cultural exchange. The Batak people adapted these scripts to suit their own language and cultural needs.</p>

	//     <h3>Cultural Significance</h3>
	//     <p>Aksara Batak was traditionally used by <em>datu</em> (traditional healers and spiritual leaders) to record sacred knowledge. The script was considered sacred and was used to write pustaha (traditional books made from tree bark).</p>

	//     <h3>Modern Preservation</h3>
	//     <p>Today, efforts are being made to preserve and revitalize Aksara Batak through education programs and digital initiatives. Learning this script helps connect modern Batak people with their cultural heritage.</p>
	//   `,
	// 	},
	// 	video: {
	// 		id: 'video-1',
	// 		type: 'video',
	// 		title: 'Batak Script Overview',
	// 		description: 'Video introduction to the fundamentals of Batak writing',
	// 		duration: '12 min',
	// 		videoUrl: 'https://example.com/batak-script-overview.mp4',
	// 		transcript:
	// 			"Welcome to this introduction to Aksara Batak. In this video, we'll explore the fundamental aspects of this ancient writing system...",
	// 	},
	// 	image: {
	// 		id: 'image-1',
	// 		type: 'image',
	// 		title: 'Basic Batak Characters',
	// 		description: 'Visual guide to fundamental Aksara Batak symbols',
	// 		duration: '5 min',
	// 		images: [
	// 			{
	// 				id: 1,
	// 				title: 'Consonant Characters',
	// 				description: 'Basic consonant symbols in Aksara Batak',
	// 				url: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Consonant+Characters',
	// 			},
	// 			{
	// 				id: 2,
	// 				title: 'Vowel Markers',
	// 				description: 'Vowel diacritical marks used with consonants',
	// 				url: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Vowel+Markers',
	// 			},
	// 			{
	// 				id: 3,
	// 				title: 'Number System',
	// 				description: 'Traditional Batak numerical symbols',
	// 				url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Number+System',
	// 			},
	// 		],
	// 	},
	// };

	// const currentData = materialData[currentMaterial];

	const renderArticleContent = () => (
		<div className="prose max-w-none">
			<div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{__html: material?.content || ''}} />
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
						<p className="text-sm text-gray-400 mt-2">Click to play: {material?.title}</p>
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
			{/* <div className="bg-gray-50 rounded-lg p-6">
				<h3 className="font-semibold text-gray-900 mb-3">Transcript</h3>
				<p className="text-gray-700 leading-relaxed">{currentData.transcript}</p>
			</div> */}
		</div>
	);

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
			<Chatbot />

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
