const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');

// Get latest sensor data
router.get('/current', async (req, res) => {
    try {
        const latest = await SensorData.findOne().sort({ createdAt: -1 });
        res.json(latest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get historical data (with filters)
router.get('/history', async (req, res) => {
    const { range } = req.query; // '1h', '24h', '7d'
    let startDate = new Date();

    if (range === '1h') startDate.setHours(startDate.getHours() - 1);
    else if (range === '7d') startDate.setDate(startDate.getDate() - 7);
    else startDate.setHours(startDate.getHours() - 24); // Default 24h

    try {
        const history = await SensorData.find({
            createdAt: { $gte: startDate }
        }).sort({ createdAt: 1 });

        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);
        res.json(alerts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
