'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

const initialShops = [
  { id: 1, name: '빨간대게', img: `${IMG_BASE}/1.jpg`, brief: '눅진한 게 내장에 밥을 볶아 먹는 그 전율의 맛... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221278283818', story: '제주항 인근에 자리한 이곳은 대게의 본질을 놓치지 않는 흔치 않은 공간이다. 탁월한 수율과 함께 제공되는 해산물의 품격은 말할 필요가 없다. 코스의 마침표를 찍는 볶음밥은 단순한 마무리가 아니라, 한 끼 전체를 재해석하는 결정적 순간이다.', query: '제주 빨간대게' },
  { id: 2, name: '왕서방식당', img: `${IMG_BASE}/2.jpg`, brief: '로컬들만 조용히 찾아가는 숨은 중식의 고수... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221242208075', story: '과시하지 않는 맛의 미학. 짬뽕 한 그릇에 담긴 국물은 깊은 불맛과 함께 입안에서 오래 머문다. 화려함 대신 기본에 대한 집착이 빚어낸 결과물이다. 해장과 동시에 다음 한 잔을 부르는, 중식당이 가질 수 있는 최고의 덕목을 갖추었다.', query: '제주 왕서방식당' },
  { id: 3, name: '황금돈가', img: `${IMG_BASE}/3.jpg`, brief: '제주 흑돼지의 육즙이 입안에서 폭발하는 순간... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221209043068', story: '제주 흑돼지의 가능성을 재정의하는 공간. 두툼한 목살과 멜젓의 조합은 이미 정석으로 자리했고, 그릴 위에서 완성되는 마지막 터치는 수년간의 노하우가 응축된 순간이다. 고기의 질과 다루는 손길, 그 둘의 만남이 만들어내는 완성도가 인상적이다.', query: '제주 황금돈가' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.jpg`, brief: '인생 커피를 만날 확률 99.9%의 감성 공간... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224114102719', story: '직접 로스팅한 원두에서 풍기는 향미는 이 공간의 정체성이다. 제주 시내 한편에 자리한 이 휴식처는 커피와 수제 디저트의 균형을 이해하고 있다. 시끄럽지 않은 품격, 과하지 않은 친절함. 여행 중 필요한 휴식의 기준을 제시한다.', query: '제주 커피구십구점구' },
  { id: 5, name: '짬뽕에취한날', img: `${IMG_BASE}/5.jpg`, brief: '갈비짬뽕 한 그릇에 담긴 묵직한 내공... ', blogUrl: 'https://blog.naver.com/jejuopsuye/221207381828', story: '해산물 짬뽕의 대안을 제시하는 한 그릇. 갈비가 통째로 담긴 비주얼은 단순한 과시가 아니다. 깊은 고기 육수가 면과 재료를 감싸며, 해산물 위주의 짬뽕과는 명확히 구분되는 맛의 세계를 연다. 묵직함이 주는 만족감이 남다르다.', query: '제주 짬뽕에취한날' },
  { id: 6, name: '하윤이네', img: `${IMG_BASE}/6.jpg`, brief: '집밥보다 더 따뜻한 정성이 가득한 제주 식탁... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224063605688', story: '정갈한 밑반찬과 메인 요리의 구성은 단순한 식사가 아니라 한 끼에 대한 태도를 보여준다. 엄마의 손맛을 떠올리게 하는 정성은 여행 중 피로한 속을 위로하기에 충분하다. 제주에서 찾기 어려운, 편안함의 기준을 제시하는 공간이다.', query: '제주 하윤이네' },
  { id: 7, name: '램스키친', img: `${IMG_BASE}/7.jpg`, brief: '양고기의 편견을 깨는 부드럽고 잡내 없는 식감... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224002909182', story: '프리미엄 양갈비를 전문적으로 다루는 이곳은 양고기에 대한 편견을 해체한다. 전문 에디터의 그릴링은 온도와 시간에 대한 이해가 녹아 있다. 와인 한 잔과 함께하면 제주의 밤은 예상과 다른 방식으로 기억에 남는다.', query: '제주 램스키친' },
  { id: 8, name: '청기와장어', img: `${IMG_BASE}/8.jpg`, brief: '지친 기력을 보강해줄 힘이 불끈 솟는 장어... ', blogUrl: 'https://blog.naver.com/jejuopsuye/223972283259', story: '숯불 위에서 구워지는 두툼한 장어는 고소함의 정점을 보여준다. 특제 소스와 생강채의 조합은 환절기 보양의 정석이다. 지친 기력을 보충하는 한 끼로서의 역할을 넘어, 맛 그 자체로 기억에 남는 공간이다.', query: '제주 청기와장어' },
  { id: 9, name: '섬타르', img: `${IMG_BASE}/9.jpg`, brief: '제주 로컬 식재료를 담은 타르트의 달콤한 유혹... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224066284940', story: '제주의 흙과 바람이 키운 재료들이 타르트 속에 담긴다. 시각과 미각을 동시에 만족시키는 구성은 선물용으로도 손색이 없다. 섬의 맛을 달콤함으로 번역한 결과물이 이곳에 있다.', query: '제주 섬타르' },
  { id: 10, name: '브와두스', img: `${IMG_BASE}/10.jpg`, brief: '매일 아침 갓 구운 빵 냄새가 반겨주는 베이커리... ', blogUrl: 'https://blog.naver.com/jejuopsuye/224039782737', story: '신선한 재료와 정직한 제조 과정이 만드는 빵과 케이크가 공간을 채운다. 넓은 매장은 서두르지 않는 커피 타임을 위한 설계다. 베이커리 카페가 지향해야 할 모델을 보여주는 공간이다.', query: '제주 브와두스' },
];

type Shop = (typeof initialShops)[number];

export default function JejuRealMaster() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  }, []);

  const handlePromoteToFirst = (clickedShop: Shop) => {
    setShops((prev) => {
      const others = prev.filter((s) => s.id !== clickedShop.id);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
      return [clickedShop, ...shuffledOthers];
    });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-orange-500">
      {/* 1. 상단 VS 배틀 그리드 (10개 고정 노출) */}
      <section className="p-0 border-b border-slate-800">
        <h1 className="text-center text-sm font-black py-4 bg-orange-600 tracking-tighter">JEJU GOURMET INTELLIGENCE: REAL BATTLE</h1>
        <div className="grid grid-cols-2 gap-0 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 z-10"></div>

          {shops.slice(0, 10).map((shop, index) => (
            <div
              key={shop.id}
              role="button"
              tabIndex={0}
              onClick={() => handlePromoteToFirst(shop)}
              onKeyDown={(e) => e.key === 'Enter' && handlePromoteToFirst(shop)}
              className="relative border-b border-slate-800 p-4 pb-6 cursor-pointer hover:bg-slate-900/50 transition-colors active:bg-slate-800/50"
            >
              {/* VS 배지 */}
              {index % 2 === 0 && (
                <div className="absolute -right-[18px] top-[40%] z-20 bg-white text-black text-[10px] font-black px-1.5 py-0.5 rounded-sm skew-x-[-15deg]">VS</div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center justify-center py-1">
                  <span className="text-[10px] font-black bg-slate-800 px-2 py-0.5 rounded italic mb-1.5">RANK {index + 1}</span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-center w-full leading-none">
                    {shop.name[0] && <span className="text-red-500">{shop.name[0]}</span>}
                    <span className="text-white">{shop.name.slice(1)}</span>
                  </h2>
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
                  <a
                    href={`#story-${shop.id}`}
                    onClick={(e) => {
                      handlePromoteToFirst(shop);
                    }}
                    className="text-blue-400 font-bold ml-1 hover:text-white transition-colors"
                  >
                    [자세히 더보기]
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 하단 상세 EEAT 스토리 섹션 (상단과 동일한 셔플 순서) */}
      <section className="px-6 py-16 md:px-12 md:py-24 space-y-48 md:space-y-64 bg-gradient-to-b from-slate-900 to-black pb-48 md:pb-64">
        <h2 className="text-3xl md:text-4xl font-black text-center text-slate-500 tracking-widest mb-24">DEEP ANALYSIS</h2>
        {(shops.length > 0 ? shops : initialShops).map((shop) => (
          <article id={`story-${shop.id}`} key={shop.id} className="scroll-mt-24 max-w-3xl mx-auto">
            <header className="mb-16">
              <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">Expert View</span>
              <h3 className="text-4xl md:text-5xl font-black mt-4 text-white tracking-tight">{shop.name}</h3>
            </header>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-slate-300 leading-[1.9] font-serif italic border-l-4 border-orange-600 pl-8 pr-4 mb-20">
                &quot;{shop.story}&quot;
              </p>

              {/* 실제 데이터 증명 (지도) */}
              <div className="grid grid-cols-2 gap-4 my-16">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 py-5 rounded-2xl font-bold border border-slate-700 hover:bg-green-900 transition-all text-sm text-center"
                >
                  📍 NAVER MAP
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 py-5 rounded-2xl font-bold border border-slate-700 hover:bg-blue-900 transition-all text-sm text-center"
                >
                  🗺️ GOOGLE MAP
                </a>
              </div>

              {/* 블로그 원문 링크 */}
              <a href={shop.blogUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-white text-black py-8 rounded-3xl font-black text-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-2xl mt-20">
                🔗 블로그 원문 데이터 확인하기
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* 배포 출처 표기 */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center space-y-2">
        <a
          href="/ko/stealth-best-10"
          className="text-orange-500 text-sm font-bold hover:text-orange-400 transition-colors block"
        >
          Stealth Best 10 갤러리 보기
        </a>
        <a
          href="https://mworld-company.vercel.app/stealth-best-3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 text-xs hover:text-orange-500 transition-colors"
        >
          mworld-company.vercel.app
        </a>
      </footer>
    </div>
  );
}
