'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { name: 'Jeju Best 10', href: '/jeju-best-10' },
  { name: '마케팅 전략', href: '/strategy' },
  { name: '성장 엔진', href: '/growth-engine' },
  { name: '성공 사례', href: '/success-cases' },
  { name: '성공 노하우', href: '/insights' },
  { name: '협업 문의', href: '/partnership' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md">
      <nav className="w-full mx-auto flex items-center justify-center px-6 py-4 lg:px-8 relative" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-center gap-10 lg:gap-12 w-full max-w-7xl">
          <Link href="/" className="text-xl font-medium tracking-wide text-white text-center" prefetch={false}>
            공양걸AI연구소
          </Link>
          <div className="hidden gap-8 lg:gap-10 md:flex items-center justify-center">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={false}
                  className={`text-base font-medium transition-colors text-center ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute right-6 lg:right-8 flex items-center justify-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="border-t border-white/5 md:hidden">
          <div className="space-y-1 px-6 py-4 flex flex-col items-center">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors text-center w-full ${
                    isActive
                      ? 'bg-slate-900 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-emerald-400'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
