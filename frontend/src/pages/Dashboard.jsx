import React from 'react';
import { useSensor } from '../context/SensorContext';
import SensorCard from '../components/SensorCard';
import IrrigationPanel from '../components/IrrigationPanel';
import LiveChart from '../components/LiveChart';
import HealthGauge from '../components/HealthGauge';
import RiskPanel from '../components/RiskPanel';
import AnomalyBanner from '../components/AnomalyBanner';
import AlertPopup from '../components/AlertPopup';
import useIntelligence from '../hooks/useIntelligence';

const Dashboard = () => {
    const { sensorData, loading, alerts, activeCrop } = useSensor();
    const { health, risks, predictions, anomalies } = useIntelligence(activeCrop);
    const [currentAlert, setCurrentAlert] = React.useState(null);
    const [timeRange, setTimeRange] = React.useState('24h');
    const [chartData, setChartData] = React.useState([]);

    // Show popup when new alert arrives
    React.useEffect(() => {
        if (alerts.length > 0) {
            setCurrentAlert(alerts[0]);
        }
    }, [alerts]);

    // Fetch History when range changes
    React.useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await import('../services/api').then(m => m.default.get(`/sensors/history?range=${timeRange}`));
                setChartData(data);
            } catch (err) {
                console.error("Failed to fetch history", err);
            }
        };
        fetchHistory();
    }, [timeRange]);

    // Format labels based on range
    const getLabels = () => {
        return chartData.map(d => {
            const date = new Date(d.createdAt);
            if (timeRange === '24h') return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (timeRange === '7d' || timeRange === '1m') return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        });
    };

    const labels = getLabels();

    // Get prediction data for chart overlay
    const getPredictionData = (metric) => {
        if (!predictions || !predictions[metric]) return null;
        const pred = predictions[metric];
        return {
            values: pred.predictions.map(p => p.value),
            labels: pred.predictions.map(p => new Date(p.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
            confidence: pred.confidence,
            trend: pred.trend
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

    if (loading || !sensorData) {
        return (
            <div className="space-y-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const ranges = ['24h', '7d', '1m', '6m', '1y'];

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* Alert Popup */}
            <AlertPopup alert={currentAlert} onClose={() => setCurrentAlert(null)} />

            {/* Anomaly Detection Banner */}
            <AnomalyBanner anomalies={anomalies} />

            {/* Time Range Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Farm Overview</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Real-time monitoring & intelligence</p>
                </div>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {ranges.map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${timeRange === range
                                ? 'bg-white dark:bg-gray-600 text-primary shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Row: Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <SensorCard type="temperature" value={sensorData.temperature} status={getStatus('temperature', sensorData.temperature)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="humidity" value={sensorData.humidity} status={getStatus('humidity', sensorData.humidity)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="ph" value={sensorData.ph} status={getStatus('ph', sensorData.ph)} lastUpdated={sensorData.createdAt} />
                <SensorCard type="soilMoisture" value={sensorData.soilMoisture} status={getStatus('soilMoisture', sensorData.soilMoisture)} lastUpdated={sensorData.createdAt} />
            </div>

            {/* Intelligence Row: Health + Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <HealthGauge health={health} activeCrop={activeCrop} />
                <RiskPanel risks={risks} />
                <IrrigationPanel />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card h-80">
                    <LiveChart
                        title={`Temperature (${timeRange})`}
                        data={chartData.map(d => d.temperature)}
                        labels={labels}
                        color="#ef4444"
                        min={0} max={60}
                        prediction={timeRange === '24h' ? getPredictionData('temperature') : null}
                    />
                </div>
                <div className="card h-80">
                    <LiveChart
                        title={`Humidity (${timeRange})`}
                        data={chartData.map(d => d.humidity)}
                        labels={labels}
                        color="#3b82f6"
                        min={0} max={100}
                        prediction={timeRange === '24h' ? getPredictionData('humidity') : null}
                    />
                </div>
                <div className="card h-80">
                    <LiveChart
                        title={`Soil pH (${timeRange})`}
                        data={chartData.map(d => d.ph)}
                        labels={labels}
                        color="#8b5cf6"
                        min={4} max={9}
                    />
                </div>
                <div className="card h-80">
                    <LiveChart
                        title={`Soil Moisture (${timeRange})`}
                        data={chartData.map(d => d.soilMoisture)}
                        labels={labels}
                        color="#10b981"
                        min={0} max={100}
                        prediction={timeRange === '24h' ? getPredictionData('soilMoisture') : null}
                    />
                </div>
            </div>

            {/* Recent Alerts Log */}
            <div className="card overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Alerts</h3>
                    <span className="text-xs font-medium text-gray-400">{alerts.length} alerts</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-72 overflow-y-auto">
                    {alerts.length === 0 ? (
                        <p className="p-6 text-gray-500 text-sm text-center">No recent alerts. All systems nominal.</p>
                    ) : (
                        alerts.map((alert, idx) => (
                            <div key={idx} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.severity === 'Critical' ? 'bg-red-500' :
                                            alert.severity === 'Warning' ? 'bg-orange-400' : 'bg-blue-400'
                                        }`} />
                                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{alert.message}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${alert.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                            alert.severity === 'Warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>{alert.severity}</span>
                                    <span className="text-xs text-gray-400 w-16 text-right">{new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
