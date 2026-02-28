import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSensor } from '../context/SensorContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LogOut, Leaf, Sun, Moon, Sprout, BarChart3, LayoutDashboard,
    HardHat, Tractor, ChevronDown
} from 'lucide-react';

const CROP_NAV = [
    { key: 'Wheat', emoji: '🌾', label: 'Wheat' },
    { key: 'Rice', emoji: '🍚', label: 'Rice' },
    { key: 'Tomato', emoji: '🍅', label: 'Tomato' },
    { key: 'Potato', emoji: '🥔', label: 'Potato' },
    { key: 'Strawberry', emoji: '🍓', label: 'Strawberry' },
];

const Header = () => {
    const { user, logout } = useAuth();
    const { activeCrop, setActiveCrop, cropsConfig } = useSensor();
    const [darkMode, setDarkMode] = useState(false);
    const [showCropMenu, setShowCropMenu] = useState(false);
    const cropMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Close crop menu on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (cropMenuRef.current && !cropMenuRef.current.contains(e.target)) {
                setShowCropMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Navigation items
    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    ];

    // Engineers get Insights page too
    if (user?.role === 'engineer') {
        navItems.push({ path: '/insights', label: 'Insights', icon: BarChart3 });
    }

    // Role badge
    const roleBadge = {
        engineer: { icon: HardHat, label: 'Engineer', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
        farmer: { icon: Tractor, label: 'Farmer', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' }
    };
    const badge = roleBadge[user?.role] || roleBadge.farmer;
    const RoleIcon = badge.icon;

    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

                {/* Logo + Navigation */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-sm">
                            <Leaf className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">AgriSmart</h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Intelligence Platform</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 ml-4">
                        {navItems.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <button
                                    key={path}
                                    onClick={() => navigate(path)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </button>
                            );
                        })}

                        {/* Crops Dropdown */}
                        <div className="relative" ref={cropMenuRef}>
                            <button
                                onClick={() => setShowCropMenu(!showCropMenu)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                    ${location.pathname.startsWith('/crop')
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Sprout className="w-4 h-4" />
                                Crops
                                <ChevronDown size={12} className={`transition-transform duration-200 ${showCropMenu ? 'rotate-180' : ''}`} />
                            </button>
                            {showCropMenu && (
                                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 animate-fade-in">
                                    {CROP_NAV.map(crop => (
                                        <button
                                            key={crop.key}
                                            onClick={() => { navigate(`/crop/${crop.key}`); setShowCropMenu(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                                                ${location.pathname === `/crop/${crop.key}` ? 'text-primary font-semibold bg-primary/5' : 'text-gray-700 dark:text-gray-300'}`}
                                        >
                                            <span className="text-base">{crop.emoji}</span>
                                            {crop.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">

                    {/* Crop Selector (engineer only) */}
                    {user?.role === 'engineer' && (
                        <div className="hidden sm:flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600">
                            <Sprout size={14} className="text-primary" />
                            <select
                                value={activeCrop}
                                onChange={(e) => setActiveCrop(e.target.value)}
                                className="bg-transparent border-none text-xs font-semibold text-gray-900 dark:text-white focus:ring-0 cursor-pointer pr-4"
                            >
                                {Object.entries(cropsConfig).map(([key, crop]) => (
                                    <option key={key} value={key} className="dark:bg-gray-800">
                                        {crop.emoji || ''} {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200"
                        title="Toggle Theme"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* User Info + Role Badge + Logout */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${badge.color}`}>
                                <RoleIcon size={14} />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                                    {user?.fullName || user?.username}
                                </p>
                                <p className="text-[10px] text-gray-400 capitalize">{badge.label}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 p-2 rounded-xl transition-colors"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
