const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Seed Default Admin (admin / 1234)
(async () => {
    try {
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            await User.create({
                username: 'admin',
                password: '1234', // Pre-save hook will hash this
                role: 'admin'
            });
            console.log('Default Admin Created: admin / 1234');
        }
    } catch (err) {
        console.error('Admin Seed Error:', err);
    }
})();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({
            username,
            password, // Mongoose pre-save hook handles hashing
            role: 'user'
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`📡 LOGIN ATTEMPT: Username=${username}, Password=${password}`);

    if (!username || !password) {
        console.log('❌ Missing fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('❌ User not found in DB');
            // Try to dump all users for debug
            const allUsers = await User.find({}, 'username');
            console.log('   Users in DB:', allUsers.map(u => u.username));
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`✅ User found: ${user.username}, Role: ${user.role}`);
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('✅ Password matched! Generating token...');
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('❌ LOGIN SERVER ERROR:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
