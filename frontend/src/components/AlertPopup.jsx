import React, { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

const AlertPopup = ({ alert, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [alert, onClose]);

    if (!alert) return null;

    return (
        <div className="fixed top-4 right-4 z-50 animate-bounce-in">
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-lg p-4 flex items-start gap-4 max-w-sm">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase mb-1">Critical Alert</h4>
                    <p className="text-sm">{alert.message}</p>
                    <span className="text-xs text-red-400 mt-2 block">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                </div>
                <button onClick={onClose} className="text-red-400 hover:text-red-600 transition-colors">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default AlertPopup;
