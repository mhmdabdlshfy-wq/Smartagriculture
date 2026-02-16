const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true // 'temperature', 'humidity', 'ph'
    },
    value: {
        type: Number,
        required: true
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
