'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';
const IMG_V = '?v=966x645'; // 캐시 무효화 (966×645 리사이즈 적용)

const initialShops = [
  { id: 1, name: '빨간대게', img: `${IMG_BASE}/1.avif${IMG_V}`, brief: '눅진한 게 내장에 밥을 볶아 먹는 그 전율의 맛... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221278283818', story: '제주항 인근에서 대게의 진수를 보여주는 곳입니다. 수율 좋은 대게와 서비스로 나오는 해산물들이 압권이죠. 특히 마지막 볶음밥은 선택이 아닌 필수입니다. ㅋㅋㅋㅋ', query: '제주 빨간대게' },
  { id: 2, name: '왕서방식당', img: `${IMG_BASE}/2.avif${IMG_V}`, brief: '로컬들만 조용히 찾아가는 숨은 중식의 고수... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221242208075', story: '화려하지 않지만 기본에 충실한 맛입니다. 깊은 불맛이 느껴지는 짬뽕 국물은 해장과 동시에 다시 소주를 부르는 마력이 있죠. ㅋㅋㅋㅋ', query: '제주 왕서방식당' },
  { id: 3, name: '황금돈가', img: `${IMG_BASE}/3.avif${IMG_V}`, brief: '제주 흑돼지의 육즙이 입안에서 폭발하는 순간... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221209043068', story: '고기 질부터 다릅니다. 두툼한 목살을 멜젓에 찍어 먹는 정석적인 맛부터, 사장님의 노하우가 담긴 그릴링까지 완벽한 한 끼입니다. ㅋㅋㅋㅋ', query: '제주 황금돈가' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.avif${IMG_V}`, brief: '인생 커피를 만날 확률 99.9%의 감성 공간... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224114102719', story: '제주 시내에서 가장 아늑한 휴식처 중 하나입니다. 직접 로스팅한 원두의 향미가 살아있는 커피와 수제 디저트의 조화가 일품이죠. ㅋㅋㅋㅋ', query: '제주 커피구십구점구' },
  { id: 5, name: '짬뽕에취한날', img: `${IMG_BASE}/5.avif${IMG_V}`, brief: '갈비짬뽕 한 그릇에 담긴 묵직한 내공... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221207381828', story: '갈비가 통째로 들어간 짬뽕은 비주얼만큼이나 맛도 묵직합니다. 해산물 위주의 짬뽕과는 또 다른 매력의 깊은 고기 육수를 느껴보세요. ㅋㅋㅋㅋ', query: '제주 짬뽕에취한날' },
  { id: 6, name: '하윤이네', img: `${IMG_BASE}/6.avif${IMG_V}`, brief: '집밥보다 더 따뜻한 정성이 가득한 제주 식탁... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224063605688', story: '정갈한 밑반찬과 메인 요리들이 엄마의 손맛을 떠올리게 합니다. 제주 여행 중 속이 편안한 한 끼를 찾는다면 여기가 정답입니다. ㅋㅋㅋㅋ', query: '제주 하윤이네' },
  { id: 7, name: '램스키친', img: `${IMG_BASE}/7.avif${IMG_V}`, brief: '양고기의 편견을 깨는 부드럽고 잡내 없는 식감... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224002909182', story: '프리미엄 양갈비를 전문 에디터가 직접 구워주는 곳입니다. 와인 한 잔과 곁들이면 제주의 밤이 더욱 특별해지는 마법을 경험하세요. ㅋㅋㅋㅋ', query: '제주 램스키친' },
  { id: 8, name: '청기와장어', img: `${IMG_BASE}/8.avif${IMG_V}`, brief: '지친 기력을 보강해줄 힘이 불끈 솟는 장어... ', blogUrl: 'https://blog.naver.com/jejuopsuye/223972283259', story: '두툼한 장어를 숯불에 구워 고소함이 남다릅니다. 특제 소스와 생강채를 곁들여 먹으면 환절기 보양으로 이만한 게 없습니다. ㅋㅋㅋㅋ', query: '제주 청기와장어' },
  { id: 9, name: '섬타르', img: `${IMG_BASE}/9.avif${IMG_V}`, brief: '제주 로컬 식재료를 담은 타르트의 달콤한 유혹... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224066284940', story: '제주의 흙과 바람이 키운 재료들로 만든 타르트는 선물용으로도 최고입니다. 시각과 미각을 동시에 만족시키는 제주의 달콤함을 맛보세요. ㅋㅋㅋㅋ', query: '제주 섬타르' },
  { id: 10, name: '브와두스', img: `${IMG_BASE}/10.avif${IMG_V}`, brief: '매일 아침 갓 구운 빵 냄새가 반겨주는 베이커리... ', blogUrl: 'https://blog.naver.com/expsyting/224039782737', story: '베이커리 카페의 정석입니다. 신선한 재료로 만든 빵과 케이크들이 가득하며, 넓은 매장은 여유로운 커피 타임을 즐기기에 최적입니다. ㅋㅋㅋㅋ', query: '제주 브와두스' },
];

type Shop = (typeof initialShops)[number];

export default function JejuRealMaster() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-orange-500">
      {/* 1. 상단 VS 배틀 그리드 (10개 고정 노출) */}
      <section className="p-0 border-b border-slate-800">
        <h1 className="text-center text-sm font-black py-4 bg-orange-600 tracking-tighter">JEJU GOURMET INTELLIGENCE: REAL BATTLE</h1>
        <div className="grid grid-cols-2 gap-0 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 z-10"></div>

          {shops.slice(0, 10).map((shop, index) => (
            <div key={shop.id} className="relative border-b border-slate-800 p-4 pb-6">
              {/* VS 배지 */}
              {index % 2 === 0 && (
                <div className="absolute -right-[18px] top-[40%] z-20 bg-white text-black text-[10px] font-black px-1.5 py-0.5 rounded-sm skew-x-[-15deg]">VS</div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black bg-slate-800 px-2 py-0.5 rounded italic">RANK {index + 1}</span>
                  <h2 className="text-sm font-black tracking-tight">{shop.name}</h2>
                </div>
                <div className="aspect-square w-full overflow-hidden rounded-xl border border-slate-800 relative">
                  <Image
                    src={shop.img}
                    alt={shop.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 300px"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-[1.4] tracking-tight">
                  {shop.brief}
                  <a href={`#story-${shop.id}`} className="text-blue-400 font-bold ml-1 hover:text-white transition-colors">
                    [자세히 더보기]
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 하단 상세 EEAT 스토리 섹션 */}
      <section className="p-6 space-y-32 bg-gradient-to-b from-slate-900 to-black pb-40">
        <h2 className="text-3xl font-black text-center text-slate-500">DEEP ANALYSIS</h2>
        {initialShops.map((shop) => (
          <article id={`story-${shop.id}`} key={shop.id} className="scroll-mt-10">
            <header className="mb-8">
              <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Expert View</span>
              <h3 className="text-4xl font-black mt-2 text-white">{shop.name}</h3>
            </header>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-slate-300 leading-relaxed font-serif italic border-l-4 border-orange-600 pl-6 mb-10">
                &quot;{shop.story}&quot;
              </p>

              {/* 실제 데이터 증명 (지도) */}
              <div className="grid grid-cols-2 gap-3 my-10">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 py-4 rounded-2xl font-bold border border-slate-700 hover:bg-green-900 transition-all text-xs text-center"
                >
                  📍 NAVER MAP
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 py-4 rounded-2xl font-bold border border-slate-700 hover:bg-blue-900 transition-all text-xs text-center"
                >
                  🗺️ GOOGLE MAP
                </a>
              </div>

              {/* 블로그 원문 링크 */}
              <a href={shop.blogUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-white text-black py-6 rounded-3xl font-black text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl">
                🔗 블로그 원문 데이터 확인하기
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
