import { createContext, useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import api from '../services/api';

const SensorContext = createContext();

// Client-side crop config (mirrors backend/config/crops.js)
const CROPS = {
    Wheat: { name: 'Wheat', emoji: '🌾', temp: { min: 15, max: 25, ideal: 20, stressTolerance: 5 }, humidity: { min: 40, max: 60, ideal: 50, stressTolerance: 15 }, ph: { min: 6.0, max: 7.0, ideal: 6.5, stressTolerance: 0.8 }, moisture: { min: 30, max: 50, ideal: 40, stressTolerance: 15 } },
    Corn: { name: 'Corn', emoji: '🌽', temp: { min: 18, max: 30, ideal: 24, stressTolerance: 6 }, humidity: { min: 50, max: 70, ideal: 60, stressTolerance: 15 }, ph: { min: 5.8, max: 7.0, ideal: 6.5, stressTolerance: 0.8 }, moisture: { min: 40, max: 60, ideal: 50, stressTolerance: 12 } },
    Tomato: { name: 'Tomato', emoji: '🍅', temp: { min: 20, max: 28, ideal: 24, stressTolerance: 4 }, humidity: { min: 60, max: 80, ideal: 70, stressTolerance: 10 }, ph: { min: 6.0, max: 6.8, ideal: 6.4, stressTolerance: 0.5 }, moisture: { min: 50, max: 70, ideal: 60, stressTolerance: 10 } },
    Potato: { name: 'Potato', emoji: '🥔', temp: { min: 15, max: 22, ideal: 18, stressTolerance: 4 }, humidity: { min: 50, max: 70, ideal: 60, stressTolerance: 12 }, ph: { min: 4.8, max: 6.5, ideal: 5.5, stressTolerance: 0.7 }, moisture: { min: 40, max: 60, ideal: 50, stressTolerance: 12 } },
    Rice: { name: 'Rice', emoji: '🌾', temp: { min: 22, max: 32, ideal: 27, stressTolerance: 5 }, humidity: { min: 70, max: 90, ideal: 80, stressTolerance: 10 }, ph: { min: 5.5, max: 7.0, ideal: 6.2, stressTolerance: 0.6 }, moisture: { min: 70, max: 90, ideal: 80, stressTolerance: 10 } },
    Strawberry: { name: 'Strawberry', emoji: '🍓', temp: { min: 15, max: 26, ideal: 20, stressTolerance: 4 }, humidity: { min: 60, max: 75, ideal: 68, stressTolerance: 10 }, ph: { min: 5.5, max: 6.5, ideal: 6.0, stressTolerance: 0.5 }, moisture: { min: 50, max: 65, ideal: 58, stressTolerance: 8 } }
};

export const SensorProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState(null);
    const [history, setHistory] = useState([]);
    const [activeCrop, setActiveCropState] = useState('Tomato');
    const [healthScore, setHealthScore] = useState(100);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    // Keep a ref to activeCrop so the socket listener can access the latest value
    const activeCropRef = useRef(activeCrop);

    // Socket connection + sensor data (runs once)
    useEffect(() => {
        const newSocket = io(window.location.origin);
        setSocket(newSocket);

        const fetchSensorData = async () => {
            try {
                const curRes = await api.get('/sensors/current');
                if (curRes.data) setSensorData(curRes.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch initial sensor data", err);
                setLoading(false);
            }
        };

        fetchSensorData();

        newSocket.on('sensorUpdate', (data) => {
            setSensorData(data);
            setHistory(prev => {
                const newHistory = [...prev, data];
                if (newHistory.length > 30) newHistory.shift();
                return newHistory;
            });
        });

        // Filter incoming alerts: only show if cropType matches active crop
        newSocket.on('newAlert', (alert) => {
            const currentCrop = activeCropRef.current;
            if (!alert.cropType || alert.cropType === currentCrop) {
                setAlerts(prev => [alert, ...prev].slice(0, 20));
            }
        });

        return () => newSocket.close();
    }, []);

    // Fetch alerts filtered by active crop (runs on crop change)
    useEffect(() => {
        activeCropRef.current = activeCrop;

        const fetchAlerts = async () => {
            try {
                const alertRes = await api.get(`/sensors/alerts?crop=${activeCrop}`);
                if (alertRes.data) setAlerts(alertRes.data);
            } catch (err) {
                console.error("Failed to fetch alerts for crop", err);
            }
        };

        fetchAlerts();
    }, [activeCrop]);

    const setActiveCrop = async (crop) => {
        if (CROPS[crop]) {
            setActiveCropState(crop);
            try {
                await api.post('/sensors/crop', { crop });
            } catch (e) {
                console.error("Failed to sync crop with backend", e);
            }
        }
    };

    return (
        <SensorContext.Provider value={{
            sensorData,
            history,
            activeCrop,
            setActiveCrop,
            healthScore,
            alerts,
            loading,
            cropsConfig: CROPS
        }}>
            {children}
        </SensorContext.Provider>
    );
};

export const useSensor = () => useContext(SensorContext);
