import React from "react";
import { AlertCircle, Info, AlertTriangle, X } from "lucide-react";

type AlertType = "error" | "warning" | "info";

interface AlertProps {
    type: AlertType;
    title?: string;
    message: string;
    onClose?: () => void;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, onClose, className = "" }) => {
    const getAlertStyles = () => {
        switch (type) {
            case "error":
                return "bg-red-50 border-red-200 text-red-800";
            case "warning":
                return "bg-amber-50 border-amber-200 text-amber-800";
            case "info":
                return "bg-emerald-50 border-emerald-200 text-emerald-800";
            default:
                return "bg-gray-50 border-gray-200 text-gray-800";
        }
    };

    const getIcon = () => {
        const iconClass = "w-5 h-5 flex-shrink-0";
        switch (type) {
            case "error":
                return <AlertCircle className={`${iconClass} text-red-500`} />;
            case "warning":
                return <AlertTriangle className={`${iconClass} text-amber-500`} />;
            case "info":
                return <Info className={`${iconClass} text-emerald-500`} />;
            default:
                return <Info className={`${iconClass} text-gray-500`} />;
        }
    };

    const getCloseButtonStyles = () => {
        switch (type) {
            case "error":
                return "text-red-400 hover:text-red-600 hover:bg-red-100";
            case "warning":
                return "text-amber-400 hover:text-amber-600 hover:bg-amber-100";
            case "info":
                return "text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100";
            default:
                return "text-gray-400 hover:text-gray-600 hover:bg-gray-100";
        }
    };

    return (
        <div
            className={`
        relative rounded-lg border p-4 shadow-sm transition-all duration-200
        ${getAlertStyles()}
        ${className}
      `}
            role="alert"
        >
            <div className="flex items-start gap-3">
                {getIcon()}

                <div className="flex-1 min-w-0">
                    {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
                    <p className="text-sm leading-relaxed">{message}</p>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className={`
              p-1 rounded-md transition-colors duration-200
              ${getCloseButtonStyles()}
            `}
                        aria-label="Close alert"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

// Demo component to showcase the alerts
const AlertDemo: React.FC = () => {
    const [alerts, setAlerts] = React.useState([
        { id: 1, type: "error" as AlertType, title: "Error", message: "Something went wrong. Please try again." },
        { id: 2, type: "warning" as AlertType, title: "Warning", message: "This action cannot be undone." },
        { id: 3, type: "info" as AlertType, title: "Info", message: "Your changes have been saved successfully." },
    ]);

    const removeAlert = (id: number) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    const resetAlerts = () => {
        setAlerts([
            { id: Date.now() + 1, type: "error", title: "Error", message: "Something went wrong. Please try again." },
            { id: Date.now() + 2, type: "warning", title: "Warning", message: "This action cannot be undone." },
            { id: Date.now() + 3, type: "info", title: "Info", message: "Your changes have been saved successfully." },
        ]);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Component</h1>
                <p className="text-gray-600">Modern, elegant alerts with clean design</p>
            </div>

            <div className="space-y-4 mb-8">
                {alerts.map((alert) => (
                    <Alert key={alert.id} type={alert.type} title={alert.title} message={alert.message} onClose={() => removeAlert(alert.id)} />
                ))}
            </div>

            {alerts.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">All alerts have been dismissed</p>
                    <button onClick={resetAlerts} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                        Reset Alerts
                    </button>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Usage Example:</h3>
                <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-x-auto">
                    {`<Alert 
                        type="error" 
                        title="Error" 
                        message="Something went wrong" 
                        onClose={() => console.log('closed')} 
                        />`}
                </pre>
            </div>
        </div>
    );
};

export default AlertDemo;
