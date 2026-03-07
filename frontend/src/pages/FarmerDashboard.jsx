import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSensor } from '../context/SensorContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import SensorCard from '../components/SensorCard';
import IrrigationPanel from '../components/IrrigationPanel';
import {
    CheckCircle2, Clock, AlertTriangle, ClipboardList, Lightbulb,
    ChevronRight, Calendar, X, MessageSquare
} from 'lucide-react';

const FarmerDashboard = () => {
    const { user } = useAuth();
    const { sensorData, loading, activeCrop } = useSensor();
    const { t } = useLanguage();

    const [tasks, setTasks] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showCompleteModal, setShowCompleteModal] = useState(null);
    const [completionNote, setCompletionNote] = useState('');

    useEffect(() => {
        fetchTasks();
        fetchRecommendations();
        const interval = setInterval(() => {
            fetchTasks();
            fetchRecommendations();
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/collab/tasks');
            setTasks(data);
        } catch (err) { console.error(err); }
    };

    const fetchRecommendations = async () => {
        try {
            const { data } = await api.get('/collab/recommendations');
            setRecommendations(data);
        } catch (err) { console.error(err); }
    };

    const updateTaskStatus = async (taskId, status, note = '') => {
        try {
            await api.put(`/collab/tasks/${taskId}/status`, { status, completionNote: note });
            setShowCompleteModal(null);
            setCompletionNote('');
            fetchTasks();
        } catch (err) { console.error(err); }
    };

    const acknowledgeRecommendation = async (recId) => {
        try {
            await api.put(`/collab/recommendations/${recId}/acknowledge`);
            fetchRecommendations();
        } catch (err) { console.error(err); }
    };

    const getStatus = (type, value) => {
        if (!value) return 'normal';
        if (type === 'temperature') return value > 35 ? 'critical' : value > 28 ? 'warning' : 'normal';
        if (type === 'humidity') return value < 30 ? 'warning' : value > 90 ? 'warning' : 'normal';
        if (type === 'ph') return value < 5.5 || value > 7.5 ? 'warning' : 'normal';
        if (type === 'soilMoisture') return value < 30 ? 'critical' : value < 40 ? 'warning' : 'normal';
        return 'normal';
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
        medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };

    const statusIcons = {
        pending: Clock,
        in_progress: AlertTriangle,
        completed: CheckCircle2
    };

    const typeEmojis = {
        irrigation: '💧', fertilizer: '🧪', inspection: '🔍', maintenance: '🔧', custom: '📋'
    };

    const categoryEmojis = {
        irrigation: '💧', fertilizer: '🧪', pest_control: '🐛', harvesting: '🌾', soil: '🏔️', general: '💡'
    };

    const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    if (loading || !sensorData) {
        return (
            <div className="space-y-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    {t.farmer.title}
                </h2>
                <p className="text-green-100 text-sm mt-1">{t.farmer.welcome}, {user?.fullName || user?.username} • {t.crop}: {t.cropNav[activeCrop] || activeCrop}</p>
                <div className="flex gap-4 mt-4">
                    <div className="bg-white/20 rounded-xl px-4 py-2">
                        <p className="text-2xl font-bold">{pendingTasks.length}</p>
                        <p className="text-xs text-green-100">{t.farmer.pendingTasks}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl px-4 py-2">
                        <p className="text-2xl font-bold">{completedTasks.length}</p>
                        <p className="text-xs text-green-100">{t.farmer.completed}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl px-4 py-2">
                        <p className="text-2xl font-bold">{recommendations.length}</p>
                        <p className="text-xs text-green-100">{t.farmer.recommendations}</p>
                    </div>
                </div>
            </div>

            {/* Simplified Sensor Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SensorCard type="temperature" value={sensorData.temperature} status={getStatus('temperature', sensorData.temperature)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="humidity" value={sensorData.humidity} status={getStatus('humidity', sensorData.humidity)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="ph" value={sensorData.ph} status={getStatus('ph', sensorData.ph)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="soilMoisture" value={sensorData.soilMoisture} status={getStatus('soilMoisture', sensorData.soilMoisture)} lastUpdated={sensorData.createdAt} />
            </div>

            {/* Irrigation Schedule */}
            <IrrigationPanel />

            {/* Two columns: Tasks + Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Tasks */}
                <div className="card overflow-hidden !p-0">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10">
                        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                            <ClipboardList size={16} className="text-blue-500" /> {t.farmer.myTasks}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{pendingTasks.length} {t.engineer.pending} • {completedTasks.length} {t.farmer.completed}</p>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                        {tasks.length === 0 ? (
                            <div className="p-8 text-center">
                                <ClipboardList size={36} className="mx-auto mb-2 text-gray-300" />
                                <p className="text-gray-400 text-sm">{t.farmer.noTasksAssigned}</p>
                            </div>
                        ) : tasks.map(task => {
                            const StatusIcon = statusIcons[task.status] || Clock;
                            return (
                                <div key={task._id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">{typeEmojis[task.type] || '📋'}</span>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{task.title}</p>
                                            </div>
                                            {task.description && (
                                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                                            )}
                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                                <span>{t.from}: {task.createdBy?.fullName || task.createdBy?.username}</span>
                                                {task.dueDate && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                                                {t.engineer.priorityLabels[task.priority] || task.priority}
                                            </span>
                                            {task.status === 'pending' && (
                                                <button
                                                    onClick={() => updateTaskStatus(task._id, 'in_progress')}
                                                    className="text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
                                                >
                                                    {t.farmer.start} <ChevronRight size={12} />
                                                </button>
                                            )}
                                            {task.status === 'in_progress' && (
                                                <button
                                                    onClick={() => setShowCompleteModal(task)}
                                                    className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                                                >
                                                    <CheckCircle2 size={12} /> {t.farmer.complete}
                                                </button>
                                            )}
                                            {task.status === 'completed' && (
                                                <span className="text-xs text-green-500 flex items-center gap-1">
                                                    <CheckCircle2 size={12} /> {t.farmer.done}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommendations from Engineer */}
                <div className="card overflow-hidden !p-0">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/10">
                        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                            <Lightbulb size={16} className="text-amber-500" /> {t.farmer.engineerRecs}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{recommendations.length} {t.farmer.recommendations}</p>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                        {recommendations.length === 0 ? (
                            <div className="p-8 text-center">
                                <Lightbulb size={36} className="mx-auto mb-2 text-gray-300" />
                                <p className="text-gray-400 text-sm">{t.farmer.noRecsYet}</p>
                            </div>
                        ) : recommendations.map(rec => {
                            const isAcknowledged = rec.acknowledged?.includes(user?.id);
                            return (
                                <div key={rec._id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span>{categoryEmojis[rec.category] || '💡'}</span>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{rec.title}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{rec.content}</p>

                                            {rec.sensorSnapshot && (
                                                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                                                    <span>🌡 {rec.sensorSnapshot.temperature}°C</span>
                                                    <span>💧 {rec.sensorSnapshot.humidity}%</span>
                                                    <span>🌱 {rec.sensorSnapshot.soilMoisture}%</span>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    🔧 {t.from}: {rec.createdBy?.fullName || rec.createdBy?.username || t.roles.engineer}
                                                    <span className="opacity-60">({rec.createdBy?.role || 'engineer'})</span>
                                                </span>
                                                {rec.crop && (
                                                    <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">🌿 {t.cropNav[rec.crop] || rec.crop}</span>
                                                )}
                                                {rec.sourcefarmer && (
                                                    <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                                        📊 {t.basedOn} {rec.sourcefarmer.fullName || rec.sourcefarmer.username}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-300">•</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(rec.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[rec.priority]}`}>
                                                {t.engineer.priorityLabels[rec.priority] || rec.priority}
                                            </span>
                                            {!isAcknowledged ? (
                                                <button
                                                    onClick={() => acknowledgeRecommendation(rec._id)}
                                                    className="text-xs bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 transition"
                                                >
                                                    {t.farmer.acknowledge}
                                                </button>
                                            ) : (
                                                <span className="text-xs text-green-500 flex items-center gap-1">
                                                    <CheckCircle2 size={12} /> {t.farmer.noted}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Task Completion Modal */}
            {showCompleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-bounce-in">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{t.farmer.completeTask}</h3>
                            <button onClick={() => setShowCompleteModal(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 mb-4">
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                {typeEmojis[showCompleteModal.type]} {showCompleteModal.title}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t.farmer.completionNote}
                            </label>
                            <textarea
                                className="input-field"
                                rows={3}
                                value={completionNote}
                                onChange={(e) => setCompletionNote(e.target.value)}
                                placeholder={t.farmer.completionPlaceholder}
                            />
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setShowCompleteModal(null)} className="btn btn-outline flex-1">{t.cancel}</button>
                            <button
                                onClick={() => updateTaskStatus(showCompleteModal._id, 'completed', completionNote)}
                                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={16} /> {t.farmer.markComplete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
