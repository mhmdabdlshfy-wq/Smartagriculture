// قاعدة بيانات أمراض النباتات - عربي فصحى مبسطة

const plantDiseasesAr = [
    {
        name: 'Tomato',
        emoji: '🍅',
        description: 'أشهر الأمراض التي تصيب الطماطم',
        diseases: [
            {
                id: 'tomato-early-blight',
                name: 'اللفحة المبكرة',
                image: '/disease-images/tomato_early_blight.png',
                symptoms: [
                    'بقع بنية داكنة على الأوراق السفلية',
                    'اصفرار حول البقع',
                    'سقوط الأوراق مبكرًا',
                    'بقع داكنة على الساق والثمار'
                ],
                cause:
                    'يسببه فطر ألترناريا، وينتشر عبر الهواء والمطر والتربة الملوثة، ويظهر في الجو الدافئ الرطب.',
                treatment: [
                    'إزالة الأجزاء المصابة فورًا',
                    'استخدام مبيد فطري مناسب',
                    'تحسين تهوية النبات',
                    'استخدام زيت النيم كخيار طبيعي'
                ],
                prevention: [
                    'تغيير المحصول كل عدة سنوات',
                    'الري دون تبليل الأوراق',
                    'ترك مسافات بين النباتات',
                    'زراعة أصناف مقاومة'
                ],
            },
            {
                id: 'tomato-late-blight',
                name: 'اللفحة المتأخرة',
                image: '/disease-images/tomato_late_blight.png',
                symptoms: [
                    'بقع داكنة رطبة على الأوراق',
                    'ظهور عفن أبيض أسفل الورقة',
                    'ذبول النبات سريعًا',
                    'بقع صلبة على الثمار'
                ],
                cause:
                    'يسببه كائن فيتوفثورا، وينتشر بسرعة في الجو البارد الرطب.',
                treatment: [
                    'إزالة النباتات المصابة',
                    'استخدام مبيد فطري جهازي',
                    'الرش الوقائي بمركبات نحاسية'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'تحسين الصرف',
                    'تجنب الري العلوي'
                ],
            },
            {
                id: 'tomato-leaf-curl',
                name: 'تجعد الأوراق',
                image: '/disease-images/tomato_leaf_curl.png',
                symptoms: [
                    'التفاف الأوراق للأعلى',
                    'اصفرار الحواف',
                    'ضعف نمو النبات',
                    'قلة الإنتاج'
                ],
                cause:
                    'يسببه فيروس ينتقل بواسطة الذبابة البيضاء.',
                treatment: [
                    'إزالة النباتات المصابة',
                    'مكافحة الحشرات الناقلة',
                    'استخدام مصائد لاصقة'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'تنظيف الحشائش',
                    'استخدام شتلات سليمة'
                ],
            },
        ],
    },

    {
        name: 'Potato',
        emoji: '🥔',
        description: 'أشهر الأمراض التي تصيب البطاطس',
        diseases: [
            {
                id: 'potato-late-blight',
                name: 'اللفحة المتأخرة',
                image: '/disease-images/potato_late_blight.png',
                symptoms: [
                    'بقع داكنة على الأوراق',
                    'تعفن الدرنات',
                    'ذبول النبات'
                ],
                cause:
                    'يسببه كائن فيتوفثورا ويظهر في الجو البارد الرطب.',
                treatment: [
                    'استخدام مبيد فطري',
                    'إزالة النباتات المصابة'
                ],
                prevention: [
                    'استخدام تقاوي سليمة',
                    'تحسين الصرف'
                ],
            },
            {
                id: 'potato-common-scab',
                name: 'جرب البطاطس',
                image: '/disease-images/potato_scab.png',
                symptoms: [
                    'بقع خشنة على القشرة',
                    'تشوه شكل البطاطس'
                ],
                cause:
                    'تسببه بكتيريا في التربة الجافة.',
                treatment: [
                    'الحفاظ على رطوبة التربة'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'تحسين التربة'
                ],
            },
        ],
    },

    {
        name: 'Wheat',
        emoji: '🌾',
        description: 'أشهر الأمراض التي تصيب القمح',
        diseases: [
            {
                id: 'wheat-rust',
                name: 'صدأ القمح',
                image: '/disease-images/wheat_rust.png',
                symptoms: [
                    'بقع برتقالية على الأوراق',
                    'ضعف الإنتاج'
                ],
                cause:
                    'يسببه فطر ينتشر عبر الهواء.',
                treatment: [
                    'استخدام مبيد فطري'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'المتابعة المستمرة'
                ],
            }
        ],
    },

    {
        name: 'Corn',
        emoji: '🌽',
        description: 'أشهر الأمراض التي تصيب الذرة',
        diseases: [
            {
                id: 'corn-northern-leaf-blight',
                name: 'لفحة أوراق الذرة',
                image: '/disease-images/corn_northern_blight.png',
                symptoms: [
                    'بقع طويلة على الأوراق',
                    'جفاف الأوراق'
                ],
                cause:
                    'يسببه فطر وينتشر في الجو المعتدل.',
                treatment: [
                    'رش مبيد فطري'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'تغيير المحصول'
                ],
            }
        ],
    },

    {
        name: 'Rice',
        emoji: '🍚',
        description: 'أشهر الأمراض التي تصيب الأرز',
        diseases: [
            {
                id: 'rice-blast',
                name: 'لفحة الأرز',
                image: '/disease-images/rice_blast.png',
                symptoms: [
                    'بقع على الأوراق',
                    'تلف السنابل'
                ],
                cause:
                    'يسببه فطر في ظروف رطبة.',
                treatment: [
                    'استخدام مبيد فطري'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'تنظيم الري'
                ],
            }
        ],
    },

    {
        name: 'Cucumber',
        emoji: '🥒',
        description: 'أشهر الأمراض التي تصيب الخيار',
        diseases: [
            {
                id: 'cucumber-powdery-mildew',
                name: 'البياض الدقيقي',
                image: '/disease-images/cucumber_powdery_mildew.png',
                symptoms: [
                    'طبقة بيضاء على الأوراق',
                    'ضعف النبات'
                ],
                cause:
                    'يسببه فطر في الجو الدافئ.',
                treatment: [
                    'رش الكبريت أو مبيد فطري'
                ],
                prevention: [
                    'تحسين التهوية',
                    'عدم زيادة السماد'
                ],
            }
        ],
    },

    {
        name: 'Pepper',
        emoji: '🌶️',
        description: 'أشهر الأمراض التي تصيب الفلفل',
        diseases: [
            {
                id: 'pepper-bacterial-spot',
                name: 'تبقع بكتيري',
                image: '/disease-images/pepper_bacterial_spot.svg',
                symptoms: [
                    'بقع داكنة على الأوراق',
                    'تشوه الثمار'
                ],
                cause:
                    'تسببه بكتيريا في الجو الرطب.',
                treatment: [
                    'استخدام مبيد نحاسي'
                ],
                prevention: [
                    'استخدام بذور سليمة',
                    'تطهير الأدوات'
                ],
            }
        ],
    },

    {
        name: 'Onion',
        emoji: '🧅',
        description: 'أشهر الأمراض التي تصيب البصل',
        diseases: [
            {
                id: 'onion-purple-blotch',
                name: 'البقعة البنفسجية',
                image: '/disease-images/onion_purple_blotch.svg',
                symptoms: [
                    'بقع بنفسجية على الأوراق',
                    'جفاف الأطراف'
                ],
                cause:
                    'يسببه فطر في الجو الرطب.',
                treatment: [
                    'استخدام مبيد فطري'
                ],
                prevention: [
                    'تحسين التهوية',
                    'إزالة المخلفات'
                ],
            }
        ],
    },

    {
        name: 'Apple',
        emoji: '🍎',
        description: 'أشهر الأمراض التي تصيب التفاح',
        diseases: [
            {
                id: 'apple-scab',
                name: 'جرب التفاح',
                image: '/disease-images/apple_scab.svg',
                symptoms: [
                    'بقع داكنة على الأوراق والثمار',
                    'تشوه الثمار'
                ],
                cause:
                    'يسببه فطر ينتشر في الربيع.',
                treatment: [
                    'رش مبيد فطري'
                ],
                prevention: [
                    'زراعة أصناف مقاومة',
                    'إزالة الأوراق المصابة'
                ],
            }
        ],
    },
];

export default plantDiseasesAr;