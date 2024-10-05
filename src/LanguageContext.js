// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import { useHref } from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const history = useHref();

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${language}/`, `/${newLanguage}/`);
        history.push(newPath);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
