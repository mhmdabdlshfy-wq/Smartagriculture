import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Languages } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { t, lang, toggleLanguage } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || t.auth.loginFailed);
        } finally {
            setIsLoading(false);
        }
    };

    const quickLogin = (user) => {
        setUsername(user);
        setPassword('1234');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-4">
            <div className="card w-full max-w-md p-8 animate-fade-in relative">
                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-200 text-xs font-semibold border border-gray-200 dark:border-gray-600"
                >
                    <Languages size={15} />
                    {lang === 'en' ? 'عربي' : 'EN'}
                </button>

                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Leaf className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.auth.welcomeBack}</h2>
                    <p className="text-sm text-gray-500 mt-1">{t.auth.signInSubtitle}</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 text-sm border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth.username}</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t.auth.enterUsername}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.auth.password}</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.auth.enterPassword}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn btn-primary py-3 text-base disabled:opacity-60"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {t.auth.signingIn}
                            </span>
                        ) : t.auth.signIn}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {t.auth.noAccount} <Link to="/register" className="text-primary font-semibold hover:underline">{t.auth.registerHere}</Link>
                </p>

                {/* Quick Login */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 text-center mb-3">{t.auth.quickLogin}</p>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => quickLogin('engineer1')} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                            🔧 {t.roles.engineer}
                        </button>
                        <button onClick={() => quickLogin('farmer1')} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition">
                            🌱 {t.roles.farmer}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
