const ar = {
    dir: 'rtl',
    // ── عام ──
    appName: 'أجري سمارت',
    appTagline: 'منصة الزراعة الذكية',
    loading: 'جاري التحميل...',
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
    risk: 'مستوى الخطورة',
    logout: 'تسجيل خروج',
    toggleTheme: 'تغيير المظهر',

    // ── التنقل ──
    nav: {
        dashboard: 'الرئيسية',
        plantDiseases: 'أمراض النباتات',
        insights: 'التحليلات والمؤشرات',
        crops: 'المحاصيل',
    },

    // ── الأدوار ──
    roles: {
        engineer: 'مهندس زراعي',
        farmer: 'مزارع',
        admin: 'مسؤول النظام',
    },

    // ── تسجيل الدخول ──
    auth: {
        welcomeBack: 'مرحباً بك مجدداً',
        signInSubtitle: 'سجل دخولك إلى حسابك',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        enterUsername: 'أدخل اسم المستخدم',
        enterPassword: 'أدخل كلمة المرور',
        signIn: 'تسجيل الدخول',
        signingIn: 'جاري الدخول...',
        noAccount: 'ليس لديك حساب؟',
        registerHere: 'سجل هنا',
        quickLogin: 'دخول سريع (كلمة المرور: 1234)',
        loginFailed: 'فشل تسجيل الدخول',
        // التسجيل
        joinAgriSmart: 'انضم إلى أجري سمارت',
        createAccount: 'إنشاء حساب جديد',
        createAccountSubtitle: 'قم بإنشاء حسابك للبدء في استخدام المنصة',
        selectRole: 'اختر دورك',
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: أحمد محمود',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        loginHere: 'سجل دخولك هنا',
        demoAccounts: 'حسابات تجريبية (كلمة المرور: 1234)',
        selectRoleError: 'يرجى اختيار الدور أولاً',
        registrationFailed: 'فشل إنشاء الحساب',
        engineerRole: 'مهندس زراعي',
        engineerDesc: 'مراقبة، تحليل، وإرسال التوصيات',
        farmerRole: 'مزارع',
        farmerDesc: 'تلقي المهام، تنفيذها، وإرسال التقارير',
        backendErrors: {
            'Username and password are required': 'اسم المستخدم وكلمة المرور مطلوبان',
            'User already exists': 'اسم المستخدم مسجل مسبقاً',
            'All fields are required': 'جميع الحقول مطلوبة',
            'Invalid credentials': 'بيانات تسجيل الدخول غير صحيحة',
            'Network Error': 'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
        }
    },

    // ── المستشعرات ──
    sensors: {
        temperature: 'الحرارة',
        humidity: 'الرطوبة',
        ph: 'حموضة التربة',
        soilMoisture: 'رطوبة التربة',
        normal: 'طبيعي',
        warning: 'تحذير',
        critical: 'خطر',
    },

    // ── لوحة المهندس ──
    engineer: {
        title: '🔧 لوحة المهندس الزراعي',
        welcome: 'مرحباً',
        subtitle: 'المراقبة والإدارة الشاملة',
        totalTasks: 'إجمالي المهام',
        pending: 'قيد الانتظار',
        inProgress: 'جاري التنفيذ',
        completed: 'مكتملة',
        recommendation: 'توصيات مرسلة',
        assignTask: 'إسناد مهمة جديدة',
        assignedTasks: 'المهام المسندة',
        noTasks: 'لا توجد مهام حالياً. يمكنك إسناد مهمة للمزارع.',
        recsSent: 'التوصيات الحالية',
        noRecs: 'لا توجد توصيات مرسلة حتى الآن.',
        tasks: 'مهام',
        sent: 'مرسلة',
        sensorTrends: '📊 تحليلات واتجاهات المستشعرات',
        recentAlerts: 'أحدث التنبيهات',
        alerts: 'تنبيهات',
        noAlerts: 'لا توجد تنبيهات. جميع المؤشرات في وضعها الطبيعي.',
        // نافذة المهام
        assignNewTask: 'مهمة جديدة',
        taskTitle: 'عنوان المهمة',
        description: 'الوصف التفصيلي',
        type: 'نوع المهمة',
        priority: 'الأولوية',
        assignToFarmer: 'إسناد لمزارع',
        selectFarmer: 'اختر المزارع...',
        dueDate: 'تاريخ الانتهاء المحدد',
        createTask: 'إنشاء المهمة',
        // أنواع المهام
        irrigation: '💧 عمليات الري',
        fertilizer: '🧪 عمليات التسميد',
        inspection: '🔍 فحص حقلي',
        maintenance: '🔧 صيانة عامة',
        custom: '📋 أخرى',
        // الأولوية
        low: 'منخفضة',
        medium: 'متوسطة',
        high: 'عالية',
        urgent: 'عاجلة',
        // نافذة التوصيات
        newRecommendation: 'إضافة توصية جديدة',
        sendToFarmer: 'إرسال إلى مزارع',
        allFarmers: '📢 جميع المزارعين',
        basedOnDataFrom: 'بناءً على بيانات',
        generalSystemData: 'بيانات النظام العامة',
        category: 'التصنيف',
        pestControl: 'مكافحة الآفات',
        harvesting: 'الحصاد',
        soilManagement: 'إدارة وتجهيز التربة',
        general: 'عام',
        currentSensorReadings: '📊 قراءات المستشعرات الحالية المرفقة مع التوصية',
        sendRecommendation: '📨 إرسال التوصية',
        acknowledged: 'تم الإطلاع',
        // Labels for task display
        byLabel: 'بواسطة',
        toLabel: 'إلى',
        fromLabel: 'من',
        unassigned: 'غير مسند',
        dueLabel: 'ينتهي في',
        selectedFarmer: 'المزارع المحدد',
        recForCrop: 'توصية لمحصول',
        // Task status labels
        statusLabels: {
            pending: 'قيد الانتظار',
            in_progress: 'جاري التنفيذ',
            completed: 'مكتملة',
            cancelled: 'ملغاة',
        },
        // Priority labels
        priorityLabels: {
            low: 'منخفضة',
            medium: 'متوسطة',
            high: 'عالية',
            urgent: 'عاجلة',
        },
        // Category labels
        categoryLabels: {
            irrigation: 'ري',
            fertilizer: 'تسميد',
            pest_control: 'مكافحة آفات',
            harvesting: 'حصاد',
            soil: 'إدارة التربة',
            general: 'عام',
        },
        // Rec form
        recTitle: 'العنوان',
        recDetails: 'التفاصيل التوضيحية',
        recTitlePlaceholder: 'مثال: تعديل جدول الري مؤقتاً',
        recDetailsPlaceholder: 'وضح الخطوات المطلوبة والسبب بشكل مبسط...',
    },

    // ── لوحة المزارع ──
    farmer: {
        title: '🌱 لوحة المزارع',
        welcome: 'مرحباً',
        pendingTasks: 'مهام قيد الانتظار',
        completed: 'مهام مكتملة',
        recommendations: 'توصيات حديثة',
        myTasks: 'المهام المطلوبة',
        noTasksAssigned: 'لم يتم إسناد أي مهام جديدة لك بعد',
        start: 'البدء',
        complete: 'إكمال',
        done: 'مكتمل',
        engineerRecs: 'توجيهات المهندس',
        noRecsYet: 'لا توجد توجيهات جديدة بعد',
        acknowledge: 'تأكيد الإطلاع',
        noted: 'تم التأكيد',
        completeTask: 'إكمال المهمة',
        completionNote: 'ملاحظات التنفيذ (اختياري)',
        completionPlaceholder: 'مثال: تم إضافة السماد المحدد بالكميات المطلوبة',
        markComplete: 'تحديد كمكتملة ✓',
    },

    // ── الري ──
    irrigation: {
        title: 'الري الذكي',
        subtitle: 'توصيات ذكية مجدولة',
        min: 'دقيقة',
        efficiency: 'الكفاءة المتوقعة',
        evapRate: 'معدل التبخر',
        urgency: 'درجة الحاجة للري',
        startSimulation: 'تشغيل محاكاة الري',
        simulating: 'جاري المعالجة...',
        urgencyLevels: {
            Critical: 'حرجة',
            High: 'عالية',
            Moderate: 'متوسطة',
            Low: 'منخفضة',
            Info: 'معلومات الحقل',
            None: 'غير مطلوب استجابة',
        },
    },

    // ── الرسائل ──
    messages: {
        title: 'المراسلات',
        noContacts: 'لا توجد جهات اتصال',
        noMessages: 'لا توجد رسائل سابقة. يمكنك بدء المحادثة الآن!',
        typePlaceholder: 'اكتب رسالتك...',
        backToContacts: 'الرجوع للقائمة',
    },

    // ── التحليلات ──
    insights: {
        title: 'تحليلات الحقل المتقدمة',
        subtitle: 'مؤشرات الأداء خلال الـ 7 أيام الماضية لمحصول',
        export: 'استخراج تقرير',
        envStability: 'استقرار البيئة',
        stableConditions: 'الظروف البيئية مستقرة ومتوازنة',
        someFluctuations: 'توجد بعض التقلبات الطفيفة',
        highVariability: 'تغيرات وتقلبات ملحوظة في الظروف',
        dataPoints: 'نقطة قياس تم استخدامها',
        growthSuitability: 'مدى ملاءمة النمو',
        excellentConditions: 'الظروف الحالية ممتازة لنمو',
        moderateSuitability: 'الظروف الحالية مقبولة لنمو',
        poorConditions: 'الظروف الحالية غير ملائمة لنمو',
        basedOn7Day: 'يستند إلى متوسط الأيام السبعة الماضية',
        waterUsage: 'الاحتياج المائي المقدر',
        mmPerWeek: 'ملم في الأسبوع',
        estimatedBased: 'مقدر بناءً على درجة الحرارة والرطوبة واحتياجات',
        waterNeeds: 'المائية',
        seasonalNeed: 'الاحتياجات الموسمية',
        mmTotal: 'ملم إجمالاً',
        weeklyVariability: 'نظرة لمتوسطات الأسبوع',
        metric: 'المقياس',
        average: 'المتوسط',
        stdDev: 'معدل الانحراف',
        trend: 'مؤشر الاتجاه',
        vsLastWeek: 'مقارنةً بالأسبوع الماضي',
        ideal: 'النسبة المثلى',
    },

    // ── أمراض النباتات ──
    diseases: {
        title: 'دليل الآفات والأمراض',
        subtitle: 'تعرف على التحديات المحتملة وكيفية مواجهتها بشكل صحيح',
        searchPlaceholder: 'ابحث باستخدام اسم النبات أو المحصول...',
        selectPlant: 'اختر المحصول للبدء',
        noPlantsFound: 'لا توجد نتائج مطابقة',
        tryDifferent: 'جرب استخدام كلمات بحث مختلفة',
        diseasesCount: 'أمراض شائعة',
        allPlants: 'جميع النباتات',
        viewDetails: 'عرض التفاصيل',
        earlyDetection: 'أهمية الاكتشاف المبكر',
        earlyDetectionDesc: 'الاكتشاف المبكر للأمراض وتطبيق العلاج المناسب فوراً يزيد بشكل كبير من فرص الحفاظ على المحصول والحد من الخسائر.',
        symptoms: 'الأعراض الظاهرية',
        cause: 'المسببات',
        treatment: 'أساليب العلاج',
        prevention: 'إجراءات الوقاية',
        proTip: 'نصيحة إرشادية',
        proTipDesc: 'التقط صوراً واضحة للأجزاء المصابة واعرضها على المهندس المختص داخل المنصة قبل البدء بأي خطط علاجية كيميائية.',
        otherDiseases: 'آفات وأمراض شائعة لـ',
        diseases: ' ',
        diseaseNotFound: 'لم يتم العثور على المرض',
        diseaseNotFoundDesc: 'الآفة أو المرض الذي تبحث عنه غير متوفر في قواعد بيانات المنصة.',
        backToPlantDiseases: 'الرجوع لدليل الأمراض',
    },

    // ── أسماء النباتات ──
    plants: {
        Tomato: 'الطماطم',
        Potato: 'البطاطس',
        Wheat: 'القمح',
        Corn: 'الذرة',
        Rice: 'الأرز',
        Cucumber: 'الخيار',
        Pepper: 'الفلفل',
        Onion: 'البصل',
        Apple: 'التفاح',
    },

    // ── تنقل المحاصيل ──
    cropNav: {
        Wheat: 'القمح',
        Rice: 'الأرز',
        Tomato: 'الطماطم',
        Potato: 'البطاطس',
        Strawberry: 'الفراولة',
    },

    // ── التنبيهات ──
    alerts: {
        anomalyDetected: 'تنبيه طارئ!',
        criticalAlert: 'تحذير عالي الخطورة',
        warningAlert: 'تنبيه مراقبة',
        info: 'ملاحظة عامة',
        severityLevels: {
            Critical: 'خطير',
            Warning: 'تحذير',
            Info: 'معلومات',
        },
        anomalyTypes: {
            spike: 'ارتفاع حاد وغير معتاد',
            outlier: 'قراءة غير منطقية',
            malfunction: 'احتمالية تعطل المستشعر',
        },
    },

    // ── نافذة التنبيهات ──
    alertPopup: {
        criticalAlert: 'تحذير شديد الأهمية',
        warning: 'تنبيه',
        information: 'تنبيه معلناتي',
    },

    // ── لوحة المخاطر ──
    riskPanel: {
        riskAssessment: 'تقييم مؤشرات الخطر',
        diseaseRisk: 'احتمالية تفشي الأمراض',
        heatStress: 'مخاطر الإجهاد الحراري',
        waterStress: 'مخاطر الإجهاد المائي',
        riskLevels: {
            Critical: 'حرجة',
            High: 'عالية',
            Moderate: 'متوسطة',
            Low: 'منخفضة',
        },
    },

    // ── مقياس الصحة ──
    healthGauge: {
        cropHealthScore: 'مؤشر سلامة ونمو المحصول',
    },

    // ── مخطط التوقعات ──
    forecast: {
        aiPredictive: 'تنبؤات الذكاء الاصطناعي',
        loadingForecast: 'يتم جلب بيانات التنبؤات المستقبلية...',
        predictedTemp: 'توقعات درجات الحرارة (°م)',
        forecastTitle: 'المنحنى المتوقع للـ 30 دقيقة القادمة',
        forecastLabel: 'القيمة المتوقعة',
        confidence: 'نسبة الدقة',
    },

    // ── صفحة المحصول ──
    cropPage: {
        backToDashboard: 'العودة للرئيسية',
        cropNotFound: 'لم نتمكن من العثور على المحصول المختار',
        cropNotFoundDesc: 'لا يوجد بيانات مسجلة لهذا المحصول حتى الآن.',
        healthScore: 'مؤشر الحالة العامة',
        // التبويبات
        overview: 'نظرة عامة',
        growingConditions: 'المتطلبات البيئية',
        growthStages: 'دورة النمو',
        challenges: 'الآفات والتحديات',
        bestPractices: 'الإرشادات والممارسات',
        // نظرة عامة
        waterRequirement: 'الاحتياج الإجمالي للمياه',
        growingSeason: 'فترة زراعة المحصول',
        soilType: 'التربة المناسبة',
        currentVsIdeal: 'مقارنة الوضع الحالي مع',
        idealRanges: 'القيم النموذجية للمحصول',
        soilPhProfile: 'مستوى حموضة التربة',
        nutritionalContent: '📊 القيمة الغذائية',
        optimal: 'المستوى الأفضل',
        // الظروف
        airHumidity: 'الرطوبة النسبية للجو',
        minimum: 'الحد الأدنى',
        maximum: 'الحد الأقصى',
        // مقياس pH
        acid: 'درجة حمضية عالية',
        neutral: 'معتدل / متعادل',
        alkaline: 'درجة قلوية عالية',
        min: 'حد أدنى',
        max: 'حد أقصى',
        // حالات
        ideal: 'بيئة نموذجية',
        good: 'في النطاق المقبول',
        unknown: 'خارج التغطية الحساسة',
        // التحديات
        challengesDesc: 'المشكلات والمخاطر الشائعة المرتبطة بعناية',
        orderedBySeverity: '، مصنفة حسب درجة الخطورة لسهولة التعامل المسبق.',
        solution: 'الإجراء الموصى به',
        // أفضل الممارسات
        bestPracticesFor: 'إرشادات الإدارة المتكاملة الناجحة لمحصول',
        // مراحل النمو
        growthStagesOf: 'المراحل التطورية والفسيولوجية لنمو',
    },

    // ── لوحة المشرف ──
    adminPanel: {
        loadingStats: 'يتم استرداد بيانات المراقبة العامة...',
        systemAnalytics: 'إحصاءات قراءات الحقول العامة (آخر 24 ساعة)',
        avgTemperature: 'معدل درجات الحرارة',
        maxHumidity: 'الارتفاع الأقصى للرطوبة',
        minPhLevel: 'أقل قيم حموضة تم رصدها',
        dataManagement: 'إدارة السجلات وقاعدة البيانات',
        dataManagementDesc: 'يتيح لك هذا القسم سحب الملفات الخاصة بقراءات المستشعرات أو تفريغ قواعد البيانات من القراءات المتقادمة.',
        exportCSV: 'استخراج البيانات في ملف CSV',
        clearLogs: 'إزالة السجلات أقدم من شهر',
        exportPending: 'خاصية سحب الملفات قيد التطوير والصيانة الحالية',
    },

    // ── المخطط البياني ──
    liveChart: {
        forecast: 'مؤشرات مستقبلية متوقعة',
        confidence: 'دقة وتوافق التوقعات',
    },
};

export default ar;
