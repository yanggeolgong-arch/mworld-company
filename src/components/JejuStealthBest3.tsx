'use client';

import { useMemo } from 'react';
import Image from 'next/image';

const STORES = [
  { name: '명진전복', address: '제주시 구좌읍 해맞이해안로 1282', summary: '전복 회·구이·전복죽, 바다 전망', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=120&q=80', postUrl: '#' },
  { name: '우진해장국', address: '제주시 서사로 11', summary: '30년 해장국 전문, 진한 소고기 육수', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&q=80', postUrl: '#' },
  { name: '자매국수', address: '제주시 탑동로 11길 6', summary: '칼국수·비빔국수, 쫄깃한 면발', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=120&q=80', postUrl: '#' },
  { name: '숙성도', address: '제주시 중문로 27', summary: '흑돼지 구이, 숙성 고기 전문', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=120&q=80', postUrl: '#' },
  { name: '올래국수', address: '제주시 귀아랑길 24', summary: '고기국수 전문, 제주 대표 국수집', img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=120&q=80', postUrl: '#' },
  { name: '돈사돈', address: '제주시 노형로 95', summary: '흑돼지 삼겹살, 제주돼지 맛집', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=120&q=80', postUrl: '#' },
  { name: '산방식당', address: '서귀포시 안덕면 산방로 141', summary: '국수·면 요리, 산방산 인근', img: 'https://images.unsplash.com/photo-1569718212165-3a2854112cfe?w=120&q=80', postUrl: '#' },
  { name: '맛나식당', address: '제주시 한림읍 한림로 585', summary: '제주 향토음식, 전통 한정식', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&q=80', postUrl: '#' },
  { name: '몽상드애월', address: '제주시 애월읍 애월로 85', summary: '애월 카페, 바다뷰 디저트', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&q=80', postUrl: '#' },
  { name: '순옥이네명가', address: '제주시 구좌읍 해맞이해안로 1102', summary: '전복·해물요리, 동부 해안 맛집', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=120&q=80', postUrl: '#' },
];

function encodeAddress(addr: string) {
  return encodeURIComponent(addr);
}

export function JejuStealthBest3() {
  const shuffled = useMemo(() => {
    const arr = [...STORES].map((s, i) => ({ ...s, originalIndex: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-2 py-4">
        <header className="mb-3 text-center">
          <h1 className="text-lg font-black uppercase tracking-[0.15em] text-slate-100">
            Stealth Best 10
          </h1>
          <p className="mt-0.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Data Command · Classified
          </p>
        </header>

        <div className="space-y-1.5">
          {shuffled.map((store, i) => (
            <article
              key={`${store.name}-${i}`}
              className="flex h-[80px] min-h-[80px] items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={store.img}
                  alt={store.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="object-cover"
                  sizes="48px"
                  unoptimized
                />
                <span className="absolute -top-0.5 -left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[9px] font-black text-slate-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold text-white">{store.name}</h2>
                <p className="truncate text-[11px] text-slate-400">{store.summary}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddress(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-70 hover:opacity-100"
                    aria-label="구글 지도"
                  >
                    🗺️
                  </a>
                  <a
                    href={`https://map.naver.com/v5/search/${encodeAddress(store.name + ' ' + store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-70 hover:opacity-100"
                    aria-label="네이버 지도"
                  >
                    📍
                  </a>
                </div>
              </div>
              <a
                href={store.postUrl}
                className="shrink-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 text-[11px] font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                메인 포스팅 보기
              </a>
            </article>
          ))}
        </div>

        <p className="mt-4 text-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          Rank shuffled on load · Vercel Only
        </p>
      </div>
    </main>
  );
}
