import React, {useState} from 'react';
import {BookOpen, Users, Award, Play, Star, ArrowRight, Menu, X, CheckCircle, PlayCircle, Volume2, Bot} from 'lucide-react';
import {Link} from 'react-router-dom';

export default function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	const courses = [
		{
			id: 1,
			title: 'Aksara Batak Dasar',
			level: 'Pemula',
			duration: '4 jam',
			modules: '12 modul',
			students: 245,
			rating: 4.8,
			progress: 75,
			status: 'Aktif',
			instructor: 'Dr. Mangihut Siraji',
			description: 'Pelajari dasar-dasar aksara Batak tradisional',
			color: 'green',
		},
		{
			id: 2,
			title: 'Aksara Batak Menengah',
			level: 'Menengah',
			duration: '6 jam',
			modules: '16 modul',
			students: 169,
			rating: 4.9,
			progress: 45,
			status: 'Aktif',
			instructor: 'Prof. Sari Matondang',
			description: 'Tingkatkan kemampuan menulis aksara Batak',
			color: 'green',
		},
		{
			id: 3,
			title: 'Sejarah Aksara Batak',
			level: 'Pemula',
			duration: '3 jam',
			modules: '8 modul',
			students: 156,
			rating: 5.0,
			progress: 100,
			status: 'Selesai',
			instructor: 'Dr. Poltak Sinaga',
			description: 'Memahami sejarah dan budaya aksara Batak',
			color: 'green',
		},
	];

	const features = [
		{
			icon: <BookOpen className="h-8 w-8" />,
			title: 'Kurikulum Terstruktur',
			description: 'Materi pembelajaran yang disusun secara sistematis dari dasar hingga mahir',
		},
		{
			icon: <Users className="h-8 w-8" />,
			title: 'Instruktur Berpengalaman',
			description: 'Diajar oleh ahli aksara Batak dengan pengalaman puluhan tahun',
		},
		{
			icon: <Bot className="h-8 w-8" />,
			title: 'AI Chatbot',
			description: 'Pembelajaran lebih informatif dan mudah dengan adanya fitur chatbot di material',
		},
	];

	const testimonials = [
		{
			name: 'Maria Simbolon',
			role: 'Mahasiswa',
			content: 'Platform pembelajaran yang sangat membantu untuk memahami budaya Batak melalui aksaranya.',
			rating: 5,
		},
		{
			name: 'Robert Hutabarat',
			role: 'Guru',
			content: 'Materi yang lengkap dan mudah dipahami. Sangat cocok untuk pemula maupun yang ingin mendalami.',
			rating: 5,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
								<BookOpen className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold text-gray-900">Aksara Batak</span>
						</div>

						<div className="hidden md:flex items-center space-x-8">
							<a href="#beranda" className="text-gray-900 hover:text-green-600 transition-colors font-medium">
								Beranda
							</a>
							<a href="#kursus" className="text-gray-700 hover:text-green-600 transition-colors">
								Kursus
							</a>
							<Link to="/login">
								<button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
									Masuk
								</button>
							</Link>
						</div>

						<div className="md:hidden">
							<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
								{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-200">
						<div className="px-4 py-4 space-y-3">
							<a href="#beranda" className="block text-gray-900 hover:text-green-600 font-medium">
								Beranda
							</a>
							<a href="#kursus" className="block text-gray-700 hover:text-green-600">
								Kursus
							</a>
							<a href="#tentang" className="block text-gray-700 hover:text-green-600">
								Tentang
							</a>
							<a href="#kontak" className="block text-gray-700 hover:text-green-600">
								Kontak
							</a>
							<button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
								Masuk
							</button>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section id="beranda" className="relative overflow-hidden bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="space-y-6">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
									Pelajari
									<span className="text-green-600"> Aksara Batak </span>
									dengan Mudah
								</h1>
								<p className="text-lg md:text-xl text-gray-600 leading-relaxed">
									Selamat datang kembali! Jelajahi warisan budaya Batak melalui pembelajaran aksara tradisional yang interaktif dan
									menyenangkan.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg font-medium">
									<Play className="h-5 w-5" />
									<Link to="/login">
										<span>Mulai Belajar</span>
									</Link>
								</button>
							</div>

							{/* <div className="grid grid-cols-3 gap-8 pt-4">
								<div className="text-center">
									<div className="text-3xl font-bold text-green-600">889</div>
									<div className="text-sm text-gray-600 font-medium">Total Siswa</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-green-600">6</div>
									<div className="text-sm text-gray-600 font-medium">Total Kursus</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-green-600">4.9</div>
									<div className="text-sm text-gray-600 font-medium">Rating</div>
								</div>
							</div> */}
						</div>

						<div className="relative">
							<div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
								<img src="/images/landing_page.jpeg" alt="Aksara Batak Learning" className="w-full h-auto object-cover" />
							</div>

							{/* Floating Cards */}
							{/* <div className="absolute z-20 -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
								<div className="flex items-center space-x-3">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span className="text-sm font-medium text-gray-700">4 Kursus Aktif</span>
								</div>
							</div> */}

							{/* <div className="absolute z-20 -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
								<div className="flex items-center space-x-2">
									<Star className="h-5 w-5 text-yellow-400 fill-current" />
									<span className="text-sm font-medium text-gray-700">Rating 4.9/5</span>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</section>

			{/* Video Section */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lihat Bagaimana Kami Mengajar</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Tonton video pengenalan untuk memahami metode pembelajaran aksara Batak kami
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="relative group cursor-pointer" onClick={() => setShowVideoModal(true)}>
							<div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
								<div className="relative w-full h-full bg-black/20 flex items-center justify-center">
									{/* Video Thumbnail Placeholder */}
									<div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-gray-900/50"></div>

									{/* Play Button */}
									<div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
										<PlayCircle className="h-16 w-16 text-white" />
									</div>

									{/* Video Info Overlay */}
									<div className="absolute bottom-6 left-6 right-6 text-white">
										<h3 className="text-xl font-bold mb-2">Pengenalan Aksara Batak</h3>
										<div className="flex items-center space-x-4 text-sm">
											<span className="flex items-center space-x-1">
												<Play className="h-4 w-4" />
												<span>5:24</span>
											</span>
											<span className="flex items-center space-x-1">
												<Volume2 className="h-4 w-4" />
												<span>Bahasa Indonesia</span>
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Hover Effect */}
							<div className="absolute inset-0 bg-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</div>

						{/* Video Stats */}
						<div className="flex items-center justify-center space-x-8 mt-8 text-gray-600">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-sm">12K+ views</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-sm">95% like rate</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-sm">HD Quality</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideoModal && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
					onClick={() => setShowVideoModal(false)}
				>
					<div className="relative w-full max-w-4xl mx-4 aspect-video" onClick={(e) => e.stopPropagation()}>
						<button
							onClick={() => setShowVideoModal(false)}
							className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
						>
							<X className="h-8 w-8" />
						</button>
						<div className="w-full h-full bg-black rounded-lg overflow-hidden">
							{/* Replace with your YouTube embed */}
							<iframe
								src="https://www.youtube.com/embed/vibz794eY6Q?si=DG3HWoiJpS4rA6UA"
								title="Aksara Batak Learning Video"
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			)}

			{/* Features Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih Platform Kami?</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Kami menyediakan pengalaman belajar terbaik untuk mempelajari aksara Batak
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
								<div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors">
									<div className="text-green-600 group-hover:text-white transition-colors">{feature.icon}</div>
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
								<p className="text-gray-600 leading-relaxed">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Courses Section */}
			<section id="kursus" className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kursus Populer</h2>
						<p className="text-xl text-gray-600">Pilih kursus yang sesuai dengan level dan kebutuhan Anda</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{courses.map((course) => (
							<div
								key={course.id}
								className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
							>
								<div className="h-2 bg-green-500"></div>

								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${
												course.status === 'Aktif'
													? 'bg-green-100 text-green-700'
													: course.status === 'Selesai'
													? 'bg-gray-100 text-gray-700'
													: 'bg-orange-100 text-orange-700'
											}`}
										>
											{course.status}
										</span>
										<div className="flex items-center space-x-1">
											<Star className="h-4 w-4 text-yellow-400 fill-current" />
											<span className="text-sm font-medium text-gray-700">{course.rating}</span>
										</div>
									</div>

									<h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
									<p className="text-gray-600 mb-4">{course.description}</p>

									<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
										<span>{course.duration}</span>
										<span>{course.modules}</span>
										<span>{course.students} siswa</span>
									</div>

									<div className="mb-4">
										<div className="flex items-center justify-between text-sm mb-2">
											<span className="text-gray-600">Progress</span>
											<span className="font-medium text-gray-900">{course.progress}%</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div className="h-2 rounded-full bg-green-500" style={{width: `${course.progress}%`}}></div>
										</div>
									</div>

									<div className="text-sm text-gray-600 mb-6">
										Instruktur: <span className="font-medium text-gray-900">{course.instructor}</span>
									</div>

									<button
										className={`w-full py-3 rounded-lg font-medium transition-colors ${
											course.progress === 100 ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-green-600 text-white hover:bg-green-700'
										}`}
									>
										{course.progress === 100 ? 'Tinjau Kembali' : 'Lanjutkan'}
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg">
							Lihat Semua Kursus
						</button>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			{/* <section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apa Kata Siswa Kami</h2>
						<p className="text-xl text-gray-600">Testimoni dari siswa yang telah belajar bersama kami</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{testimonials.map((testimonial, index) => (
							<div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100">
								<div className="flex items-center space-x-1 mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
									))}
								</div>
								<p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
								<div>
									<div className="font-semibold text-gray-900">{testimonial.name}</div>
									<div className="text-sm text-gray-600">{testimonial.role}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* CTA Section */}
			<section className="py-20 bg-green-600">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Memulai Perjalanan Belajar Anda?</h2>
					<p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
						Bergabunglah dengan ribuan siswa lainnya dan mulai pelajari aksara Batak hari ini
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/login">
							<button className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg">
								Daftar Gratis
							</button>
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-3 mb-4">
								<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
									<BookOpen className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold">Aksara Batak</span>
							</div>
							<p className="text-gray-400">Platform pembelajaran aksara Batak terdepan untuk melestarikan budaya tradisional.</p>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Kursus</h3>
							<div className="space-y-2 text-gray-400">
								<div className="hover:text-green-400 cursor-pointer transition-colors">Aksara Dasar</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Aksara Menengah</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Sejarah Batak</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Kaligrafi Batak</div>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Dukungan</h3>
							<div className="space-y-2 text-gray-400">
								<div className="hover:text-green-400 cursor-pointer transition-colors">Pusat Bantuan</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">FAQ</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Kontak</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Komunitas</div>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Perusahaan</h3>
							<div className="space-y-2 text-gray-400">
								<div className="hover:text-green-400 cursor-pointer transition-colors">Tentang Kami</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Karir</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Blog</div>
								<div className="hover:text-green-400 cursor-pointer transition-colors">Kebijakan Privasi</div>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2025 Aksara Batak. Semua hak cipta dilindungi.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
