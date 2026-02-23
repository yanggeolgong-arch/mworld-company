'use client';

import { useMemo } from 'react';
import Image from 'next/image';

const STORES = [
  { name: '명진전복', address: '제주시 구좌읍 해맞이해안로 1282', mainMenu: '갓 잡은 전복을 즉석 손질한 회와 구이. 바다 전망 창가에서 먹는 전복죽이 인기.', imgs: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80'], postUrl: '#' },
  { name: '우진해장국', address: '제주시 서사로 11', mainMenu: '30년 전통 해장국. 진한 소고기 육수에 푹 고아낸 국물, 김치·밥 반찬 푸짐.', imgs: ['https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&q=80', 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=200&q=80'], postUrl: '#' },
  { name: '자매국수', address: '제주시 탑동로 11길 6', mainMenu: '칼국수·비빔국수 대표. 쫄깃한 면발과 깔끔한 국물, 현지인 점심 단골.', imgs: ['https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&q=80', 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=200&q=80'], postUrl: '#' },
  { name: '숙성도', address: '제주시 중문로 27', mainMenu: '흑돼지 구이 전문. 적정 숙성된 제주돼지 삼겹·목살, 숯불 직화.', imgs: ['https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=80', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80'], postUrl: '#' },
  { name: '올래국수', address: '제주시 귀아랑길 24', mainMenu: '고기국수 전문. 진한 육수에 얇게 썬 고기, 제주 대표 국수 맛집.', imgs: ['https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=200&q=80', 'https://images.unsplash.com/photo-1569718212165-3a2854112cfe?w=200&q=80'], postUrl: '#' },
  { name: '돈사돈', address: '제주시 노형로 95', mainMenu: '흑돼지 삼겹살. 제주돼지 본연의 맛, 두툼한 식감과 고소한 기름.', imgs: ['https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=80', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80'], postUrl: '#' },
  { name: '산방식당', address: '서귀포시 안덕면 산방로 141', mainMenu: '국수·면 요리. 산방산 인근, 시원한 국물과 쫄깃한 면.', imgs: ['https://images.unsplash.com/photo-1569718212165-3a2854112cfe?w=200&q=80', 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=200&q=80'], postUrl: '#' },
  { name: '맛나식당', address: '제주시 한림읍 한림로 585', mainMenu: '제주 향토음식. 전통 한정식, 갈치조림·해물탕 등 푸짐한 상차림.', imgs: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80'], postUrl: '#' },
  { name: '몽상드애월', address: '제주시 애월읍 애월로 85', mainMenu: '애월 카페. 바다뷰 디저트, 브런치·커피와 함께하는 여유.', imgs: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80'], postUrl: '#' },
  { name: '순옥이네명가', address: '제주시 구좌읍 해맞이해안로 1102', mainMenu: '전복·해물요리. 동부 해안 맛집, 전복죽·해물탕·회.', imgs: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80'], postUrl: '#' },
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
    <main className="min-h-[100dvh] bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-xl px-3 py-3">
        <header className="mb-3 text-center">
          <h1 className="text-xl font-black uppercase tracking-[0.12em] text-slate-100">
            Stealth Best 10
          </h1>
          <p className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Data Command · Classified
          </p>
        </header>

        <div className="space-y-2">
          {shuffled.map((store, i) => (
            <article
              key={`${store.name}-${i}`}
              className="flex min-h-[100px] gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5"
            >
              <div className="relative flex shrink-0 gap-1">
                <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                  <Image
                    src={store.imgs[0]}
                    alt={`${store.name} 대표`}
                    width={56}
                    height={56}
                    loading={i < 5 ? 'eager' : 'lazy'}
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                  <span className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-br bg-slate-800 text-[10px] font-black text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                  <Image
                    src={store.imgs[1]}
                    alt={`${store.name} 2`}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-bold leading-tight text-white">{store.name}</h2>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-slate-400">
                  {store.mainMenu}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddress(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-80 hover:opacity-100"
                    aria-label="구글 지도"
                  >
                    🗺️
                  </a>
                  <a
                    href={`https://map.naver.com/v5/search/${encodeAddress(store.name + ' ' + store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-80 hover:opacity-100"
                    aria-label="네이버 지도"
                  >
                    📍
                  </a>
                </div>
              </div>
              <a
                href={store.postUrl}
                className="shrink-0 self-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                메인 포스팅
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">
          Rank shuffled on load · Vercel Only
        </p>
      </div>
    </main>
  );
}
