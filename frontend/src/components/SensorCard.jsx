import React from 'react';
import clsx from 'clsx';
import { Thermometer, Droplets, FlaskConical } from 'lucide-react';

const icons = {
    temperature: Thermometer,
    humidity: Droplets,
    ph: FlaskConical
};

const units = {
    temperature: '°C',
    humidity: '%',
    ph: 'pH'
};

const SensorCard = ({ type, value, status, lastUpdated }) => {
    const Icon = icons[type] || Thermometer;
    const unit = units[type] || '';

    const statusColors = {
        normal: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-orange-100 text-orange-800 border-orange-200',
        critical: 'bg-red-100 text-red-800 border-red-200 animate-pulse'
    };

    const cardBorder = {
        normal: 'border-l-4 border-l-green-500',
        warning: 'border-l-4 border-l-orange-500',
        critical: 'border-l-4 border-l-red-500 shadow-red-100'
    };

    return (
        <div className={clsx("card relative overflow-hidden transition-all duration-300", cardBorder[status])}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg dark:bg-gray-700">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg capitalize text-gray-700 dark:text-gray-200">{type}</h3>
                </div>
                <span className={clsx("px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide", statusColors[status])}>
                    {status}
                </span>
            </div>

            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{value}</span>
                <span className="text-gray-500 font-medium text-lg">{unit}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400">
                    Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '--:--'}
                </p>
            </div>
        </div>
    );
};

export default SensorCard;
