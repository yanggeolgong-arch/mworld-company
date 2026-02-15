'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function runWhenIdle(cb: () => void) {
  const g = typeof globalThis !== 'undefined' ? (globalThis as unknown as { scheduler?: { postTask: (cb: () => void, opts?: { priority?: string }) => Promise<unknown> } }) : null;
  if (g?.scheduler && typeof g.scheduler.postTask === 'function') {
    g.scheduler.postTask(cb, { priority: 'background' }).catch(() => {});
    return;
  }
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(cb, { timeout: 300 });
    return;
  }
  setTimeout(cb, 0);
}

const DefaultPlaceholderHeader = () => (
  <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md h-16 flex items-center justify-center">
    <span className="text-xl font-medium text-white">공양걸AI연구소</span>
  </header>
);

const DefaultPlaceholderFooter = () => (
  <footer className="w-full border-t border-white/5 bg-slate-950 min-h-[280px]" aria-hidden="true" />
);

type DeferredThemeWrapperProps = {
  header: ReactNode;
  footer: ReactNode;
  main: ReactNode;
  placeholderHeader?: ReactNode;
  placeholderFooter?: ReactNode;
};

export function DeferredThemeWrapper({
  header,
  footer,
  main,
  placeholderHeader,
  placeholderFooter,
}: DeferredThemeWrapperProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const step2 = () => {
      if (cancelled) return;
      runWhenIdle(() => {
        if (!cancelled) setReady(true);
      });
    };
    setTimeout(step2, 0);
    return () => { cancelled = true; };
  }, []);

  if (!ready) {
    return (
      <>
        {placeholderHeader ?? <DefaultPlaceholderHeader />}
        <main className="flex-1">{main}</main>
        {placeholderFooter ?? <DefaultPlaceholderFooter />}
      </>
    );
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        {header}
        <main className="flex-1">{main}</main>
        {footer}
      </div>
    </NextThemesProvider>
  );
}
