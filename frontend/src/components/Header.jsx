import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Leaf } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Leaf className="text-primary w-8 h-8" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AgriSmart</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Welcome, <strong>{user?.username}</strong>
                    </span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
