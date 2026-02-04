'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function runWhenIdle(cb: () => void) {
  const g = typeof globalThis !== 'undefined' ? (globalThis as unknown as { scheduler?: { postTask: (cb: () => void, o?: { priority?: string }) => Promise<unknown> } }) : null;
  if (g?.scheduler && typeof g.scheduler.postTask === 'function') {
    g.scheduler.postTask(cb, { priority: 'background' }).catch(() => {});
    return;
  }
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(cb, { timeout: 250 });
    return;
  }
  setTimeout(cb, 0);
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    runWhenIdle(() => {
      if (!cancelled) setMounted(true);
    });
    return () => { cancelled = true; };
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
