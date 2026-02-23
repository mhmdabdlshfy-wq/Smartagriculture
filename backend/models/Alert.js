const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true // 'temperature', 'humidity', 'ph', 'soilMoisture', 'system', 'irrigation', 'disease'
    },
    severity: {
        type: String,
        enum: ['Critical', 'Warning', 'Info'],
        default: 'Warning'
    },
    value: {
        type: Number,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alert', AlertSchema);
