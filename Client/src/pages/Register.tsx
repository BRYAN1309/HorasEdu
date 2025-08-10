import React, {useState} from 'react';
import {Eye, EyeOff, User, Mail, Lock, BookOpen} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {useAlert} from '../components/Alert';
import {register} from '../api/auth';

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const {showSuccess, showError} = useAlert();
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		if (!formData) return;

		try {
			if (formData.confirmPassword !== formData.password) {
				showError('Konfirmasi kata sandi tidak cocok.');
				return;
			}

			const {confirmPassword, ...payload} = formData;
			await register(payload);
			showSuccess('Register success.');
			navigate('/login');
		} catch (err) {
			showError('Register error.');
		}
		console.log('Register form submitted:', formData);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-2 px-4">
			<div className="max-w-md w-full space-y-3">
				{/* Header */}
				<div className="text-center">
					<div className="flex justify-center items-center space-x-2 mb-2">
						<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
							<BookOpen className="w-4 h-4 text-white" />
						</div>
						<h1 className="text-lg font-bold text-gray-900">HorasEdu</h1>
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-1">Daftar Akun</h2>
					<p className="text-xs text-gray-600">Bergabunglah dengan komunitas pembelajaran Aksara Batak</p>
				</div>

				{/* Registration Form */}
				<div className="bg-white rounded-xl shadow-lg p-6">
					<form
						className="space-y-3"
						onSubmit={async (e) => {
							e.preventDefault(); // prevent page reload
							await handleSubmit();
						}}
					>
						{/* Full Name */}
						<div>
							<label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
								Nama Lengkap
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
									<User className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
									placeholder="Masukkan nama lengkap"
									value={formData.name}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						{/* Email */}
						<div>
							<label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
								Email
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
									<Mail className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									required
									className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
									placeholder="contoh@email.com"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
								Kata Sandi
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									required
									className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
									placeholder="Masukkan password"
									value={formData.password}
									onChange={handleInputChange}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-2 flex items-center"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
								Konfirmasi Kata Sandi
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									required
									className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
									placeholder="Ulangi kata sandi"
									value={formData.confirmPassword}
									onChange={handleInputChange}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-2 flex items-center"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Register Button */}
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
						>
							Daftar Sekarang
						</button>
					</form>

					{/* Login Link */}
					<div className="mt-3 text-center">
						<p className="text-xs text-gray-600">
							Sudah punya akun?{' '}
							<Link to="/login">
								<a href="#" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
									Masuk di sini
								</a>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
