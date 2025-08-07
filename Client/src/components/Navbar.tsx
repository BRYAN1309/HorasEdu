import {Bell, User, Menu} from 'lucide-react';
import {useAppContext} from '../contexts/AppContext';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Capitalize} from '../utils/utils';

const Navbar = () => {
	const {setSidebarOpen} = useAppContext();
	const location = useLocation();
	const [page, setPage] = useState<string>('');
	const pages: string[] = ['profile', 'dashboard'];

	useEffect(() => {
		const currentPage = pages.find((page) => location.pathname.toLowerCase().includes(page));
		setPage(currentPage || '');
	}, []);

	return (
		<header className="bg-white border-b border-gray-200">
			<div className="flex items-center justify-between px-6 py-4">
				<div className="flex items-center">
					<button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors mr-4">
						<Menu size={20} />
					</button>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">{Capitalize(page)}</h1>
						<p className="text-sm text-gray-600">Selamat datang kembali!</p>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
						<Bell size={20} className="text-gray-600" />
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
					</button>
					<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
						<User size={20} className="text-gray-600" />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
