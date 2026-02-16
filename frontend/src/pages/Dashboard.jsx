import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import SensorCard from '../components/SensorCard';
import LiveChart from '../components/LiveChart';
import AlertPopup from '../components/AlertPopup';

const Dashboard = () => {
    const [sensors, setSensors] = useState({
        temperature: { value: 0, status: 'normal' },
        humidity: { value: 0, status: 'normal' },
        ph: { value: 0, status: 'normal' }
    });
    const [history, setHistory] = useState({
        temperature: [],
        humidity: [],
        ph: []
    });
    const [labels, setLabels] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [alert, setAlert] = useState(null);
    const [timeRange, setTimeRange] = useState('24h');

    // Status Logic (Duplicated from backend for immediate UI feedback, or just trust backend alerts)
    // Here we determine status for card visualization locally
    const getStatus = (type, value) => {
        if (type === 'temperature') {
            if (value > 40) return 'critical';
            if (value > 30) return 'warning';
            return 'normal';
        }
        if (type === 'humidity') {
            if (value < 20) return 'critical';
            if (value < 40) return 'warning';
            return 'normal';
        }
        if (type === 'ph') {
            if (value < 5 || value > 8) return 'critical';
            if (value < 6 || value > 7.5) return 'warning';
            return 'normal';
        }
        return 'normal';
    };

    // Helper to downsample data for cleaner charts
    const processChartData = (data, range) => {
        if (!data || data.length === 0) return { temperature: [], humidity: [], ph: [], labels: [] };

        // For 1h, show raw data (high detail)
        if (range === '1h') {
            const limit = 720; // Last hour approx
            const sliced = data.slice(-limit);
            return {
                temperature: sliced.map(d => d.temperature),
                humidity: sliced.map(d => d.humidity),
                ph: sliced.map(d => d.ph),
                labels: sliced.map(d => new Date(d.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
            };
        }

        // For 24h+, aggregate into buckets
        const bucketSizeMinutes = range === '24h' ? 15 : 120; // 15 min or 2 hour buckets
        const buckets = {};

        data.forEach(d => {
            const date = new Date(d.createdAt);
            // Round down to nearest bucket
            const coeff = 1000 * 60 * bucketSizeMinutes;
            const bucketTime = new Date(Math.floor(date.getTime() / coeff) * coeff);
            const key = bucketTime.toISOString();

            if (!buckets[key]) buckets[key] = { temp: [], hum: [], ph: [], count: 0, time: bucketTime };
            buckets[key].temp.push(d.temperature);
            buckets[key].hum.push(d.humidity);
            buckets[key].ph.push(d.ph);
            buckets[key].count++;
        });

        const sortedKeys = Object.keys(buckets).sort();
        const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

        const labels = [];
        const temperature = [];
        const humidity = [];
        const ph = [];

        sortedKeys.forEach(key => {
            const b = buckets[key];
            const date = b.time;
            // Format label with AM/PM
            let label;
            if (range === '24h') {
                label = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            } else {
                // 7d view
                label = `${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
            }

            labels.push(label);
            temperature.push(parseFloat(average(b.temp).toFixed(1)));
            humidity.push(parseFloat(average(b.hum).toFixed(1)));
            ph.push(parseFloat(average(b.ph).toFixed(1)));
        });

        return { labels, temperature, humidity, ph };
    };

    // Keep essentially all raw data in memory to re-process on range switch
    // Note: In a real app, we'd fetch aggregated data from backend.
    // Here we simulate it by storing "allHistory" locally.
    const [allHistory, setAllHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Always fetch broad range to populate local cache, then slice view
                const { data } = await api.get('/sensors/history?range=7d');
                setAllHistory(data);

                if (data.length > 0) {
                    updateCurrentState(data[data.length - 1]);
                }
            } catch (err) {
                console.error('Failed to fetch history', err);
            }
        };

        fetchData();

        const socket = io('http://localhost:5000');
        socket.on('sensorUpdate', (data) => {
            updateCurrentState(data);
            setAllHistory(prev => {
                const newData = [...prev, data];
                // Keep max 20k points in memory
                if (newData.length > 20000) return newData.slice(-20000);
                return newData;
            });
        });
        socket.on('newAlert', (newAlert) => setAlert(newAlert));

        return () => socket.disconnect();
    }, []);

    // Re-process chart data whenever history or timeRange changes
    useEffect(() => {
        const processed = processChartData(allHistory, timeRange);
        setLabels(processed.labels);
        setHistory({
            temperature: processed.temperature,
            humidity: processed.humidity,
            ph: processed.ph
        });
    }, [allHistory, timeRange]);

    const updateCurrentState = (data) => {
        setLastUpdated(data.createdAt || new Date());
        setSensors({
            temperature: { value: data.temperature, status: getStatus('temperature', data.temperature) },
            humidity: { value: data.humidity, status: getStatus('humidity', data.humidity) },
            ph: { value: data.ph, status: getStatus('ph', data.ph) }
        });
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <AlertPopup alert={alert} onClose={() => setAlert(null)} />

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                    {['1h', '24h', '7d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === range
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SensorCard
                    type="temperature"
                    value={sensors.temperature.value}
                    status={sensors.temperature.status}
                    lastUpdated={lastUpdated}
                />
                <SensorCard
                    type="humidity"
                    value={sensors.humidity.value}
                    status={sensors.humidity.status}
                    lastUpdated={lastUpdated}
                />
                <SensorCard
                    type="ph"
                    value={sensors.ph.value}
                    status={sensors.ph.status}
                    lastUpdated={lastUpdated}
                />
            </div>

            <div className="flex flex-col gap-8">
                <div className="card h-96 w-full">
                    <LiveChart
                        title="Temperature History (°C)"
                        data={history.temperature}
                        labels={labels}
                        color="#ef4444"
                        min={0} max={60}
                    />
                </div>
                <div className="card h-96 w-full">
                    <LiveChart
                        title="Humidity History (%)"
                        data={history.humidity}
                        labels={labels}
                        color="#3b82f6"
                        min={0} max={100}
                    />
                </div>
                <div className="card h-96 w-full">
                    <LiveChart
                        title="Soil pH Level"
                        data={history.ph}
                        labels={labels}
                        color="#8b5cf6"
                        min={0} max={14}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
