const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');

const RANGES = {
    temperature: { min: 10, max: 50, criticalHigh: 40 },
    humidity: { min: 10, max: 90, criticalLow: 20 },
    ph: { min: 4, max: 9, criticalLow: 5, criticalHigh: 8 }
};

// Max change per step (5 minutes)
const MAX_CHANGE = {
    temperature: 1.5,
    humidity: 4.0,
    ph: 0.2
};

let currentValues = {
    temperature: 25.0,
    humidity: 60.0,
    ph: 7.0
};

const generateSmoothValue = (current, min, max, maxChange) => {
    let change = (Math.random() * maxChange * 2) - maxChange;
    let newValue = current + change;

    // Bounce off limits
    if (newValue < min) newValue = min + Math.abs(change);
    if (newValue > max) newValue = max - Math.abs(change);

    return parseFloat(newValue.toFixed(1));
};

const checkAlerts = async (data, io) => {
    const alerts = [];

    // Temperature
    if (data.temperature > RANGES.temperature.criticalHigh) {
        alerts.push({ type: 'temperature', value: data.temperature, message: `High Temperature Alert: ${data.temperature}°C` });
    }

    // Humidity
    if (data.humidity < RANGES.humidity.criticalLow) {
        alerts.push({ type: 'humidity', value: data.humidity, message: `Low Humidity Alert: ${data.humidity}%` });
    }

    // pH
    if (data.ph < RANGES.ph.criticalLow || data.ph > RANGES.ph.criticalHigh) {
        alerts.push({ type: 'ph', value: data.ph, message: `Abnormal pH Level: ${data.ph}` });
    }

    // Save and Emit Alerts
    for (const alertData of alerts) {
        const alert = new Alert({ ...alertData, resolved: false });
        await alert.save();
        io.emit('newAlert', alert);
    }
};

const startSimulation = async (io) => {
    console.log('Starting Sensor Simulation (Smooth Mode - 5m Interval)...');

    // Seed 24 hours of data if empty
    const count = await SensorData.countDocuments();
    if (count === 0) {
        console.log('Seeding 24h history into MongoDB...');
        const now = new Date();

        let seedValues = { ...currentValues };
        // 24 hours * 12 points/hour = 288 points
        const totalPoints = 288;

        const bulkOps = [];

        for (let i = 0; i <= totalPoints; i++) {
            const time = new Date(now.getTime() - (totalPoints - i) * 5 * 60 * 1000); // 5 mins back

            // Allow larger jumps for initial seeding to create variety
            seedValues.temperature = generateSmoothValue(seedValues.temperature, RANGES.temperature.min, RANGES.temperature.max, 2.0);
            seedValues.humidity = generateSmoothValue(seedValues.humidity, RANGES.humidity.min, RANGES.humidity.max, 5.0);
            seedValues.ph = generateSmoothValue(seedValues.ph, RANGES.ph.min, RANGES.ph.max, 0.3);

            bulkOps.push({
                insertOne: {
                    document: {
                        temperature: seedValues.temperature,
                        humidity: seedValues.humidity,
                        ph: seedValues.ph,
                        createdAt: time
                    }
                }
            });
        }
        await SensorData.bulkWrite(bulkOps);
        // Sync current values to last seed
        currentValues = { ...seedValues };
    } else {
        // If data exists, trying to fetch last point to continue smoothly
        const lastData = await SensorData.findOne().sort({ createdAt: -1 });
        if (lastData) {
            currentValues = {
                temperature: lastData.temperature,
                humidity: lastData.humidity,
                ph: lastData.ph
            };
        }
    }

    setInterval(async () => {
        try {
            // Update current values smoothly
            currentValues.temperature = generateSmoothValue(currentValues.temperature, RANGES.temperature.min, RANGES.temperature.max, MAX_CHANGE.temperature);
            currentValues.humidity = generateSmoothValue(currentValues.humidity, RANGES.humidity.min, RANGES.humidity.max, MAX_CHANGE.humidity);
            currentValues.ph = generateSmoothValue(currentValues.ph, RANGES.ph.min, RANGES.ph.max, MAX_CHANGE.ph);

            const data = new SensorData({
                temperature: currentValues.temperature,
                humidity: currentValues.humidity,
                ph: currentValues.ph,
                createdAt: new Date() // Explicitly set createdAt for consistency with original mock
            });

            // Save to DB
            await data.save();

            // Optional: Cleanup old data (older than 7 days)
            // await SensorData.deleteMany({ createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });

            // Emit to WebSocket
            io.emit('sensorUpdate', data);

            // Check for Critical Alerts
            await checkAlerts(data, io);

        } catch (error) {
            console.error('Simulation Error:', error);
        }
    }, 300000); // Every 5 minutes (300,000 ms)
};

module.exports = { startSimulation };
