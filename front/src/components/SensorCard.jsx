import React from 'react';
import clsx from 'clsx';
import { Thermometer, Droplets, FlaskConical, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = {
    temperature: Thermometer,
    humidity: Droplets,
    ph: FlaskConical,
    soilMoisture: Sprout
};

const units = {
    temperature: '°C',
    humidity: '%',
    ph: 'pH',
    soilMoisture: '%'
};

const iconColors = {
    temperature: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    humidity: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    ph: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
    soilMoisture: 'text-green-500 bg-green-50 dark:bg-green-900/20'
};

const SensorCard = ({ type, value, status, lastUpdated }) => {
    const { t } = useLanguage();
    const Icon = icons[type] || Thermometer;
    const unit = units[type] || '';
    const label = t.sensors[type] || type;

    const statusLabels = {
        normal: t.sensors.normal,
        warning: t.sensors.warning,
        critical: t.sensors.critical,
    };

    const statusStyles = {
        normal: 'border-l-green-500',
        warning: 'border-l-orange-400',
        critical: 'border-l-red-500'
    };

    const statusBadge = {
        normal: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };

    return (
        <div className={clsx(
            "card relative overflow-hidden transition-all duration-300 border-l-4 group hover:shadow-lg",
            statusStyles[status]
        )}>
            {status === 'critical' && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent dark:from-red-900/10 animate-pulse" />
            )}

            <div className="relative">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2.5">
                        <div className={clsx("p-2 rounded-xl", iconColors[type])}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">{label}</h3>
                    </div>
                    <span className={clsx("px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide", statusBadge[status])}>
                        {statusLabels[status] || status}
                    </span>
                </div>

                <div className="flex items-baseline gap-1.5 mt-3">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums transition-all duration-300">
                        {value != null ? value : '--'}
                    </span>
                    <span className="text-gray-400 font-medium text-lg">{unit}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                        {lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
                    </p>
                    <div className="h-1 w-12 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/60 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorCard;
