import React, { useEffect } from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * AlertPopup - Severity-aware toast notification for alerts.
 * Colors and icons change based on severity level.
 */
const AlertPopup = ({ alert, onClose }) => {
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        if (!alert) return;
        const timer = setTimeout(() => onClose(), 6000);
        return () => clearTimeout(timer);
    }, [alert, onClose]);

    if (!alert) return null;

    const severity = alert.severity || 'Warning';

    const styles = {
        Critical: {
            bg: 'bg-red-50 border-red-300 dark:bg-red-900/40 dark:border-red-700',
            text: 'text-red-800 dark:text-red-200',
            icon: AlertCircle,
            iconColor: 'text-red-600 dark:text-red-400',
            label: t.alertPopup.criticalAlert
        },
        Warning: {
            bg: 'bg-orange-50 border-orange-300 dark:bg-orange-900/40 dark:border-orange-700',
            text: 'text-orange-800 dark:text-orange-200',
            icon: AlertTriangle,
            iconColor: 'text-orange-600 dark:text-orange-400',
            label: t.alertPopup.warning
        },
        Info: {
            bg: 'bg-blue-50 border-blue-300 dark:bg-blue-900/40 dark:border-blue-700',
            text: 'text-blue-800 dark:text-blue-200',
            icon: Info,
            iconColor: 'text-blue-600 dark:text-blue-400',
            label: t.alertPopup.information
        }
    };

    const s = styles[severity] || styles.Warning;
    const Icon = s.icon;

    return (
        <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-50 animate-slide-in`}>
            <div className={`${s.bg} border rounded-xl shadow-2xl p-4 flex items-start gap-3 max-w-sm backdrop-blur-sm`}>
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${s.iconColor}`} />
                <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${s.text}`}>{s.label}</h4>
                    <p className={`text-sm ${s.text}`}>{alert.message}</p>
                    <span className="text-xs opacity-60 mt-1.5 block">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                </div>
                <button onClick={onClose} className={`${s.iconColor} opacity-50 hover:opacity-100 transition-opacity`}>
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default AlertPopup;
