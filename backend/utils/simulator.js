const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');
const CROPS = require('../config/crops'); // Ensure this file exists and exports crop data

// Default crop for simulation targets (can be updated dynamically)
let activeCrop = 'Tomato';

const RANGES = {
    temperature: { min: -10, max: 60, criticalHigh: 30, criticalLow: 0 },
    humidity: { min: 0, max: 100, criticalLow: 40, criticalHigh: 95 },
    ph: { min: 0, max: 14, criticalLow: 4, criticalHigh: 9 },
    soilMoisture: { min: 0, max: 100, criticalLow: 10, criticalHigh: 90 }
};

// Max change per step (5 seconds) - smaller changes for smoother transitions
const MAX_CHANGE = {
    temperature: 1.5,
    humidity: 2.0,
    ph: 0.2,
    soilMoisture: 1.5
};

let currentValues = {
    temperature: 24.0,
    humidity: 60.0,
    ph: 6.5,
    soilMoisture: 50.0
};

const generateSmoothValue = (current, min, max, maxChange) => {
    let change = (Math.random() * maxChange * 2) - maxChange;
    let newValue = current + change;

    // Bounce off limits
    if (newValue < min) newValue = min + Math.abs(change);
    if (newValue > max) newValue = max - Math.abs(change);

    return parseFloat(newValue.toFixed(2));
};

const checkAlerts = async (data, io) => {
    const alerts = [];

    // ── Temperature Alerts ──
    if (data.temperature > 40) {
        alerts.push({ type: 'temperature', severity: 'Critical', value: data.temperature, message: `🔥 Extreme Heat: ${data.temperature}°C – Crops at severe risk!` });
    } else if (data.temperature > 35) {
        alerts.push({ type: 'temperature', severity: 'Critical', value: data.temperature, message: `🌡️ Heat Stress Detected: ${data.temperature}°C` });
    } else if (data.temperature > 28) {
        alerts.push({ type: 'temperature', severity: 'Warning', value: data.temperature, message: `⚠️ High Temperature: ${data.temperature}°C` });
    } else if (data.temperature < 2) {
        alerts.push({ type: 'temperature', severity: 'Critical', value: data.temperature, message: `❄️ Frost Alert! Temperature: ${data.temperature}°C` });
    } else if (data.temperature < 8) {
        alerts.push({ type: 'temperature', severity: 'Warning', value: data.temperature, message: `🥶 Cold Warning: ${data.temperature}°C` });
    }

    // ── Humidity Alerts ──
    if (data.humidity < 25) {
        alerts.push({ type: 'humidity', severity: 'Critical', value: data.humidity, message: `🏜️ Dangerously Low Humidity: ${data.humidity}%` });
    } else if (data.humidity < 35) {
        alerts.push({ type: 'humidity', severity: 'Warning', value: data.humidity, message: `💨 Dry Air Warning: Humidity at ${data.humidity}%` });
    } else if (data.humidity > 90) {
        alerts.push({ type: 'humidity', severity: 'Warning', value: data.humidity, message: `💧 High Humidity: ${data.humidity}% – Fungal risk increased` });
    }

    // ── Soil Moisture Alerts ──
    if (data.soilMoisture < 15) {
        alerts.push({ type: 'soilMoisture', severity: 'Critical', value: data.soilMoisture, message: `🚨 Critical Drought: Soil moisture at ${data.soilMoisture}%` });
    } else if (data.soilMoisture < 35) {
        alerts.push({ type: 'irrigation', severity: 'Warning', value: data.soilMoisture, message: `🚿 Irrigation Needed: Soil moisture low (${data.soilMoisture}%)` });
    } else if (data.soilMoisture > 90) {
        alerts.push({ type: 'soilMoisture', severity: 'Warning', value: data.soilMoisture, message: `🌊 Waterlogging Risk: Soil saturated at ${data.soilMoisture}%` });
    } else if (data.soilMoisture > 80) {
        alerts.push({ type: 'soilMoisture', severity: 'Info', value: data.soilMoisture, message: `💦 High Soil Moisture: ${data.soilMoisture}% – Monitor drainage` });
    }

    // ── pH Alerts ──
    if (data.ph < 5.0) {
        alerts.push({ type: 'ph', severity: 'Critical', value: data.ph, message: `⚗️ Severely Acidic Soil: pH ${data.ph} – Add lime` });
    } else if (data.ph < 5.5) {
        alerts.push({ type: 'ph', severity: 'Warning', value: data.ph, message: `🧪 Acidic Soil: pH ${data.ph}` });
    } else if (data.ph > 8.0) {
        alerts.push({ type: 'ph', severity: 'Critical', value: data.ph, message: `⚗️ Highly Alkaline Soil: pH ${data.ph} – Add sulfur` });
    } else if (data.ph > 7.5) {
        alerts.push({ type: 'ph', severity: 'Warning', value: data.ph, message: `🧪 Alkaline Soil: pH ${data.ph}` });
    }

    // ── Combo / Disease Alerts ──
    if (data.humidity > 80 && data.temperature > 25) {
        alerts.push({ type: 'disease', severity: 'Warning', value: data.humidity, message: `🦠 Disease Risk: High humidity (${data.humidity}%) + warm temp (${data.temperature}°C) = fungal conditions` });
    }
    if (data.temperature > 30 && data.soilMoisture < 30) {
        alerts.push({ type: 'irrigation', severity: 'Critical', value: data.soilMoisture, message: `☀️🚿 Heat + Dry Soil: Immediate irrigation recommended!` });
    }

    // ── Random System Alerts (10% chance) ──
    if (Math.random() < 0.10) {
        const systemAlerts = [
            { type: 'system', severity: 'Info', value: 0, message: '📡 Sensor calibration check due in 3 days' },
            { type: 'system', severity: 'Info', value: 0, message: '🔋 Battery level on Sensor Node #3: 42%' },
            { type: 'system', severity: 'Warning', value: 0, message: '📶 Weak signal on Sensor Node #7 – Check antenna' },
            { type: 'system', severity: 'Info', value: 0, message: '🌱 Growth stage update: Flowering phase detected' },
            { type: 'system', severity: 'Info', value: 0, message: '📊 Weekly report generated – View in Analytics' },
            { type: 'system', severity: 'Warning', value: 0, message: '⚡ Power fluctuation detected on irrigation pump' },
        ];
        const randomAlert = systemAlerts[Math.floor(Math.random() * systemAlerts.length)];
        alerts.push(randomAlert);
    }

    // ── Save & Emit (dedup within 30 seconds per type) ──
    for (const alertData of alerts) {
        const count = await Alert.countDocuments({
            type: alertData.type,
            createdAt: { $gt: new Date(Date.now() - 30000) }
        });

        if (count === 0) {
            const alert = new Alert(alertData);
            await alert.save();
            io.emit('newAlert', alert);
        }
    }
};

const startSimulation = async (io) => {
    console.log('Starting Sensor Simulation (Real-Time Mode - 5s Interval)...');

    // ============================================
    // AUTO-SEED: Ensure we always have 1 year of data
    // ============================================
    try {
        // Check if we have data older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const oldDataCount = await SensorData.countDocuments({ createdAt: { $lt: thirtyDaysAgo } });

        if (oldDataCount === 0) {
            console.log('🗑️  No historical data found. Clearing short-term data and seeding full year...');
            await SensorData.deleteMany({}); // Clear everything

            const seedData = [];
            const now = new Date();

            // ── YEAR DATA: 1 point every 6 hours for 12 months (1460 points) ──
            for (let i = 365; i >= 1; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);

                // Seasonal pattern: Summer (May-Sep) hot, Winter (Nov-Mar) cold
                const month = date.getMonth();
                let seasonalTemp;
                if (month >= 4 && month <= 8) seasonalTemp = 30; // Summer
                else if (month >= 10 || month <= 2) seasonalTemp = 12; // Winter
                else seasonalTemp = 21; // Spring/Autumn transition

                // 4 readings per day (every 6 hours: 00:00, 06:00, 12:00, 18:00)
                for (let h = 0; h < 24; h += 6) {
                    const timestamp = new Date(date);
                    timestamp.setHours(h, 0, 0, 0);

                    // Daily cycle: noon hottest, midnight coldest
                    const dailyCycle = Math.sin((h - 6) / 24 * Math.PI * 2) * 5;
                    const temp = seasonalTemp + dailyCycle + (Math.random() * 3 - 1.5);
                    const humidity = 70 - (temp * 0.8) + (Math.random() * 10 - 5);

                    // Soil moisture: periodic pattern (irrigation every ~5 days)
                    const dayOfYear = Math.floor(i);
                    const irrigationCycle = 60 + Math.sin(dayOfYear / 5 * Math.PI * 2) * 15;
                    const moisture = irrigationCycle + (Math.random() * 8 - 4);

                    seedData.push({
                        temperature: parseFloat(Math.max(-5, Math.min(50, temp)).toFixed(1)),
                        humidity: parseFloat(Math.max(10, Math.min(95, humidity)).toFixed(1)),
                        ph: parseFloat((6.5 + Math.sin(dayOfYear / 30) * 0.3 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
                        soilMoisture: parseFloat(Math.max(10, Math.min(90, moisture)).toFixed(1)),
                        cropType: 'Tomato',
                        createdAt: timestamp
                    });
                }
            }

            // ── LAST 7 DAYS: 1 point every 15 minutes (672 points) ──
            for (let i = 7 * 24 * 4; i >= 1; i--) {
                const timestamp = new Date(now);
                timestamp.setMinutes(timestamp.getMinutes() - (i * 15));

                const hour = timestamp.getHours();
                const dailyCycle = Math.sin((hour - 6) / 24 * Math.PI * 2) * 6;
                const temp = 24 + dailyCycle + (Math.random() * 2 - 1);
                const humidity = 55 - dailyCycle + (Math.random() * 4 - 2);
                const dayFraction = i / (24 * 4);
                const moisture = 55 + Math.sin(dayFraction / 3 * Math.PI * 2) * 12 + (Math.random() * 3);

                seedData.push({
                    temperature: parseFloat(Math.max(5, Math.min(45, temp)).toFixed(1)),
                    humidity: parseFloat(Math.max(20, Math.min(90, humidity)).toFixed(1)),
                    ph: parseFloat((6.5 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
                    soilMoisture: parseFloat(Math.max(20, Math.min(85, moisture)).toFixed(1)),
                    cropType: 'Tomato',
                    createdAt: timestamp
                });
            }

            // ── LAST 24 HOURS: 1 point every 2 minutes (720 points) ──
            for (let i = 24 * 30; i >= 1; i--) {
                const timestamp = new Date(now);
                timestamp.setMinutes(timestamp.getMinutes() - (i * 2));

                const hour = timestamp.getHours();
                const dailyCycle = Math.sin((hour - 6) / 24 * Math.PI * 2) * 5;
                const temp = 25 + dailyCycle + (Math.random() * 1.5 - 0.75);
                const humidity = 58 - dailyCycle + (Math.random() * 3 - 1.5);
                const minuteIndex = i;
                const moisture = 52 + Math.sin(minuteIndex / 60 * Math.PI) * 8 + (Math.random() * 2);

                seedData.push({
                    temperature: parseFloat(Math.max(10, Math.min(40, temp)).toFixed(1)),
                    humidity: parseFloat(Math.max(25, Math.min(85, humidity)).toFixed(1)),
                    ph: parseFloat((6.5 + (Math.random() * 0.15 - 0.075)).toFixed(1)),
                    soilMoisture: parseFloat(Math.max(25, Math.min(80, moisture)).toFixed(1)),
                    cropType: 'Tomato',
                    createdAt: timestamp
                });
            }

            // Sort all seed data by time before inserting
            seedData.sort((a, b) => a.createdAt - b.createdAt);

            console.log(`📊 Inserting ${seedData.length} records covering 1 full year...`);
            // Insert in batches to avoid memory issues
            const batchSize = 500;
            for (let i = 0; i < seedData.length; i += batchSize) {
                await SensorData.insertMany(seedData.slice(i, i + batchSize));
            }
            console.log('✅ Database seeded with 1 year of realistic data!');
        } else {
            console.log(`📊 Historical data found (${oldDataCount} old records). Skipping seed.`);
        }
    } catch (e) {
        console.error("Seeding Error:", e);
    }

    // ============================================
    // REAL-TIME SIMULATION (every 5 seconds)
    // ============================================
    setInterval(async () => {
        try {
            // Chaos Mode: 20% chance to force a critical value to ensure diverse alerts
            if (Math.random() < 0.2) {
                const type = ['temperature', 'humidity', 'ph', 'soilMoisture'][Math.floor(Math.random() * 4)];
                const high = Math.random() > 0.5;

                console.log(`⚡ CHAOS MODE: Glitching ${type} ${high ? 'High' : 'Low'}`);

                if (type === 'temperature') currentValues.temperature = high ? 45 : 0;
                if (type === 'humidity') currentValues.humidity = high ? 95 : 15;
                if (type === 'ph') currentValues.ph = high ? 9 : 4;
                if (type === 'soilMoisture') currentValues.soilMoisture = high ? 95 : 5;
            } else {
                // Normal Drift
                currentValues.temperature = generateSmoothValue(currentValues.temperature, RANGES.temperature.min, RANGES.temperature.max, MAX_CHANGE.temperature);
                currentValues.humidity = generateSmoothValue(currentValues.humidity, RANGES.humidity.min, RANGES.humidity.max, MAX_CHANGE.humidity);
                currentValues.ph = generateSmoothValue(currentValues.ph, RANGES.ph.min, RANGES.ph.max, MAX_CHANGE.ph);
                currentValues.soilMoisture = generateSmoothValue(currentValues.soilMoisture, RANGES.soilMoisture.min, RANGES.soilMoisture.max, MAX_CHANGE.soilMoisture);

                // Small chance to 'rain' (moisture spike)
                if (Math.random() < 0.05) currentValues.soilMoisture = Math.min(100, currentValues.soilMoisture + 20);
            }

            const data = new SensorData({
                temperature: currentValues.temperature,
                humidity: currentValues.humidity,
                ph: currentValues.ph,
                soilMoisture: currentValues.soilMoisture,
                cropType: activeCrop,
                createdAt: new Date()
            });

            await data.save();

            io.emit('sensorUpdate', data);

            await checkAlerts(data, io);

        } catch (error) {
            console.error('Simulation Error:', error);
        }
    }, 5000);
};

// Export activeCrop setter for API
const setActiveCrop = (crop) => {
    if (CROPS[crop]) {
        activeCrop = crop;
        // Adjust current values to jump closer to new crop ideal? 
        // Or just let them drift? Let's just set the tag.
        console.log(`Switched simulation target to ${crop}`);
    }
};

module.exports = { startSimulation, setActiveCrop };
