import {useEffect} from 'react';
import {useAppContext} from '../contexts/AppContext';
import {X} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
	const {sidebarOpen, setSidebarOpen, sidebarItems, setSidebarItems} = useAppContext();
	const {pathname} = useLocation();

	useEffect(() => {
		setSidebarItems((prev) =>
			prev.map((item) => ({
				...item,
				active: pathname.includes(item.label.toLowerCase()),
			}))
		);
	}, [pathname]);

	return (
		<div
			className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r border-gray-200 ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			} lg:translate-x-0 lg:static lg:inset-0`}
		>
			<div className="flex items-center justify-between p-6 border-b border-gray-200">
				<h2 className="text-xl font-bold text-gray-900">Aksara Batak</h2>
				<button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors">
					<X size={20} />
				</button>
			</div>

			<nav className="mt-6 px-4">
				{sidebarItems.map((item, index) => (
					<Link to={`/${item.label.toLowerCase()}`}>
						<button
							key={index}
							className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors mb-1 ${
								item.active ? 'bg-green-50 text-green-700 border-r-2 border-green-600' : 'text-gray-700 hover:bg-gray-50'
							}`}
						>
							<item.icon size={20} className="mr-3" />
							{item.label}
						</button>
					</Link>
				))}
			</nav>
		</div>
	);
};

export default Sidebar;
