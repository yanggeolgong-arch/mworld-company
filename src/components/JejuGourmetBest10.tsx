'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

const initialShops = [
  { id: 1, name: '빨간대게', img: `${IMG_BASE}/1.jpg`, brief: '심해의 붉은 보석, 수율 100%에 도전하는 대게의 정점', blogUrl: 'https://blog.naver.com/jejuopsuye/221278283818', story: '제주항의 새벽을 깨우는 가장 신선한 대게입니다. 녹진한 장의 풍미와 달큰한 살점은 단순한 식사를 넘어 예술적 경험을 선사합니다.', query: '제주 빨간대게' },
  { id: 2, name: '왕서방식당', img: `${IMG_BASE}/2.jpg`, brief: '반세기 내공이 담긴 불맛, 로컬들만 아는 중식의 성지', blogUrl: 'https://blog.naver.com/jejuopsuye/221242208075', story: '화려한 수식어보다 묵직한 짬뽕 한 그릇이 모든 것을 말해줍니다. 깊은 육수와 탄력 있는 면발의 조화는 제주 중식의 자부심입니다.', query: '제주 왕서방식당' },
  { id: 3, name: '황금돈가', img: `${IMG_BASE}/3.jpg`, brief: '흑돼지의 본질을 꿰뚫는 육즙의 미학', blogUrl: 'https://blog.naver.com/jejuopsuye/221209043068', story: '최적의 숙성을 거친 흑돼지가 숯불 위에서 춤을 춥니다. 첫 점은 소금만, 두 번째 점은 멜젓과 함께 제주의 육향을 탐닉하십시오.', query: '제주 황금돈가' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.jpg`, brief: '완벽에 가까운 99.9%의 휴식, 바리스타의 철학이 담긴 공간', blogUrl: 'https://blog.naver.com/jejuopsuye/224114102719', story: '원두 한 알 한 알에 담긴 진심이 잔 끝에서 느껴집니다. 제주 도심 속에서 만나는 가장 고요하고 우아한 커피 리추얼입니다.', query: '제주 커피구십구점구' },
  { id: 5, name: '짬뽕에취한날', img: `${IMG_BASE}/5.jpg`, brief: '갈비와 짬뽕의 파격적 조우, 미식가들을 사로잡은 깊은 풍미', blogUrl: 'https://blog.naver.com/jejuopsuye/221207381828', story: '부드러운 갈비살이 매콤한 해물 육수와 만나 폭발적인 시너지를 냅니다. 한 번 맛보면 헤어날 수 없는 마성의 짬뽕입니다.', query: '제주 짬뽕에취한날' },
  { id: 6, name: '하윤이네', img: `${IMG_BASE}/6.jpg`, brief: '제주의 계절을 담은 정갈한 한식 소반', blogUrl: 'https://blog.naver.com/jejuopsuye/224063605688', story: '화려하진 않지만 정성이 가득한 어머니의 손맛을 그대로 재현했습니다. 제주의 땅과 바다가 주는 제철 식재료의 힘을 믿습니다.', query: '제주 하윤이네' },
  { id: 7, name: '램스키친', img: `${IMG_BASE}/7.jpg`, brief: '양고기의 미학, 냄새 없는 부드러움의 극치', blogUrl: 'https://blog.naver.com/jejuopsuye/224002909182', story: '엄선된 프리미엄 양갈비만을 고집합니다. 전문적인 그릴링 서비스와 세련된 분위기가 당신의 저녁을 더욱 특별하게 만듭니다.', query: '제주 램스키친' },
  { id: 8, name: '청기와장어', img: `${IMG_BASE}/8.jpg`, brief: '지친 영혼을 달래는 기력 보강의 끝판왕', blogUrl: 'https://blog.naver.com/jejuopsuye/223972283259', story: '숯불향 가득 머금은 장어의 고소함이 입안 가득 퍼집니다. 제주의 에너지를 한 몸에 받는 보양식의 명가입니다.', query: '제주 청기와장어' },
  { id: 9, name: '섬타르', img: `${IMG_BASE}/9.jpg`, brief: '제주의 자연을 굽다, 로컬 타르트의 달콤한 향연', blogUrl: 'https://blog.naver.com/jejuopsuye/224066284940', story: '구좌 당근, 우도 땅콩 등 제주의 원재료를 현대적 감각으로 재해석한 디저트입니다. 시각과 미각을 동시에 만족시키는 걸작입니다.', query: '제주 섬타르' },
  { id: 10, name: '브와두스', img: `${IMG_BASE}/10.jpg`, brief: '매일 아침 깨어나는 빵의 생명력, 베이커리의 정석', blogUrl: 'https://blog.naver.com/jejuopsuye/224039782737', story: '신선한 밀가루와 건강한 효모가 빚어낸 빵의 향연입니다. 여유로운 오후를 완성해주는 베이커리 카페의 정점입니다.', query: '제주 브와두스' },
];

export default function JejuGourmetBest10() {
  const [gridShops, setGridShops] = useState<typeof initialShops>([]);
  const [detailShops, setDetailShops] = useState<typeof initialShops>([]);

  useEffect(() => {
    const shuffled = [...initialShops].sort(() => Math.random() - 0.5);
    setGridShops(shuffled);
    setDetailShops(shuffled);
  }, []);

  const handleShopSelection = (selectedId: number) => {
    const selected = initialShops.find((s) => s.id === selectedId);
    const others = initialShops.filter((s) => s.id !== selectedId).sort(() => Math.random() - 0.5);
    if (selected) setDetailShops([selected, ...others]);

    const element = document.getElementById(`detail-${selectedId}`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen scroll-smooth overflow-y-auto">
      <main className="max-w-2xl mx-auto shadow-[0_0_100px_rgba(0,0,0,1)] bg-black min-h-screen">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <h1 className="text-center text-lg font-bold py-5 tracking-tighter text-orange-500">
            AI 가 뽑은 현재 가장 핫한 제주 미식 베스트 10
          </h1>
        </header>

        <section className="grid grid-cols-2 gap-[1px] bg-white/10 border-b border-white/10">
          {gridShops.map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleShopSelection(shop.id)}
              className="relative aspect-square cursor-pointer group overflow-hidden"
            >
              <Image
                src={shop.img}
                alt={shop.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-[10px] text-orange-500 font-black mb-1">BEST {index + 1}</p>
                <h3 className="text-xl font-black text-white leading-none mb-1">{shop.name}</h3>
                <p className="text-[9px] text-slate-300 truncate tracking-tighter">Click to Analysis</p>
              </div>
            </div>
          ))}
        </section>

        <section className="p-8 space-y-24 pb-40">
          {detailShops.map((shop, index) => (
            <article
              id={`detail-${shop.id}`}
              key={shop.id}
              className={`transition-all duration-1000 ${index === 0 ? 'scale-105 ring-2 ring-orange-500/50 p-6 rounded-3xl bg-slate-900/40' : 'opacity-80'}`}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-black text-white/10 italic">0{index + 1}</span>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white mb-2">{shop.name}</h2>
                  <div className="h-1 w-12 bg-orange-600" />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-medium text-orange-400 leading-tight italic">&quot;{shop.brief}&quot;</p>
                <p className="text-slate-400 leading-relaxed text-base font-light">{shop.story}</p>

                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/10 py-3 rounded-xl text-[10px] font-bold tracking-widest transition-all text-center"
                    >
                      NAVER MAP
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(shop.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/10 py-3 rounded-xl text-[10px] font-bold tracking-widest transition-all text-center"
                    >
                      GOOGLE MAP
                    </a>
                  </div>
                  <a
                    href={shop.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-black py-5 rounded-2xl text-center font-black text-lg hover:bg-orange-500 hover:text-white transition-all shadow-xl"
                  >
                    미식 분석 리포트 전문 보기
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="p-10 border-t border-white/5 text-center bg-black">
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase">
            Jeju Gourmet Intelligence Research Lab
          </p>
        </footer>
      </main>
    </div>
  );
}
