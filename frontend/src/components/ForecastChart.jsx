import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await api.get('/sensors/predict');
                if (res.data && res.data.predictions) {
                    setData(res.data.predictions);
                }
            } catch (err) {
                console.error("Forecast error", err);
            }
            setLoading(false);
        };

        fetchForecast();
        const interval = setInterval(fetchForecast, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: data.map(d => new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [
            {
                label: 'Predicted Temperature (°C)',
                data: data.map(d => d.temperature),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderDash: [5, 5], // Dashed line for prediction
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '30-Minute Temperature Forecast' },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return (
        <div className="card w-full h-80 p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">AI Predictive Analytics</h3>
            {loading ? (
                <div className="flex items-center justify-center h-full text-gray-400">Loading Forecast...</div>
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default ForecastChart;
