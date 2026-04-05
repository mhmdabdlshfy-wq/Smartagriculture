export const enCrops = {
    Wheat: {
        name: 'Wheat',
        emoji: '🌾',
        scientificName: 'Triticum aestivum',
        family: 'Poaceae (Grass family)',
        heroGradient: 'from-amber-500 via-yellow-500 to-orange-400',
        heroAccent: 'amber',
        description: 'Wheat is one of the most important cereal crops globally, serving as a staple food for over one-third of the world\'s population. It thrives in temperate climates and is a cornerstone of modern agriculture.',
        ph: { min: 6.0, max: 7.0, optimal: 6.5, tolerance: 'Moderate – can tolerate pH 5.5–7.5 with reduced yield' },
        temperature: { min: 15, max: 25, optimal: 20, unit: '°C', note: 'Vernalization (0–5°C for 4–8 weeks) required for winter wheat varieties' },
        humidity: { min: 40, max: 60, optimal: 50, unit: '%', note: 'Low humidity during grain fill reduces fungal disease risk' },
        soilMoisture: { min: 30, max: 50, optimal: 40, unit: '%', note: 'Critical moisture needed during tillering and grain fill stages' },
        waterNeed: '450–650 mm per growing season',
        growingSeason: '120–150 days (spring wheat), 240–300 days (winter wheat)',
        soilType: 'Well-drained loamy to clay loam soils',
        growthStages: [
            { name: 'Germination', days: '7–12', description: 'Seed absorbs water, radicle emerges', icon: '🌱' },
            { name: 'Tillering', days: '25–40', description: 'Multiple shoots develop from the base', icon: '🌿' },
            { name: 'Stem Extension', days: '30–45', description: 'Internodes elongate, plant gains height', icon: '📏' },
            { name: 'Flowering', days: '5–10', description: 'Anthesis occurs, pollination critical', icon: '🌸' },
            { name: 'Grain Fill', days: '30–40', description: 'Kernels develop and accumulate starch', icon: '🌾' },
            { name: 'Maturity', days: '10–15', description: 'Grain dries, ready for harvest at 13–14% moisture', icon: '✅' }
        ],
        challenges: [
            { title: 'Rust Diseases', severity: 'high', description: 'Stem rust, leaf rust, and stripe rust can devastate yields. Monitor for orange-brown pustules on leaves and stems.', solution: 'Plant resistant varieties, apply fungicides at first sign, rotate crops' },
            { title: 'Fusarium Head Blight', severity: 'high', description: 'Fungal infection during flowering that produces mycotoxins in grain, making it unsafe for consumption.', solution: 'Avoid planting after corn, use resistant cultivars, time fungicide application at flowering' },
            { title: 'Aphids & Cereal Leaf Beetle', severity: 'medium', description: 'Sap-sucking insects that weaken plants and can transmit barley yellow dwarf virus.', solution: 'Introduce natural predators (ladybugs), use seed treatments, scout fields regularly' },
            { title: 'Lodging', severity: 'medium', description: 'Plants falling over due to weak stems, wind, or heavy rain, making harvest difficult.', solution: 'Use short-stalk varieties, avoid excess nitrogen, apply plant growth regulators' },
            { title: 'Drought Stress', severity: 'high', description: 'Water deficit during critical growth stages (tillering, flowering) dramatically reduces grain yield.', solution: 'Supplemental irrigation during critical stages, use drought-tolerant varieties, mulching' }
        ],
        bestPractices: [
            'Conduct soil tests before planting – aim for pH 6.0–7.0 with adequate phosphorus and potassium',
            'Seed at 2.5–3.5 million seeds/hectare for optimal plant density',
            'Apply nitrogen fertilizer in split doses: at planting, tillering, and stem extension',
            'Scout for diseases weekly starting at jointing stage',
            'Monitor soil moisture closely during flowering – the most water-sensitive stage',
            'Harvest at grain moisture content of 13–14% for safe storage',
            'Rotate with legumes (soybeans, lentils) to break disease cycles and improve soil nitrogen'
        ],
        nutritionalFacts: { calories: '340 kcal/100g', protein: '13.2g', carbs: '71.2g', fiber: '10.7g' }
    },
    Rice: {
        name: 'Rice',
        emoji: '🍚',
        scientificName: 'Oryza sativa',
        family: 'Poaceae (Grass family)',
        heroGradient: 'from-emerald-500 via-teal-500 to-cyan-400',
        heroAccent: 'teal',
        description: 'Rice is the primary food source for more than half the world\'s population. It uniquely thrives in flooded paddy conditions, making it distinct among cereals. Rice cultivation supports millions of smallholder farmers worldwide.',
        ph: { min: 5.5, max: 7.0, optimal: 6.2, tolerance: 'Wide – grows in pH 4.5–8.0, but nutrient availability peaks at 5.5–6.5' },
        temperature: { min: 22, max: 32, optimal: 27, unit: '°C', note: 'Night temperatures below 20°C during flowering cause spikelet sterility' },
        humidity: { min: 70, max: 90, optimal: 80, unit: '%', note: 'High humidity is natural for paddy environments; excess can promote blast disease' },
        soilMoisture: { min: 70, max: 90, optimal: 80, unit: '%', note: 'Paddy rice requires standing water (5–10 cm) during most of vegetative growth' },
        waterNeed: '1,000–1,500 mm per growing season',
        growingSeason: '90–150 days depending on variety',
        soilType: 'Heavy clay soils with good water retention; paddy fields',
        growthStages: [
            { name: 'Seedling', days: '15–25', description: 'Transplanted into flooded paddies', icon: '🌱' },
            { name: 'Tillering', days: '25–50', description: 'Plant produces multiple stems', icon: '🌿' },
            { name: 'Booting', days: '30–35', description: 'Panicle develops inside the flag leaf', icon: '📦' },
            { name: 'Heading', days: '10–14', description: 'Panicle emerges, anthesis occurs', icon: '🌸' },
            { name: 'Grain Fill', days: '20–30', description: 'Grains fill with starch; water management critical', icon: '🍚' },
            { name: 'Ripening', days: '25–35', description: 'Grains mature and turn golden; drain field before harvest', icon: '✅' }
        ],
        challenges: [
            { title: 'Rice Blast', severity: 'high', description: 'Caused by Magnaporthe oryzae, causing diamond-shaped lesions on leaves, leading to severe yield loss.', solution: 'Use blast-resistant varieties, balanced nitrogen fertilization, fungicide application' },
            { title: 'Brown Plant Hopper', severity: 'high', description: 'Sap-feeding insect that causes "hopper burn".', solution: 'Avoid continuous flooding, plant BPH-resistant varieties, use light traps for monitoring' },
            { title: 'Sheath Blight', severity: 'medium', description: 'Fungal disease favored by high humidity and dense plant populations.', solution: 'Reduce seeding rate, improve air circulation, apply fungicides at early symptoms' },
            { title: 'Iron Toxicity', severity: 'medium', description: 'Common in acid sulfate soils, causes bronzing of leaves.', solution: 'Improve drainage, apply lime to raise pH, use tolerant varieties' },
            { title: 'Water Management', severity: 'high', description: 'Both excess and deficit water cause problems.', solution: 'Adopt alternate wetting and drying (AWD) to save water' }
        ],
        bestPractices: [
            'Prepare nursery beds 25–30 days before transplanting',
            'Maintain 5–10 cm standing water from transplanting through mid-tillering',
            'Apply nitrogen in 3 splits',
            'Use Alternate Wetting and Drying (AWD) to reduce water use',
            'Drain the field 10–14 days before harvest',
            'Harvest when 80–85% of grains are straw-colored',
            'Incorporate rice straw back into the field'
        ],
        nutritionalFacts: { calories: '130 kcal/100g (cooked)', protein: '2.7g', carbs: '28g', fiber: '0.4g' }
    },
    Tomato: {
        name: 'Tomato',
        emoji: '🍅',
        scientificName: 'Solanum lycopersicum',
        family: 'Solanaceae (Nightshade family)',
        heroGradient: 'from-red-500 via-rose-500 to-pink-400',
        heroAccent: 'red',
        description: 'Tomato is the world\'s most widely grown vegetable crop, prized for its versatility in fresh and processed forms. It\'s rich in lycopene, vitamins A and C, and is a high-value crop for both small and commercial farms.',
        ph: { min: 6.0, max: 6.8, optimal: 6.4, tolerance: 'Narrow – outside pH 5.5–7.0, nutrient lockout occurs' },
        temperature: { min: 20, max: 28, optimal: 24, unit: '°C', note: 'Night temps below 13°C or day temps above 35°C cause flower drop' },
        humidity: { min: 60, max: 80, optimal: 70, unit: '%', note: 'High humidity (>85%) promotes late blight and botrytis' },
        soilMoisture: { min: 50, max: 70, optimal: 60, unit: '%', note: 'Consistent moisture is key' },
        waterNeed: '400–600 mm per growing season',
        growingSeason: '60–90 days from transplanting to first harvest',
        soilType: 'Well-drained sandy loam to loam soils',
        growthStages: [
            { name: 'Seedling', days: '20–30', description: 'Start indoors or in nursery', icon: '🌱' },
            { name: 'Vegetative', days: '20–30', description: 'Rapid leaf and stem growth', icon: '🌿' },
            { name: 'Flowering', days: '15–20', description: 'Yellow flowers appear', icon: '🌸' },
            { name: 'Fruit Development', days: '20–30', description: 'Green fruits form and expand', icon: '🟢' },
            { name: 'Ripening', days: '15–20', description: 'Fruits change color', icon: '🍅' },
            { name: 'Harvest', days: 'Ongoing', description: 'Pick at desired ripeness', icon: '✅' }
        ],
        challenges: [
            { title: 'Late Blight', severity: 'high', description: 'Devastating disease causing dark, water-soaked lesions.', solution: 'Preventive fungicides, resistant varieties' },
            { title: 'Blossom-End Rot', severity: 'medium', description: 'Dark, sunken spots on fruit bottom caused by calcium deficiency.', solution: 'Maintain consistent soil moisture, apply calcium' },
            { title: 'Tomato Hornworm', severity: 'medium', description: 'Large green caterpillar that can defoliate plants rapidly.', solution: 'Hand-pick, apply Bt' },
            { title: 'Fusarium Wilt', severity: 'high', description: 'Soil-borne fungi that block vascular system.', solution: 'Plant resistant varieties, crop rotation' },
            { title: 'Whiteflies', severity: 'medium', description: 'Vector insects that transmit viral diseases.', solution: 'Use reflective mulch, insecticidal soap' }
        ],
        bestPractices: [
            'Transplant seedlings 45–60 cm apart',
            'Use drip irrigation to maintain consistent soil moisture',
            'Stake or cage plants',
            'Apply calcium-rich fertilizer at planting',
            'Prune suckers on indeterminate types',
            'Mulch with 5–8 cm of organic material',
            'Rotate tomatoes with non-solanaceous crops'
        ],
        nutritionalFacts: { calories: '18 kcal/100g', protein: '0.9g', carbs: '3.9g', fiber: '1.2g' }
    },
    Potato: {
        name: 'Potato',
        emoji: '🥔',
        scientificName: 'Solanum tuberosum',
        family: 'Solanaceae (Nightshade family)',
        heroGradient: 'from-yellow-600 via-amber-600 to-orange-500',
        heroAccent: 'yellow',
        description: 'Potato is the world\'s fourth-largest food crop and a vital source of carbohydrates, potassium, and vitamin C. It produces more food per hectare than any other major crop.',
        ph: { min: 4.8, max: 6.5, optimal: 5.5, tolerance: 'Wide – prefers acidic soils' },
        temperature: { min: 15, max: 22, optimal: 18, unit: '°C', note: 'Tuber initiation requires cool nights' },
        humidity: { min: 50, max: 70, optimal: 60, unit: '%', note: 'Moderate humidity is ideal' },
        soilMoisture: { min: 40, max: 60, optimal: 50, unit: '%', note: 'Even moisture critical during tuber bulking' },
        waterNeed: '400–550 mm per growing season',
        growingSeason: '70–120 days depending on variety',
        soilType: 'Deep, loose, well-drained sandy loam',
        growthStages: [
            { name: 'Sprouting', days: '15–25', description: 'Seed pieces sprout', icon: '🌱' },
            { name: 'Vegetative Growth', days: '20–30', description: 'Foliage develops', icon: '🌿' },
            { name: 'Tuber Initiation', days: '10–14', description: 'Stolon tips swell; tuber formation begins', icon: '🥔' },
            { name: 'Tuber Bulking', days: '45–60', description: 'Tubers expand rapidly', icon: '📈' },
            { name: 'Maturation', days: '15–20', description: 'Vine dies back', icon: '🟤' },
            { name: 'Harvest', days: '7–14', description: 'Dig after vine death', icon: '✅' }
        ],
        challenges: [
            { title: 'Late Blight', severity: 'high', description: 'The same disease that caused the Irish Potato Famine.', solution: 'Resistant varieties, preventive fungicides' },
            { title: 'Common Scab', severity: 'medium', description: 'Rough, corky lesions on tuber skin.', solution: 'Keep soil pH below 5.5, maintain moisture' },
            { title: 'Colorado Potato Beetle', severity: 'high', description: 'Voracious insect pest that defoliates plants.', solution: 'Rotate insecticide classes, hand-pick' },
            { title: 'Hollow Heart', severity: 'medium', description: 'Physiological disorder from irregular watering.', solution: 'Maintain even soil moisture' },
            { title: 'Blackleg', severity: 'medium', description: 'Bacterial disease causing stem blackening.', solution: 'Plant certified disease-free seed' }
        ],
        bestPractices: [
            'Use certified seed potatoes',
            'Plant 10–15 cm deep',
            'Hill soil around stems to prevent green tubers',
            'Irrigate consistently during tuber bulking',
            'Allow vines to die naturally before harvest',
            'Cure harvested tubers before storage'
        ],
        nutritionalFacts: { calories: '77 kcal/100g', protein: '2.0g', carbs: '17g', fiber: '2.2g' }
    },
    Strawberry: {
        name: 'Strawberry',
        emoji: '🍓',
        scientificName: 'Fragaria × ananassa',
        family: 'Rosaceae (Rose family)',
        heroGradient: 'from-pink-500 via-rose-500 to-red-400',
        heroAccent: 'pink',
        description: 'Strawberry is a high-value, labor-intensive fruit crop beloved worldwide. It\'s exceptionally rich in antioxidants, vitamin C, and manganese.',
        ph: { min: 5.5, max: 6.5, optimal: 6.0, tolerance: 'Narrow – alkaline soils (pH >7.0) cause iron chlorosis' },
        temperature: { min: 15, max: 26, optimal: 20, unit: '°C', note: 'Requires chilling hours for flowering' },
        humidity: { min: 60, max: 75, optimal: 68, unit: '%', note: 'Excess humidity promotes botrytis' },
        soilMoisture: { min: 50, max: 65, optimal: 58, unit: '%', note: 'Shallow root system requires frequent irrigation' },
        waterNeed: '400–600 mm per growing season',
        growingSeason: 'Perennial – produces for 2–3 years',
        soilType: 'Well-drained sandy loam rich in organic matter',
        growthStages: [
            { name: 'Planting', days: '14–21', description: 'Crown planted at soil level', icon: '🌱' },
            { name: 'Runner Growth', days: '30–60', description: 'Stolon runners spread', icon: '🌿' },
            { name: 'Flower Bud Init', days: '14–21', description: 'Short days trigger flower buds', icon: '❄️' },
            { name: 'Flowering', days: '14–21', description: 'White flowers open', icon: '🌸' },
            { name: 'Fruiting', days: '25–35', description: 'Berries develop and ripen', icon: '🍓' },
            { name: 'Dormancy', days: 'Winter', description: 'Plants rest', icon: '❄️' }
        ],
        challenges: [
            { title: 'Botrytis Gray Mold', severity: 'high', description: 'Most destructive strawberry disease.', solution: 'Improve air circulation, pick fruit promptly' },
            { title: 'Powdery Mildew', severity: 'medium', description: 'White powdery coating on leaves and fruit.', solution: 'Plant resistant cultivars, apply sulfur' },
            { title: 'Spider Mites', severity: 'medium', description: 'Tiny arachnids that cause stippling on leaves.', solution: 'Introduce predatory mites' },
            { title: 'Root Rot', severity: 'high', description: 'Waterlogging causes rapid root decay.', solution: 'Use raised beds, excellent drainage' },
            { title: 'Slugs and Birds', severity: 'low', description: 'Physical damage to ripe fruit.', solution: 'Use bird netting, slug bait' }
        ],
        bestPractices: [
            'Plant in raised beds with plastic or straw mulch',
            'Space plants 30–40 cm apart',
            'Install drip irrigation',
            'Remove runners on fruiting plants',
            'Renovate beds after harvest',
            'Apply straw mulch over crowns for winter',
            'Harvest every 1–2 days'
        ],
        nutritionalFacts: { calories: '32 kcal/100g', protein: '0.7g', carbs: '7.7g', fiber: '2.0g' }
    }
};
