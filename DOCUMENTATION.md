# AI-Powered Smart Agriculture Monitoring System

## Overview
A production-ready monitoring system with real-time sensor data, crop-specific health analysis, and AI-driven irrigation recommendations.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Chart.js, Socket.io-client
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **AI/Logic**: Linear Regression for forecasting, Rule-based Crop Health Engine

## Features Implemented
1. **Authentication**: JWT-based auth with Roles (Farmer, Admin, Analyst).
2. **Real-Time Monitoring**: 5s updates for Temp, Humidity, pH, Soil Moisture.
3. **Dynamic Crop Logic**: Select Wheat, Corn, Tomato, Potato to adjust health scoring.
4. **Health Score**: 0-100% calculation based on ideal crop ranges.
5. **Smart Irrigation**: Algorithm to recommend irrigation or misting.
6. **Predictive Analytics**: 30-minute temperature forecast using linear regression.
7. **Anomaly Detection**: Automated alerts for extreme conditions.

## Project Structure
```
smart-agri-mern/
├── backend/
│   ├── config/          # Crop configurations
│   ├── models/          # Mongoose Schemas (User, SensorData, Alert)
│   ├── routes/          # API Routes (Auth, Sensors)
│   ├── utils/           # Simulator & Helper logic
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components (Charts, Cards, Gauges)
    │   ├── context/     # React Context (Auth, Sensor)
    │   ├── pages/       # Dashboard, Login, Admin
    │   └── services/    # API Axios instance
    └── index.css        # Tailwind directives & Theme
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to `/backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/smart-agri
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```
4. Start Server:
   ```bash
   npm run dev
   ```
   (Or `node server.js` for production)

### Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Dev Server:
   ```bash
   npm run dev
   ```

## API Documentation

### Auth
- `POST /api/auth/register`: { username, password, role }
- `POST /api/auth/login`: { username, password }

### Sensors
- `GET /api/sensors/current`: Get latest sensor reading.
- `GET /api/sensors/history?range=1h`: Get historical data.
- `GET /api/sensors/predict`: Get temperature forecast.
- `GET /api/sensors/irrigation?crop=Tomato`: Get irrigation recommendation.
- `POST /api/sensors/crop`: { crop: 'Wheat' } - Update simulation target.

## Deployment Guide
1. **Frontend**: Build using `npm run build`. Serve the `/dist` folder using Nginx or S3.
2. **Backend**: Use PM2 to run `server.js`. Ensure MongoDB is accessible.
3. **Environment**: Set production ENV variables (Database URL, Secure Cookies, etc).

## Default Login
- **Admin**: `admin` / `1234`
