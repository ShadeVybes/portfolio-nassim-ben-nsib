import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Lock theme to dark mode for now
  const [theme, setTheme] = useState<Theme>('dark');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Force dark theme - no theme switching for now
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
    setActualTheme('dark');
    
    // Don't store theme changes - keep it locked to dark
    // localStorage.setItem('theme', 'dark');
  }, []);

  // Disable theme changing for now
  const handleSetTheme = (newTheme: Theme) => {
    // Do nothing - theme switching disabled
    console.log('Theme switching is currently disabled');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
