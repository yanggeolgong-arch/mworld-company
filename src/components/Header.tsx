'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { name: 'The Strategy', href: '/strategy' },
  { name: 'Growth Engine', href: '/growth-engine' },
  { name: 'Success Cases', href: '/success-cases' },
  { name: 'Insights', href: '/insights' },
  { name: 'Partnership', href: '/partnership' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-[#fafafa]/90 backdrop-blur-md dark:border-[#1a1a1a] dark:bg-black/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-light tracking-wide text-[#001f3f] dark:text-[#e8e8e8]">
            M-World Company
          </Link>
          <div className="hidden gap-6 md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-light transition-colors ${
                    isActive
                      ? 'text-[#001f3f] dark:text-[#e8e8e8]'
                      : 'text-[#36454f] hover:text-[#001f3f] dark:text-gray-400 dark:hover:text-[#e8e8e8]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6 text-[#001f3f] dark:text-[#e8e8e8]"
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
        <div className="border-t border-[#e5e7eb] dark:border-[#1a1a1a] md:hidden">
          <div className="space-y-1 px-6 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-light transition-colors ${
                    isActive
                      ? 'bg-white text-[#001f3f] dark:bg-[#0a0a0a] dark:text-[#e8e8e8]'
                      : 'text-[#36454f] hover:bg-white hover:text-[#001f3f] dark:text-gray-400 dark:hover:bg-[#0a0a0a] dark:hover:text-[#e8e8e8]'
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
