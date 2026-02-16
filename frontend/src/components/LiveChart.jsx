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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LiveChart = ({ title, data, labels, color = '#2e7d32', min, max }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                borderColor: color,
                borderWidth: 2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, `${color}20`); // More subtle opacity (0.2)
                    gradient.addColorStop(1, `${color}00`);
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Smooth curve
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: color,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Disable animation for performance with large datasets
        },
        plugins: {
            legend: { display: false },
            title: {
                display: !!title,
                text: title,
                font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
                color: '#374151',
                padding: { bottom: 25 }
            },
            tooltip: {
                mode: 'nearest',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#111827',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                titleFont: { size: 13, weight: '600' },
                bodyFont: { size: 12 },
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y} ${title.includes('Temp') ? '°C' : title.includes('Hum') ? '%' : ''}`
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
                    font: { size: 11, family: "'Inter', sans-serif" },
                    color: '#9ca3af'
                }
            },
            y: {
                min,
                max,
                grid: {
                    color: '#f3f4f6',
                    borderDash: [4, 4],
                    drawBorder: false,
                },
                ticks: {
                    font: { size: 11, family: "'Inter', sans-serif" },
                    color: '#9ca3af',
                    padding: 10
                },
                border: { display: false }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
            },
            line: {
                borderWidth: 2,
                tension: 0.4
            }
        }
    };

    return (
        <div className="w-full h-full min-h-[250px]">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LiveChart;
