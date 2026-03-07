import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const AdminPanel = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center">{t.adminPanel.loadingStats}</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.adminPanel.systemAnalytics}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-none">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/50 rounded-lg">
                            <BarChart3 className="text-blue-600 w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-100">{t.adminPanel.avgTemperature}</p>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-white">{stats?.avgTemp?.toFixed(1) || '--'}°C</h3>
                        </div>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-none">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/50 rounded-lg">
                            <TrendingUp className="text-green-600 w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-100">{t.adminPanel.maxHumidity}</p>
                            <h3 className="text-2xl font-bold text-green-900 dark:text-white">{stats?.maxHumid || '--'}%</h3>
                        </div>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-none">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/50 rounded-lg">
                            <TrendingDown className="text-purple-600 w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-purple-800 dark:text-purple-100">{t.adminPanel.minPhLevel}</p>
                            <h3 className="text-2xl font-bold text-purple-900 dark:text-white">{stats?.minPh || '--'}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="font-bold text-lg mb-4">{t.adminPanel.dataManagement}</h3>
                <p className="text-gray-600 mb-4">{t.adminPanel.dataManagementDesc}</p>
                <div className="flex gap-4">
                    <button className="btn btn-primary" onClick={() => alert('Export feature pending implementation')}>{t.adminPanel.exportCSV}</button>
                    <button className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50">{t.adminPanel.clearLogs}</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
