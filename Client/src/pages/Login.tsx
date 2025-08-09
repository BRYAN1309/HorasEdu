import {useContext, useState} from 'react';
import {Eye, EyeOff, Mail, Lock, BookOpen, Users, Award} from 'lucide-react';
import {login} from '../api/auth';
import {useNavigate} from 'react-router-dom';
import {AlertComponent, useAlert} from '../components/Alert';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {showSuccess, showError} = useAlert();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			setError('Mohon isi email dan password.');
			return;
		}

		setError('');
		setIsLoading(true);

		try {
			await login({email: email, password: password});
			console.log('Logging in with', {email, password});
			showSuccess('Login success.');
			navigate('/dashboard');
		} catch (err) {
			showError('Login error.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
			style={{
				backgroundImage: 'url(/images/login_wallpaper.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

			<div className="relative z-10 w-full h-full max-w-6xl flex items-center justify-center overflow-auto p-4">
				<div className="flex flex-col lg:flex-row w-full items-center justify-center">
					{/* Left Side */}
					<div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
						<div className="text-center lg:text-left">
							<h1 className="text-5xl font-bold text-slate-800 mb-4">Selamat Datang!</h1>
							<p className="text-xl text-slate-600 mb-8">Mari mulai perjalanan belajar Aksara Batak bersama kami</p>

							<div className="space-y-4">
								<div className="flex items-center p-4 bg-white/80 rounded-2xl shadow-sm">
									<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
										<BookOpen className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<h3 className="font-semibold text-slate-800">Pelajari Dasar-dasar</h3>
										<p className="text-sm text-slate-600">Mulai dari huruf hingga kata</p>
									</div>
								</div>

								<div className="flex items-center p-4 bg-white/80 rounded-2xl shadow-sm">
									<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
										<Users className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<h3 className="font-semibold text-slate-800">Belajar Bersama</h3>
										<p className="text-sm text-slate-600">Komunitas pembelajar aktif</p>
									</div>
								</div>

								<div className="flex items-center p-4 bg-white/80 rounded-2xl shadow-sm">
									<div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
										<Award className="w-6 h-6 text-yellow-600" />
									</div>
									<div>
										<h3 className="font-semibold text-slate-800">Raih Pencapaian</h3>
										<p className="text-sm text-slate-600">Sistem penghargaan menarik</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side */}
					<div className="w-full lg:w-1/2 max-w-md">
						<div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
							<div className="text-center mb-8">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
									<BookOpen className="w-8 h-8 text-green-600" />
								</div>
								<h2 className="text-3xl font-bold text-slate-800 mb-2">Masuk</h2>
								<p className="text-slate-600">Lanjutkan pembelajaran Anda</p>
							</div>

							<div className="space-y-6">
								{/* Email */}
								<div className="space-y-2">
									<label htmlFor="email" className="block text-slate-700 font-medium text-sm">
										Email
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
										<input
											id="email"
											type="email"
											className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="nama@email.com"
										/>
									</div>
								</div>

								{/* Password */}
								<div className="space-y-2">
									<label htmlFor="password" className="block text-slate-700 font-medium text-sm">
										Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
										<input
											id="password"
											type={showPassword ? 'text' : 'password'}
											className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Masukkan password"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
										>
											{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
										</button>
									</div>
								</div>

								{/* Error */}
								{error && (
									<div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
										<p className="text-red-600 text-sm">{error}</p>
									</div>
								)}

								{/* Options */}
								<div className="flex items-center justify-between text-sm">
									<label className="flex items-center text-slate-600 cursor-pointer">
										<input type="checkbox" className="mr-2 accent-green-500" />
										Ingat saya
									</label>
									<a href="#" className="text-green-600 hover:text-green-700 font-medium transition-colors">
										Lupa password?
									</a>
								</div>

								{/* Submit */}
								<button
									onClick={handleSubmit}
									disabled={isLoading}
									className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
								>
									{isLoading ? (
										<div className="flex items-center justify-center">
											<div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
											Masuk...
										</div>
									) : (
										'Masuk'
									)}
								</button>
							</div>

							{/* Footer */}
							<div className="mt-8 text-center">
								<p className="text-slate-600 text-sm">
									Belum punya akun?{' '}
									<a href="#" className="text-green-600 hover:text-green-700 font-medium transition-colors">
										Daftar sekarang
									</a>
								</p>
							</div>

							{/* Quick Access */}
							<div className="mt-6">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-slate-200"></div>
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="bg-white px-4 text-slate-500">Atau</span>
									</div>
								</div>

								<div className="mt-4 grid grid-cols-2 gap-3">
									<button className="flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 rounded-xl text-slate-700 transition-all duration-200">
										<BookOpen className="w-5 h-5 mr-2" />
										Jelajahi Kursus
									</button>
									<button className="flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 rounded-xl text-slate-700 transition-all duration-200">
										<Users className="w-5 h-5 mr-2" />
										Mode Tamu
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
