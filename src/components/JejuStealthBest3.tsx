'use client';

import { useMemo } from 'react';
import Image from 'next/image';

const STORES = [
  {
    name: '명진전복',
    address: '제주시 구좌읍 해맞이해안로 1282',
    desc: '구좌읍 해맞이해안로에 자리한 전복 전문점. 갓 잡은 전복을 즉석에서 손질해 내는 회와 구이, 전복죽이 일품이다. 바다가 보이는 창가 자리에서 먹는 전복 요리는 제주 동부의 감성과 잘 어울린다. 현지인과 관광객 모두에게 인기 있는 맛집.',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    ],
  },
  {
    name: '우진해장국',
    address: '제주시 서사로 11',
    desc: '제주 시내 서사로 골목에서 30년 넘게 자리를 지켜온 해장국 전문점. 진한 소고기 육수에 푹 고아낸 해장국은 술 다음날이나 아침 식사로 제주 시민들이 애용한다. 김치와 밥 반찬이 푸짐하고, 정갈한 한 끼로 배를 든든히 채울 수 있다.',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
      'https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=400&q=80',
    ],
  },
  {
    name: '자매국수',
    address: '제주시 탑동로 11길 6',
    desc: '탑동 골목의 오래된 국수집. 칼국수와 비빔국수가 대표 메뉴로, 쫄깃한 면발과 깔끔한 국물이 특징이다. 현지인들이 점심으로 자주 찾는 곳으로, 단출한 인테리어와 정갈한 한 그릇이 묘한 여유를 선사한다. 가성비 좋은 제주 시내 맛집.',
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a2854112cfe?w=400&q=80',
      'https://images.unsplash.com/photo-1563379926898-05f4575a41d4?w=400&q=80',
    ],
  },
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
              <div className="mb-4 grid grid-cols-2 gap-2">
                {store.images.map((src, j) => (
                  <div key={j} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={src}
                      alt={`${store.name} ${j + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                  </div>
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">{store.desc}</p>
              <p className="mb-4 text-xs font-medium text-slate-500">{store.address}</p>
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
