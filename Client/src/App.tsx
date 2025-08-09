import './App.css';
import {Outlet} from 'react-router-dom';
import {AppProvider} from './contexts/AppContext';
import {AlertProvider} from './components/Alert';

function App() {
	return (
		<AppProvider>
			<AlertProvider>
				<Outlet />
			</AlertProvider>
		</AppProvider>
	);
}

export default App;
