'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const cb = () => setMounted(true);
    const useRIC = typeof requestIdleCallback !== 'undefined';
    const id = useRIC ? requestIdleCallback(cb, { timeout: 200 }) : setTimeout(cb, 0);
    return () => (useRIC ? cancelIdleCallback(id as number) : clearTimeout(id as number));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative h-8 w-14 rounded-full bg-gray-200 transition-colors dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
