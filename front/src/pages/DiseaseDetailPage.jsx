import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Bug,
    AlertTriangle,
    FlaskConical,
    Pill,
    Shield,
    ChevronRight,
    Stethoscope,
    CheckCircle2,
    Info,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import plantDiseasesEn from '../data/plantDiseases';
import plantDiseasesAr from '../data/plantDiseases.ar';

const SECTION_STYLES = {
    symptoms: {
        icon: Stethoscope,
        title: 'Symptoms',
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/15',
        borderColor: 'border-red-200 dark:border-red-800/40',
        dotColor: 'bg-red-400',
    },
    cause: {
        icon: FlaskConical,
        title: 'Cause',
        iconColor: 'text-purple-500',
        bgColor: 'bg-purple-50 dark:bg-purple-900/15',
        borderColor: 'border-purple-200 dark:border-purple-800/40',
        dotColor: 'bg-purple-400',
    },
    treatment: {
        icon: Pill,
        title: 'Treatment Methods',
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/15',
        borderColor: 'border-blue-200 dark:border-blue-800/40',
        dotColor: 'bg-blue-400',
    },
    prevention: {
        icon: Shield,
        title: 'Prevention Tips',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-900/15',
        borderColor: 'border-green-200 dark:border-green-800/40',
        dotColor: 'bg-green-400',
    },
};

const DiseaseDetailPage = () => {
    const { plantName, diseaseId } = useParams();
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();
    const plantDiseases = isRTL ? plantDiseasesAr : plantDiseasesEn;

    const SECTION_TITLES = {
        symptoms: t.diseases.symptoms,
        cause: t.diseases.cause,
        treatment: t.diseases.treatment,
        prevention: t.diseases.prevention,
    };

    const plant = plantDiseases.find(
        (p) => p.name.toLowerCase() === plantName?.toLowerCase()
    );
    const disease = plant?.diseases.find((d) => d.id === diseaseId);

    if (!plant || !disease) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.diseases.diseaseNotFound}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                    {t.diseases.diseaseNotFoundDesc}
                </p>
                <button
                    onClick={() => navigate('/plant-diseases')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
                    id="back-to-diseases"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t.diseases.backToPlantDiseases}
                </button>
            </div>
        );
    }

    const otherDiseases = plant.diseases.filter((d) => d.id !== diseaseId);

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
                <button
                    onClick={() => navigate('/plant-diseases')}
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors font-medium"
                    id="breadcrumb-all-plants"
                >
                    {t.diseases.title}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                <button
                    onClick={() => navigate('/plant-diseases')}
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors font-medium"
                    id="breadcrumb-plant"
                >
                    {plant.emoji} {t.plants[plant.name] || plant.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                <span className="text-gray-800 dark:text-gray-200 font-semibold">
                    {disease.name}
                </span>
            </nav>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors font-medium group"
                id="back-button"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t.back}
            </button>

            {/* Disease Hero */}
            <div className="card overflow-hidden p-0 rounded-2xl">
                <div className="relative">
                    <img
                        src={disease.image}
                        alt={disease.name}
                        className="w-full h-64 sm:h-80 object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                        }}
                    />
                    <div
                        className="hidden w-full h-64 sm:h-80 bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center"
                    >
                        <div className="text-center text-white">
                            <Bug className="w-16 h-16 mx-auto mb-3 opacity-60" />
                            <span className="text-xl font-semibold opacity-80">{disease.name}</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                {plant.emoji} {t.plants[plant.name] || plant.name}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            {disease.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Quick Alert */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800/40 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                        {t.diseases.earlyDetection}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                        {t.diseases.earlyDetectionDesc}
                    </p>
                </div>
            </div>

            {/* Information Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Symptoms */}
                <InfoSection
                    section="symptoms"
                    items={disease.symptoms}
                />

                {/* Cause */}
                <div className={`rounded-2xl border ${SECTION_STYLES.cause.borderColor} ${SECTION_STYLES.cause.bgColor} p-5`}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm`}>
                            <FlaskConical className={`w-4 h-4 ${SECTION_STYLES.cause.iconColor}`} />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {SECTION_TITLES.cause}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {disease.cause}
                    </p>
                </div>

                {/* Treatment */}
                <InfoSection
                    section="treatment"
                    items={disease.treatment}
                />

                {/* Prevention */}
                <InfoSection
                    section="prevention"
                    items={disease.prevention}
                />
            </div>

            {/* Quick Tip */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-800/40 rounded-xl">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                        {t.diseases.proTip}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                        {t.diseases.proTipDesc}
                    </p>
                </div>
            </div>

            {/* Other Diseases */}
            {otherDiseases.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5 text-gray-400" />
                        Other {t.plants[plant.name] || plant.name} {t.diseases.diseasesCount}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {otherDiseases.map((d) => (
                            <button
                                key={d.id}
                                onClick={() =>
                                    navigate(
                                        `/plant-diseases/${plant.name.toLowerCase()}/${d.id}`
                                    )
                                }
                                className="card flex items-center gap-4 p-4 group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-left"
                                id={`related-${d.id}`}
                            >
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={d.image}
                                        alt={d.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 items-center justify-center">
                                        <Bug className="w-6 h-6 text-white/70" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm group-hover:text-primary transition-colors">
                                        {d.name}
                                    </h4>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                                        {d.symptoms[0]}
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable info section component
const InfoSection = ({ section, items }) => {
    const { t } = useLanguage();
    const style = SECTION_STYLES[section];
    const Icon = style.icon;

    const sectionTitles = {
        symptoms: t.diseases.symptoms,
        cause: t.diseases.cause,
        treatment: t.diseases.treatment,
        prevention: t.diseases.prevention,
    };

    return (
        <div className={`rounded-2xl border ${style.borderColor} ${style.bgColor} p-5`}>
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                    <Icon className={`w-4 h-4 ${style.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {sectionTitles[section] || style.title}
                </h3>
            </div>
            <ul className="space-y-2.5">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DiseaseDetailPage;
