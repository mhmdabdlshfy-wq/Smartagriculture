import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

/**
 * LiveChart - Enhanced chart with optional prediction overlay.
 * Shows historical data as solid line, predictions as dashed line.
 * 
 * Props:
 *   - prediction: { values, labels, confidence, trend } | null
 */
const LiveChart = ({ title, data, labels, color = '#2e7d32', min, max, prediction }) => {
    const datasets = [
        {
            label: title,
            data: data,
            borderColor: color,
            borderWidth: 2,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, `${color}15`);
                gradient.addColorStop(1, `${color}00`);
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: color,
        },
    ];

    let allLabels = [...labels];

    // Add prediction dataset if available
    if (prediction && prediction.values && prediction.values.length > 0) {
        // Extend labels for predictions
        allLabels = [...labels, ...prediction.labels];

        // Create prediction dataset: fill with nulls for historical, then prediction values
        const predData = new Array(labels.length).fill(null);
        // Connect to last real data point
        if (data.length > 0) {
            predData[predData.length - 1] = data[data.length - 1];
        }
        predData.push(...prediction.values);

        datasets.push({
            label: `Forecast (${prediction.confidence || 0}% conf.)`,
            data: predData,
            borderColor: color,
            borderWidth: 2,
            borderDash: [6, 4],
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
        });
    }

    const chartData = {
        labels: allLabels,
        datasets
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        plugins: {
            legend: {
                display: !!prediction,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { size: 11, family: "'Inter', sans-serif" },
                    color: '#9ca3af',
                    padding: 15
                }
            },
            title: {
                display: !!title,
                text: title,
                font: { size: 14, weight: '600', family: "'Inter', sans-serif" },
                color: '#374151',
                padding: { bottom: 20 }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#111827',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 11 },
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: (ctx) => {
                        if (ctx.parsed.y == null) return null;
                        const unit = title.includes('Temp') ? '°C' : title.includes('pH') ? '' : '%';
                        return ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}${unit}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    maxTicksLimit: 8,
                    maxRotation: 0,
                    autoSkip: true,
                    font: { size: 10, family: "'Inter', sans-serif" },
                    color: '#9ca3af'
                }
            },
            y: {
                min, max,
                grid: { color: '#f3f4f6', drawBorder: false },
                ticks: {
                    font: { size: 10, family: "'Inter', sans-serif" },
                    color: '#9ca3af',
                    padding: 8
                },
                border: { display: false }
            },
        },
        interaction: { mode: 'index', axis: 'x', intersect: false },
        elements: {
            point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
            line: { borderWidth: 2, tension: 0.4 }
        }
    };

    return (
        <div className="w-full h-full min-h-[250px]">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LiveChart;
