import React from 'react';
import { AlertTriangle, Zap, Radio, TrendingUp } from 'lucide-react';

/**
 * AnomalyBanner - Shows detected anomalies in a compact banner.
 * Anomalies are detected via z-score and spike detection algorithms.
 */
const AnomalyBanner = ({ anomalies }) => {
    if (!anomalies || anomalies.length === 0) return null;

    const icons = {
        spike: Zap,
        outlier: TrendingUp,
        malfunction: Radio
    };

    const severityColors = {
        Critical: 'border-red-500 bg-red-50 dark:bg-red-900/20',
        Warning: 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
    };

    return (
        <div className="space-y-2">
            {anomalies.slice(0, 3).map((a, i) => {
                const Icon = icons[a.type] || AlertTriangle;
                return (
                    <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 transition-all duration-300 ${severityColors[a.severity] || severityColors.Warning}`}
                    >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${a.severity === 'Critical' ? 'text-red-500' : 'text-orange-400'}`} />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{a.message}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {a.type.toUpperCase()} • {a.metric}
                            </p>
                        </div>
                        <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${a.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {a.severity}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default AnomalyBanner;
