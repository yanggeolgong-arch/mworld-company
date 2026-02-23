'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

const initialShops = [
  { id: 1, name: '빨간대게', img: `${IMG_BASE}/1.jpg`, brief: '심해의 붉은 보석, 수율 100%에 도전하는 대게의 정점', teaser: '새벽 바다에서 올라온 그 맛, 로컬들이 입을 다무는 이유가 여기 있다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/221278283818', story: '제주항의 새벽을 깨우는 가장 신선한 대게입니다. 녹진한 장의 풍미와 달큰한 살점은 단순한 식사를 넘어 예술적 경험을 선사합니다.', query: '제주 빨간대게' },
  { id: 2, name: '왕서방식당', img: `${IMG_BASE}/2.jpg`, brief: '반세기 내공이 담긴 불맛, 로컬들만 아는 중식의 성지', teaser: '반세기 내공이 한 그릇에 담긴다. 그 짬뽕에 숨겨진 비결이 궁금하다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/221242208075', story: '화려한 수식어보다 묵직한 짬뽕 한 그릇이 모든 것을 말해줍니다. 깊은 육수와 탄력 있는 면발의 조화는 제주 중식의 자부심입니다.', query: '제주 왕서방식당' },
  { id: 3, name: '황금돈가', img: `${IMG_BASE}/3.jpg`, brief: '흑돼지의 본질을 꿰뚫는 육즙의 미학', teaser: '숯불 위에서 춤추는 그 육즙, 왜 사람들이 다시 찾는지 알아보고 싶다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/221209043068', story: '최적의 숙성을 거친 흑돼지가 숯불 위에서 춤을 춥니다. 첫 점은 소금만, 두 번째 점은 멜젓과 함께 제주의 육향을 탐닉하십시오.', query: '제주 황금돈가' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.jpg`, brief: '완벽에 가까운 99.9%의 휴식, 바리스타의 철학이 담긴 공간', teaser: '원두 한 알에 담긴 진심이 궁금하다. 그 잔의 끝을 따라가 보고 싶다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/224114102719', story: '원두 한 알 한 알에 담긴 진심이 잔 끝에서 느껴집니다. 제주 도심 속에서 만나는 가장 고요하고 우아한 커피 리추얼입니다.', query: '제주 커피구십구점구' },
  { id: 5, name: '짬뽕에취한날', img: `${IMG_BASE}/5.jpg`, brief: '갈비와 짬뽕의 파격적 조우, 미식가들을 사로잡은 깊은 풍미', teaser: '갈비와 짬뽕이 만나면? 한 번 맛본 사람들이 헤어나지 못한다는 그 이유...', blogUrl: 'https://blog.naver.com/jejuopsuye/221207381828', story: '부드러운 갈비살이 매콤한 해물 육수와 만나 폭발적인 시너지를 냅니다. 한 번 맛보면 헤어날 수 없는 마성의 짬뽕입니다.', query: '제주 짬뽕에취한날' },
  { id: 6, name: '하윤이네', img: `${IMG_BASE}/6.jpg`, brief: '제주의 계절을 담은 정갈한 한식 소반', teaser: '엄마 손맛을 그대로 재현했다는 그 정성, 제주의 땅이 내리는 맛을 느껴보고 싶다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/224063605688', story: '화려하진 않지만 정성이 가득한 어머니의 손맛을 그대로 재현했습니다. 제주의 땅과 바다가 주는 제철 식재료의 힘을 믿습니다.', query: '제주 하윤이네' },
  { id: 7, name: '램스키친', img: `${IMG_BASE}/7.jpg`, brief: '양고기의 미학, 냄새 없는 부드러움의 극치', teaser: '양고기가 이렇게 부드러울 수 있다고? 편견을 깨는 그 맛의 비결이 궁금하다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/224002909182', story: '엄선된 프리미엄 양갈비만을 고집합니다. 전문적인 그릴링 서비스와 세련된 분위기가 당신의 저녁을 더욱 특별하게 만듭니다.', query: '제주 램스키친' },
  { id: 8, name: '청기와장어', img: `${IMG_BASE}/8.jpg`, brief: '지친 영혼을 달래는 기력 보강의 끝판왕', teaser: '숯불 위에서 피어나는 고소함, 지친 몸이 달리는 그 힘의 비결이 궁금하다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/223972283259', story: '숯불향 가득 머금은 장어의 고소함이 입안 가득 퍼집니다. 제주의 에너지를 한 몸에 받는 보양식의 명가입니다.', query: '제주 청기와장어' },
  { id: 9, name: '섬타르', img: `${IMG_BASE}/9.jpg`, brief: '제주의 자연을 굽다, 로컬 타르트의 달콤한 향연', teaser: '구좌 당근, 우도 땅콩이 타르트에? 섬의 맛을 달콤하게 번역한 그 비결...', blogUrl: 'https://blog.naver.com/jejuopsuye/224066284940', story: '구좌 당근, 우도 땅콩 등 제주의 원재료를 현대적 감각으로 재해석한 디저트입니다. 시각과 미각을 동시에 만족시키는 걸작입니다.', query: '제주 섬타르' },
  { id: 10, name: '브와두스', img: `${IMG_BASE}/10.jpg`, brief: '매일 아침 깨어나는 빵의 생명력, 베이커리의 정석', teaser: '매일 아침 갓 구운 빵 냄새가 반긴다. 그 생명의 비결을 알고 싶다면...', blogUrl: 'https://blog.naver.com/jejuopsuye/224039782737', story: '신선한 밀가루와 건강한 효모가 빚어낸 빵의 향연입니다. 여유로운 오후를 완성해주는 베이커리 카페의 정점입니다.', query: '제주 브와두스' },
];

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

        <section className="grid grid-cols-2 gap-[1px] bg-white/10">
          {gridShops.map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleSelection(shop.id)}
              className="flex flex-col cursor-pointer group overflow-hidden bg-black aspect-[3/4]"
            >
              {/* 상단: 식당 이름 (첫 글자 빨간색) */}
              <div className="flex-none px-3 py-2 bg-black border-b border-white/5">
                <p className="text-[9px] font-black text-orange-500 mb-0.5">RANK {index + 1}</p>
                <h3 className="text-lg font-black leading-tight break-keep">
                  {shop.name[0] && <span className="text-red-500">{shop.name[0]}</span>}
                  <span className="text-white">{shop.name.slice(1)}</span>
                </h3>
              </div>
              {/* 사진: 2/3 비율 (줄어든 크기) */}
              <div className="relative w-full aspect-[3/2] overflow-hidden flex-shrink-0">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              {/* 하단 1/3: 흰색 설명 (2배 크기, 호기심 유발) + [더보기] */}
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
                {/* 01 라인 바로 밑, 중앙에 고급스러운 썸네일 */}
                <div className="flex justify-center my-6">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
                    <Image src={shop.img} alt={shop.name} fill sizes="112px" className="object-cover" />
                  </div>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-4">{shop.name}</h2>
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
