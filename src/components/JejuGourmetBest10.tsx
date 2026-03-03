'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

const initialShops: Array<{
  id: number;
  name: string;
  img: string;
  brief: string;
  teaser: string;
  story: string;
  blogUrl: string;
  query: string;
}> = [];

export default function JejuGourmetBest10() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [gridShops, setGridShops] = useState<typeof initialShops>([]);
  const [detailShops, setDetailShops] = useState<typeof initialShops>([]);

  useEffect(() => {
    const shuffled = [...initialShops].sort(() => Math.random() - 0.5);
    setGridShops(shuffled);
    setDetailShops(shuffled);
  }, []);

  const handleSelection = (selectedId: number) => {
    const selected = initialShops.find((s) => s.id === selectedId);
    const others = initialShops.filter((s) => s.id !== selectedId).sort(() => Math.random() - 0.5);
    if (selected) setDetailShops([selected, ...others]);

    setTimeout(() => {
      const container = scrollRef.current;
      const element = document.getElementById(`detail-${selectedId}`);
      if (container && element) {
        const headerOffset = 100;
        const targetScroll = container.scrollTop + element.getBoundingClientRect().top - headerOffset;
        container.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div ref={scrollRef} className="h-screen w-full bg-[#050505] flex justify-center overflow-y-auto overflow-x-hidden selection:bg-orange-500 text-white">
      <main className="w-full max-w-[600px] bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] relative flex flex-col min-h-full">
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <h1 className="text-center text-[18px] md:text-[20px] font-black py-6 tracking-tighter text-white px-4">
            2026년 2월 AI 미식 데이터 베스트10
          </h1>
        </header>

        <section className="grid grid-cols-2 gap-[1px] bg-white/10 min-h-[200px]">
          {gridShops.length === 0 && (
            <div className="col-span-2 flex items-center justify-center py-20 text-zinc-500 text-sm">
              새 포스팅을 추가해주세요
            </div>
          )}
          {gridShops.map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleSelection(shop.id)}
              className="flex flex-col cursor-pointer group overflow-hidden bg-black aspect-[3/4]"
            >
              <div className="flex-none px-3 py-2 bg-black border-b border-white/5">
                <p className="text-[9px] font-black text-orange-500 mb-0.5">RANK {index + 1}</p>
                <h3 className="text-lg font-black leading-tight break-keep">
                  {shop.name[0] && <span className="text-red-500">{shop.name[0]}</span>}
                  <span className="text-white">{shop.name.slice(1)}</span>
                </h3>
              </div>
              <div className="relative w-full aspect-[3/2] overflow-hidden flex-shrink-0 bg-zinc-900">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="flex-1 min-h-[88px] px-3 py-2.5 bg-black flex flex-col justify-center">
                <p className="text-white text-[22px] leading-snug line-clamp-3">
                  {shop.teaser}
                  <span className="text-orange-400 font-bold ml-1 text-[20px]">[더보기]</span>
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="p-8 space-y-40 pb-60">
          {detailShops.length === 0 && (
            <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
              새 포스팅을 추가해주세요
            </div>
          )}
          {detailShops.map((shop, index) => (
            <article
              id={`detail-${shop.id}`}
              key={shop.id}
              className={`transition-all duration-1000 ${index === 0 ? 'bg-zinc-900/50 p-8 rounded-[40px] border border-orange-500/30' : 'opacity-95 bg-zinc-900/30'}`}
            >
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-black text-white/5 italic">0{index + 1}</span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter mb-5">
                  {shop.name[0] && <span className="text-red-500">{shop.name[0]}</span>}
                  <span className="text-white">{shop.name.slice(1)}</span>
                </h2>
                <div className="flex justify-center gap-1.5 mb-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 flex-shrink-0 bg-zinc-900">
                      <Image
                        src={shop.img}
                        alt={`${shop.name} ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="inline-block px-3 py-1 bg-white text-black text-[10px] font-black mb-4">PREMIUM SELECTION</div>
                <p className="text-2xl font-bold text-orange-400 leading-tight italic break-keep">&quot;{shop.brief}&quot;</p>
              </div>

              <p className="text-zinc-400 text-[17px] leading-[1.8] font-light mb-12 whitespace-pre-line">
                {shop.story}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 py-4 rounded-2xl text-[13px] font-bold hover:bg-zinc-700 text-center block text-white"
                >
                  네이버 지도 바로가기
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 py-4 rounded-2xl text-[13px] font-bold hover:bg-zinc-700 text-center block text-white"
                >
                  구글 지도 바로가기
                </a>
              </div>

              <a
                href={shop.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-black py-6 rounded-[30px] text-center font-black text-[22px] hover:bg-orange-600 hover:text-white transition-all shadow-2xl"
              >
                실제 후기 동영상이 포함된 전문 보기
              </a>
            </article>
          ))}
        </section>

        <footer className="p-20 border-t border-white/5 text-center bg-black">
          <p className="text-[10px] font-bold tracking-[0.6em] text-zinc-800 uppercase">
            Jeju Gourmet Intelligence Research Lab
          </p>
        </footer>
      </main>
    </div>
  );
}
