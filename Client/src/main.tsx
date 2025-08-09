import {createRoot} from 'react-dom/client';
import './index.css';
import {RouterProvider} from 'react-router-dom';
import router from './routes/Routers.tsx';
import {AlertProvider} from './components/Alert.tsx';

createRoot(document.getElementById('root')!).render(
	<AlertProvider>
		<RouterProvider router={router} />
	</AlertProvider>
);
