import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSensor } from '../context/SensorContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Leaf, Sun, Moon, Sprout, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const { activeCrop, setActiveCrop, cropsConfig } = useSensor();
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/insights', label: 'Insights', icon: BarChart3 },
    ];

    // Add admin link if user is admin
    if (user?.role === 'admin') {
        navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
    }

    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

                {/* Logo + Navigation */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-sm">
                            <Leaf className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">AgriSmart</h1>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Intelligence Platform</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
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
                    </nav>
                </div>

                {/* Controls Section */}
                <div className="flex items-center gap-4">

                    {/* Crop Selector */}
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600">
                        <Sprout size={16} className="text-primary" />
                        <select
                            value={activeCrop}
                            onChange={(e) => setActiveCrop(e.target.value)}
                            className="bg-transparent border-none text-sm font-semibold text-gray-900 dark:text-white focus:ring-0 cursor-pointer pr-6"
                        >
                            {Object.entries(cropsConfig).map(([key, crop]) => (
                                <option key={key} value={key} className="dark:bg-gray-800">
                                    {crop.emoji || ''} {key}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200"
                        title="Toggle Theme"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* User Info + Logout */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</p>
                            <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
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
