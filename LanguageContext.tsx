import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONTENT, Language } from './constants';

// Map content to languages (currently reusing English for both until translations are available)
const CONTENT_MAP: Record<Language, typeof CONTENT> = {
  en: CONTENT,
  fa: CONTENT,
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof CONTENT;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Toggle font class on body based on language
    if (language === 'fa') {
      document.body.classList.add('font-persian');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-persian');
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: CONTENT_MAP[language],
    dir: language === 'fa' ? 'rtl' : 'ltr' as 'ltr' | 'rtl'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};