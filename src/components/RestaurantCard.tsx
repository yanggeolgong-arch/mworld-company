'use client';

import Image from 'next/image';
import { DataInsightBox } from './DataInsightBox';
import type { RestaurantEntry } from '@/lib/jeju-best-10-data';

const CARD_MIN_HEIGHT = 420;

interface RestaurantCardProps {
  entry: RestaurantEntry;
  locale?: 'en' | 'ko' | 'ja' | 'zh';
}

export function RestaurantCard({ entry, locale = 'en' }: RestaurantCardProps) {
  const name =
    locale === 'ko'
      ? entry.nameKo
      : locale === 'ja'
        ? entry.nameJa
        : locale === 'zh'
          ? entry.nameZh
          : entry.nameEn;

  return (
    <article
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 transition-colors hover:border-emerald-400/20"
      style={{ minHeight: CARD_MIN_HEIGHT }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={entry.imageSrc}
          alt={entry.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-2">
          <p className="text-[10px] text-slate-400">
            AI-enhanced image · {entry.imageAlt}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-slate-400">{entry.category}</p>
        <p className="mt-1 text-xs text-slate-500">{entry.address}</p>
        <div className="mt-4 flex-1">
          <DataInsightBox
            aiScore={entry.aiScore}
            sentimentPositive={entry.sentimentPositive}
            sentimentNegative={entry.sentimentNegative}
            localPopularity={entry.localPopularity}
          />
        </div>
      </div>
    </article>
  );
}
