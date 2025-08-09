import React, {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import {CheckCircle, XCircle, X} from 'lucide-react';

export type AlertType = 'success' | 'error';

export interface Alert {
	id: string;
	type: AlertType;
	message: string;
}

interface AlertContextType {
	showSuccess: (message: string) => void;
	showError: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlert must be used within an AlertProvider');
	}
	return context;
};

interface AlertProviderProps {
	children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({children}) => {
	const [alert, setAlert] = useState<Alert | null>(null);

	const showAlert = (type: AlertType, message: string) => {
		const id = Math.random().toString(36).substring(2, 9);
		setAlert({id, type, message});
	};

	const showSuccess = (message: string) => showAlert('success', message);
	const showError = (message: string) => showAlert('error', message);

	const closeAlert = () => setAlert(null);

	return (
		<AlertContext.Provider value={{showSuccess, showError}}>
			{children}
			{alert && <AlertComponent alert={alert} onClose={closeAlert} />}
		</AlertContext.Provider>
	);
};

interface AlertComponentProps {
	alert: Alert;
	onClose: () => void;
}

export const AlertComponent: React.FC<AlertComponentProps> = ({alert, onClose}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				onClose();
			}, 300);
		}, 4000);

		return () => clearTimeout(timer);
	}, [onClose]);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	const isSuccess = alert.type === 'success';

	return (
		<div className="fixed top-4 right-4 z-50 max-w-sm w-full">
			<div
				className={`
          bg-white rounded-lg shadow-lg border-l-4 p-4 transition-all duration-300 ease-in-out
          ${isSuccess ? 'border-green-500' : 'border-red-500'}
          ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-[-20px]'}
        `}
			>
				<div className="flex items-start">
					<div className="flex-shrink-0">
						{isSuccess ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
					</div>
					<div className="ml-3 flex-1">
						<p className="text-sm font-medium text-gray-900">{alert.message}</p>
					</div>
					<div className="ml-4">
						<button onClick={handleClose} className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none">
							<X className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Example usage component
// export const AlertExample: React.FC = () => {
// 	const {showSuccess, showError} = useAlert();

// 	return (
// 		<div className="p-6 space-y-4">
// 			<h2 className="text-2xl font-bold text-gray-800 mb-4">Alert Demo</h2>

// 			<div className="space-x-4">
// 				<button
// 					onClick={() => showSuccess('Operation completed successfully!')}
// 					className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
// 				>
// 					Show Success
// 				</button>

// 				<button
// 					onClick={() => showError('Something went wrong!')}
// 					className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
// 				>
// 					Show Error
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
