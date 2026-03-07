import React from 'react';
import { Shield, Flame, Droplets, Bug } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * RiskPanel - Displays disease, heat, and water stress probabilities
 * All values are mathematically computed on the backend.
 */
const RiskPanel = ({ risks }) => {
    const { t } = useLanguage();

    if (!risks) return null;

    const riskItems = [
        { key: 'disease', label: t.riskPanel.diseaseRisk, icon: Bug, color: '#8b5cf6', value: risks.disease },
        { key: 'heat', label: t.riskPanel.heatStress, icon: Flame, color: '#ef4444', value: risks.heat },
        { key: 'water', label: t.riskPanel.waterStress, icon: Droplets, color: '#3b82f6', value: risks.water },
    ];

    const getBarColor = (value) => {
        if (value >= 70) return '#ef4444';
        if (value >= 40) return '#f59e0b';
        if (value >= 20) return '#fbbf24';
        return '#10b981';
    };

    const overallColor = {
        Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        Moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    };

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t.riskPanel.riskAssessment}
                    </h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${overallColor[risks.overall] || overallColor.Low}`}>
                    {risks.overall}
                </span>
            </div>

            <div className="space-y-4">
                {riskItems.map(({ key, label, icon: Icon, color, value }) => (
                    <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" style={{ color }} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                            </div>
                            <span className="text-sm font-bold" style={{ color: getBarColor(value) }}>
                                {value}%
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: `${Math.max(2, value)}%`,
                                    backgroundColor: getBarColor(value)
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskPanel;
