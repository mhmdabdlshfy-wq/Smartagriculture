// Plant Diseases Database
// Contains disease information for 9 common crops

const plantDiseases = [
    {
        name: 'Tomato',
        emoji: '🍅',
        description: 'Common diseases affecting tomato plants',
        diseases: [
            {
                id: 'tomato-early-blight',
                name: 'Early Blight',
                image: '/disease-images/tomato_early_blight.png',
                symptoms: [
                    'Dark brown spots with concentric rings on lower leaves',
                    'Yellowing of leaves around the spots',
                    'Premature leaf drop starting from bottom of plant',
                    'Dark sunken spots on stems and fruit',
                ],
                cause:
                    'Caused by the fungus Alternaria solani. Spreads through wind, rain splash, and contaminated soil. Thrives in warm, humid conditions (24–29°C).',
                treatment: [
                    'Remove and destroy infected leaves immediately',
                    'Apply copper-based fungicide or chlorothalonil',
                    'Use neem oil spray as an organic alternative',
                    'Ensure good air circulation around plants',
                ],
                prevention: [
                    'Rotate crops every 2–3 years',
                    'Mulch around plants to prevent soil splash',
                    'Water at the base, avoid wetting leaves',
                    'Choose resistant varieties when available',
                    'Space plants properly for air circulation',
                ],
            },
            {
                id: 'tomato-late-blight',
                name: 'Late Blight',
                image: '/disease-images/tomato_late_blight.png',
                symptoms: [
                    'Water-soaked dark spots on leaves and stems',
                    'White fuzzy growth on leaf undersides in humid conditions',
                    'Rapid browning and wilting of entire plant',
                    'Firm, dark brown patches on fruit',
                ],
                cause:
                    'Caused by the oomycete Phytophthora infestans. Spreads rapidly in cool, wet weather (10–25°C). Can devastate entire fields within days.',
                treatment: [
                    'Remove and destroy all infected plant material',
                    'Apply systemic fungicides such as metalaxyl',
                    'Use copper-based sprays for organic control',
                    'In severe outbreaks, remove entire affected plants',
                ],
                prevention: [
                    'Plant resistant varieties',
                    'Avoid overhead irrigation',
                    'Ensure good drainage in the field',
                    'Destroy volunteer tomato and potato plants',
                    'Monitor weather forecasts for high-risk periods',
                ],
            },
            {
                id: 'tomato-leaf-curl',
                name: 'Yellow Leaf Curl Virus',
                image: '/disease-images/tomato_leaf_curl.png',
                symptoms: [
                    'Upward curling and cupping of leaves',
                    'Yellowing of leaf margins',
                    'Stunted plant growth',
                    'Reduced fruit production',
                    'Small, pale green leaves',
                ],
                cause:
                    'Caused by Tomato Yellow Leaf Curl Virus (TYLCV), transmitted by whiteflies (Bemisia tabaci). The virus cannot be cured once a plant is infected.',
                treatment: [
                    'Remove and destroy infected plants immediately',
                    'Control whitefly populations using yellow sticky traps',
                    'Apply insecticidal soap or neem oil for whitefly control',
                    'Use reflective mulch to repel whiteflies',
                ],
                prevention: [
                    'Use virus-resistant tomato varieties',
                    'Install fine mesh netting over plants',
                    'Control weeds that harbor whiteflies',
                    'Avoid planting near infected crops',
                    'Use transplants from certified disease-free nurseries',
                ],
            },
        ],
    },
    {
        name: 'Potato',
        emoji: '🥔',
        description: 'Common diseases affecting potato plants',
        diseases: [
            {
                id: 'potato-late-blight',
                name: 'Late Blight',
                image: '/disease-images/potato_late_blight.png',
                symptoms: [
                    'Dark, water-soaked spots on leaves',
                    'White mold on leaf undersides',
                    'Brown rot in tubers',
                    'Rapid wilting and death of foliage',
                ],
                cause:
                    'Caused by Phytophthora infestans. This is the same pathogen that caused the Irish Potato Famine. Thrives in cool, moist conditions.',
                treatment: [
                    'Apply fungicides containing mancozeb or chlorothalonil',
                    'Remove and destroy heavily infected plants',
                    'Harvest tubers as soon as possible if infection is detected',
                    'Do not wash tubers before storing',
                ],
                prevention: [
                    'Plant certified disease-free seed potatoes',
                    'Choose resistant varieties',
                    'Ensure proper drainage',
                    'Hill soil around plants to protect tubers',
                    'Destroy all cull piles and volunteer plants',
                ],
            },
            {
                id: 'potato-common-scab',
                name: 'Common Scab',
                image: '/disease-images/potato_scab.png',
                symptoms: [
                    'Rough, corky patches on tuber surface',
                    'Raised or pitted lesions on skin',
                    'Shallow to deep cracks on tubers',
                    'Affected tubers are edible but unattractive',
                ],
                cause:
                    'Caused by the bacterium Streptomyces scabies. Favored by dry, alkaline soil conditions (pH above 5.5). Spread through infected seed pieces and soil.',
                treatment: [
                    'No chemical treatment is effective after infection',
                    'Maintain soil moisture during tuber formation',
                    'Lower soil pH with sulfur if too alkaline',
                    'Apply acidifying fertilizers',
                ],
                prevention: [
                    'Plant scab-resistant varieties',
                    'Maintain soil pH between 5.0 and 5.2',
                    'Irrigate consistently during tuber development',
                    'Rotate crops with non-host plants for 3+ years',
                    'Use green manure crops like rye or oats',
                ],
            },
            {
                id: 'potato-blackleg',
                name: 'Blackleg',
                image: '/disease-images/potato_black_leg.png',
                symptoms: [
                    'Black, slimy decay at the base of stems',
                    'Yellowing and wilting of upper leaves',
                    'Stunted growth and plant collapse',
                    'Soft, foul-smelling rot in tubers',
                ],
                cause:
                    'Caused by bacteria Pectobacterium (formerly Erwinia). Enters through wounds or contaminated seed. Thrives in warm, wet conditions.',
                treatment: [
                    'Remove and destroy infected plants immediately',
                    'Do not compost infected material',
                    'Allow cut seed to heal before planting',
                    'Apply copper-based bactericides during planting',
                ],
                prevention: [
                    'Use certified disease-free seed potatoes',
                    'Cut seed in sanitary conditions and allow to dry',
                    'Avoid planting in waterlogged soil',
                    'Rotate crops every 3–4 years',
                    'Handle tubers carefully to avoid wounding',
                ],
            },
        ],
    },
    {
        name: 'Wheat',
        emoji: '🌾',
        description: 'Common diseases affecting wheat crops',
        diseases: [
            {
                id: 'wheat-rust',
                name: 'Wheat Rust',
                image: '/disease-images/wheat_rust.png',
                symptoms: [
                    'Orange-brown pustules on leaves and stems',
                    'Powdery spores that rub off on fingers',
                    'Yellowing and drying of infected leaves',
                    'Reduced grain filling and yield',
                ],
                cause:
                    'Caused by Puccinia fungi (stem rust, leaf rust, or stripe rust). Spread by wind-blown spores over long distances. Favored by warm, humid weather.',
                treatment: [
                    'Apply foliar fungicides (triazoles or strobilurins)',
                    'Spray at first sign of disease for best results',
                    'Tank-mix two modes of action to prevent resistance',
                    'Time applications based on disease forecasting',
                ],
                prevention: [
                    'Plant resistant wheat varieties',
                    'Eliminate volunteer wheat and alternate hosts',
                    'Plant early to avoid peak rust season',
                    'Monitor fields regularly for early detection',
                    'Diversify varieties across the farm',
                ],
            },
            {
                id: 'wheat-powdery-mildew',
                name: 'Powdery Mildew',
                image: '/disease-images/wheat_powdery_mildew.png',
                symptoms: [
                    'White to gray powdery patches on leaves',
                    'Patches enlarge and merge over time',
                    'Leaves may yellow and die prematurely',
                    'Reduced photosynthesis and grain quality',
                ],
                cause:
                    'Caused by the fungus Blumeria graminis f. sp. tritici. Favored by moderate temperatures (15–22°C), high humidity, and dense plant canopies.',
                treatment: [
                    'Apply fungicides such as triadimefon or propiconazole',
                    'Spray early when disease first appears',
                    'Use sulfur-based sprays for organic systems',
                    'Ensure coverage of lower leaf surfaces',
                ],
                prevention: [
                    'Plant resistant varieties',
                    'Avoid excessive nitrogen fertilization',
                    'Space plants properly for air flow',
                    'Remove crop residue after harvest',
                    'Rotate with non-cereal crops',
                ],
            },
            {
                id: 'wheat-fusarium-head-blight',
                name: 'Fusarium Head Blight',
                image: '/disease-images/wheat_fusarium.png',
                symptoms: [
                    'Bleached or white heads on wheat',
                    'Pink or orange spore masses on spikelets',
                    'Shriveled, lightweight kernels',
                    'Mycotoxin contamination of grain (DON/vomitoxin)',
                ],
                cause:
                    'Caused by Fusarium graminearum. Infection occurs during flowering in warm, wet conditions. Produces harmful mycotoxins.',
                treatment: [
                    'Apply fungicides (metconazole or prothioconazole) at flowering',
                    'Timing is critical: spray at early to mid-flowering',
                    'Harvest promptly and dry grain quickly',
                    'Test grain for mycotoxin levels before storage',
                ],
                prevention: [
                    'Plant moderately resistant varieties',
                    'Rotate with non-host crops (avoid corn before wheat)',
                    'Manage crop residue (tillage or decomposition)',
                    'Avoid late planting that shifts flowering into wet periods',
                    'Scout fields during flowering for early signs',
                ],
            },
        ],
    },
    {
        name: 'Corn',
        emoji: '🌽',
        description: 'Common diseases affecting corn (maize) plants',
        diseases: [
            {
                id: 'corn-northern-leaf-blight',
                name: 'Northern Leaf Blight',
                image: '/disease-images/corn_northern_blight.png',
                symptoms: [
                    'Long, elliptical gray-green lesions on leaves',
                    'Lesions are 2.5–15 cm long',
                    'Start on lower leaves and progress upward',
                    'Severe infection causes premature leaf death',
                ],
                cause:
                    'Caused by the fungus Exserohilum turcicum. Spreads by wind-blown spores. Favored by moderate temperatures (18–27°C) and prolonged leaf wetness.',
                treatment: [
                    'Apply foliar fungicides (strobilurins or triazoles)',
                    'Spray when disease reaches middle leaves',
                    'Ensure good canopy coverage during application',
                    'Combine fungicide with crop management practices',
                ],
                prevention: [
                    'Plant resistant hybrids',
                    'Rotate crops to reduce inoculum',
                    'Manage crop residue through tillage',
                    'Avoid continuous corn planting',
                    'Scout fields regularly after tasseling',
                ],
            },
            {
                id: 'corn-smut',
                name: 'Common Smut',
                image: '/disease-images/corn_smut.png',
                symptoms: [
                    'Large, gray-white galls on ears, tassels, and stalks',
                    'Galls turn black and rupture, releasing dark spores',
                    'Distorted plant growth at infection sites',
                    'Can affect any above-ground plant part',
                ],
                cause:
                    'Caused by the fungus Ustilago maydis. Enters through wounds (hail, insect damage, cultivation). Favored by dry conditions followed by rain.',
                treatment: [
                    'No effective chemical treatment once infected',
                    'Remove and destroy galls before they rupture',
                    'Do not compost infected plant material',
                    'Maintain balanced plant nutrition',
                ],
                prevention: [
                    'Plant smut-resistant hybrids',
                    'Minimize mechanical injury during cultivation',
                    'Control insects that wound plants',
                    'Rotate crops and remove debris',
                    'Avoid excessive nitrogen which promotes succulent growth',
                ],
            },
            {
                id: 'corn-gray-leaf-spot',
                name: 'Gray Leaf Spot',
                image: '/disease-images/corn_gray_leaf_spot.png',
                symptoms: [
                    'Rectangular gray to tan lesions between leaf veins',
                    'Lesions are narrow and distinct',
                    'Leaves may appear scorched in severe cases',
                    'Significant yield loss if infection occurs early',
                ],
                cause:
                    'Caused by the fungus Cercospora zeae-maydis. Thrives in warm, humid environments with extended dew periods. Survives in crop residue.',
                treatment: [
                    'Apply foliar fungicides at or just after tasseling',
                    'Use products containing strobilurin or triazole',
                    'Time applications based on disease severity',
                    'Consider economic threshold before treating',
                ],
                prevention: [
                    'Plant tolerant or resistant hybrids',
                    'Practice crop rotation',
                    'Manage residue through tillage',
                    'Improve field drainage',
                    'Avoid planting corn after corn',
                ],
            },
        ],
    },
    {
        name: 'Rice',
        emoji: '🍚',
        description: 'Common diseases affecting rice crops',
        diseases: [
            {
                id: 'rice-blast',
                name: 'Rice Blast',
                image: '/disease-images/rice_blast.png',
                symptoms: [
                    'Diamond-shaped lesions with gray centers and brown borders',
                    'Lesions on leaves, nodes, and panicles',
                    'Neck blast causes panicle to break',
                    'White, empty heads in severe cases',
                ],
                cause:
                    'Caused by the fungus Magnaporthe oryzae. Most destructive rice disease worldwide. Favored by high humidity, moderate temperatures (25–28°C), and heavy nitrogen use.',
                treatment: [
                    'Apply fungicides (tricyclazole, isoprothiolane, or azoxystrobin)',
                    'Spray at the booting stage preventively',
                    'Drain fields temporarily to reduce humidity',
                    'Reduce nitrogen application in affected areas',
                ],
                prevention: [
                    'Plant blast-resistant varieties',
                    'Use balanced fertilization (avoid excess nitrogen)',
                    'Maintain proper water management',
                    'Remove and burn infected crop residue',
                    'Plant at recommended spacing',
                ],
            },
            {
                id: 'rice-brown-spot',
                name: 'Brown Spot',
                image: '/disease-images/rice_brown_spot.png',
                symptoms: [
                    'Dark brown oval spots on leaves',
                    'Spots have yellow halos around them',
                    'Infected seeds show discoloration',
                    'Plants may appear stressed and nutrient-deficient',
                ],
                cause:
                    'Caused by the fungus Bipolaris oryzae. Associated with nutrient-deficient soils, especially low potassium and silicon. Spread through infected seeds.',
                treatment: [
                    'Apply fungicides (mancozeb or iprodione)',
                    'Treat seeds with fungicide before planting',
                    'Apply potassium fertilizer to strengthen plants',
                    'Foliar spray of silicon can help reduce severity',
                ],
                prevention: [
                    'Use certified disease-free seeds',
                    'Improve soil fertility with balanced fertilization',
                    'Maintain consistent water levels in paddies',
                    'Treat seeds with hot water or fungicide',
                    'Avoid stress conditions (drought, nutrient deficiency)',
                ],
            },
            {
                id: 'rice-sheath-blight',
                name: 'Sheath Blight',
                image: '/disease-images/rice_sheath_blight.png',
                symptoms: [
                    'Oval or irregular water-soaked lesions on leaf sheaths',
                    'Lesions have gray-white centers with brown borders',
                    'Disease progresses upward from water line',
                    'Lodging of plants in severe infections',
                ],
                cause:
                    'Caused by the fungus Rhizoctonia solani. Favored by high plant density, excessive nitrogen, and warm temperatures (28–32°C). Sclerotia persist in soil and water.',
                treatment: [
                    'Apply fungicides (validamycin, hexaconazole, or propiconazole)',
                    'Spray at early infection stages',
                    'Reduce water level to expose lower plant parts',
                    'Remove heavily infected tillers',
                ],
                prevention: [
                    'Avoid excessive nitrogen fertilization',
                    'Use recommended plant spacing',
                    'Plant moderately resistant varieties',
                    'Remove sclerotia from fields before planting',
                    'Drain and dry fields between cropping seasons',
                ],
            },
        ],
    },
    {
        name: 'Cucumber',
        emoji: '🥒',
        description: 'Common diseases affecting cucumber plants',
        diseases: [
            {
                id: 'cucumber-downy-mildew',
                name: 'Downy Mildew',
                image: '/disease-images/cucumber_downy_mildew.png',
                symptoms: [
                    'Yellow angular spots on upper leaf surface',
                    'Gray-purple fuzzy growth on leaf undersides',
                    'Spots turn brown as tissue dies',
                    'Rapid defoliation in severe cases',
                ],
                cause:
                    'Caused by the oomycete Pseudoperonospora cubensis. Spread by wind over long distances. Requires leaf wetness and cool nights (10–15°C) with warm days.',
                treatment: [
                    'Apply fungicides (mancozeb, chlorothalonil, or cymoxanil)',
                    'Spray preventively when conditions favor disease',
                    'Use systemic fungicides for established infections',
                    'Increase spray frequency during wet weather',
                ],
                prevention: [
                    'Plant downy mildew-resistant varieties',
                    'Avoid overhead irrigation',
                    'Improve air circulation with proper spacing',
                    'Use drip irrigation to keep leaves dry',
                    'Monitor disease forecasting systems',
                ],
            },
            {
                id: 'cucumber-powdery-mildew',
                name: 'Powdery Mildew',
                image: '/disease-images/cucumber_powdery_mildew.png',
                symptoms: [
                    'White powdery patches on leaf surfaces',
                    'Patches spread across entire leaf',
                    'Leaves become yellow and brittle',
                    'Reduced fruit quality and yield',
                ],
                cause:
                    'Caused by Podosphaera xanthii or Erysiphe cichoracearum. Unlike most fungi, does not need free water. Favored by warm days, cool nights, and shade.',
                treatment: [
                    'Apply sulfur-based or potassium bicarbonate sprays',
                    'Use systemic fungicides (myclobutanil, triadimefon)',
                    'Neem oil can provide some control',
                    'Remove and destroy heavily infected leaves',
                ],
                prevention: [
                    'Plant resistant varieties',
                    'Provide adequate sunlight and spacing',
                    'Avoid excessive nitrogen fertilization',
                    'Remove and destroy crop debris',
                    'Use silicon-based foliar sprays to strengthen leaves',
                ],
            },
            {
                id: 'cucumber-mosaic-virus',
                name: 'Cucumber Mosaic Virus',
                image: '/disease-images/cucumber_mosaic_virus.svg',
                symptoms: [
                    'Mottled green and yellow mosaic pattern on leaves',
                    'Leaf distortion and curling',
                    'Stunted plant growth',
                    'Warty, misshapen fruit with light and dark green spots',
                ],
                cause:
                    'Caused by Cucumber Mosaic Virus (CMV). Transmitted by aphids in a non-persistent manner. Has an extremely wide host range (over 1000 plant species).',
                treatment: [
                    'No cure exists for virus-infected plants',
                    'Remove and destroy infected plants promptly',
                    'Control aphid populations with insecticidal soap',
                    'Use reflective mulch to repel aphids',
                ],
                prevention: [
                    'Plant virus-resistant varieties',
                    'Control aphid populations early in the season',
                    'Remove weeds that serve as virus reservoirs',
                    'Use row covers to exclude aphids from young plants',
                    'Disinfect tools between plants',
                ],
            },
        ],
    },
    {
        name: 'Pepper',
        emoji: '🌶️',
        description: 'Common diseases affecting pepper plants',
        diseases: [
            {
                id: 'pepper-bacterial-spot',
                name: 'Bacterial Spot',
                image: '/disease-images/pepper_bacterial_spot.svg',
                symptoms: [
                    'Small, dark, water-soaked spots on leaves',
                    'Spots become raised and scabby on fruit',
                    'Yellowing and defoliation in severe cases',
                    'Fruit cracking and sunscald due to leaf loss',
                ],
                cause:
                    'Caused by Xanthomonas campestris pv. vesicatoria. Spread by rain splash, contaminated seeds, and tools. Favored by warm, wet conditions.',
                treatment: [
                    'Apply copper-based bactericides plus mancozeb',
                    'Spray preventively before rain events',
                    'Remove severely infected plants',
                    'Avoid working in wet fields to reduce spread',
                ],
                prevention: [
                    'Use certified disease-free seeds and transplants',
                    'Rotate crops every 2–3 years',
                    'Avoid overhead irrigation',
                    'Sanitize tools and equipment',
                    'Plant resistant varieties when available',
                ],
            },
            {
                id: 'pepper-anthracnose',
                name: 'Anthracnose',
                image: '/disease-images/pepper_anthracnose.svg',
                symptoms: [
                    'Sunken, circular, water-soaked spots on ripe fruit',
                    'Spots enlarge and turn dark with concentric rings',
                    'Salmon-colored spore masses in wet weather',
                    'Fruit rot and premature drop',
                ],
                cause:
                    'Caused by Colletotrichum species. Survives in infected crop residue and seeds. Spread by rain splash and favored by warm, humid conditions.',
                treatment: [
                    'Apply fungicides (mancozeb, azoxystrobin, or chlorothalonil)',
                    'Start spraying at fruit set and continue regularly',
                    'Harvest fruit promptly when ripe',
                    'Remove and destroy infected fruit',
                ],
                prevention: [
                    'Use treated, disease-free seeds',
                    'Rotate crops for at least 2 years',
                    'Avoid injury to fruit during handling',
                    'Improve air circulation in the canopy',
                    'Use drip irrigation instead of overhead watering',
                ],
            },
            {
                id: 'pepper-phytophthora-blight',
                name: 'Phytophthora Blight',
                image: '/disease-images/pepper_phytophthora.svg',
                symptoms: [
                    'Rapid wilting of entire plant',
                    'Dark, water-soaked lesions on stems near soil line',
                    'White mold on fruit surface',
                    'Root and crown rot with brown discoloration',
                ],
                cause:
                    'Caused by Phytophthora capsici. A devastating soil-borne pathogen. Thrives in warm, waterlogged conditions. Can survive in soil for years.',
                treatment: [
                    'Apply fungicides (mefenoxam or fosetyl-aluminum) as a drench',
                    'Remove and destroy infected plants',
                    'Improve drainage in affected areas',
                    'Apply biological control agents (Trichoderma)',
                ],
                prevention: [
                    'Plant in well-drained fields',
                    'Use raised beds to improve water drainage',
                    'Rotate with non-solanaceous crops for 3+ years',
                    'Avoid over-irrigation',
                    'Use resistant rootstocks or varieties',
                ],
            },
        ],
    },
    {
        name: 'Onion',
        emoji: '🧅',
        description: 'Common diseases affecting onion plants',
        diseases: [
            {
                id: 'onion-purple-blotch',
                name: 'Purple Blotch',
                image: '/disease-images/onion_purple_blotch.svg',
                symptoms: [
                    'Purple to dark brown lesions on leaves',
                    'Lesions are elongated with concentric rings',
                    'Yellowing and dieback of leaf tips',
                    'Bulb neck may rot in storage',
                ],
                cause:
                    'Caused by Alternaria porri. Spread by wind and rain splash. Favored by warm temperatures (25–30°C) and high humidity with alternating wet and dry periods.',
                treatment: [
                    'Apply fungicides (mancozeb, chlorothalonil, or iprodione)',
                    'Spray at 7–10 day intervals during wet weather',
                    'Remove and destroy infected leaves',
                    'Ensure proper curing of bulbs before storage',
                ],
                prevention: [
                    'Rotate crops every 3–4 years',
                    'Avoid overhead irrigation',
                    'Maintain proper plant spacing',
                    'Remove crop residue after harvest',
                    'Use disease-free seeds or transplants',
                ],
            },
            {
                id: 'onion-downy-mildew',
                name: 'Downy Mildew',
                image: '/disease-images/onion_downy_mildew.svg',
                symptoms: [
                    'Pale green to yellow patches on leaves',
                    'Gray-violet fuzzy growth on leaf surfaces',
                    'Leaves collapse and die from tips down',
                    'Bulbs become soft and fail to store well',
                ],
                cause:
                    'Caused by Peronospora destructor. Survives as oospores in soil and crop debris. Disease is worst in cool (10–20°C), moist conditions with heavy dews.',
                treatment: [
                    'Apply fungicides (metalaxyl, mancozeb, or fosetyl-aluminum)',
                    'Spray preventively when conditions favor disease',
                    'Remove infected plants from the field',
                    'Improve drainage to reduce humidity',
                ],
                prevention: [
                    'Plant resistant varieties',
                    'Avoid planting in low-lying, poorly drained areas',
                    'Use wide row spacing for air movement',
                    'Monitor weather for disease-conducive conditions',
                    'Destroy volunteer onion plants',
                ],
            },
            {
                id: 'onion-white-rot',
                name: 'White Rot',
                image: '/disease-images/onion_white_rot.svg',
                symptoms: [
                    'Yellowing and wilting of older leaves first',
                    'White fluffy fungal growth at bulb base',
                    'Small, black sclerotia (seed-like structures) on roots',
                    'Soft, watery rot of bulb',
                ],
                cause:
                    'Caused by Sclerotium cepivorum. One of the most serious onion diseases. Sclerotia can persist in soil for 20+ years waiting for an allium host.',
                treatment: [
                    'No effective chemical cure once established',
                    'Remove and destroy all infected plants and surrounding soil',
                    'Apply biological control agents in early stages',
                    'Solarize soil in warm climates to reduce sclerotia',
                ],
                prevention: [
                    'Use certified disease-free planting material',
                    'Avoid planting alliums in infested soil',
                    'Practice long crop rotations (10+ years with non-alliums)',
                    'Clean soil from boots and equipment between fields',
                    'Use raised beds and well-drained soil',
                ],
            },
        ],
    },
    {
        name: 'Apple',
        emoji: '🍎',
        description: 'Common diseases affecting apple trees',
        diseases: [
            {
                id: 'apple-scab',
                name: 'Apple Scab',
                image: '/disease-images/apple_scab.svg',
                symptoms: [
                    'Olive-green to dark brown velvety spots on leaves',
                    'Scabby, corky lesions on fruit surface',
                    'Cracking and distortion of fruit',
                    'Premature defoliation in severe cases',
                ],
                cause:
                    'Caused by the fungus Venturia inaequalis. Most common apple disease worldwide. Survives winter in fallen leaves. Spores released during spring rains.',
                treatment: [
                    'Apply fungicides (captan, myclobutanil, or mancozeb)',
                    'Begin spraying at green tip stage in spring',
                    'Continue applications through petal fall',
                    'Use lime sulfur in organic orchards',
                ],
                prevention: [
                    'Plant scab-resistant varieties (e.g., Liberty, Enterprise)',
                    'Rake and destroy fallen leaves in autumn',
                    'Apply urea to fallen leaves to speed decomposition',
                    'Prune trees for good air circulation',
                    'Avoid overhead sprinkler irrigation',
                ],
            },
            {
                id: 'apple-fire-blight',
                name: 'Fire Blight',
                image: '/disease-images/apple_fire_blight.svg',
                symptoms: [
                    'Wilting and blackening of blossoms and shoots',
                    'Characteristic "shepherd\'s crook" bending of shoot tips',
                    'Dark, sunken cankers on branches',
                    'Bacterial ooze (amber droplets) on infected tissue',
                ],
                cause:
                    'Caused by the bacterium Erwinia amylovora. Most destructive apple disease. Spread by rain, insects, and pruning tools. Thrives in warm (24–28°C), humid weather during bloom.',
                treatment: [
                    'Prune infected branches 30–45 cm below visible infection',
                    'Sterilize pruning tools between cuts (70% alcohol)',
                    'Apply streptomycin or copper during bloom',
                    'Avoid pruning during wet weather',
                ],
                prevention: [
                    'Plant resistant or tolerant varieties',
                    'Avoid excessive nitrogen fertilization',
                    'Control insect vectors (especially bees during bloom)',
                    'Prune for open canopy structure',
                    'Remove nearby wild apple and pear trees if infected',
                ],
            },
            {
                id: 'apple-powdery-mildew',
                name: 'Powdery Mildew',
                image: '/disease-images/apple_powdery_mildew.svg',
                symptoms: [
                    'White powdery coating on leaves and shoots',
                    'Leaves curl and become distorted',
                    'Silver-gray netting pattern (russeting) on fruit',
                    'Stunted shoot growth',
                ],
                cause:
                    'Caused by the fungus Podosphaera leucotricha. Overwinters in infected buds. Favored by warm, dry conditions during the day and cool nights.',
                treatment: [
                    'Apply fungicides (sulfur, myclobutanil, or trifloxystrobin)',
                    'Spray from tight cluster through first cover',
                    'Remove infected shoot tips during pruning',
                    'Use horticultural oils as an organic option',
                ],
                prevention: [
                    'Plant mildew-resistant varieties',
                    'Prune out infected shoots during dormant season',
                    'Maintain open tree canopy for good air flow',
                    'Avoid water stress which can increase susceptibility',
                    'Remove terminal leaves showing infection promptly',
                ],
            },
        ],
    },
];

export default plantDiseases;
