import React, { useState, useEffect } from 'react';
import { useSensor } from '../context/SensorContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import {
    BarChart3, TrendingUp, TrendingDown, Minus, Droplets, Thermometer,
    FlaskConical, Sprout, Shield, Download, Activity, Gauge
} from 'lucide-react';

const InsightsPage = () => {
    const { activeCrop, cropsConfig } = useSensor();
    const { t } = useLanguage();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const { data } = await api.get(`/sensors/insights?crop=${activeCrop}`);
                setInsights(data);
            } catch (err) {
                console.error('Insights fetch error:', err);
            }
            setLoading(false);
        };
        fetchInsights();
        const interval = setInterval(fetchInsights, 30000);
        return () => clearInterval(interval);
    }, [activeCrop]);

    const handleExport = async (range) => {
        try {
            const response = await api.get(`/sensors/export?range=${range}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sensor_data_${range}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Export error:', err);
        }
    };

    const trendIcons = {
        rising: <TrendingUp className="w-4 h-4 text-red-500" />,
        falling: <TrendingDown className="w-4 h-4 text-blue-500" />,
        stable: <Minus className="w-4 h-4 text-gray-400" />
    };

    const metricIcons = {
        temperature: <Thermometer className="w-5 h-5 text-red-500" />,
        humidity: <Droplets className="w-5 h-5 text-blue-500" />,
        ph: <FlaskConical className="w-5 h-5 text-purple-500" />,
        soilMoisture: <Sprout className="w-5 h-5 text-green-500" />
    };

    const metricUnits = {
        temperature: '°C',
        humidity: '%',
        ph: 'pH',
        soilMoisture: '%'
    };

    if (loading) {
        return (
            <div className="space-y-6 pb-12 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const current = insights?.current || {};
    const comparison = insights?.comparison || {};
    const crop = insights?.crop;

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-7 h-7 text-primary" />
                        {t.insights.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{t.insights.subtitle} {t.cropNav[activeCrop] || activeCrop} {crop?.emoji}</p>
                </div>
                <div className="flex gap-2">
                    {['24h', '7d', '1m'].map(range => (
                        <button
                            key={range}
                            onClick={() => handleExport(range)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 
                                border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <Download className="w-3.5 h-3.5" />
                            {t.insights.export} {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* 7-Day Averages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {Object.entries(current.averages || {}).map(([metric, avg]) => {
                    const trend = current.trends?.[metric];
                    const comp = comparison[metric];
                    const icon = metricIcons[metric];
                    const unit = metricUnits[metric];

                    return (
                        <div key={metric} className="card p-5 relative overflow-hidden group hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                    {icon}
                                    <span>{t.sensors[metric] || metric}</span>
                                </div>
                                {trend && (
                                    <div className="flex items-center gap-1">
                                        {trendIcons[trend.direction]}
                                        <span className="text-xs text-gray-400">{trend.arrow}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{avg}</span>
                                <span className="text-sm text-gray-400 font-medium">{unit}</span>
                            </div>
                            {comp && (
                                <p className={`text-xs mt-2 font-medium ${comp.direction === 'up' ? 'text-red-500' :
                                    comp.direction === 'down' ? 'text-blue-500' : 'text-gray-400'
                                    }`}>
                                    {comp.direction === 'up' ? '↑' : comp.direction === 'down' ? '↓' : '→'}
                                    {' '}{Math.abs(comp.change)} {unit} {t.insights.vsLastWeek} ({comp.percentChange > 0 ? '+' : ''}{comp.percentChange}%)
                                </p>
                            )}
                            {/* Crop ideal reference */}
                            {crop && (
                                <p className="text-xs text-gray-400 mt-1">
                                    {t.insights.ideal}: {crop[metric === 'soilMoisture' ? 'moisture' : metric === 'ph' ? 'ph' : metric]?.ideal}{unit}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Score Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Environmental Stability */}
                <div className="card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t.insights.envStability}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                <circle
                                    cx="18" cy="18" r="16" fill="none"
                                    stroke={current.stability >= 70 ? '#10b981' : current.stability >= 40 ? '#f59e0b' : '#ef4444'}
                                    strokeWidth="3"
                                    strokeDasharray={`${(current.stability || 0) * 1.005} 100.5`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-gray-800 dark:text-white">{current.stability || 0}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {current.stability >= 70 ? t.insights.stableConditions :
                                    current.stability >= 40 ? t.insights.someFluctuations :
                                        t.insights.highVariability}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{current.dataPoints || 0} {t.insights.dataPoints}</p>
                        </div>
                    </div>
                </div>

                {/* Growth Suitability */}
                <div className="card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Gauge className="w-5 h-5 text-green-500" />
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t.insights.growthSuitability}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                <circle
                                    cx="18" cy="18" r="16" fill="none"
                                    stroke={current.suitability >= 70 ? '#10b981' : current.suitability >= 40 ? '#f59e0b' : '#ef4444'}
                                    strokeWidth="3"
                                    strokeDasharray={`${(current.suitability || 0) * 1.005} 100.5`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-gray-800 dark:text-white">{current.suitability || 0}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {current.suitability >= 70 ? `${t.insights.excellentConditions} ${t.cropNav[activeCrop] || activeCrop}` :
                                    current.suitability >= 40 ? `${t.insights.moderateSuitability} ${t.cropNav[activeCrop] || activeCrop}` :
                                        `${t.insights.poorConditions} ${t.cropNav[activeCrop] || activeCrop}`}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{t.insights.basedOn7Day}</p>
                        </div>
                    </div>
                </div>

                {/* Water Usage Estimate */}
                <div className="card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Droplets className="w-5 h-5 text-cyan-500" />
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {t.insights.waterUsage}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">{current.waterUsage || 0}</span>
                            <p className="text-xs text-gray-400">{t.insights.mmPerWeek}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {t.insights.estimatedBased} {t.cropNav[activeCrop] || activeCrop} {t.insights.waterNeeds}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {t.insights.seasonalNeed}: {crop?.waterNeed || '—'} {t.insights.mmTotal}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Standard Deviations Table */}
            {current.stdDevs && (
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gray-500" />
                            {t.insights.weeklyVariability}
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.insights.metric}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.insights.average}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.insights.stdDev}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.insights.trend}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.insights.vsLastWeek}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {Object.entries(current.averages || {}).map(([metric, avg]) => (
                                    <tr key={metric} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                {metricIcons[metric]}
                                                {t.sensors[metric] || metric}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800 dark:text-white">
                                            {avg} {metricUnits[metric]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            ±{current.stdDevs?.[metric] || '—'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                {trendIcons[current.trends?.[metric]?.direction || 'stable']}
                                                <span className="text-xs text-gray-400">
                                                    {current.trends?.[metric]?.change > 0 ? '+' : ''}
                                                    {current.trends?.[metric]?.change || 0}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {comparison[metric] ? (
                                                <span className={`text-xs font-medium ${comparison[metric].direction === 'up' ? 'text-red-500' :
                                                    comparison[metric].direction === 'down' ? 'text-blue-500' : 'text-gray-400'
                                                    }`}>
                                                    {comparison[metric].change > 0 ? '+' : ''}{comparison[metric].change} ({comparison[metric].percentChange}%)
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">{t.noData}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InsightsPage;
