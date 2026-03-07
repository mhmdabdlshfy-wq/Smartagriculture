import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en';
import ar from '../i18n/ar';

const translations = { en, ar };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('agrismart-lang') || 'en';
    });

    const t = translations[lang] || translations.en;

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    const setLanguage = (newLang) => {
        if (translations[newLang]) setLang(newLang);
    };

    useEffect(() => {
        localStorage.setItem('agrismart-lang', lang);
        // Set document direction and language
        document.documentElement.dir = t.dir;
        document.documentElement.lang = lang;
        // Add/remove RTL class for Tailwind
        if (lang === 'ar') {
            document.documentElement.classList.add('rtl');
        } else {
            document.documentElement.classList.remove('rtl');
        }
    }, [lang, t.dir]);

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLanguage, setLanguage, isRTL: lang === 'ar' }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
};
