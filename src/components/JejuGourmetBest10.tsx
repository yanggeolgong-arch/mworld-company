'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

/** 1~10 중 n개 랜덤 추출 (중복 없음) */
function pickRandomRanks(n: number): number[] {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

type NearbySpot = { name: string; mapX: number; mapY: number };

type Shop = {
  id: number;
  name: string;
  img: string;
  rating: number;
  reviewCount: number;
  brief: string;
  teaser: string;
  story: string;
  query: string;
  address: string;
  phone: string;
  hours: string;
  parking: string;
  menuPrice: string;
  carMinutesFromAirport: number;
  busRoutesFromAirport: string;
  mapX: number;
  mapY: number;
  nearbySpots: NearbySpot[];
  youtubeUrl: string;
  naverPlaceUrl: string;
  googlePlaceUrl: string;
};

const initialShops: Shop[] = [
  { id: 1, name: '연동대게회타운', img: `${IMG_BASE}/1.avif`, rating: 4.9, reviewCount: 12345, brief: '제주 대게의 정점', teaser: '신선한 대게 회와 볶음밥', story: '제주 연동에서 대게 전문으로 운영하는 맛집입니다.', query: '제주 연동대게회타운', address: '제주특별자치도 제주시 서해안로 638', phone: '064-747-9289', hours: '10:00 ~ 22:00', parking: '가능', menuPrice: '대게회 1인분 45,000원~', carMinutesFromAirport: 12, busRoutesFromAirport: '100번, 200번 (연동정류장 하차)', mapX: 25, mapY: 48, nearbySpots: [{ name: '연동해수욕장', mapX: 22, mapY: 50 }, { name: '이호테우해변', mapX: 28, mapY: 45 }], youtubeUrl: 'https://www.youtube.com/shorts/GY5YA2WraCc', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+연동대게회타운', googlePlaceUrl: 'https://www.google.com/maps/search/제주+연동대게회타운' },
  { id: 2, name: '섬타르', img: `${IMG_BASE}/2.avif`, rating: 4.8, reviewCount: 8765, brief: '제주 로컬 타르트', teaser: '구좌 당근, 우도 땅콩 타르트', story: '제주 원재료를 담은 달콤한 타르트 전문점입니다.', query: '제주 섬타르', address: '제주특별자치도 제주시 다랑곶1길 9', phone: '064-744-4467', hours: '09:30 ~ 22:30', parking: '불가(인근 주차)', menuPrice: '에그타르트 4,500원~', carMinutesFromAirport: 38, busRoutesFromAirport: '201번, 202번 (구좌 방면)', mapX: 78, mapY: 52, nearbySpots: [{ name: '비자림', mapX: 75, mapY: 48 }, { name: '해맞이해안로', mapX: 82, mapY: 54 }], youtubeUrl: 'https://www.youtube.com/shorts/e-94iwTxuDk', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+섬타르', googlePlaceUrl: 'https://www.google.com/maps/search/제주+섬타르' },
  { id: 3, name: '브와두스', img: `${IMG_BASE}/3.avif`, rating: 4.9, reviewCount: 9876, brief: '베이커리 카페', teaser: '갓 구운 빵과 커피', story: '매일 아침 갓 구운 빵이 반기는 베이커리 카페입니다.', query: '제주 브와두스', address: '제주특별자치도 제주시 애월읍 애월로1길 23', phone: '064-799-7717', hours: '08:00 ~ 20:00', parking: '가능', menuPrice: '크루아상 4,500원~', carMinutesFromAirport: 32, busRoutesFromAirport: '202번 (애월 방면)', mapX: 20, mapY: 42, nearbySpots: [{ name: '협재해수욕장', mapX: 12, mapY: 48 }, { name: '애월해안로', mapX: 18, mapY: 38 }], youtubeUrl: 'https://www.youtube.com/shorts/ZaOsu9VlM2A', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+브와두스', googlePlaceUrl: 'https://www.google.com/maps/search/제주+브와두스' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.avif`, rating: 4.7, reviewCount: 5432, brief: '바리스타의 철학', teaser: '99.9% 완벽한 커피', story: '직접 로스팅한 원두의 깊은 향미를 느껴보세요.', query: '제주 커피구십구점구', address: '제주특별자치도 제주시 한림읍 한림로 585', phone: '064-796-9099', hours: '10:00 ~ 19:00', parking: '가능', menuPrice: '아메리카노 5,000원~', carMinutesFromAirport: 42, busRoutesFromAirport: '202번 (한림 방면)', mapX: 15, mapY: 58, nearbySpots: [{ name: '한라수목원', mapX: 22, mapY: 52 }, { name: '수목원야시장', mapX: 20, mapY: 54 }], youtubeUrl: 'https://www.youtube.com/shorts/UdV2_-9_2iE', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+커피구십구점구', googlePlaceUrl: 'https://www.google.com/maps/search/제주+커피구십구점구' },
  { id: 5, name: '돈이랑', img: `${IMG_BASE}/5.avif`, rating: 4.8, reviewCount: 7654, brief: '흑돼지 전문', teaser: '제주 흑돼지의 정석', story: '숯불에 구운 흑돼지의 육즙을 만나보세요.', query: '돈이랑 일주서로', address: '제주특별자치도 서귀포시 일주서로 953', phone: '0507-1435-9278', hours: '11:30 ~ 24:00', parking: '가능', menuPrice: '흑돼지 1인분 15,000원~', carMinutesFromAirport: 48, busRoutesFromAirport: '600번 공항리무진 (중문 터미널 하차)', mapX: 52, mapY: 88, nearbySpots: [{ name: '중문관광단지', mapX: 48, mapY: 90 }, { name: '천지연폭포', mapX: 55, mapY: 92 }], youtubeUrl: 'https://www.youtube.com/shorts/NNiF2xzWorg', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=돈이랑+일주서로+953', googlePlaceUrl: 'https://www.google.com/maps/search/돈이랑+일주서로+953' },
  { id: 6, name: '자매국수', img: `${IMG_BASE}/6.avif`, rating: 4.6, reviewCount: 4321, brief: '칼국수·비빔국수', teaser: '쫄깃한 면발의 맛', story: '로컬들이 찾는 국수 전문점입니다.', query: '제주 자매국수', address: '제주특별자치도 제주시 한림읍 한림로 559', phone: '064-796-2020', hours: '09:00 ~ 20:00', parking: '가능', menuPrice: '칼국수 8,000원~', carMinutesFromAirport: 44, busRoutesFromAirport: '202번 (한림 방면)', mapX: 16, mapY: 60, nearbySpots: [{ name: '한림공원', mapX: 14, mapY: 58 }, { name: '협재해수욕장', mapX: 12, mapY: 55 }], youtubeUrl: 'https://www.youtube.com/shorts/r5NfMgCbU8Y', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+자매국수', googlePlaceUrl: 'https://www.google.com/maps/search/제주+자매국수' },
  { id: 7, name: '우진해장국', img: `${IMG_BASE}/7.avif`, rating: 4.7, reviewCount: 6543, brief: '30년 전통 해장국', teaser: '진한 소고기 육수', story: '깊은 육수에 푹 고아낸 해장국 전문입니다.', query: '제주 우진해장국', address: '제주특별자치도 제주시 삼도2동 1075-3', phone: '064-722-0033', hours: '07:00 ~ 21:00', parking: '가능', menuPrice: '해장국 9,000원~', carMinutesFromAirport: 15, busRoutesFromAirport: '100번, 200번 (삼도정류장 하차)', mapX: 38, mapY: 42, nearbySpots: [{ name: '삼도해수욕장', mapX: 35, mapY: 38 }, { name: '동문재래시장', mapX: 42, mapY: 44 }], youtubeUrl: 'https://www.youtube.com/shorts/4DlRyY9UP08', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+우진해장국', googlePlaceUrl: 'https://www.google.com/maps/search/제주+우진해장국' },
  { id: 8, name: '고집돌우럭', img: `${IMG_BASE}/8.avif`, rating: 4.8, reviewCount: 3456, brief: '우럭 전문', teaser: '바다의 신선함', story: '제주 바다의 우럭을 신선하게 제공합니다.', query: '제주 고집돌우럭', address: '제주특별자치도 서귀포시 성산읍 성산중앙로 64', phone: '064-782-0011', hours: '11:00 ~ 21:00', parking: '가능', menuPrice: '우럭구이 1인분 35,000원~', carMinutesFromAirport: 52, busRoutesFromAirport: '201번 (성산 방면)', mapX: 85, mapY: 72, nearbySpots: [{ name: '성산일출봉', mapX: 90, mapY: 75 }, { name: '섭지코지', mapX: 88, mapY: 68 }], youtubeUrl: 'https://www.youtube.com/shorts/4OVfq2hI3vo', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+고집돌우럭', googlePlaceUrl: 'https://www.google.com/maps/search/제주+고집돌우럭' },
  { id: 9, name: '맛나식당', img: `${IMG_BASE}/9.avif`, rating: 4.5, reviewCount: 5678, brief: '제주 향토음식', teaser: '전통 한정식', story: '갈치조림, 해물탕 등 푸짐한 상차림을 맛보세요.', query: '제주 맛나식당', address: '제주특별자치도 제주시 구좌읍 해맞이해안로 402', phone: '064-782-3333', hours: '11:00 ~ 21:00', parking: '가능', menuPrice: '갈치조림 25,000원~', carMinutesFromAirport: 40, busRoutesFromAirport: '201번 (구좌 방면)', mapX: 78, mapY: 55, nearbySpots: [{ name: '해맞이해안로', mapX: 82, mapY: 56 }, { name: '비자림', mapX: 75, mapY: 50 }], youtubeUrl: 'https://www.youtube.com/shorts/hvwZbDSkLG8', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+맛나식당', googlePlaceUrl: 'https://www.google.com/maps/search/제주+맛나식당' },
  { id: 10, name: '램스키친', img: `${IMG_BASE}/10.avif`, rating: 4.9, reviewCount: 7890, brief: '양갈비 전문', teaser: '프리미엄 양고기', story: '잡내 없는 부드러운 양갈비를 경험해보세요.', query: '제주 램스키친', address: '제주특별자치도 제주시 노형동 1055', phone: '064-711-9292', hours: '12:00 ~ 22:00', parking: '가능', menuPrice: '양갈비 1인분 28,000원~', carMinutesFromAirport: 18, busRoutesFromAirport: '100번, 200번 (노형 방면)', mapX: 32, mapY: 38, nearbySpots: [{ name: '노형수퍼', mapX: 30, mapY: 36 }, { name: '제주테디베어뮤지엄', mapX: 28, mapY: 42 }], youtubeUrl: 'https://www.youtube.com/shorts/IdMwKln6sqw', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+램스키친', googlePlaceUrl: 'https://www.google.com/maps/search/제주+램스키친' },
];

export default function JejuGourmetBest10() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [expandedShop, setExpandedShop] = useState<{ shop: Shop; index: number } | null>(null);
  const [ytMuted, setYtMuted] = useState(true);
  const [ytLoaded, setYtLoaded] = useState(false);
  const hasPushedRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  }, []);

  /** 모바일 슬라이드 페이지: 1~3페이지=9개 고유, 4페이지부터=랜덤 3개 */
  const slidePages = useMemo(() => {
    if (shops.length < 10) return [];
    const pages: { shops: Shop[]; ranks: number[] }[] = [];
    for (let i = 0; i < 3; i++) {
      const trio = shops.slice(i * 3, i * 3 + 3);
      pages.push({ shops: trio, ranks: pickRandomRanks(3) });
    }
    const remaining = shops[9];
    const extra = shops.filter((_, idx) => idx < 9);
    const j = Math.floor(Math.random() * extra.length);
    const k = Math.floor(Math.random() * extra.length);
    const a = extra[j];
    const b = j === k ? extra[(k + 1) % extra.length] : extra[k];
    pages.push({ shops: [remaining, a, b], ranks: pickRandomRanks(3) });
    return pages;
  }, [shops]);

  /** 모바일 하단: 나머지 7개 (인덱스 3~9) 랜덤 배치 + 랜덤 순위 */
  const belowShopsWithRanks = useMemo(() => {
    if (shops.length < 10) return [];
    const list = [...shops.slice(3, 10)].sort(() => Math.random() - 0.5);
    const ranks = pickRandomRanks(7);
    return list.map((shop, i) => ({ shop, rank: ranks[i] ?? i + 4 }));
  }, [shops]);

  const handleDetail = (shop: Shop, index: number) => {
    setExpandedShop({ shop, index });
    setYtMuted(true);
    setYtLoaded(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ modal: 'detail' }, '', window.location.href);
      hasPushedRef.current = true;
    }
  };

  const closeDetail = () => {
    setExpandedShop(null);
    if (typeof window !== 'undefined' && hasPushedRef.current) {
      hasPushedRef.current = false;
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setExpandedShop(null);
      hasPushedRef.current = false;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getYoutubeVideoId = (url: string): string | null => {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];
    return null;
  };

  return (
    <div className="h-[100dvh] lg:h-screen w-full bg-[#f5f5f0] overflow-hidden flex flex-col tracking-[-0.01em] leading-relaxed">
      <a href="#main-content" className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg focus:font-bold focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:clip-auto">
        본문으로 건너뛰기
      </a>
      <main
        id="main-content"
        className="flex-1 min-h-0 flex flex-col items-center w-full px-4 sm:px-6 lg:px-6 overflow-y-scroll overflow-x-hidden lg:overflow-hidden overscroll-contain pt-[max(1rem,env(safe-area-inset-top))] lg:pt-0"
        aria-label="제주도 맛집 베스트 10 목록"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {/* 헤더 - 페이지당 h1 하나, 시맨틱 제목 계층 준수 */}
        <header className="text-center py-3 sm:py-4 lg:py-0.5 lg:mb-0 w-full flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl lg:text-lg font-bold text-gray-900 mb-1 lg:mb-0 tracking-tight">
            제주도 맛집 베스트 10
          </h1>
          <p className="text-sm sm:text-base lg:text-xs text-gray-700 lg:text-gray-600 tracking-wide">
            접속 시 순위가 랜덤으로 바뀝니다!
          </p>
        </header>

        {/* 모바일/폴드/태블릿: 가로 슬라이드(3개씩) + 하단 7개 - 끝까지 스크롤 가능 */}
        <section className="lg:hidden w-full flex-none flex flex-col">
          {/* 가로 슬라이드 - 한 화면에 3개, 스와이프 (고정 높이) */}
          <div
            ref={carouselRef}
            className="flex-shrink-0 min-h-[36vh] sm:min-h-[38vh] md:min-h-[32vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {slidePages.map((page, pageIdx) => (
              <div
                key={pageIdx}
                className="flex-shrink-0 w-full min-w-full snap-center grid grid-cols-3 gap-2 px-3"
                style={{ width: '100%' }}
              >
                {page.shops.map((shop, idx) => {
                  const rank = page.ranks[idx];
                  const isTopInPage = rank === Math.min(...page.ranks);
                  const realIndex = shops.findIndex((s) => s.id === shop.id);
                  const isLcp = pageIdx === 0 && idx < 3;
                  return (
                    <button
                      key={`${pageIdx}-${shop.id}`}
                      type="button"
                      onClick={() => handleDetail(shop, realIndex)}
                      className="flex flex-col bg-[#fafaf5] rounded-2xl p-3 shadow-lg cursor-pointer active:scale-[0.98] transition-transform touch-manipulation select-none overflow-hidden text-left w-full min-h-[44px]"
                      aria-label={`${shop.name}, ${rank}위, 자세히 보기`}
                    >
                      <span
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold ${
                          isTopInPage
                            ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white shadow-md'
                            : 'bg-amber-500/30 text-amber-800'
                        }`}
                        aria-hidden
                      >
                        {rank}
                      </span>
                      <div className="relative flex-1 min-h-[72px] sm:min-h-[88px] rounded-xl overflow-hidden bg-gray-100 mt-2">
                        <Image
                          src={shop.img}
                          alt={`${shop.name} - ${shop.brief}`}
                          fill
                          sizes="(max-width: 640px) 33vw, 120px"
                          className="object-cover"
                          priority={isLcp}
                          fetchPriority={isLcp ? 'high' : undefined}
                        />
                      </div>
                      <h2 className="font-bold text-gray-900 text-sm sm:text-base truncate mt-2 tracking-tight">
                        {shop.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-0.5 mt-0.5">
                        <span className="text-amber-600" aria-hidden>★</span> {shop.rating} · {shop.reviewCount.toLocaleString()}
                      </p>
                      <span className="inline-block mt-1.5 text-xs font-semibold text-orange-600">자세히 보기</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          {/* 하단: 나머지 7개 랜덤 배치 - content-visibility로 초기 렌더 비용 절감 */}
          <div className="flex-shrink-0 px-4 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]" style={{ contentVisibility: 'auto' } as React.CSSProperties}>
            <p className="text-sm text-gray-600 mb-3">예시이며, 실제 데이터는 무작위로 변경됩니다.</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {belowShopsWithRanks.map(({ shop, rank }) => {
                const realIndex = shops.findIndex((s) => s.id === shop.id);
                return (
                  <button
                    key={shop.id}
                    type="button"
                    onClick={() => handleDetail(shop, realIndex)}
                    className="bg-[#fafaf5] rounded-2xl p-4 shadow-md cursor-pointer active:scale-[0.99] transition-transform touch-manipulation select-none flex flex-col text-left w-full min-h-[44px]"
                    aria-label={`${shop.name}, ${rank}위, 자세히 보기`}
                  >
                    <span className="text-2xl font-bold text-amber-600 block mb-1" aria-hidden>{rank}</span>
                    <h2 className="font-bold text-gray-900 text-base truncate">{shop.name}</h2>
                    <p className="text-sm text-gray-600 flex items-center gap-0.5 mt-1">
                      <span className="text-amber-600" aria-hidden>★</span> {shop.rating} · {shop.reviewCount.toLocaleString()}
                    </p>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mt-2">
                      <Image
                        src={shop.img}
                        alt={`${shop.name} - ${shop.brief}`}
                        fill
                        sizes="50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="inline-block mt-2 text-sm font-semibold text-orange-600">자세히 보기</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* PC: 5열 2행 - 화면 꽉 채움 (완벽 1페이지) */}
        <section className="hidden lg:flex flex-1 min-h-0 w-full justify-center items-stretch px-2">
          <div className="grid grid-cols-5 grid-rows-2 gap-3 w-full h-full min-h-0">
            {shops.map((shop, index) => (
              <div
                key={shop.id}
                role="button"
                tabIndex={0}
                onClick={() => handleDetail(shop, index)}
                onKeyDown={(e) => e.key === 'Enter' && handleDetail(shop, index)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col text-center min-h-0 cursor-pointer active:scale-[0.99] transition-transform"
                aria-label={`${shop.name}, ${index + 1}위, 자세히 보기`}
              >
                <div className="flex flex-col items-center gap-0.5 mb-1 flex-shrink-0">
                  <span className="w-16 h-16 rounded-full bg-orange-500 text-white text-3xl font-bold flex items-center justify-center tracking-tight">
                    {index + 1}
                  </span>
                  <h2 className="font-bold text-gray-900 truncate w-full text-3xl tracking-tight">{shop.name}</h2>
                </div>
                <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
                  <Image
                    src={shop.img}
                    alt={shop.name}
                    fill
                    sizes="20vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0 mt-1">
                  <p className="text-2xl text-gray-600 flex items-center justify-center gap-0.5 tracking-wide">
                    <span className="text-amber-600">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDetail(shop, index); }}
                    className="w-full py-4 px-4 bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold rounded-lg transition-colors tracking-wide"
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 확장 상세 모달 */}
        {expandedShop && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={closeDetail}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-6 tracking-[-0.01em] leading-relaxed">
                  <button
                    onClick={closeDetail}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="닫기"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-4 mb-4" id="modal-title">
                    <span className="w-12 h-12 rounded-xl bg-orange-500 text-white text-2xl font-bold flex items-center justify-center flex-shrink-0 tracking-tight" aria-hidden>
                      {expandedShop.index + 1}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{expandedShop.shop.name}</h2>
                  </div>
                  <div id="modal-desc" className="sr-only">
                    {expandedShop.shop.name} 상세 정보. 주소, 전화번호, 영업시간, 네이버 플레이스, 구글 플레이스 링크 제공.
                  </div>
                  {getYoutubeVideoId(expandedShop.shop.youtubeUrl) ? (
                    <div className="relative w-full aspect-[9/16] max-h-[320px] rounded-xl overflow-hidden mb-4 bg-black">
                      {ytLoaded ? (
                        <>
                          <iframe
                            id="yt-embed-player"
                            src={`https://www.youtube.com/embed/${getYoutubeVideoId(expandedShop.shop.youtubeUrl)}?autoplay=1&mute=1&enablejsapi=1`}
                            title={`${expandedShop.shop.name} 유튜브 후기`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                          {ytMuted && (
                            <button
                              type="button"
                              onClick={() => {
                                const iframe = document.getElementById('yt-embed-player') as HTMLIFrameElement | null;
                                if (iframe?.contentWindow) {
                                  iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', 'https://www.youtube.com');
                                }
                                setYtMuted(false);
                              }}
                              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 py-3 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg border-2 border-white pointer-events-auto z-10 transition-colors min-h-[48px] min-w-[48px]"
                              aria-label="음소거 해제"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                              </svg>
                              음소거 해제
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setYtLoaded(true)}
                          className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
                          aria-label={`${expandedShop.shop.name} 유튜브 재생`}
                        >
                          <Image
                            src={`https://img.youtube.com/vi/${getYoutubeVideoId(expandedShop.shop.youtubeUrl)}/hqdefault.jpg`}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" aria-hidden />
                          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10" aria-hidden>
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={expandedShop.shop.img}
                        alt={expandedShop.shop.name}
                        fill
                        sizes="400px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-3 text-base text-gray-700 mb-4 leading-relaxed tracking-wide">
                    <p><span className="font-semibold text-gray-900">주소:</span> {expandedShop.shop.address}</p>
                    {/* 구글맵·네이버맵 - 주소~공항버스 사이 컴팩트 배치 */}
                    <div className="grid grid-cols-2 gap-2 my-3">
                      <div className="rounded-lg overflow-hidden border border-gray-200 h-[100px]">
                        <iframe
                          src={`https://www.google.com/maps?q=${encodeURIComponent(expandedShop.shop.address)}&output=embed&z=15`}
                          title={`${expandedShop.shop.name} 구글 지도`}
                          className="w-full h-full border-0"
                          loading="lazy"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden border border-gray-200 h-[100px]">
                        <iframe
                          src={`https://map.naver.com/v5/search/${encodeURIComponent(expandedShop.shop.name + ' 제주')}`}
                          title={`${expandedShop.shop.name} 네이버 지도`}
                          className="w-full h-full border-0"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <p><span className="font-semibold text-gray-900">전화:</span> {expandedShop.shop.phone}</p>
                    <p><span className="font-semibold text-gray-900">영업시간:</span> {expandedShop.shop.hours}</p>
                    <p><span className="font-semibold text-gray-900">주차:</span> {expandedShop.shop.parking}</p>
                    <p><span className="font-semibold text-gray-900">대표메뉴 가격:</span> {expandedShop.shop.menuPrice}</p>
                    <p><span className="font-semibold text-gray-900">공항에서 차로:</span> 약 {expandedShop.shop.carMinutesFromAirport}분</p>
                    <p><span className="font-semibold text-gray-900">공항 버스:</span> {expandedShop.shop.busRoutesFromAirport}</p>
                  </div>
                  {/* 제주도 지도 - OSM 기반 지도 이미지 + 공항/매장/관광지 마커 */}
                  <div className="mb-4 rounded-xl overflow-hidden bg-[#f0f9ff] border border-gray-200 p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      공항에서 {expandedShop.shop.name} 위치
                    </p>
                    <div className="relative w-full aspect-[16/10] max-h-[260px] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src="/images/jeju-map/jeju-osm.avif"
                        alt="제주도 지도"
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-contain"
                      />
                      {/* 마커 오버레이 (0-100 좌표계 → % 위치) */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* ① 제주국제공항 */}
                        <div
                          className="absolute -translate-x-1/2 -translate-y-full"
                          style={{ left: '32%', top: '14%' }}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✈</span>
                            </div>
                            <span className="text-[10px] font-bold text-red-700 whitespace-nowrap mt-0.5">제주국제공항</span>
                          </div>
                        </div>
                        {/* ② 매장 */}
                        <div
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${expandedShop.shop.mapX}%`, top: `${expandedShop.shop.mapY}%` }}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-md" />
                            <span className="text-[9px] font-semibold text-orange-700 whitespace-nowrap mt-0.5 max-w-[80px] truncate">{expandedShop.shop.name}</span>
                          </div>
                        </div>
                        {/* ③ 근처 관광지 */}
                        {expandedShop.shop.nearbySpots.map((spot) => (
                          <div
                            key={spot.name}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${spot.mapX}%`, top: `${spot.mapY}%` }}
                          >
                            <div className="w-3 h-3 rounded-full bg-blue-500 border border-white" />
                            <span className="text-[8px] text-blue-700 whitespace-nowrap block text-center mt-0.5">{spot.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
                      <span><span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-1 align-middle" />제주국제공항</span>
                      <span><span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1 align-middle" />{expandedShop.shop.name}</span>
                      {expandedShop.shop.nearbySpots.length > 0 && (
                        <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1 align-middle" />{expandedShop.shop.nearbySpots.map((s) => s.name).join(', ')}</span>
                      )}
                      <span className="text-gray-600">· 차로 약 {expandedShop.shop.carMinutesFromAirport}분</span>
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">지도: © OpenStreetMap, Kelisi (CC BY-SA 4.0)</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <a
                      href={expandedShop.shop.naverPlaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 w-full py-7 px-8 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-2xl transition-colors tracking-wide"
                    >
                      <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#03C75A] font-black text-4xl flex-shrink-0">N</span>
                      네이버 플레이스
                    </a>
                    <a
                      href={expandedShop.shop.googlePlaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 w-full py-7 px-8 rounded-xl border-2 border-gray-200 hover:bg-gray-50 font-bold text-2xl transition-colors tracking-wide"
                    >
                      <svg className="w-16 h-16 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      구글 플레이스
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <footer className="py-1 lg:py-0.5 w-full flex-shrink-0 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:pb-0 hidden lg:block">
          <p className="text-[10px] lg:text-xs text-gray-600 text-right tracking-wide">
            * 이것은 샘플이며, 실제 업체명과 사진은 다를 수 있습니다.
          </p>
        </footer>
      </main>
    </div>
  );
}
