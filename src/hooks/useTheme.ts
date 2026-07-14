import { useEffect } from 'react';

const STORAGE_KEY = 'pai-theme';

export function useTheme() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(STORAGE_KEY, 'dark');
  }, []);

  return { isDark: true, theme: 'dark' as const, toggle: () => {}, setTheme: () => {} };
}
