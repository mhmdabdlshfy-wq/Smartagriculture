const ar = {
    dir: 'rtl',
    // ── عام ──
    appName: 'أجري سمارت',
    appTagline: 'منصة الذكاء الزراعي',
    loading: 'جاري تحميل أجري سمارت...',
    cancel: 'إلغاء',
    close: 'إغلاق',
    back: 'رجوع',
    save: 'حفظ',
    send: 'إرسال',
    search: 'بحث',
    noData: 'لا توجد بيانات',
    all: 'الكل',
    from: 'من',
    to: 'إلى',
    basedOn: 'بناءً على',
    crop: 'المحصول',
    days: 'يوم',
    risk: 'خطورة',
    logout: 'تسجيل خروج',
    toggleTheme: 'تبديل المظهر',

    // ── التنقل ──
    nav: {
        dashboard: 'لوحة التحكم',
        plantDiseases: 'أمراض النباتات',
        insights: 'التحليلات',
        crops: 'المحاصيل',
    },

    // ── الأدوار ──
    roles: {
        engineer: 'مهندس',
        farmer: 'مزارع',
        admin: 'مشرف',
    },

    // ── تسجيل الدخول ──
    auth: {
        welcomeBack: 'مرحباً بعودتك',
        signInSubtitle: 'سجل دخولك إلى لوحة أجري سمارت',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        enterUsername: 'أدخل اسم المستخدم',
        enterPassword: 'أدخل كلمة المرور',
        signIn: 'تسجيل الدخول',
        signingIn: 'جاري تسجيل الدخول...',
        noAccount: 'ليس لديك حساب؟',
        registerHere: 'سجل هنا',
        quickLogin: 'دخول سريع (كلمة المرور: 1234)',
        loginFailed: 'فشل تسجيل الدخول',
        // التسجيل
        joinAgriSmart: 'انضم إلى أجري سمارت',
        createAccount: 'إنشاء حساب',
        createAccountSubtitle: 'أنشئ حسابك للبدء',
        selectRole: 'اختر دورك',
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: د. أحمد حسن',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        loginHere: 'سجل دخولك هنا',
        demoAccounts: 'حسابات تجريبية (كلمة المرور: 1234)',
        selectRoleError: 'يرجى اختيار دورك',
        registrationFailed: 'فشل التسجيل',
        engineerRole: 'مهندس زراعي',
        engineerDesc: 'مراقبة وتحليل وإنشاء توصيات',
        farmerRole: 'مزارع',
        farmerDesc: 'عرض المهام والتنفيذ وإرسال التقارير',
    },

    // ── أجهزة الاستشعار ──
    sensors: {
        temperature: 'درجة الحرارة',
        humidity: 'الرطوبة',
        ph: 'حموضة التربة',
        soilMoisture: 'رطوبة التربة',
        normal: 'طبيعي',
        warning: 'تحذير',
        critical: 'حرج',
    },

    // ── لوحة المهندس ──
    engineer: {
        title: '🔧 مركز التحكم الهندسي',
        welcome: 'مرحباً',
        subtitle: 'مراقبة وإدارة كاملة',
        totalTasks: 'إجمالي المهام',
        pending: 'قيد الانتظار',
        inProgress: 'قيد التنفيذ',
        completed: 'مكتملة',
        recommendation: 'توصية',
        assignTask: 'تعيين مهمة',
        assignedTasks: 'المهام المعينة',
        noTasks: 'لا توجد مهام بعد. قم بتعيين مهمة لمزارع!',
        recsSent: 'التوصيات المرسلة',
        noRecs: 'لا توجد توصيات بعد.',
        tasks: 'مهام',
        sent: 'مرسلة',
        sensorTrends: '📊 اتجاهات المستشعرات والتحليلات',
        recentAlerts: 'التنبيهات الأخيرة',
        alerts: 'تنبيهات',
        noAlerts: 'لا توجد تنبيهات حديثة. جميع الأنظمة تعمل بشكل طبيعي.',
        // نافذة المهام
        assignNewTask: 'تعيين مهمة جديدة',
        taskTitle: 'عنوان المهمة',
        description: 'الوصف',
        type: 'النوع',
        priority: 'الأولوية',
        assignToFarmer: 'تعيين إلى مزارع',
        selectFarmer: 'اختر مزارع...',
        dueDate: 'تاريخ الاستحقاق',
        createTask: 'إنشاء مهمة',
        // أنواع المهام
        irrigation: '💧 ري',
        fertilizer: '🧪 تسميد',
        inspection: '🔍 فحص',
        maintenance: '🔧 صيانة',
        custom: '📋 مخصص',
        // الأولوية
        low: 'منخفضة',
        medium: 'متوسطة',
        high: 'عالية',
        urgent: 'عاجلة',
        // نافذة التوصيات
        newRecommendation: 'توصية جديدة',
        sendToFarmer: 'إرسال إلى مزارع',
        allFarmers: '📢 جميع المزارعين',
        basedOnDataFrom: 'بناءً على بيانات',
        generalSystemData: 'بيانات عامة / النظام',
        category: 'الفئة',
        pestControl: 'مكافحة الآفات',
        harvesting: 'الحصاد',
        soilManagement: 'إدارة التربة',
        general: 'عام',
        currentSensorReadings: '📊 قراءات المستشعرات الحالية (سيتم إرفاقها)',
        sendRecommendation: '📨 إرسال التوصية',
        acknowledged: 'تم الاطلاع',
    },

    // ── لوحة المزارع ──
    farmer: {
        title: '🌱 لوحة المزارع',
        welcome: 'مرحباً',
        pendingTasks: 'مهام قيد الانتظار',
        completed: 'مكتملة',
        recommendations: 'توصيات',
        myTasks: 'مهامي',
        noTasksAssigned: 'لم يتم تعيين مهام بعد',
        start: 'ابدأ',
        complete: 'إكمال',
        done: 'تم',
        engineerRecs: 'توصيات المهندس',
        noRecsYet: 'لا توجد توصيات بعد',
        acknowledge: 'تم الاطلاع',
        noted: 'تم',
        completeTask: 'إكمال المهمة',
        completionNote: 'ملاحظات الإكمال (اختياري)',
        completionPlaceholder: 'مثال: تم ري جميع المناطق الثلاث لمدة 20 دقيقة لكل منها',
        markComplete: 'تحديد كمكتمل',
    },

    // ── الري ──
    irrigation: {
        title: 'الري الذكي',
        subtitle: 'محرك توصيات مدعوم بالذكاء الاصطناعي',
        min: 'دقيقة',
        efficiency: 'الكفاءة',
        evapRate: 'معدل التبخر',
        urgency: 'الأهمية',
        startSimulation: 'بدء محاكاة الري',
        simulating: 'جاري المحاكاة...',
        urgencyLevels: {
            Critical: 'حرج',
            High: 'عالية',
            Moderate: 'متوسطة',
            Low: 'منخفضة',
            Info: 'معلومة',
            None: 'لا يوجد',
        },
    },

    // ── الرسائل ──
    messages: {
        title: 'الرسائل',
        noContacts: 'لا توجد جهات اتصال',
        noMessages: 'لا توجد رسائل بعد. قل مرحباً! 👋',
        typePlaceholder: 'اكتب رسالة...',
        backToContacts: 'العودة لجهات الاتصال',
    },

    // ── التحليلات ──
    insights: {
        title: 'تحليلات متقدمة',
        subtitle: 'تحليلات ومقاييس أداء لمدة 7 أيام لـ',
        export: 'تصدير',
        envStability: 'الاستقرار البيئي',
        stableConditions: 'الظروف مستقرة ومتسقة',
        someFluctuations: 'تم اكتشاف بعض التقلبات',
        highVariability: 'تغيرات عالية في الظروف',
        dataPoints: 'نقطة بيانات تم تحليلها',
        growthSuitability: 'ملاءمة النمو',
        excellentConditions: 'ظروف ممتازة لـ',
        moderateSuitability: 'ملاءمة متوسطة لـ',
        poorConditions: 'ظروف سيئة لـ',
        basedOn7Day: 'بناءً على متوسط قراءات 7 أيام',
        waterUsage: 'تقدير استهلاك المياه',
        mmPerWeek: 'مم / أسبوع',
        estimatedBased: 'مقدر بناءً على الحرارة والرطوبة واحتياجات',
        waterNeeds: 'المائية',
        seasonalNeed: 'الاحتياج الموسمي',
        mmTotal: 'مم إجمالي',
        weeklyVariability: 'تحليل التغيرات الأسبوعية',
        metric: 'المقياس',
        average: 'المتوسط',
        stdDev: 'الانحراف المعياري',
        trend: 'الاتجاه',
        vsLastWeek: 'مقابل الأسبوع الماضي',
        ideal: 'المثالي',
    },

    // ── أمراض النباتات ──
    diseases: {
        title: 'أمراض النباتات',
        subtitle: 'تعرف على الأمراض وافهم الأعراض وتعلم طرق العلاج',
        searchPlaceholder: 'ابحث عن نبات...',
        selectPlant: 'اختر نباتاً',
        noPlantsFound: 'لم يتم العثور على نباتات',
        tryDifferent: 'جرب مصطلح بحث مختلف',
        diseasesCount: 'أمراض',
        allPlants: 'كل النباتات',
        viewDetails: 'عرض التفاصيل',
        earlyDetection: 'الاكتشاف المبكر أمر حاسم',
        earlyDetectionDesc: 'كلما حددت المرض وعالجته مبكراً، زادت فرصك في إنقاذ محصولك. تصرف بسرعة عند ملاحظة أي أعراض.',
        symptoms: 'الأعراض',
        cause: 'السبب',
        treatment: 'طرق العلاج',
        prevention: 'نصائح الوقاية',
        proTip: 'نصيحة للمزارعين',
        proTipDesc: 'التقط صورة واضحة للأجزاء المصابة من النبات واستشر مكتب الإرشاد الزراعي المحلي للحصول على تشخيص مهني قبل تطبيق العلاجات.',
        otherDiseases: 'أمراض',
        diseases: 'أخرى',
        diseaseNotFound: 'المرض غير موجود',
        diseaseNotFoundDesc: 'المرض الذي تبحث عنه غير موجود في قاعدة بياناتنا.',
        backToPlantDiseases: 'العودة لأمراض النباتات',
    },

    // ── أسماء النباتات ──
    plants: {
        Tomato: 'طماطم',
        Potato: 'بطاطس',
        Wheat: 'قمح',
        Corn: 'ذرة',
        Rice: 'أرز',
        Cucumber: 'خيار',
        Pepper: 'فلفل',
        Onion: 'بصل',
        Apple: 'تفاح',
    },

    // ── تنقل المحاصيل ──
    cropNav: {
        Wheat: 'قمح',
        Rice: 'أرز',
        Tomato: 'طماطم',
        Potato: 'بطاطس',
        Strawberry: 'فراولة',
    },

    // ── التنبيهات ──
    alerts: {
        anomalyDetected: 'تم اكتشاف خلل',
        criticalAlert: 'تنبيه حرج',
        warningAlert: 'تحذير',
        info: 'معلومة',
        severityLevels: {
            Critical: 'حرج',
            Warning: 'تحذير',
            Info: 'معلومة',
        },
        anomalyTypes: {
            spike: 'ارتفاع مفاجئ',
            outlier: 'قيمة شاذة',
            malfunction: 'عطل',
        },
    },

    // ── نافذة التنبيهات ──
    alertPopup: {
        criticalAlert: 'تنبيه حرج',
        warning: 'تحذير',
        information: 'معلومة',
    },

    // ── لوحة المخاطر ──
    riskPanel: {
        riskAssessment: 'تقييم المخاطر',
        diseaseRisk: 'خطر الأمراض',
        heatStress: 'إجهاد حراري',
        waterStress: 'إجهاد مائي',
    },

    // ── مقياس الصحة ──
    healthGauge: {
        cropHealthScore: 'مؤشر صحة المحصول',
    },

    // ── مخطط التوقعات ──
    forecast: {
        aiPredictive: 'التحليلات التنبؤية بالذكاء الاصطناعي',
        loadingForecast: 'جار تحميل التوقعات...',
        predictedTemp: 'درجة الحرارة المتوقعة (°م)',
        forecastTitle: 'توقعات درجة الحرارة لمدة 30 دقيقة',
        forecastLabel: 'التوقعات',
        confidence: 'ثقة',
    },

    // ── صفحة المحصول ──
    cropPage: {
        backToDashboard: 'العودة للوحة التحكم',
        cropNotFound: 'المحصول غير موجود',
        cropNotFoundDesc: 'غير موجود في قاعدة بياناتنا.',
        healthScore: 'مؤشر الصحة',
        // التبويبات
        overview: 'نظرة عامة',
        growingConditions: 'ظروف النمو',
        growthStages: 'مراحل النمو',
        challenges: 'التحديات',
        bestPractices: 'أفضل الممارسات',
        // نظرة عامة
        waterRequirement: 'احتياجات المياه',
        growingSeason: 'موسم النمو',
        soilType: 'نوع التربة',
        currentVsIdeal: 'القراءات الحالية مقابل',
        idealRanges: 'النطاقات المثالية',
        soilPhProfile: 'ملف حموضة التربة',
        nutritionalContent: '📊 المحتوى الغذائي',
        optimal: 'الأمثل',
        // الظروف
        airHumidity: 'رطوبة الهواء',
        minimum: 'الحد الأدنى',
        maximum: 'الحد الأقصى',
        // مقياس pH
        acid: 'حمضي',
        neutral: 'متعادل',
        alkaline: 'قلوي',
        min: 'أدنى',
        max: 'أقصى',
        // حالات
        ideal: 'مثالي',
        good: 'جيد',
        unknown: 'لا توجد بيانات',
        // التحديات
        challengesDesc: 'التحديات الشائعة عند زراعة',
        orderedBySeverity: '، مرتبة حسب الخطورة.',
        solution: 'الحل',
        // أفضل الممارسات
        bestPracticesFor: 'أفضل الممارسات لزراعة',
        // مراحل النمو
        growthStagesOf: 'مراحل نمو',
    },

    // ── لوحة المشرف ──
    adminPanel: {
        loadingStats: 'جاري تحميل الإحصائيات...',
        systemAnalytics: 'تحليلات النظام (آخر 24 ساعة)',
        avgTemperature: 'متوسط درجة الحرارة',
        maxHumidity: 'أقصى رطوبة',
        minPhLevel: 'أدنى مستوى حموضة',
        dataManagement: 'إدارة البيانات',
        dataManagementDesc: 'تصدير بيانات المستشعرات أو حذف السجلات القديمة.',
        exportCSV: 'تصدير CSV',
        clearLogs: 'حذف السجلات أكثر من 30 يوم',
    },

    // ── المخطط البياني ──
    liveChart: {
        forecast: 'التوقعات',
        confidence: 'ثقة',
    },
};

export default ar;
