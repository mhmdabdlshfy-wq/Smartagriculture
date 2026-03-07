const en = {
    dir: 'ltr',
    // ── Common ──
    appName: 'AgriSmart',
    appTagline: 'Intelligence Platform',
    loading: 'Loading AgriSmart...',
    cancel: 'Cancel',
    close: 'Close',
    back: 'Back',
    save: 'Save',
    send: 'Send',
    search: 'Search',
    noData: 'No data',
    all: 'All',
    from: 'From',
    to: 'To',
    basedOn: 'Based on',
    crop: 'Crop',
    days: 'days',
    risk: 'risk',
    logout: 'Logout',
    toggleTheme: 'Toggle Theme',

    // ── Navigation ──
    nav: {
        dashboard: 'Dashboard',
        plantDiseases: 'Plant Diseases',
        insights: 'Insights',
        crops: 'Crops',
    },

    // ── Roles ──
    roles: {
        engineer: 'Engineer',
        farmer: 'Farmer',
        admin: 'Admin',
    },

    // ── Auth ──
    auth: {
        welcomeBack: 'Welcome Back',
        signInSubtitle: 'Sign in to your AgriSmart dashboard',
        username: 'Username',
        password: 'Password',
        enterUsername: 'Enter username',
        enterPassword: 'Enter password',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        noAccount: "Don't have an account?",
        registerHere: 'Register here',
        quickLogin: 'Quick login (password: 1234)',
        loginFailed: 'Login failed',
        // Register
        joinAgriSmart: 'Join AgriSmart',
        createAccount: 'Create Account',
        createAccountSubtitle: 'Create your account to get started',
        selectRole: 'Select your role',
        fullName: 'Full Name',
        fullNamePlaceholder: 'e.g. Dr. Ahmed Hassan',
        alreadyHaveAccount: 'Already have an account?',
        loginHere: 'Login here',
        demoAccounts: 'Demo accounts (password: 1234)',
        selectRoleError: 'Please select your role',
        registrationFailed: 'Registration failed',
        engineerRole: 'Agricultural Engineer',
        engineerDesc: 'Monitor, analyze & create recommendations',
        farmerRole: 'Farmer',
        farmerDesc: 'View tasks, execute & send feedback',
        backendErrors: {
            'Username and password are required': 'Username and password are required',
            'User already exists': 'User already exists',
            'All fields are required': 'All fields are required',
            'Invalid credentials': 'Invalid credentials',
            'Network Error': 'Server is down or unreachable. Please check your connection.',
        }
    },

    // ── Sensors ──
    sensors: {
        temperature: 'Temperature',
        humidity: 'Humidity',
        ph: 'Soil pH',
        soilMoisture: 'Soil Moisture',
        normal: 'Normal',
        warning: 'Warning',
        critical: 'Critical',
    },

    // ── Engineer Dashboard ──
    engineer: {
        title: '🔧 Engineer Control Center',
        welcome: 'Welcome',
        subtitle: 'Full monitoring & management',
        totalTasks: 'Total Tasks',
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        recommendation: 'Recommendation',
        assignTask: 'Assign Task',
        assignedTasks: 'Assigned Tasks',
        noTasks: 'No tasks yet. Assign one to a farmer!',
        recsSent: 'Recommendations Sent',
        noRecs: 'No recommendations yet.',
        tasks: 'tasks',
        sent: 'sent',
        sensorTrends: '📊 Sensor Trends & Analytics',
        recentAlerts: 'Recent Alerts',
        alerts: 'alerts',
        noAlerts: 'No recent alerts. All systems nominal.',
        // Task modal
        assignNewTask: 'Assign New Task',
        taskTitle: 'Task Title',
        description: 'Description',
        type: 'Type',
        priority: 'Priority',
        assignToFarmer: 'Assign to Farmer',
        selectFarmer: 'Select farmer...',
        dueDate: 'Due Date',
        createTask: 'Create Task',
        // Task types
        irrigation: '💧 Irrigation',
        fertilizer: '🧪 Fertilizer',
        inspection: '🔍 Inspection',
        maintenance: '🔧 Maintenance',
        custom: '📋 Custom',
        // Priority
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent',
        // Recommendation modal
        newRecommendation: 'New Recommendation',
        sendToFarmer: 'Send To Farmer',
        allFarmers: '📢 All Farmers',
        basedOnDataFrom: 'Based on Data From',
        generalSystemData: 'General / System Data',
        category: 'Category',
        pestControl: 'Pest Control',
        harvesting: 'Harvesting',
        soilManagement: 'Soil Management',
        general: 'General',
        currentSensorReadings: '📊 Current Sensor Readings (will be attached)',
        sendRecommendation: '📨 Send Recommendation',
        acknowledged: 'acknowledged',
        // Labels for task display
        byLabel: 'By',
        toLabel: 'To',
        fromLabel: 'From',
        unassigned: 'Unassigned',
        dueLabel: 'Due',
        selectedFarmer: 'Selected Farmer',
        recForCrop: 'Recommendation for crop',
        // Task status labels
        statusLabels: {
            pending: 'Pending',
            in_progress: 'In Progress',
            completed: 'Completed',
            cancelled: 'Cancelled',
        },
        // Priority labels
        priorityLabels: {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent',
        },
        // Category labels
        categoryLabels: {
            irrigation: 'Irrigation',
            fertilizer: 'Fertilizer',
            pest_control: 'Pest Control',
            harvesting: 'Harvesting',
            soil: 'Soil Management',
            general: 'General',
        },
        // Rec form
        recTitle: 'Title',
        recDetails: 'Details',
        recTitlePlaceholder: 'e.g. Increase irrigation frequency',
        recDetailsPlaceholder: 'Explain what should be done and why...',
    },

    // ── Farmer Dashboard ──
    farmer: {
        title: '🌱 Farmer Dashboard',
        welcome: 'Welcome',
        pendingTasks: 'Pending Tasks',
        completed: 'Completed',
        recommendations: 'Recommendations',
        myTasks: 'My Tasks',
        noTasksAssigned: 'No tasks assigned yet',
        start: 'Start',
        complete: 'Complete',
        done: 'Done',
        engineerRecs: 'Engineer Recommendations',
        noRecsYet: 'No recommendations yet',
        acknowledge: 'Acknowledge',
        noted: 'Noted',
        completeTask: 'Complete Task',
        completionNote: 'Completion Note (optional)',
        completionPlaceholder: 'e.g. Irrigated all 3 zones for 20 minutes each',
        markComplete: 'Mark Complete',
    },

    // ── Irrigation ──
    irrigation: {
        title: 'Smart Irrigation',
        subtitle: 'AI-powered recommendation engine',
        min: 'min',
        efficiency: 'efficiency',
        evapRate: 'evap rate',
        urgency: 'Urgency',
        startSimulation: 'Start Irrigation Simulation',
        simulating: 'Simulating...',
        urgencyLevels: {
            Critical: 'Critical',
            High: 'High',
            Moderate: 'Moderate',
            Low: 'Low',
            Info: 'Info',
            None: 'None',
        },
    },

    // ── Messages ──
    messages: {
        title: 'Messages',
        noContacts: 'No contacts available',
        noMessages: 'No messages yet. Say hello! 👋',
        typePlaceholder: 'Type a message...',
        backToContacts: 'Back to contacts',
    },

    // ── Insights ──
    insights: {
        title: 'Advanced Insights',
        subtitle: '7-day analytics and performance metrics for',
        export: 'Export',
        envStability: 'Environmental Stability',
        stableConditions: 'Conditions are stable and consistent',
        someFluctuations: 'Some fluctuations detected',
        highVariability: 'High variability in conditions',
        dataPoints: 'data points analyzed',
        growthSuitability: 'Growth Suitability',
        excellentConditions: 'Excellent conditions for',
        moderateSuitability: 'Moderate suitability for',
        poorConditions: 'Poor conditions for',
        basedOn7Day: 'Based on 7-day average readings',
        waterUsage: 'Water Usage Estimate',
        mmPerWeek: 'mm / week',
        estimatedBased: 'Estimated based on temperature, humidity, and',
        waterNeeds: 'water needs',
        seasonalNeed: 'Seasonal need',
        mmTotal: 'mm total',
        weeklyVariability: 'Weekly Variability Analysis',
        metric: 'Metric',
        average: 'Average',
        stdDev: 'Std Dev',
        trend: 'Trend',
        vsLastWeek: 'vs Last Week',
        ideal: 'Ideal',
    },

    // ── Plant Diseases ──
    diseases: {
        title: 'Plant Diseases',
        subtitle: 'Identify diseases, understand symptoms, and learn treatment methods',
        searchPlaceholder: 'Search for a plant...',
        selectPlant: 'Select a Plant',
        noPlantsFound: 'No plants found',
        tryDifferent: 'Try a different search term',
        diseasesCount: 'diseases',
        allPlants: 'All Plants',
        viewDetails: 'View Details',
        earlyDetection: 'Early detection is critical',
        earlyDetectionDesc: 'The sooner you identify and treat this disease, the better your chances of saving your crop. Act quickly upon noticing any symptoms.',
        symptoms: 'Symptoms',
        cause: 'Cause',
        treatment: 'Treatment Methods',
        prevention: 'Prevention Tips',
        proTip: 'Pro Tip for Farmers',
        proTipDesc: 'Take a clear photo of the affected plant parts and consult your local agricultural extension office for a professional diagnosis before applying treatments.',
        otherDiseases: 'Other',
        diseases: 'Diseases',
        diseaseNotFound: 'Disease Not Found',
        diseaseNotFoundDesc: "The disease you're looking for doesn't exist in our database.",
        backToPlantDiseases: 'Back to Plant Diseases',
    },

    // ── Plant names ──
    plants: {
        Tomato: 'Tomato',
        Potato: 'Potato',
        Wheat: 'Wheat',
        Corn: 'Corn',
        Rice: 'Rice',
        Cucumber: 'Cucumber',
        Pepper: 'Pepper',
        Onion: 'Onion',
        Apple: 'Apple',
    },

    // ── Crop nav ──
    cropNav: {
        Wheat: 'Wheat',
        Rice: 'Rice',
        Tomato: 'Tomato',
        Potato: 'Potato',
        Strawberry: 'Strawberry',
    },

    // ── Alerts & Anomalies ──
    alerts: {
        anomalyDetected: 'Anomaly Detected',
        criticalAlert: 'CRITICAL ALERT',
        warningAlert: 'Warning',
        info: 'Information',
        severityLevels: {
            Critical: 'Critical',
            Warning: 'Warning',
            Info: 'Info',
        },
        anomalyTypes: {
            spike: 'SPIKE',
            outlier: 'OUTLIER',
            malfunction: 'MALFUNCTION',
        },
    },

    // ── AlertPopup ──
    alertPopup: {
        criticalAlert: 'Critical Alert',
        warning: 'Warning',
        information: 'Information',
    },

    // ── Risk Panel ──
    riskPanel: {
        riskAssessment: 'Risk Assessment',
        diseaseRisk: 'Disease Risk',
        heatStress: 'Heat Stress',
        waterStress: 'Water Stress',
        riskLevels: {
            Critical: 'Critical',
            High: 'High',
            Moderate: 'Moderate',
            Low: 'Low',
        },
    },

    // ── Health Gauge ──
    healthGauge: {
        cropHealthScore: 'Crop Health Score',
    },

    // ── Forecast Chart ──
    forecast: {
        aiPredictive: 'AI Predictive Analytics',
        loadingForecast: 'Loading Forecast...',
        predictedTemp: 'Predicted Temperature (°C)',
        forecastTitle: '30-Minute Temperature Forecast',
        forecastLabel: 'Forecast',
        confidence: 'conf.',
    },

    // ── Crop Page ──
    cropPage: {
        backToDashboard: 'Back to Dashboard',
        cropNotFound: 'Crop Not Found',
        cropNotFoundDesc: 'is not in our database.',
        healthScore: 'Health Score',
        // Tabs
        overview: 'Overview',
        growingConditions: 'Growing Conditions',
        growthStages: 'Growth Stages',
        challenges: 'Challenges',
        bestPractices: 'Best Practices',
        // Overview
        waterRequirement: 'Water Requirement',
        growingSeason: 'Growing Season',
        soilType: 'Soil Type',
        currentVsIdeal: 'Current Readings vs.',
        idealRanges: 'Ideal Ranges',
        soilPhProfile: 'Soil pH Profile',
        nutritionalContent: '📊 Nutritional Content',
        optimal: 'optimal',
        // Conditions
        airHumidity: 'Air Humidity',
        minimum: 'Minimum',
        maximum: 'Maximum',
        // pH scale
        acid: 'Acid',
        neutral: 'Neutral',
        alkaline: 'Alkaline',
        min: 'Min',
        max: 'Max',
        // labels for status
        ideal: 'Ideal',
        good: 'Good',
        unknown: 'No Data',
        // Challenges
        challengesDesc: 'Common challenges when growing',
        orderedBySeverity: ', ordered by severity.',
        solution: 'Solution',
        // Best Practices
        bestPracticesFor: 'Best Practices for',
        // Growth stages
        growthStagesOf: 'Growth Stages of',
    },

    // ── Admin Panel ──
    adminPanel: {
        loadingStats: 'Loading stats...',
        systemAnalytics: 'System Analytics (Last 24h)',
        avgTemperature: 'Avg Temperature',
        maxHumidity: 'Max Humidity',
        minPhLevel: 'Min pH Level',
        dataManagement: 'Data Management',
        dataManagementDesc: 'Export sensor data or clear old records.',
        exportCSV: 'Export CSV',
        clearLogs: 'Clear Logs > 30 Days',
        exportPending: 'Export feature pending implementation',
    },

    // ── LiveChart ──
    liveChart: {
        forecast: 'Forecast',
        confidence: 'conf.',
    },
};

export default en;
