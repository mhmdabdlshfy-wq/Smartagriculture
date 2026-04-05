/**
 * useIntelligence Hook
 * Fetches and manages all intelligence data from the backend.
 * Provides: health score, risks, predictions, anomalies, insights
 */
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useIntelligence(activeCrop) {
    const [health, setHealth] = useState(null);
    const [risks, setRisks] = useState(null);
    const [predictions, setPredictions] = useState(null);
    const [anomalies, setAnomalies] = useState([]);
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAll = useCallback(async () => {
        if (!activeCrop) return;
        try {
            const [healthRes, risksRes, predictRes, anomalyRes] = await Promise.all([
                api.get(`/sensors/health?crop=${activeCrop}`),
                api.get(`/sensors/risks?crop=${activeCrop}`),
                api.get('/sensors/predict'),
                api.get('/sensors/anomalies')
            ]);

            setHealth(healthRes.data);
            setRisks(risksRes.data);
            setPredictions(predictRes.data?.predictions || null);
            setAnomalies(anomalyRes.data?.anomalies || []);
            setLoading(false);
        } catch (err) {
            console.error('[useIntelligence] Fetch error:', err);
            setLoading(false);
        }
    }, [activeCrop]);

    const fetchInsights = useCallback(async () => {
        if (!activeCrop) return;
        try {
            const res = await api.get(`/sensors/insights?crop=${activeCrop}`);
            setInsights(res.data);
        } catch (err) {
            console.error('[useIntelligence] Insights error:', err);
        }
    }, [activeCrop]);

    // Poll intelligence data every 5 seconds
    useEffect(() => {
        fetchAll();
        const interval = setInterval(fetchAll, 5000);
        return () => clearInterval(interval);
    }, [fetchAll]);

    // Fetch insights less frequently (every 30s)
    useEffect(() => {
        fetchInsights();
        const interval = setInterval(fetchInsights, 30000);
        return () => clearInterval(interval);
    }, [fetchInsights]);

    return { health, risks, predictions, anomalies, insights, loading, refetch: fetchAll };
}

export default useIntelligence;
