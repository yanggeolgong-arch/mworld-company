'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

const initialShops = [
  { id: 1, name: '연동대게회타운', img: `${IMG_BASE}/1.jpeg`, rating: 4.9, reviewCount: 12345, brief: '제주 대게의 정점', teaser: '신선한 대게 회와 볶음밥', story: '제주 연동에서 대게 전문으로 운영하는 맛집입니다.', blogUrl: '#', query: '제주 연동대게회타운' },
  { id: 2, name: '섬타르', img: `${IMG_BASE}/2.jpeg`, rating: 4.8, reviewCount: 8765, brief: '제주 로컬 타르트', teaser: '구좌 당근, 우도 땅콩 타르트', story: '제주 원재료를 담은 달콤한 타르트 전문점입니다.', blogUrl: '#', query: '제주 섬타르' },
  { id: 3, name: '브와두스', img: `${IMG_BASE}/3.jpeg`, rating: 4.9, reviewCount: 9876, brief: '베이커리 카페', teaser: '갓 구운 빵과 커피', story: '매일 아침 갓 구운 빵이 반기는 베이커리 카페입니다.', blogUrl: '#', query: '제주 브와두스' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.jpeg`, rating: 4.7, reviewCount: 5432, brief: '바리스타의 철학', teaser: '99.9% 완벽한 커피', story: '직접 로스팅한 원두의 깊은 향미를 느껴보세요.', blogUrl: '#', query: '제주 커피구십구점구' },
  { id: 5, name: '돈이랑', img: `${IMG_BASE}/5.jpeg`, rating: 4.8, reviewCount: 7654, brief: '흑돼지 전문', teaser: '제주 흑돼지의 정석', story: '숯불에 구운 흑돼지의 육즙을 만나보세요.', blogUrl: '#', query: '제주 돈이랑' },
  { id: 6, name: '자매국수', img: `${IMG_BASE}/6.jpeg`, rating: 4.6, reviewCount: 4321, brief: '칼국수·비빔국수', teaser: '쫄깃한 면발의 맛', story: '로컬들이 찾는 국수 전문점입니다.', blogUrl: '#', query: '제주 자매국수' },
  { id: 7, name: '우진해장국', img: `${IMG_BASE}/7.jpeg`, rating: 4.7, reviewCount: 6543, brief: '30년 전통 해장국', teaser: '진한 소고기 육수', story: '깊은 육수에 푹 고아낸 해장국 전문입니다.', blogUrl: '#', query: '제주 우진해장국' },
  { id: 8, name: '고집돌우럭', img: `${IMG_BASE}/8.jpeg`, rating: 4.8, reviewCount: 3456, brief: '우럭 전문', teaser: '바다의 신선함', story: '제주 바다의 우럭을 신선하게 제공합니다.', blogUrl: '#', query: '제주 고집돌우럭' },
  { id: 9, name: '맛나식당', img: `${IMG_BASE}/9.jpeg`, rating: 4.5, reviewCount: 5678, brief: '제주 향토음식', teaser: '전통 한정식', story: '갈치조림, 해물탕 등 푸짐한 상차림을 맛보세요.', blogUrl: '#', query: '제주 맛나식당' },
  { id: 10, name: '램스키친', img: `${IMG_BASE}/10.jpeg`, rating: 4.9, reviewCount: 7890, brief: '양갈비 전문', teaser: '프리미엄 양고기', story: '잡내 없는 부드러운 양갈비를 경험해보세요.', blogUrl: '#', query: '제주 램스키친' },
];

export default function JejuGourmetBest10() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shops, setShops] = useState<typeof initialShops>([]);

  useEffect(() => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  }, []);

  const handleRefresh = () => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  };

  const handleDetail = (shopId: number) => {
    const element = document.getElementById(`detail-${shopId}`);
    if (element && scrollRef.current) {
      const headerOffset = 80;
      const targetScroll = scrollRef.current.scrollTop + element.getBoundingClientRect().top - headerOffset;
      scrollRef.current.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollRef} className="min-h-screen w-full bg-[#f5f5f0] overflow-y-auto overflow-x-hidden">
      <main className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10">
        {/* 헤더 - 모바일 */}
        <header className="text-center mb-6 md:mb-8 md:hidden">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            제주도 맛집 베스트 10
          </h1>
          <p className="text-sm text-gray-500">
            접속 시 순위가 랜덤으로 바뀝니다!
          </p>
        </header>

        {/* 헤더 - PC */}
        <header className="text-center mb-6 md:mb-8 hidden md:block">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            제주도 맛집 베스트 10
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            접속할 때마다 무작위로 순위가 바뀝니다!
          </p>
        </header>

        {/* 모바일: 상위 3개 - 세로 카드(이미지 포함) */}
        <section className="md:hidden space-y-3">
          {shops.slice(0, 3).map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleDetail(shop.id)}
              className="flex items-center gap-4 bg-[#fafaf5] rounded-2xl p-4 shadow-md cursor-pointer active:scale-[0.99] transition-transform"
            >
              <span className="flex-shrink-0 text-2xl font-bold text-amber-600">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{shop.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="text-amber-500">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
                </p>
              </div>
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </section>

        {/* 모바일: 4~10위 - 2열 그리드(이미지 없음) */}
        <section className="md:hidden grid grid-cols-2 gap-3 mt-3">
          {shops.slice(3, 10).map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleDetail(shop.id)}
              className="bg-[#fafaf5] rounded-2xl p-4 shadow-md cursor-pointer active:scale-[0.99] transition-transform"
            >
              <span className="text-xl font-bold text-amber-600 block mb-1">
                {index + 4}
              </span>
              <h3 className="font-bold text-gray-900 text-sm truncate">{shop.name}</h3>
              <p className="text-xs text-gray-600 flex items-center gap-0.5 mt-1">
                <span className="text-amber-500">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
              </p>
            </div>
          ))}
        </section>

        {/* PC: 4열 그리드 - 이미지가 이름 아래, 카드 너비 채움 */}
        <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shops.map((shop, index) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-bold text-gray-900 truncate flex-1 min-w-0">{shop.name}</h3>
              </div>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-500 flex items-center gap-0.5">
                  <span className="text-yellow-500">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
                </p>
                <button
                  onClick={() => handleDetail(shop.id)}
                  className="flex-shrink-0 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 새로고침 버튼 (모바일) - 시계 반대방향 화살표 */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            새로고침
          </button>
        </div>

        {/* PC 새로고침 */}
        <div className="mt-8 hidden md:flex justify-center">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            새로고침
          </button>
        </div>

        {/* 상세 섹션 */}
        <section className="mt-16 space-y-20 pb-20">
          {shops.map((shop, index) => (
            <article
              id={`detail-${shop.id}`}
              key={shop.id}
              className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-orange-500 text-white text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-xl">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{shop.name}</h2>
                  <p className="text-gray-500">★ {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}</p>
                </div>
              </div>
              <div className="relative w-full aspect-video md:aspect-[2/1] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{shop.story}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded-xl"
                >
                  네이버 지도 바로가기
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(shop.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded-xl"
                >
                  구글 지도 바로가기
                </a>
                <a
                  href={shop.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl"
                >
                  자세히 보기
                </a>
              </div>
            </article>
          ))}
        </section>

        <footer className="py-10">
          <p className="text-xs text-gray-500 text-right">
            * 이것은 샘플이며, 실제 업체명과 사진은 다를 수 있습니다.
          </p>
        </footer>
      </main>
    </div>
  );
}
