import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSensor } from '../context/SensorContext';
import api from '../services/api';
import {
    ArrowLeft, Thermometer, Droplets, FlaskConical, Sprout,
    Sun, CloudRain, Bug, Wheat, ChevronRight, TrendingUp,
    AlertTriangle, CheckCircle2, Info, Leaf, BarChart3
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// COMPREHENSIVE CROP DATABASE
// Professional agronomic data for farmers & engineers
// ═══════════════════════════════════════════════════════════
const CROP_DATABASE = {
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
        waterNeed: '1,000–1,500 mm per growing season (one of the most water-intensive crops)',
        growingSeason: '90–150 days depending on variety (short, medium, long duration)',
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
            { title: 'Brown Plant Hopper (BPH)', severity: 'high', description: 'Sap-feeding insect that causes "hopper burn" – complete drying of the plant. Can devastate entire fields.', solution: 'Avoid continuous flooding, plant BPH-resistant varieties, use light traps for monitoring' },
            { title: 'Sheath Blight', severity: 'medium', description: 'Fungal disease favored by high humidity and dense plant populations, causing irregular lesions on sheaths.', solution: 'Reduce seeding rate, improve air circulation, apply fungicides at early symptoms' },
            { title: 'Iron Toxicity', severity: 'medium', description: 'Common in acid sulfate soils, causes bronzing of leaves and reduced root growth.', solution: 'Improve drainage, apply lime to raise pH, use tolerant varieties' },
            { title: 'Water Management', severity: 'high', description: 'Both excess and deficit water cause problems. Poor drainage leads to methane emissions.', solution: 'Adopt alternate wetting and drying (AWD) to save 20–30% water and reduce methane' }
        ],
        bestPractices: [
            'Prepare nursery beds 25–30 days before transplanting for strong seedlings',
            'Maintain 5–10 cm standing water from transplanting through mid-tillering',
            'Apply nitrogen in 3 splits: basal, mid-tillering, and panicle initiation',
            'Use Alternate Wetting and Drying (AWD) to reduce water use by 20–30%',
            'Drain the field 10–14 days before harvest for easier combine operation',
            'Harvest when 80–85% of grains are straw-colored for optimal milling quality',
            'Incorporate rice straw back into the field rather than burning to improve soil organic matter'
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
        ph: { min: 6.0, max: 6.8, optimal: 6.4, tolerance: 'Narrow – outside pH 5.5–7.0, nutrient lockout occurs (especially calcium)' },
        temperature: { min: 20, max: 28, optimal: 24, unit: '°C', note: 'Night temps below 13°C or day temps above 35°C cause flower drop and fruit set failure' },
        humidity: { min: 60, max: 80, optimal: 70, unit: '%', note: 'High humidity (>85%) promotes late blight and botrytis; low humidity (<50%) causes blossom-end rot' },
        soilMoisture: { min: 50, max: 70, optimal: 60, unit: '%', note: 'Consistent moisture is key – irregular watering causes blossom-end rot and fruit cracking' },
        waterNeed: '400–600 mm per growing season with drip irrigation recommended',
        growingSeason: '60–90 days from transplanting to first harvest; continuous harvest for 2–3 months',
        soilType: 'Well-drained sandy loam to loam soils rich in organic matter',
        growthStages: [
            { name: 'Seedling', days: '20–30', description: 'Start indoors or in nursery; transplant at 4–6 leaf stage', icon: '🌱' },
            { name: 'Vegetative', days: '20–30', description: 'Rapid leaf and stem growth; staking/trellising needed', icon: '🌿' },
            { name: 'Flowering', days: '15–20', description: 'Yellow flowers appear; pollination mostly self-pollinating', icon: '🌸' },
            { name: 'Fruit Development', days: '20–30', description: 'Green fruits form and expand; calcium demand peaks', icon: '🟢' },
            { name: 'Ripening', days: '15–20', description: 'Fruits change color (breaker stage); ethylene-driven', icon: '🍅' },
            { name: 'Harvest', days: 'Ongoing', description: 'Pick at desired ripeness; harvest every 2–3 days', icon: '✅' }
        ],
        challenges: [
            { title: 'Late Blight (Phytophthora)', severity: 'high', description: 'Devastating disease causing dark, water-soaked lesions on leaves and fruits. Spreads rapidly in wet, cool conditions.', solution: 'Preventive fungicides (copper-based), resistant varieties, avoid overhead irrigation' },
            { title: 'Blossom-End Rot', severity: 'medium', description: 'Dark, sunken spots on fruit bottom caused by calcium deficiency, often triggered by inconsistent watering.', solution: 'Maintain consistent soil moisture, apply calcium foliar spray, mulch to retain moisture' },
            { title: 'Tomato Hornworm', severity: 'medium', description: 'Large green caterpillar that can defoliate plants rapidly. Hard to spot due to camouflage.', solution: 'Hand-pick, introduce parasitic wasps (Braconid), apply Bt (Bacillus thuringiensis)' },
            { title: 'Fusarium & Verticillium Wilt', severity: 'high', description: 'Soil-borne fungi that block vascular system, causing wilting and yellowing from the bottom up.', solution: 'Plant resistant varieties (labeled VF), practice 3-year crop rotation, solarize soil' },
            { title: 'Whiteflies & Aphids', severity: 'medium', description: 'Vector insects that transmit tomato yellow leaf curl virus (TYLCV) and other viral diseases.', solution: 'Use reflective mulch, introduce beneficial insects, apply neem oil or insecticidal soap' }
        ],
        bestPractices: [
            'Transplant seedlings 45–60 cm apart with 90–120 cm between rows for good air circulation',
            'Use drip irrigation to maintain consistent soil moisture and reduce foliar disease',
            'Stake or cage indeterminate varieties to improve air flow and fruit quality',
            'Apply calcium-rich fertilizer (gypsum) at planting to prevent blossom-end rot',
            'Prune suckers on indeterminate types for larger fruit and earlier ripening',
            'Mulch with 5–8 cm of organic material to regulate soil temperature and moisture',
            'Rotate tomatoes with non-solanaceous crops for at least 3 years to break disease cycles'
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
        description: 'Potato is the world\'s fourth-largest food crop and a vital source of carbohydrates, potassium, and vitamin C. It produces more food per hectare than any other major crop, making it essential for global food security.',
        ph: { min: 4.8, max: 6.5, optimal: 5.5, tolerance: 'Wide – prefers acidic soils; pH above 6.5 increases scab disease risk' },
        temperature: { min: 15, max: 22, optimal: 18, unit: '°C', note: 'Tuber initiation requires cool nights (10–15°C); growth stops above 30°C' },
        humidity: { min: 50, max: 70, optimal: 60, unit: '%', note: 'High humidity promotes late blight; moderate humidity is ideal for tuber growth' },
        soilMoisture: { min: 40, max: 60, optimal: 50, unit: '%', note: 'Even moisture critical during tuber bulking; drought causes hollow heart, excess causes rot' },
        waterNeed: '400–550 mm per growing season',
        growingSeason: '70–120 days depending on variety (early, mid, late)',
        soilType: 'Deep, loose, well-drained sandy loam; avoid compacted or heavy clay soils',
        growthStages: [
            { name: 'Sprouting', days: '15–25', description: 'Seed pieces sprout; plant emerges from soil', icon: '🌱' },
            { name: 'Vegetative Growth', days: '20–30', description: 'Foliage develops; begin hilling for tuber protection', icon: '🌿' },
            { name: 'Tuber Initiation', days: '10–14', description: 'Stolon tips swell; tuber formation begins underground', icon: '🥔' },
            { name: 'Tuber Bulking', days: '45–60', description: 'Tubers expand rapidly; highest water & nutrient demand', icon: '📈' },
            { name: 'Maturation', days: '15–20', description: 'Vine dies back; tuber skins set and harden', icon: '🟤' },
            { name: 'Harvest', days: '7–14', description: 'Dig after vine death; cure tubers for 1–2 weeks before storage', icon: '✅' }
        ],
        challenges: [
            { title: 'Late Blight', severity: 'high', description: 'The same disease that caused the Irish Potato Famine. Destroys foliage and tubers in wet, cool conditions.', solution: 'Resistant varieties, preventive fungicides, eliminate cull piles, improve air circulation' },
            { title: 'Common Scab', severity: 'medium', description: 'Rough, corky lesions on tuber skin caused by Streptomyces bacteria. Worse in alkaline soils (pH >6.5).', solution: 'Keep soil pH below 5.5, maintain consistent soil moisture during tuber initiation, use resistant varieties' },
            { title: 'Colorado Potato Beetle', severity: 'high', description: 'Voracious insect pest that defoliates plants rapidly. Develops resistance to many insecticides.', solution: 'Rotate insecticide classes, hand-pick, use Bt for larvae, crop rotation with non-solanaceous crops' },
            { title: 'Hollow Heart & Growth Cracks', severity: 'medium', description: 'Physiological disorder from irregular watering – rapid growth after stress creates internal cavities.', solution: 'Maintain even soil moisture, avoid excessive nitrogen, consistent irrigation schedule' },
            { title: 'Blackleg & Soft Rot', severity: 'medium', description: 'Bacterial diseases causing stem blackening and tuber decay, especially in wet, poorly drained soils.', solution: 'Plant certified disease-free seed, improve drainage, avoid damaging tubers at harvest' }
        ],
        bestPractices: [
            'Use certified seed potatoes to prevent introducing disease – never plant grocery store potatoes',
            'Cut seed pieces to 50–60g with at least 2 eyes; allow cut surfaces to heal 1–2 days before planting',
            'Plant 10–15 cm deep with 30 cm spacing; rows 75–90 cm apart',
            'Hill soil around stems 2–3 times during growth to prevent green tubers (solanine)',
            'Irrigate consistently during tuber bulking – this is the most critical water period',
            'Allow vines to die naturally or kill 2 weeks before harvest for skin set',
            'Cure harvested tubers at 10–15°C and 90–95% humidity for 2 weeks before long-term storage at 4–7°C'
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
        description: 'Strawberry is a high-value, labor-intensive fruit crop beloved worldwide. It\'s exceptionally rich in antioxidants, vitamin C, and manganese. Proper management of pH and moisture is critical as strawberries are highly sensitive to soil conditions.',
        ph: { min: 5.5, max: 6.5, optimal: 6.0, tolerance: 'Narrow – alkaline soils (pH >7.0) cause iron chlorosis; acidic soils (<5.0) cause aluminum toxicity' },
        temperature: { min: 15, max: 26, optimal: 20, unit: '°C', note: 'Requires chilling hours (200–400 hrs below 7°C) for flowering; heat above 30°C reduces fruit quality' },
        humidity: { min: 60, max: 75, optimal: 68, unit: '%', note: 'Excess humidity promotes botrytis (gray mold); too dry causes small, seedy fruits' },
        soilMoisture: { min: 50, max: 65, optimal: 58, unit: '%', note: 'Shallow root system (top 15 cm) requires frequent, light irrigation' },
        waterNeed: '400–600 mm per growing season; drip irrigation essential',
        growingSeason: 'Perennial – produces for 2–3 years; peak harvest in spring',
        soilType: 'Well-drained sandy loam rich in organic matter; raised beds recommended',
        growthStages: [
            { name: 'Planting', days: '14–21', description: 'Crown planted at soil level; roots establish', icon: '🌱' },
            { name: 'Runner Growth', days: '30–60', description: 'Stolon runners spread; remove for fruiting plants', icon: '🌿' },
            { name: 'Flower Bud Init', days: '14–21', description: 'Short days and cool temperatures trigger flower buds', icon: '❄️' },
            { name: 'Flowering', days: '14–21', description: 'White flowers open; pollination by bees is essential', icon: '🌸' },
            { name: 'Fruiting', days: '25–35', description: 'Berries develop and ripen; harvest at full color', icon: '🍓' },
            { name: 'Dormancy', days: 'Winter', description: 'Plants rest; mulch crowns for winter protection', icon: '❄️' }
        ],
        challenges: [
            { title: 'Botrytis Gray Mold', severity: 'high', description: 'Most destructive strawberry disease – fuzzy gray mold on ripe and ripening fruit, especially in humid conditions.', solution: 'Improve air circulation, pick fruit promptly, apply fungicides at bloom, use plastic mulch' },
            { title: 'Powdery Mildew', severity: 'medium', description: 'White powdery coating on leaves and fruit; reduces photosynthesis and fruit quality.', solution: 'Plant resistant cultivars, apply sulfur-based fungicides, maintain good air flow' },
            { title: 'Spider Mites', severity: 'medium', description: 'Tiny arachnids that cause stippling on leaves, reducing vigor. Worse in hot, dry conditions.', solution: 'Introduce predatory mites (Phytoseiulus persimilis), miticide application, overhead irrigation to increase humidity' },
            { title: 'Root Rot (Phytophthora)', severity: 'high', description: 'Waterlogging causes rapid root decay, leading to plant collapse. Irreversible once established.', solution: 'Use raised beds, ensure excellent drainage, plant disease-free stock, avoid overwatering' },
            { title: 'Slugs and Birds', severity: 'low', description: 'Physical damage to ripe fruit from slugs (ground level) and birds (pecking).', solution: 'Use bird netting, slug bait stations, straw mulch to keep fruit off soil' }
        ],
        bestPractices: [
            'Plant in raised beds with plastic or straw mulch to keep fruit clean and reduce disease',
            'Space plants 30–40 cm apart within rows, 60–90 cm between rows',
            'Install drip irrigation – strawberries need 2.5 cm of water per week, more during fruiting',
            'Remove runners on fruiting plants to direct energy into fruit production',
            'Renovate June-bearing beds after harvest: mow, thin, fertilize, and weed',
            'Apply straw mulch (8–10 cm) over crowns for winter protection in cold climates',
            'Harvest every 1–2 days during peak season; pick fully ripe fruit in the morning when cool'
        ],
        nutritionalFacts: { calories: '32 kcal/100g', protein: '0.7g', carbs: '7.7g', fiber: '2.0g' }
    }
};

// ═══════════════════════════════════════════════════════════
// CROP PAGE COMPONENT
// ═══════════════════════════════════════════════════════════
const CropPage = () => {
    const { cropName } = useParams();
    const navigate = useNavigate();
    const { sensorData, activeCrop } = useSensor();
    const [activeTab, setActiveTab] = useState('overview');
    const [currentHealth, setCurrentHealth] = useState(null);

    // Normalize crop name (URL might be lowercase)
    const normalizedCropName = Object.keys(CROP_DATABASE).find(
        key => key.toLowerCase() === cropName?.toLowerCase()
    );
    const crop = CROP_DATABASE[normalizedCropName];

    // Fetch health data for this crop
    useEffect(() => {
        if (normalizedCropName) {
            api.get(`/sensors/health?crop=${normalizedCropName}`)
                .then(res => setCurrentHealth(res.data))
                .catch(err => console.error(err));
        }
    }, [normalizedCropName, sensorData]);

    if (!crop) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
                <div className="text-6xl mb-4">🌱</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Crop Not Found</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">The crop "{cropName}" is not in our database.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Info },
        { id: 'conditions', label: 'Growing Conditions', icon: Thermometer },
        { id: 'stages', label: 'Growth Stages', icon: TrendingUp },
        { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
        { id: 'practices', label: 'Best Practices', icon: CheckCircle2 }
    ];

    // Compare current readings against ideal for this crop
    const getParamStatus = (current, min, max, optimal) => {
        if (current === undefined || current === null) return { status: 'unknown', label: 'No Data', color: 'gray' };
        if (current >= min && current <= max) {
            const dist = Math.abs(current - optimal);
            const range = (max - min) / 2;
            if (dist < range * 0.3) return { status: 'ideal', label: 'Ideal', color: 'green' };
            return { status: 'good', label: 'Good', color: 'blue' };
        }
        const distFromRange = current < min ? min - current : current - max;
        if (distFromRange < 5) return { status: 'warning', label: 'Warning', color: 'orange' };
        return { status: 'critical', label: 'Critical', color: 'red' };
    };

    const statusColors = {
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        gray: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
    };

    const severityColors = {
        low: 'border-l-gray-400 bg-gray-50 dark:bg-gray-700/30',
        medium: 'border-l-orange-400 bg-orange-50 dark:bg-orange-900/10',
        high: 'border-l-red-400 bg-red-50 dark:bg-red-900/10'
    };

    // Progress bar for pH range visualization
    const renderPhScale = () => {
        const phRange = 14;
        const minPos = (crop.ph.min / phRange) * 100;
        const maxPos = (crop.ph.max / phRange) * 100;
        const optPos = (crop.ph.optimal / phRange) * 100;
        const currentPos = sensorData ? (sensorData.ph / phRange) * 100 : null;

        return (
            <div className="relative mt-4">
                <div className="text-xs text-gray-400 flex justify-between mb-1">
                    <span>0 (Acid)</span>
                    <span>7 (Neutral)</span>
                    <span>14 (Alkaline)</span>
                </div>
                <div className="h-4 rounded-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 relative overflow-visible">
                    {/* Ideal range overlay */}
                    <div
                        className="absolute top-0 h-full bg-white/40 border-2 border-white dark:border-gray-300 rounded-full"
                        style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
                    />
                    {/* Optimal marker */}
                    <div
                        className="absolute top-[-6px] w-3 h-7 bg-white dark:bg-gray-200 border-2 border-gray-800 dark:border-white rounded-full shadow-lg"
                        style={{ left: `${optPos}%`, transform: 'translateX(-50%)' }}
                        title={`Optimal: ${crop.ph.optimal}`}
                    />
                    {/* Current reading marker */}
                    {currentPos !== null && (
                        <div
                            className="absolute top-[-8px] w-4 h-8 border-2 border-yellow-400 bg-yellow-300 rounded-full shadow-lg animate-pulse"
                            style={{ left: `${currentPos}%`, transform: 'translateX(-50%)' }}
                            title={`Current: ${sensorData.ph}`}
                        />
                    )}
                </div>
                <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-400">Min: {crop.ph.min}</span>
                    <span className="font-bold text-green-600 dark:text-green-400">Optimal: {crop.ph.optimal}</span>
                    <span className="text-gray-400">Max: {crop.ph.max}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* ═══════ HERO BANNER ═══════ */}
            <div className={`bg-gradient-to-r ${crop.heroGradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-20 -mr-20" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white/5 rounded-full -mb-48 -ml-48" />
                <div className="relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-5xl">{crop.emoji}</span>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold">{crop.name}</h1>
                                    <p className="text-white/70 italic text-sm">{crop.scientificName}</p>
                                </div>
                            </div>
                            <p className="text-white/80 text-sm mt-1">{crop.family}</p>
                            <p className="text-white/90 text-sm mt-3 max-w-2xl leading-relaxed">{crop.description}</p>
                        </div>
                        {currentHealth && (
                            <div className="hidden md:flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                                <p className="text-4xl font-extrabold">{currentHealth.overall}%</p>
                                <p className="text-xs text-white/75 mt-1">Health Score</p>
                                <p className="text-xs text-white/60 mt-0.5 capitalize">{currentHealth.category}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════ TAB NAVIGATION ═══════ */}
            <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm overflow-x-auto">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                                ${isActive
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ═══════ TAB CONTENT ═══════ */}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <CloudRain size={14} /> Water Requirement
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.waterNeed}</p>
                        </div>
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <Sun size={14} /> Growing Season
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.growingSeason}</p>
                        </div>
                        <div className="card !p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <Leaf size={14} /> Soil Type
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{crop.soilType}</p>
                        </div>
                    </div>

                    {/* Current vs Ideal Comparison */}
                    {sensorData && (
                        <div className="card">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <BarChart3 size={16} /> Current Readings vs. {crop.name} Ideal Ranges
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Temperature', icon: Thermometer, current: sensorData.temperature, ...crop.temperature, suffix: '°C', iconColor: 'text-red-500' },
                                    { label: 'Humidity', icon: Droplets, current: sensorData.humidity, ...crop.humidity, suffix: '%', iconColor: 'text-blue-500' },
                                    { label: 'Soil pH', icon: FlaskConical, current: sensorData.ph, ...crop.ph, suffix: '', iconColor: 'text-purple-500' },
                                    { label: 'Soil Moisture', icon: Sprout, current: sensorData.soilMoisture, ...crop.soilMoisture, suffix: '%', iconColor: 'text-green-500' }
                                ].map(param => {
                                    const ParamIcon = param.icon;
                                    const status = getParamStatus(param.current, param.min, param.max, param.optimal);
                                    return (
                                        <div key={param.label} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <ParamIcon size={18} className={param.iconColor} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-white">{param.label}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {param.min}–{param.max}{param.suffix} (optimal: {param.optimal}{param.suffix})
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-gray-800 dark:text-white tabular-nums">
                                                    {param.current}{param.suffix}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[status.color]}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* pH Detail Card */}
                    <div className="card">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                            <FlaskConical size={16} className="text-purple-500" /> Soil pH Profile
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">{crop.ph.tolerance}</p>
                        {renderPhScale()}
                    </div>

                    {/* Nutritional Info */}
                    <div className="card">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">📊 Nutritional Content</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(crop.nutritionalFacts).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 text-center">
                                    <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CONDITIONS TAB */}
            {activeTab === 'conditions' && (
                <div className="space-y-5">
                    {[
                        { label: 'Temperature', icon: Thermometer, data: crop.temperature, suffix: '°C', color: 'red', bgClass: 'from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10' },
                        { label: 'Air Humidity', icon: Droplets, data: crop.humidity, suffix: '%', color: 'blue', bgClass: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10' },
                        { label: 'Soil pH', icon: FlaskConical, data: crop.ph, suffix: '', color: 'purple', bgClass: 'from-purple-50 to-fuchsia-50 dark:from-purple-900/10 dark:to-fuchsia-900/10' },
                        { label: 'Soil Moisture', icon: Sprout, data: crop.soilMoisture, suffix: '%', color: 'green', bgClass: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10' }
                    ].map(condition => {
                        const Icon = condition.icon;
                        const { min, max, optimal, note, tolerance } = condition.data;
                        const range = max - min;
                        return (
                            <div key={condition.label} className={`card bg-gradient-to-r ${condition.bgClass}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl bg-${condition.color}-100 dark:bg-${condition.color}-900/30`}>
                                            <Icon size={20} className={`text-${condition.color}-500`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-white">{condition.label}</h3>
                                            {(note || tolerance) && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-xl">{note || tolerance}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-400">Minimum</p>
                                        <p className="text-2xl font-extrabold text-gray-800 dark:text-white tabular-nums">{min}<span className="text-sm text-gray-400">{condition.suffix}</span></p>
                                    </div>
                                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 text-center border-2 border-green-300 dark:border-green-600">
                                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Optimal</p>
                                        <p className="text-2xl font-extrabold text-green-700 dark:text-green-300 tabular-nums">{optimal}<span className="text-sm">{condition.suffix}</span></p>
                                    </div>
                                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-400">Maximum</p>
                                        <p className="text-2xl font-extrabold text-gray-800 dark:text-white tabular-nums">{max}<span className="text-sm text-gray-400">{condition.suffix}</span></p>
                                    </div>
                                </div>
                                {/* Visual range bar */}
                                <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                    <div
                                        className="absolute h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-60"
                                        style={{ left: '20%', width: '60%' }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* GROWTH STAGES TAB */}
            {activeTab === 'stages' && (
                <div className="card">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={16} /> Growth Stages of {crop.name}
                    </h3>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-6">
                            {crop.growthStages.map((stage, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center text-xl shadow-sm z-10 flex-shrink-0">
                                        {stage.icon}
                                    </div>
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold text-gray-800 dark:text-white">{stage.name}</h4>
                                            <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                                                {stage.days} days
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{stage.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CHALLENGES TAB */}
            {activeTab === 'challenges' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Common challenges when growing {crop.name}, ordered by severity.
                    </p>
                    {crop.challenges
                        .sort((a, b) => { const order = { high: 0, medium: 1, low: 2 }; return order[a.severity] - order[b.severity]; })
                        .map((challenge, idx) => (
                            <div key={idx} className={`border-l-4 rounded-xl p-5 ${severityColors[challenge.severity]}`}>
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        {challenge.severity === 'high' ? '🔴' : challenge.severity === 'medium' ? '🟠' : '🟡'}
                                        {challenge.title}
                                    </h4>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${challenge.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            : challenge.severity === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {challenge.severity} risk
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Solution
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{challenge.solution}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}

            {/* BEST PRACTICES TAB */}
            {activeTab === 'practices' && (
                <div className="card">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" /> Best Practices for {crop.name}
                    </h3>
                    <div className="space-y-3">
                        {crop.bestPractices.map((practice, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
                                <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{practice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropPage;
