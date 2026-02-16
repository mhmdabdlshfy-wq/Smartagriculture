const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    ph: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true // Key for performant history queries
    }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
