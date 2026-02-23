'use client';

import { useMemo } from 'react';

const STORES = [
  { name: '명진전복', address: '제주시 구좌읍 해맞이해안로 1282' },
  { name: '우진해장국', address: '제주시 서사로 11' },
  { name: '자매국수', address: '제주시 탑동로 11길 6' },
] as const;

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
      <div className="mx-auto max-w-2xl px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-slate-100">
            Stealth Best 3
          </h1>
          <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Data Command · Classified
          </p>
        </header>

        <div className="space-y-6">
          {shuffled.map((store, i) => (
            <article
              key={store.name}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 font-black text-slate-200">
                  {i + 1}
                </span>
                <h2 className="text-xl font-black text-white">{store.name}</h2>
              </div>
              <p className="mb-4 text-sm font-medium text-slate-400">{store.address}</p>
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeAddress(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-slate-700"
                >
                  지도보기
                </a>
                <a
                  href={`https://search.naver.com/search.naver?query=${encodeAddress(store.name + ' ' + store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-slate-700"
                >
                  자세히보기
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
          Rank shuffled on each load · Vercel Only
        </p>
      </div>
    </main>
  );
}
