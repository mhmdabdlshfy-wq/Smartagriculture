import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSensor } from '../context/SensorContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import {
    ArrowLeft, Thermometer, Droplets, FlaskConical, Sprout,
    Sun, CloudRain, Bug, Wheat, ChevronRight, TrendingUp,
    AlertTriangle, CheckCircle2, Info, Leaf, BarChart3
} from 'lucide-react';

import { enCrops } from '../data/cropsData';
import { arCrops } from '../data/cropsData.ar';

// ═══════════════════════════════════════════════════════════
// COMPREHENSIVE CROP DATABASE
// Professional agronomic data for farmers & engineers
// ═══════════════════════════════════════════════════════════
const CropPage = () => {
    const { cropName } = useParams();
    const navigate = useNavigate();
    const { sensorData, activeCrop } = useSensor();
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');
    const [currentHealth, setCurrentHealth] = useState(null);

    const CROP_DATABASE = lang === 'ar' ? arCrops : enCrops;

    // Normalize crop name (URL might be lowercase)
    const normalizedCropName = Object.keys(CROP_DATABASE).find(
        key => key.toLowerCase() === cropName?.toLowerCase()
    );
    const crop = CROP_DATABASE[normalizedCropName];

    // Fetch health data for this crop
    useEffect(() => {
        if (normalizedCropName) {
            api.get(`/sensors/health?crop=${normalizedCropName}`)
                .then(res => setCurrentHealth(res.data))
                .catch(err => console.error(err));
        }
    }, [normalizedCropName, sensorData]);

    if (!crop) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
                <div className="text-6xl mb-4">🌱</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.cropPage.cropNotFound}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">"{cropName}" {t.cropPage.cropNotFoundDesc}</p>
                <button onClick={() => navigate('/')} className="btn btn-primary flex items-center gap-2">
                    <ArrowLeft size={16} /> {t.cropPage.backToDashboard}
                </button>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: t.cropPage.overview, icon: Info },
        { id: 'conditions', label: t.cropPage.growingConditions, icon: Thermometer },
        { id: 'stages', label: t.cropPage.growthStages, icon: TrendingUp },
        { id: 'challenges', label: t.cropPage.challenges, icon: AlertTriangle },
        { id: 'practices', label: t.cropPage.bestPractices, icon: CheckCircle2 }
    ];

    // Compare current readings against ideal for this crop
    const getParamStatus = (current, min, max, optimal) => {
        if (current === undefined || current === null) return { status: 'unknown', label: t.cropPage.unknown, color: 'gray' };
        if (current >= min && current <= max) {
            const dist = Math.abs(current - optimal);
            const range = (max - min) / 2;
            if (dist < range * 0.3) return { status: 'ideal', label: t.cropPage.ideal, color: 'green' };
            return { status: 'good', label: t.cropPage.good, color: 'blue' };
        }
        const distFromRange = current < min ? min - current : current - max;
        if (distFromRange < 5) return { status: 'warning', label: t.sensors.warning, color: 'orange' };
        return { status: 'critical', label: t.sensors.critical, color: 'red' };
    };

    const statusColors = {
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        gray: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
    };

    const severityColors = {
        low: 'border-l-gray-400 bg-gray-50 dark:bg-gray-700/30',
        medium: 'border-l-orange-400 bg-orange-50 dark:bg-orange-900/10',
        high: 'border-l-red-400 bg-red-50 dark:bg-red-900/10'
    };

    // Progress bar for pH range visualization
    const renderPhScale = () => {
        const phRange = 14;
        const minPos = (crop.ph.min / phRange) * 100;
        const maxPos = (crop.ph.max / phRange) * 100;
        const optPos = (crop.ph.optimal / phRange) * 100;
        const currentPos = sensorData ? (sensorData.ph / phRange) * 100 : null;

        return (
            <div className="relative mt-4">
                <div className="text-xs text-gray-400 flex justify-between mb-1">
                    <span>0 ({t.cropPage.acid})</span>
                    <span>7 ({t.cropPage.neutral})</span>
                    <span>14 ({t.cropPage.alkaline}))</span>
                </div>
                <div className="h-4 rounded-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 relative overflow-visible">
                    {/* Ideal range overlay */}
                    <div
                        className="absolute top-0 h-full bg-white/40 border-2 border-white dark:border-gray-300 rounded-full"
                        style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
                    />
                    {/* Optimal marker */}
                    <div
                        className="absolute top-[-6px] w-3 h-7 bg-white dark:bg-gray-200 border-2 border-gray-800 dark:border-white rounded-full shadow-lg"
                        style={{ left: `${optPos}%`, transform: 'translateX(-50%)' }}
                        title={`Optimal: ${crop.ph.optimal}`}
                    />
                    {/* Current reading marker */}
                    {currentPos !== null && (
                        <div
                            className="absolute top-[-8px] w-4 h-8 border-2 border-yellow-400 bg-yellow-300 rounded-full shadow-lg animate-pulse"
                            style={{ left: `${currentPos}%`, transform: 'translateX(-50%)' }}
                            title={`Current: ${sensorData.ph}`}
                        />
                    )}
                </div>
                <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-400">{t.cropPage.min}: {crop.ph.min}</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{t.cropPage.optimal}: {crop.ph.optimal}</span>
                    <span className="text-gray-400">{t.cropPage.max}: {crop.ph.max}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* ═══════ HERO BANNER ═══════ */}
            <div className={`bg-gradient-to-r ${crop.heroGradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-20 -mr-20" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white/5 rounded-full -mb-48 -ml-48" />
                <div className="relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} /> {t.cropPage.backToDashboard}
                    </button>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-5xl">{crop.emoji}</span>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold">{crop.name}</h1>
                                    <p className="text-white/70 italic text-sm">{crop.scientificName}</p>
                                </div>
                            </div>
                            <p className="text-white/80 text-sm mt-1">{crop.family}</p>
                            <p className="text-white/90 text-sm mt-3 max-w-2xl leading-relaxed">{crop.description}</p>
                        </div>
                        {currentHealth && (
                            <div className="hidden md:flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                                <p className="text-4xl font-extrabold">{currentHealth.overall}%</p>
                                <p className="text-xs text-white/75 mt-1">{t.cropPage.healthScore}</p>
                                <p className="text-xs text-white/60 mt-0.5 capitalize">{currentHealth.category}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════ TAB NAVIGATION ═══════ */}
            <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm overflow-x-auto">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                                ${isActive
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ═══════ TAB CONTENT ═══════ */}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <CloudRain size={14} /> {t.cropPage.waterRequirement}
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.waterNeed}</p>
                        </div>
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <Sun size={14} /> {t.cropPage.growingSeason}
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.growingSeason}</p>
                        </div>
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <Leaf size={14} /> {t.cropPage.soilType}
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.soilType}</p>
                        </div>
                    </div>

                    {/* Current vs Ideal Comparison */}
                    {sensorData && (
                        <div className="card">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <BarChart3 size={16} /> {t.cropPage.currentVsIdeal} {t.cropNav[crop.name] || crop.name} {t.cropPage.idealRanges}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: t.sensors.temperature, icon: Thermometer, current: sensorData.temperature, ...crop.temperature, suffix: '°C', iconColor: 'text-red-500' },
                                    { label: t.sensors.humidity, icon: Droplets, current: sensorData.humidity, ...crop.humidity, suffix: '%', iconColor: 'text-blue-500' },
                                    { label: t.sensors.ph, icon: FlaskConical, current: sensorData.ph, ...crop.ph, suffix: '', iconColor: 'text-purple-500' },
                                    { label: t.sensors.soilMoisture, icon: Sprout, current: sensorData.soilMoisture, ...crop.soilMoisture, suffix: '%', iconColor: 'text-green-500' }
                                ].map(param => {
                                    const ParamIcon = param.icon;
                                    const status = getParamStatus(param.current, param.min, param.max, param.optimal);
                                    return (
                                        <div key={param.label} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <ParamIcon size={18} className={param.iconColor} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-white">{param.label}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {param.min}–{param.max}{param.suffix} ({t.cropPage.optimal}: {param.optimal}{param.suffix})
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-gray-800 dark:text-white tabular-nums">
                                                    {param.current}{param.suffix}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[status.color]}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* pH Detail Card */}
                    <div className="card">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                            <FlaskConical size={16} className="text-purple-500" /> {t.cropPage.soilPhProfile}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">{crop.ph.tolerance}</p>
                        {renderPhScale()}
                    </div>

                    {/* Nutritional Info */}
                    <div className="card">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{t.cropPage.nutritionalContent}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(crop.nutritionalFacts).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 text-center">
                                    <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CONDITIONS TAB */}
            {activeTab === 'conditions' && (
                <div className="space-y-5">
                    {[
                        { label: t.sensors.temperature, icon: Thermometer, data: crop.temperature, suffix: '°C', color: 'red', bgClass: 'from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10' },
                        { label: t.cropPage.airHumidity, icon: Droplets, data: crop.humidity, suffix: '%', color: 'blue', bgClass: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10' },
                        { label: t.sensors.ph, icon: FlaskConical, data: crop.ph, suffix: '', color: 'purple', bgClass: 'from-purple-50 to-fuchsia-50 dark:from-purple-900/10 dark:to-fuchsia-900/10' },
                        { label: t.sensors.soilMoisture, icon: Sprout, data: crop.soilMoisture, suffix: '%', color: 'green', bgClass: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10' }
                    ].map(condition => {
                        const Icon = condition.icon;
                        const { min, max, optimal, note, tolerance } = condition.data;
                        const range = max - min;
                        return (
                            <div key={condition.label} className={`card bg-gradient-to-r ${condition.bgClass}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl bg-${condition.color}-100 dark:bg-${condition.color}-900/30`}>
                                            <Icon size={20} className={`text-${condition.color}-500`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-white">{condition.label}</h3>
                                            {(note || tolerance) && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-xl">{note || tolerance}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-400">{t.cropPage.minimum}</p>
                                        <p className="text-2xl font-extrabold text-gray-800 dark:text-white tabular-nums">{min}<span className="text-sm text-gray-400">{condition.suffix}</span></p>
                                    </div>
                                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 text-center border-2 border-green-300 dark:border-green-600">
                                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{t.cropPage.optimal}</p>
                                        <p className="text-2xl font-extrabold text-green-700 dark:text-green-300 tabular-nums">{optimal}<span className="text-sm">{condition.suffix}</span></p>
                                    </div>
                                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-400">{t.cropPage.maximum}</p>
                                        <p className="text-2xl font-extrabold text-gray-800 dark:text-white tabular-nums">{max}<span className="text-sm text-gray-400">{condition.suffix}</span></p>
                                    </div>
                                </div>
                                {/* Visual range bar */}
                                <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <div
                                        className="absolute h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-60"
                                        style={{ left: '20%', width: '60%' }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* GROWTH STAGES TAB */}
            {activeTab === 'stages' && (
                <div className="card">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={16} /> {t.cropPage.growthStagesOf} {t.cropNav[crop.name] || crop.name}
                    </h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-6">
                            {crop.growthStages.map((stage, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center text-xl shadow-sm z-10 flex-shrink-0">
                                        {stage.icon}
                                    </div>
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold text-gray-800 dark:text-white">{stage.name}</h4>
                                            <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                                {stage.days} {t.days}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{stage.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CHALLENGES TAB */}
            {activeTab === 'challenges' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t.cropPage.challengesDesc} {t.cropNav[crop.name] || crop.name}{t.cropPage.orderedBySeverity}
                    </p>
                    {crop.challenges
                        .sort((a, b) => { const order = { high: 0, medium: 1, low: 2 }; return order[a.severity] - order[b.severity]; })
                        .map((challenge, idx) => (
                            <div key={idx} className={`border-l-4 rounded-xl p-5 ${severityColors[challenge.severity]}`}>
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        {challenge.severity === 'high' ? '🔴' : challenge.severity === 'medium' ? '🟠' : '🟡'}
                                        {challenge.title}
                                    </h4>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${challenge.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        : challenge.severity === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {challenge.severity} {t.risk}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> {t.cropPage.solution}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{challenge.solution}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}

            {/* BEST PRACTICES TAB */}
            {activeTab === 'practices' && (
                <div className="card">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" /> {t.cropPage.bestPracticesFor} {t.cropNav[crop.name] || crop.name}
                    </h3>
                    <div className="space-y-3">
                        {crop.bestPractices.map((practice, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
                                <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{practice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropPage;
