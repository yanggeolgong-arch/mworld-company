'use client';

import { useEffect, useState } from 'react';
import { shuffledCopy } from '@/lib/fisher-yates';
import { RestaurantCard } from './RestaurantCard';
import type { RestaurantEntry } from '@/lib/jeju-best-10-data';

interface JejuBest10ListProps {
  entries: readonly RestaurantEntry[];
  locale?: 'en' | 'ko' | 'ja' | 'zh';
}

export function JejuBest10List({ entries, locale = 'en' }: JejuBest10ListProps) {
  const [shuffled, setShuffled] = useState<RestaurantEntry[]>([]);

  useEffect(() => {
    setShuffled(shuffledCopy(entries));
  }, [entries]);

  if (shuffled.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-white/10 bg-slate-900/50"
            style={{ minHeight: 420 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shuffled.map((entry) => (
        <RestaurantCard key={entry.id} entry={entry} locale={locale} />
      ))}
    </div>
  );
}
