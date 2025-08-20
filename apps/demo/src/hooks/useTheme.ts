import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

/**
 * Custom hook for managing theme state with system preference detection.
 *
 * Features:
 * - Supports 'light', 'dark', and 'system' themes
 * - Automatically detects and applies system theme preference
 * - Persists theme choice in localStorage
 * - Listens for system theme changes when 'system' is selected
 * - Provides toggle functionality that cycles through all themes
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get the theme from localStorage, default to 'system' for user preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    return storedTheme || 'system';
  });

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  const applyTheme = useCallback((themeToApply: 'light' | 'dark') => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add the new theme class
    root.classList.add(themeToApply);
  }, []);

  // Apply theme effect whenever theme or its dependencies change
  useEffect(() => {
    const actualTheme = theme === 'system' ? getSystemTheme() : theme;
    applyTheme(actualTheme);
  }, [theme, getSystemTheme, applyTheme]);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    /** Current theme setting ('light', 'dark', or 'system') */
    theme,
    /** Set theme to a specific value */
    setTheme: setThemeMode,
    /** The actual theme being applied (resolves 'system' to 'light' or 'dark') */
    actualTheme: theme === 'system' ? getSystemTheme() : theme,
    /** Whether the current theme is set to 'system' */
    isSystemTheme: theme === 'system',
  };
}
