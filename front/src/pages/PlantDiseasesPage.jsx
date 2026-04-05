import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bug, Search, Leaf, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import plantDiseasesEn from '../data/plantDiseases';
import plantDiseasesAr from '../data/plantDiseases.ar';

const PLANT_COLORS = {
    Tomato: { from: 'from-red-500', to: 'to-rose-600', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', ring: 'ring-red-200 dark:ring-red-800' },
    Potato: { from: 'from-amber-500', to: 'to-yellow-600', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', ring: 'ring-amber-200 dark:ring-amber-800' },
    Wheat: { from: 'from-yellow-500', to: 'to-amber-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', ring: 'ring-yellow-200 dark:ring-yellow-800' },
    Corn: { from: 'from-lime-500', to: 'to-green-600', bg: 'bg-lime-50 dark:bg-lime-900/20', text: 'text-lime-600 dark:text-lime-400', ring: 'ring-lime-200 dark:ring-lime-800' },
    Rice: { from: 'from-emerald-500', to: 'to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-800' },
    Cucumber: { from: 'from-green-500', to: 'to-emerald-600', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', ring: 'ring-green-200 dark:ring-green-800' },
    Pepper: { from: 'from-orange-500', to: 'to-red-600', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', ring: 'ring-orange-200 dark:ring-orange-800' },
    Onion: { from: 'from-purple-500', to: 'to-violet-600', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-200 dark:ring-purple-800' },
    Apple: { from: 'from-rose-500', to: 'to-pink-600', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', ring: 'ring-rose-200 dark:ring-rose-800' },
};

const PlantDiseasesPage = () => {
    const navigate = useNavigate();
    const { t, isRTL } = useLanguage();
    const plantDiseases = isRTL ? plantDiseasesAr : plantDiseasesEn;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlant, setSelectedPlant] = useState(null);

    const filteredPlants = plantDiseases.filter((plant) =>
        (t.plants[plant.name] || plant.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activePlant = selectedPlant
        ? plantDiseases.find((p) => p.name === selectedPlant)
        : null;

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* Page Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 text-white shadow-xl">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-8 text-8xl opacity-20">🦠</div>
                    <div className="absolute bottom-4 left-8 text-6xl opacity-15">🌿</div>
                    <div className="absolute top-1/2 right-1/3 text-5xl opacity-10">🔬</div>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <Bug className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{t.diseases.title}</h1>
                            <p className="text-green-100 text-sm mt-0.5">
                                {t.diseases.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Search bar */}
                    <div className="mt-5 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-200" />
                            <input
                                type="text"
                                placeholder={t.diseases.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm transition-all"
                                id="plant-disease-search"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Plant Grid */}
            {!selectedPlant && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-primary" />
                        {t.diseases.selectPlant}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredPlants.map((plant) => {
                            const colors = PLANT_COLORS[plant.name] || PLANT_COLORS.Tomato;
                            return (
                                <button
                                    key={plant.name}
                                    onClick={() => setSelectedPlant(plant.name)}
                                    className={`group relative overflow-hidden rounded-2xl ${colors.bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-600 p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 ${colors.ring}`}
                                    id={`plant-btn-${plant.name.toLowerCase()}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                                    <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {plant.emoji}
                                    </span>
                                    <h3 className={`font-semibold text-sm ${colors.text}`}>
                                        {t.plants[plant.name] || plant.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {plant.diseases.length} {t.diseases.diseasesCount}
                                    </p>
                                    <ArrowRight className={`w-4 h-4 mx-auto mt-2 ${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0`} />
                                </button>
                            );
                        })}
                    </div>

                    {filteredPlants.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                                {t.diseases.noPlantsFound}
                            </h3>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                {t.diseases.tryDifferent}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Disease Cards for Selected Plant */}
            {activePlant && (
                <div className="animate-fade-in">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-5">
                        <button
                            onClick={() => setSelectedPlant(null)}
                            className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors font-medium"
                            id="back-to-plants"
                        >
                            {t.diseases.allPlants}
                        </button>
                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {activePlant.emoji} {t.plants[activePlant.name] || activePlant.name}
                        </span>
                    </div>

                    {/* Plant header */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{activePlant.emoji}</span>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {t.plants[activePlant.name] || activePlant.name} {t.diseases.diseasesCount}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {activePlant.description}
                            </p>
                        </div>
                    </div>

                    {/* Disease cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activePlant.diseases.map((disease, index) => {
                            const colors = PLANT_COLORS[activePlant.name] || PLANT_COLORS.Tomato;
                            return (
                                <div
                                    key={disease.id}
                                    className="card group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 rounded-2xl"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Disease Image */}
                                    <div className="relative overflow-hidden h-48 -mx-6 -mt-6 mb-4">
                                        <img
                                            src={disease.image}
                                            alt={disease.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div
                                            className={`hidden w-full h-full bg-gradient-to-br ${colors.from} ${colors.to} items-center justify-center`}
                                        >
                                            <div className="text-center text-white">
                                                <Bug className="w-10 h-10 mx-auto mb-2 opacity-70" />
                                                <span className="text-sm font-medium opacity-80">
                                                    {disease.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Disease info */}
                                    <div className="px-1">
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2 group-hover:text-primary transition-colors">
                                            {disease.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                            {disease.symptoms[0]}
                                        </p>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/plant-diseases/${activePlant.name.toLowerCase()}/${disease.id}`
                                                )
                                            }
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                            id={`view-disease-${disease.id}`}
                                        >
                                            {t.diseases.viewDetails}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlantDiseasesPage;
