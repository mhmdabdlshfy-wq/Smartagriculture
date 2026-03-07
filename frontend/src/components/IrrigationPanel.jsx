import React, { useState } from 'react';
import api from '../services/api';
import { useSensor } from '../context/SensorContext';
import { useLanguage } from '../context/LanguageContext';
import { Droplets, CloudRain, Sun, Timer, Gauge, Zap, TrendingDown } from 'lucide-react';

const IrrigationPanel = () => {
    const { activeCrop, sensorData } = useSensor();
    const { t } = useLanguage();
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [simulating, setSimulating] = useState(false);

    const fetchRecommendation = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/sensors/irrigation?crop=${activeCrop}`);
            setRecommendation(data);
        } catch (err) {
            console.error("Failed to fetch irrigation recommendation", err);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchRecommendation();
        const interval = setInterval(fetchRecommendation, 10000);
        return () => clearInterval(interval);
    }, [activeCrop]);

    const handleSimulation = () => {
        setSimulating(true);
        setTimeout(() => setSimulating(false), 3000);
    };

    const urgencyColors = {
        Critical: 'text-red-600',
        High: 'text-orange-500',
        Moderate: 'text-yellow-500',
        Low: 'text-green-500',
        Info: 'text-blue-500',
        None: 'text-gray-400'
    };

    const urgencyBg = {
        Critical: 'bg-red-50 dark:bg-red-900/20',
        High: 'bg-orange-50 dark:bg-orange-900/20',
        Moderate: 'bg-yellow-50 dark:bg-yellow-900/20',
        Low: 'bg-green-50 dark:bg-green-900/20',
        Info: 'bg-blue-50 dark:bg-blue-900/20',
        None: ''
    };

    return (
        <div className="card p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 p-2.5 rounded-xl dark:bg-blue-900/30">
                    <Droplets className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.irrigation.title}</h3>
                    <p className="text-xs text-gray-400">{t.irrigation.subtitle}</p>
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ) : recommendation ? (
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${urgencyBg[recommendation.urgency] || ''} border-blue-100 dark:border-gray-700`}>
                        <p className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-relaxed">
                            {recommendation.recommendation}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {recommendation.duration > 0 && (
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <Timer className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                                <p className="text-lg font-bold text-gray-800 dark:text-white">{recommendation.duration}</p>
                                <p className="text-xs text-gray-400">{t.irrigation.min}</p>
                            </div>
                        )}
                        {recommendation.efficiency > 0 && (
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <Gauge className="w-4 h-4 mx-auto text-green-500 mb-1" />
                                <p className="text-lg font-bold text-gray-800 dark:text-white">{recommendation.efficiency}%</p>
                                <p className="text-xs text-gray-400">{t.irrigation.efficiency}</p>
                            </div>
                        )}
                        {recommendation.evaporationRate !== undefined && (
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <TrendingDown className="w-4 h-4 mx-auto text-orange-500 mb-1" />
                                <p className="text-lg font-bold text-gray-800 dark:text-white">{recommendation.evaporationRate}</p>
                                <p className="text-xs text-gray-400">{t.irrigation.evapRate}</p>
                            </div>
                        )}
                    </div>

                    {recommendation.urgency && recommendation.urgency !== 'None' && (
                        <div className={`flex items-center gap-2 ${urgencyColors[recommendation.urgency]} font-semibold text-sm`}>
                            {recommendation.action === 'Irrigate' && <CloudRain size={18} />}
                            {recommendation.action === 'Mist' && <Sun size={18} />}
                            {recommendation.action === 'Drain' && <Droplets size={18} />}
                            <span>{t.irrigation.urgency}: {t.irrigation.urgencyLevels[recommendation.urgency] || recommendation.urgency}</span>
                        </div>
                    )}
                </div>
            ) : null}

            <button
                onClick={handleSimulation}
                disabled={simulating}
                className={`w-full mt-5 py-2.5 px-4 rounded-xl font-semibold text-white transition-all duration-300
                    ${simulating
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5'
                    }`}
            >
                {simulating ? (
                    <span className="flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" /> {t.irrigation.simulating}
                    </span>
                ) : t.irrigation.startSimulation}
            </button>
        </div>
    );
};

export default IrrigationPanel;
