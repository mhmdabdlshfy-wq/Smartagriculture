const { spawn } = require('child_process');
const axios = require('axios');
const path = require('path');

const SERVER_PORT = 5000;
const LOGIN_URL = `http://localhost:${SERVER_PORT}/api/auth/login`;

console.log('🚀 STARTING AUTOMATED FIX & LAUNCHER...');

// 1. Start Server
const serverProcess = spawn('node', ['back/server.js'], {
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, PORT: SERVER_PORT } // Force port
});

let serverReady = false;

serverProcess.stdout.on('data', (data) => {
    const msg = data.toString();
    console.log(`[SERVER]: ${msg.trim()}`);

    if (msg.includes('MongoDB Connected')) {
        console.log('✅ DATABASE CONNECTED!');
        serverReady = true;
        checkLogin();
    }
});

serverProcess.stderr.on('data', (data) => {
    console.error(`[SERVER ERROR]: ${data.toString().trim()}`);
});

serverProcess.on('close', (code) => {
    console.log(`💀 Server stopped with code ${code}`);
});

// 2. Poll for Login
async function checkLogin() {
    console.log('⏳ Testing Login (admin/1234)...');

    // Retry loop
    let attempts = 0;
    const maxAttempts = 5;

    const interval = setInterval(async () => {
        attempts++;
        try {
            const response = await axios.post(LOGIN_URL, {
                username: 'admin',
                password: '1234'
            });

            if (response.status === 200) {
                console.log('\n✨✨✨ LOGIN SUCCESSFUL! ✨✨✨');
                console.log('------------------------------------------------');
                console.log('Key info:');
                console.log('User:', response.data.user.username);
                console.log('Token:', response.data.token.substring(0, 15) + '...');
                console.log('------------------------------------------------');
                console.log('🟢 SERVER IS RUNNING AND HEALTHY.');
                console.log('👉 PLEASE OPEN YOUR FRONTEND NOW: http://localhost:5173');
                console.log('login with: admin / 1234');
                console.log('(Keep this window open!)');
                clearInterval(interval);
            }
        } catch (err) {
            console.log(`❌ Attempt ${attempts}/${maxAttempts} failed: ${err.response?.data?.message || err.message}`);
            if (err.code === 'ECONNREFUSED') {
                console.log('   (Server not accepting connections yet...)');
            }

            if (attempts >= maxAttempts) {
                console.log('❌ GIVING UP. Please check logs above.');
                clearInterval(interval);
                serverProcess.kill();
                process.exit(1);
            }
        }
    }, 2000);
}
