import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// The inline script in public/index.html sets data-theme before React loads,
// so the page never flashes the wrong colors. Read that value first.
function getInitialTheme() {
  const preset = document.documentElement.getAttribute('data-theme');
  if (preset === 'light' || preset === 'dark') return preset;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    /* storage unavailable: fall through to the system setting */
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* storage unavailable: the choice lasts for this visit only */
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
