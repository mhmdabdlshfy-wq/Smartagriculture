import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSensor } from '../context/SensorContext';
import useIntelligence from '../hooks/useIntelligence';
import api from '../services/api';
import SensorCard from '../components/SensorCard';
import HealthGauge from '../components/HealthGauge';
import RiskPanel from '../components/RiskPanel';
import IrrigationPanel from '../components/IrrigationPanel';
import AnomalyBanner from '../components/AnomalyBanner';
import AlertPopup from '../components/AlertPopup';
import LiveChart from '../components/LiveChart';
import {
    Plus, ClipboardList, Send, CheckCircle2, Clock,
    TrendingUp, X
} from 'lucide-react';

const EngineerDashboard = () => {
    const { user } = useAuth();
    const { sensorData, loading, alerts, activeCrop } = useSensor();
    const { health, risks, predictions, anomalies } = useIntelligence(activeCrop);

    const [currentAlert, setCurrentAlert] = useState(null);

    // Tasks
    const [tasks, setTasks] = useState([]);
    const [taskStats, setTaskStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [farmers, setFarmers] = useState([]);

    // Recommendations
    const [recommendations, setRecommendations] = useState([]);
    const [showRecForm, setShowRecForm] = useState(false);

    // Chart data (same as admin)
    const [timeRange, setTimeRange] = useState('24h');
    const [chartData, setChartData] = useState([]);

    // Task form state
    const [taskForm, setTaskForm] = useState({
        title: '', description: '', type: 'irrigation', priority: 'medium', assignedTo: '', dueDate: ''
    });

    // Rec form state
    const [recForm, setRecForm] = useState({
        title: '', content: '', category: 'general', priority: 'medium', targetFarmer: '', sourceFarmer: ''
    });

    // Show popup when new alert arrives
    useEffect(() => {
        if (alerts.length > 0) setCurrentAlert(alerts[0]);
    }, [alerts]);

    // Fetch collab data
    useEffect(() => {
        fetchTasks();
        fetchTaskStats();
        fetchFarmers();
        fetchRecommendations();
    }, []);

    // Fetch chart history (same logic as admin)
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await api.get(`/sensors/history?range=${timeRange}`);
                setChartData(data);
            } catch (err) { console.error("Failed to fetch history", err); }
        };
        fetchHistory();
    }, [timeRange]);

    const fetchTasks = async () => {
        try { const { data } = await api.get('/collab/tasks'); setTasks(data); } catch (err) { console.error(err); }
    };
    const fetchTaskStats = async () => {
        try { const { data } = await api.get('/collab/tasks/stats'); setTaskStats(data); } catch (err) { console.error(err); }
    };
    const fetchFarmers = async () => {
        try { const { data } = await api.get('/auth/users?role=farmer'); setFarmers(data); } catch (err) { console.error(err); }
    };
    const fetchRecommendations = async () => {
        try { const { data } = await api.get('/collab/recommendations'); setRecommendations(data); } catch (err) { console.error(err); }
    };

    const createTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/collab/tasks', taskForm);
            setShowTaskForm(false);
            setTaskForm({ title: '', description: '', type: 'irrigation', priority: 'medium', assignedTo: '', dueDate: '' });
            fetchTasks(); fetchTaskStats();
        } catch (err) { console.error(err); }
    };

    const createRecommendation = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: recForm.title,
                content: recForm.content,
                category: recForm.category,
                priority: recForm.priority,
                crop: activeCrop,
                sensorSnapshot: sensorData ? {
                    temperature: sensorData.temperature, humidity: sensorData.humidity,
                    ph: sensorData.ph, soilMoisture: sensorData.soilMoisture
                } : {},
                targetFarmers: recForm.targetFarmer ? [recForm.targetFarmer] : [],
                sourcefarmer: recForm.sourceFarmer || undefined
            };
            await api.post('/collab/recommendations', payload);
            setShowRecForm(false);
            setRecForm({ title: '', content: '', category: 'general', priority: 'medium', targetFarmer: '', sourceFarmer: '' });
            fetchRecommendations();
        } catch (err) { console.error(err); }
    };

    // ── Chart helpers (same as admin) ──
    const getLabels = () => {
        return chartData.map(d => {
            const date = new Date(d.createdAt);
            if (timeRange === '24h') return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        });
    };
    const labels = getLabels();

    const getPredictionData = (metric) => {
        if (!predictions || !predictions[metric]) return null;
        const pred = predictions[metric];
        return {
            values: pred.predictions.map(p => p.value),
            labels: pred.predictions.map(p => new Date(p.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
            confidence: pred.confidence, trend: pred.trend
        };
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
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        cancelled: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-500'
    };
    const typeEmojis = { irrigation: '💧', fertilizer: '🧪', inspection: '🔍', maintenance: '🔧', custom: '📋' };
    const ranges = ['24h', '7d', '1m', '6m', '1y'];

    if (loading || !sensorData) {
        return (
            <div className="space-y-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
            {/* Alert Popup */}
            <AlertPopup alert={currentAlert} onClose={() => setCurrentAlert(null)} />

            {/* Anomaly Banner */}
            <AnomalyBanner anomalies={anomalies} />

            {/* Page Header + Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        🔧 Engineer Control Center
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Welcome, {user?.fullName || user?.username} — Full monitoring & management</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowRecForm(true)} className="btn btn-outline text-sm flex items-center gap-1.5">
                        <Send size={14} /> Recommendation
                    </button>
                    <button onClick={() => setShowTaskForm(true)} className="btn btn-primary text-sm flex items-center gap-1.5">
                        <Plus size={14} /> Assign Task
                    </button>
                </div>
            </div>

            {/* Task Stats KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card !p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20"><ClipboardList className="w-5 h-5 text-blue-500" /></div>
                    <div><p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.total}</p><p className="text-xs text-gray-400">Total Tasks</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20"><Clock className="w-5 h-5 text-yellow-500" /></div>
                    <div><p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.pending}</p><p className="text-xs text-gray-400">Pending</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
                    <div><p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.inProgress}</p><p className="text-xs text-gray-400">In Progress</p></div>
                </div>
                <div className="card !p-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                    <div><p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.completed}</p><p className="text-xs text-gray-400">Completed</p></div>
                </div>
            </div>

            {/* Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <SensorCard type="temperature" value={sensorData.temperature} status={getStatus('temperature', sensorData.temperature)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="humidity" value={sensorData.humidity} status={getStatus('humidity', sensorData.humidity)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="ph" value={sensorData.ph} status={getStatus('ph', sensorData.ph)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="soilMoisture" value={sensorData.soilMoisture} status={getStatus('soilMoisture', sensorData.soilMoisture)} lastUpdated={sensorData.createdAt} />
            </div>

            {/* Intelligence Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <HealthGauge health={health} activeCrop={activeCrop} />
                <RiskPanel risks={risks} />
                <IrrigationPanel />
            </div>

            {/* ═══════ FULL CHARTS (same as admin) ═══════ */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-white">📊 Sensor Trends & Analytics</h3>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {ranges.map(range => (
                        <button key={range} onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${timeRange === range
                                ? 'bg-white dark:bg-gray-600 text-primary shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card h-80">
                    <LiveChart title={`Temperature (${timeRange})`} data={chartData.map(d => d.temperature)} labels={labels} color="#ef4444" min={0} max={60}
                        prediction={timeRange === '24h' ? getPredictionData('temperature') : null} />
                </div>
                <div className="card h-80">
                    <LiveChart title={`Humidity (${timeRange})`} data={chartData.map(d => d.humidity)} labels={labels} color="#3b82f6" min={0} max={100}
                        prediction={timeRange === '24h' ? getPredictionData('humidity') : null} />
                </div>
                <div className="card h-80">
                    <LiveChart title={`Soil pH (${timeRange})`} data={chartData.map(d => d.ph)} labels={labels} color="#8b5cf6" min={4} max={9} />
                </div>
                <div className="card h-80">
                    <LiveChart title={`Soil Moisture (${timeRange})`} data={chartData.map(d => d.soilMoisture)} labels={labels} color="#10b981" min={0} max={100}
                        prediction={timeRange === '24h' ? getPredictionData('soilMoisture') : null} />
                </div>
            </div>

            {/* ═══════ TASKS & RECOMMENDATIONS ═══════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tasks */}
                <div className="card overflow-hidden !p-0">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                            <ClipboardList size={16} /> Assigned Tasks
                        </h3>
                        <span className="text-xs text-gray-400">{tasks.length} tasks</span>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
                        {tasks.length === 0 ? (
                            <p className="p-6 text-gray-400 text-sm text-center">No tasks yet. Assign one to a farmer!</p>
                        ) : tasks.map(task => (
                            <div key={task._id} className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span>{typeEmojis[task.type] || '📋'}</span>
                                            <p className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">{task.title}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                                🔧 By: {task.createdBy?.fullName || task.createdBy?.username || user?.fullName || 'Engineer'}
                                            </span>
                                            <span className="text-gray-300 dark:text-gray-600 text-xs">→</span>
                                            <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                                🌱 To: {task.assignedTo?.fullName || task.assignedTo?.username || 'Unassigned'}
                                            </span>
                                            {task.dueDate && (
                                                <span className="text-xs text-gray-400">• Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                        {task.completionNote && (
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 italic">✓ {task.completionNote}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>
                                            {task.status.replace('_', ' ')}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations */}
                <div className="card overflow-hidden !p-0">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                            <Send size={16} /> Recommendations Sent
                        </h3>
                        <span className="text-xs text-gray-400">{recommendations.length} sent</span>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
                        {recommendations.length === 0 ? (
                            <p className="p-6 text-gray-400 text-sm text-center">No recommendations yet.</p>
                        ) : recommendations.map(rec => (
                            <div key={rec._id} className="px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{rec.title}</p>
                                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{rec.content}</p>
                                        {/* Farmer→Engineer communication flow */}
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                🔧 From: {rec.createdBy?.fullName || rec.createdBy?.username || 'Engineer'}
                                            </span>
                                            {rec.targetFarmers?.length > 0 ? (
                                                rec.targetFarmers.map(f => (
                                                    <span key={f._id} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        🌱 To: {f.fullName || f.username}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">📢 All Farmers</span>
                                            )}
                                            {rec.crop && (
                                                <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">🌿 {rec.crop}</span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1 inline-block">{rec.acknowledged?.length || 0} acknowledged • {new Date(rec.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${priorityColors[rec.priority]}`}>{rec.priority}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════ ALERTS LOG (same as admin) ═══════ */}
            <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Alerts</h3>
                    <span className="text-xs font-medium text-gray-400">{alerts.length} alerts</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-72 overflow-y-auto">
                    {alerts.length === 0 ? (
                        <p className="p-6 text-gray-500 text-sm text-center">No recent alerts. All systems nominal.</p>
                    ) : alerts.map((alert, idx) => (
                        <div key={idx} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.severity === 'Critical' ? 'bg-red-500' : alert.severity === 'Warning' ? 'bg-orange-400' : 'bg-blue-400'}`} />
                                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{alert.message}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${alert.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : alert.severity === 'Warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{alert.severity}</span>
                                <span className="text-xs text-gray-400 w-16 text-right">{new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════ MODALS ═══════ */}

            {/* Task Creation Modal */}
            {showTaskForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-bounce-in">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Assign New Task</h3>
                            <button onClick={() => setShowTaskForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                        </div>
                        <form onSubmit={createTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title *</label>
                                <input className="input-field" value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea className="input-field" rows={3} value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select className="input-field" value={taskForm.type} onChange={e => setTaskForm({ ...taskForm, type: e.target.value })}>
                                        <option value="irrigation">💧 Irrigation</option>
                                        <option value="fertilizer">🧪 Fertilizer</option>
                                        <option value="inspection">🔍 Inspection</option>
                                        <option value="maintenance">🔧 Maintenance</option>
                                        <option value="custom">📋 Custom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                                    <select className="input-field" value={taskForm.priority} onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Farmer *</label>
                                    <select className="input-field" value={taskForm.assignedTo} onChange={e => setTaskForm({ ...taskForm, assignedTo: e.target.value })} required>
                                        <option value="">Select farmer...</option>
                                        {farmers.map(f => <option key={f._id} value={f._id}>{f.fullName || f.username}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                                    <input type="date" className="input-field" value={taskForm.dueDate} onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowTaskForm(false)} className="btn btn-outline flex-1">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Recommendation Creation Modal */}
            {showRecForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-bounce-in max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">New Recommendation</h3>
                            <button onClick={() => setShowRecForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                        </div>

                        {/* Communication Flow Banner */}
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-3 mb-4 border border-blue-100 dark:border-blue-800/30">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                    🔧 {user?.fullName || user?.username}
                                </span>
                                <span className="text-gray-400">→</span>
                                <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                    🌱 {recForm.targetFarmer ? (farmers.find(f => f._id === recForm.targetFarmer)?.fullName || 'Selected Farmer') : 'All Farmers'}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommendation for crop: <strong>{activeCrop}</strong></p>
                        </div>

                        {sensorData && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-4">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">📊 Current Sensor Readings (will be attached)</p>
                                <div className="flex gap-3 text-xs">
                                    <span className="text-red-500">🌡 {sensorData.temperature}°C</span>
                                    <span className="text-blue-500">💧 {sensorData.humidity}%</span>
                                    <span className="text-purple-500">⚗️ pH {sensorData.ph}</span>
                                    <span className="text-green-500">🌱 {sensorData.soilMoisture}%</span>
                                </div>
                            </div>
                        )}
                        <form onSubmit={createRecommendation} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                                <input className="input-field" value={recForm.title} onChange={e => setRecForm({ ...recForm, title: e.target.value })} required placeholder="e.g. Increase irrigation frequency" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Details *</label>
                                <textarea className="input-field" rows={3} value={recForm.content} onChange={e => setRecForm({ ...recForm, content: e.target.value })} required placeholder="Explain what should be done and why..." />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Send To Farmer</label>
                                    <select className="input-field" value={recForm.targetFarmer} onChange={e => setRecForm({ ...recForm, targetFarmer: e.target.value })}>
                                        <option value="">📢 All Farmers</option>
                                        {farmers.map(f => <option key={f._id} value={f._id}>🌱 {f.fullName || f.username}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Based on Data From</label>
                                    <select className="input-field" value={recForm.sourceFarmer} onChange={e => setRecForm({ ...recForm, sourceFarmer: e.target.value })}>
                                        <option value="">General / System Data</option>
                                        {farmers.map(f => <option key={f._id} value={f._id}>📊 {f.fullName || f.username}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select className="input-field" value={recForm.category} onChange={e => setRecForm({ ...recForm, category: e.target.value })}>
                                        <option value="irrigation">Irrigation</option>
                                        <option value="fertilizer">Fertilizer</option>
                                        <option value="pest_control">Pest Control</option>
                                        <option value="harvesting">Harvesting</option>
                                        <option value="soil">Soil Management</option>
                                        <option value="general">General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                                    <select className="input-field" value={recForm.priority} onChange={e => setRecForm({ ...recForm, priority: e.target.value })}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowRecForm(false)} className="btn btn-outline flex-1">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1">📨 Send Recommendation</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EngineerDashboard;
