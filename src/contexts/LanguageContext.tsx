import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation function that will load translations dynamically
const loadTranslations = async (lang: Language) => {
  try {
    const module = await import(`../translations/${lang}.ts`);
    return module.default;
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}, falling back to English`);
    const fallback = await import('../translations/en.ts');
    return fallback.default;
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language;
    return stored || 'en';
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const isRTL = language === 'ar';

  useEffect(() => {
    const loadLangTranslations = async () => {
      const trans = await loadTranslations(language);
      setTranslations(trans);
    };

    loadLangTranslations();
    localStorage.setItem('language', language);
    
    // Update document direction for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      isRTL 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
