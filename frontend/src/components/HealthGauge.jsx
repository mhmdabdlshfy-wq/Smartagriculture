import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

/**
 * HealthGauge - Circular progress indicator showing crop health score.
 * Score is mathematically calculated from sensor deviations.
 * Props: health = { overall, breakdown, category, color }
 */
const HealthGauge = ({ health, activeCrop }) => {
    const score = health?.overall ?? 0;
    const category = health?.category ?? 'Loading...';

    // Dynamic color based on score
    const getColor = (s) => {
        if (s >= 90) return '#10b981';
        if (s >= 75) return '#22c55e';
        if (s >= 50) return '#f59e0b';
        return '#ef4444';
    };

    const color = getColor(score);

    const data = {
        labels: ['Health', 'Deficit'],
        datasets: [{
            data: [score, 100 - score],
            backgroundColor: [color, '#e5e7eb'],
            borderWidth: 0,
            cutout: '78%',
        }],
    };

    const options = {
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateScale: true, animateRotate: true },
        responsive: true,
        maintainAspectRatio: true
    };

    const breakdown = health?.breakdown || {};

    return (
        <div className="card flex flex-col items-center p-6 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} />

            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Crop Health Score
            </h3>

            <div className="w-40 h-40 relative">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold transition-all duration-500" style={{ color }}>{score}%</span>
                    <span className="text-xs font-medium text-gray-500">{activeCrop}</span>
                </div>
            </div>

            <div className="mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold`} style={{
                    backgroundColor: `${color}20`, color
                }}>
                    {category}
                </span>
            </div>

            {/* Breakdown bars */}
            {Object.keys(breakdown).length > 0 && (
                <div className="w-full mt-4 space-y-2">
                    {Object.entries(breakdown).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 text-xs">
                            <span className="w-20 text-gray-500 dark:text-gray-400 capitalize truncate">{key}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${val.score}%`,
                                        backgroundColor: getColor(val.score)
                                    }}
                                />
                            </div>
                            <span className="w-8 text-right text-gray-400">{val.score}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HealthGauge;
