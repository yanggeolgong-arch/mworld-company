'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const yieldThenMount = () => {
      if (cancelled) return;
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => { if (!cancelled) setMounted(true); }, { timeout: 250 });
      } else {
        setTimeout(() => { if (!cancelled) setMounted(true); }, 0);
      }
    };
    const id = setTimeout(yieldThenMount, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
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
