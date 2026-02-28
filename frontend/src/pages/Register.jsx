import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, HardHat, Tractor } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) { setError('Please select your role'); return; }
        try {
            const user = await register(username, password, role, fullName);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const roles = [
        {
            value: 'engineer',
            label: 'Agricultural Engineer',
            desc: 'Monitor, analyze & create recommendations',
            icon: HardHat,
            color: 'from-blue-500 to-indigo-600',
            border: 'border-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            value: 'farmer',
            label: 'Farmer',
            desc: 'View tasks, execute & send feedback',
            icon: Tractor,
            color: 'from-green-500 to-emerald-600',
            border: 'border-green-400',
            bg: 'bg-green-50 dark:bg-green-900/20'
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-4">
            <div className="card w-full max-w-lg p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Leaf className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join AgriSmart</h2>
                    <p className="text-sm text-gray-500 mt-1">Create your account to get started</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 text-sm border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                {/* Role Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Select your role</label>
                    <div className="grid grid-cols-2 gap-3">
                        {roles.map(r => {
                            const Icon = r.icon;
                            const selected = role === r.value;
                            return (
                                <button
                                    key={r.value}
                                    type="button"
                                    onClick={() => setRole(r.value)}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${selected
                                        ? `${r.border} ${r.bg} shadow-md scale-[1.02]`
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                        }`}
                                >
                                    {selected && (
                                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                                    )}
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-2`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{r.label}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Dr. Ahmed Hassan"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn btn-primary py-3 text-base">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login here</Link>
                </p>

                {/* Demo Accounts */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 text-center mb-2">Demo accounts (password: 1234)</p>
                    <div className="flex justify-center gap-3 text-xs">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">🔧 engineer1</span>
                        <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">🌱 farmer1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
