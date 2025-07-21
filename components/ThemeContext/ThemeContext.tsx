import React, { createContext, useContext, useEffect, useState } from 'react';
type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
  mode: ThemeMode;
  toggle: () => void;
} | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeContextProvider');
  return ctx;
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme-mode') : null;
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
} 