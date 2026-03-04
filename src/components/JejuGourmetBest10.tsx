'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMG_BASE = '/images/stealth-best-10';

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
  youtubeUrl: string;
  naverPlaceUrl: string;
  googlePlaceUrl: string;
};

const initialShops: Shop[] = [
  { id: 1, name: '연동대게회타운', img: `${IMG_BASE}/1.jpeg`, rating: 4.9, reviewCount: 12345, brief: '제주 대게의 정점', teaser: '신선한 대게 회와 볶음밥', story: '제주 연동에서 대게 전문으로 운영하는 맛집입니다.', query: '제주 연동대게회타운', address: '제주특별자치도 제주시 서해안로 638', phone: '064-747-9289', hours: '10:00 ~ 22:00', parking: '가능', menuPrice: '대게회 1인분 45,000원~', youtubeUrl: 'https://www.youtube.com/shorts/GY5YA2WraCc', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+연동대게회타운', googlePlaceUrl: 'https://www.google.com/maps/search/제주+연동대게회타운' },
  { id: 2, name: '섬타르', img: `${IMG_BASE}/2.jpeg`, rating: 4.8, reviewCount: 8765, brief: '제주 로컬 타르트', teaser: '구좌 당근, 우도 땅콩 타르트', story: '제주 원재료를 담은 달콤한 타르트 전문점입니다.', query: '제주 섬타르', address: '제주특별자치도 제주시 다랑곶1길 9', phone: '064-744-4467', hours: '09:30 ~ 22:30', parking: '불가(인근 주차)', menuPrice: '에그타르트 4,500원~', youtubeUrl: 'https://www.youtube.com/shorts/e-94iwTxuDk', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+섬타르', googlePlaceUrl: 'https://www.google.com/maps/search/제주+섬타르' },
  { id: 3, name: '브와두스', img: `${IMG_BASE}/3.jpeg`, rating: 4.9, reviewCount: 9876, brief: '베이커리 카페', teaser: '갓 구운 빵과 커피', story: '매일 아침 갓 구운 빵이 반기는 베이커리 카페입니다.', query: '제주 브와두스', address: '제주특별자치도 제주시 애월읍 애월로1길 23', phone: '064-799-7717', hours: '08:00 ~ 20:00', parking: '가능', menuPrice: '크루아상 4,500원~', youtubeUrl: 'https://www.youtube.com/shorts/ZaOsu9VlM2A', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+브와두스', googlePlaceUrl: 'https://www.google.com/maps/search/제주+브와두스' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.jpeg`, rating: 4.7, reviewCount: 5432, brief: '바리스타의 철학', teaser: '99.9% 완벽한 커피', story: '직접 로스팅한 원두의 깊은 향미를 느껴보세요.', query: '제주 커피구십구점구', address: '제주특별자치도 제주시 한림읍 한림로 585', phone: '064-796-9099', hours: '10:00 ~ 19:00', parking: '가능', menuPrice: '아메리카노 5,000원~', youtubeUrl: 'https://www.youtube.com/shorts/UdV2_-9_2iE', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+커피구십구점구', googlePlaceUrl: 'https://www.google.com/maps/search/제주+커피구십구점구' },
  { id: 5, name: '돈이랑', img: `${IMG_BASE}/5.jpeg`, rating: 4.8, reviewCount: 7654, brief: '흑돼지 전문', teaser: '제주 흑돼지의 정석', story: '숯불에 구운 흑돼지의 육즙을 만나보세요.', query: '돈이랑 일주서로', address: '제주특별자치도 서귀포시 일주서로 953', phone: '0507-1435-9278', hours: '11:30 ~ 24:00', parking: '가능', menuPrice: '흑돼지 1인분 15,000원~', youtubeUrl: 'https://www.youtube.com/shorts/NNiF2xzWorg', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=돈이랑+일주서로+953', googlePlaceUrl: 'https://www.google.com/maps/search/돈이랑+일주서로+953' },
  { id: 6, name: '자매국수', img: `${IMG_BASE}/6.jpeg`, rating: 4.6, reviewCount: 4321, brief: '칼국수·비빔국수', teaser: '쫄깃한 면발의 맛', story: '로컬들이 찾는 국수 전문점입니다.', query: '제주 자매국수', address: '제주특별자치도 제주시 한림읍 한림로 559', phone: '064-796-2020', hours: '09:00 ~ 20:00', parking: '가능', menuPrice: '칼국수 8,000원~', youtubeUrl: 'https://www.youtube.com/shorts/r5NfMgCbU8Y', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+자매국수', googlePlaceUrl: 'https://www.google.com/maps/search/제주+자매국수' },
  { id: 7, name: '우진해장국', img: `${IMG_BASE}/7.jpeg`, rating: 4.7, reviewCount: 6543, brief: '30년 전통 해장국', teaser: '진한 소고기 육수', story: '깊은 육수에 푹 고아낸 해장국 전문입니다.', query: '제주 우진해장국', address: '제주특별자치도 제주시 삼도2동 1075-3', phone: '064-722-0033', hours: '07:00 ~ 21:00', parking: '가능', menuPrice: '해장국 9,000원~', youtubeUrl: 'https://www.youtube.com/shorts/4DlRyY9UP08', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+우진해장국', googlePlaceUrl: 'https://www.google.com/maps/search/제주+우진해장국' },
  { id: 8, name: '고집돌우럭', img: `${IMG_BASE}/8.jpeg`, rating: 4.8, reviewCount: 3456, brief: '우럭 전문', teaser: '바다의 신선함', story: '제주 바다의 우럭을 신선하게 제공합니다.', query: '제주 고집돌우럭', address: '제주특별자치도 서귀포시 성산읍 성산중앙로 64', phone: '064-782-0011', hours: '11:00 ~ 21:00', parking: '가능', menuPrice: '우럭구이 1인분 35,000원~', youtubeUrl: 'https://www.youtube.com/shorts/4OVfq2hI3vo', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+고집돌우럭', googlePlaceUrl: 'https://www.google.com/maps/search/제주+고집돌우럭' },
  { id: 9, name: '맛나식당', img: `${IMG_BASE}/9.jpeg`, rating: 4.5, reviewCount: 5678, brief: '제주 향토음식', teaser: '전통 한정식', story: '갈치조림, 해물탕 등 푸짐한 상차림을 맛보세요.', query: '제주 맛나식당', address: '제주특별자치도 제주시 구좌읍 해맞이해안로 402', phone: '064-782-3333', hours: '11:00 ~ 21:00', parking: '가능', menuPrice: '갈치조림 25,000원~', youtubeUrl: 'https://www.youtube.com/shorts/hvwZbDSkLG8', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+맛나식당', googlePlaceUrl: 'https://www.google.com/maps/search/제주+맛나식당' },
  { id: 10, name: '램스키친', img: `${IMG_BASE}/10.jpeg`, rating: 4.9, reviewCount: 7890, brief: '양갈비 전문', teaser: '프리미엄 양고기', story: '잡내 없는 부드러운 양갈비를 경험해보세요.', query: '제주 램스키친', address: '제주특별자치도 제주시 노형동 1055', phone: '064-711-9292', hours: '12:00 ~ 22:00', parking: '가능', menuPrice: '양갈비 1인분 28,000원~', youtubeUrl: 'https://www.youtube.com/shorts/IdMwKln6sqw', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+램스키친', googlePlaceUrl: 'https://www.google.com/maps/search/제주+램스키친' },
];

export default function JejuGourmetBest10() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [expandedShop, setExpandedShop] = useState<{ shop: Shop; index: number } | null>(null);

  useEffect(() => {
    setShops([...initialShops].sort(() => Math.random() - 0.5));
  }, []);

  const handleDetail = (shop: Shop, index: number) => {
    setExpandedShop({ shop, index });
  };

  const closeDetail = () => {
    setExpandedShop(null);
  };

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
    <div className="min-h-[100dvh] lg:h-screen w-full bg-[#f5f5f0] overflow-hidden flex flex-col tracking-[-0.01em] leading-relaxed">
      <main className="flex-1 min-h-0 flex flex-col items-center w-full px-4 sm:px-6 lg:px-6 overflow-y-auto lg:overflow-hidden overscroll-contain">
        {/* 헤더 - 모바일/태블릿 (< 1024px) - 인식률 강화 */}
        <header className="text-center py-3 sm:py-4 lg:py-0 lg:mb-0 lg:hidden flex-shrink-0 w-full pt-[max(0.5rem,env(safe-area-inset-top))]">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tracking-tight">
            제주도 맛집 베스트 10
          </h1>
          <p className="text-sm sm:text-base text-gray-500 tracking-wide">
            접속 시 순위가 랜덤으로 바뀝니다!
          </p>
        </header>

        {/* 헤더 - PC (>= 1024px) - 5단계 축소 */}
        <header className="text-center py-0.5 hidden lg:block w-full flex-shrink-0">
          <h1 className="text-lg font-bold text-gray-900 mb-0 tracking-tight">
            제주도 맛집 베스트 10
          </h1>
          <p className="text-xs text-gray-500 tracking-wide">
            접속할 때마다 무작위로 순위가 바뀝니다!
          </p>
        </header>

        {/* 모바일/태블릿: 상위 3개 - 세로 카드(이미지 포함) - 인식률 강화 */}
        <section className="lg:hidden w-full max-w-lg mx-auto space-y-3 sm:space-y-4 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-1">
          {shops.slice(0, 3).map((shop, index) => (
            <div
              key={shop.id}
              onClick={() => handleDetail(shop, index)}
              className="flex items-center gap-4 sm:gap-5 bg-[#fafaf5] rounded-2xl p-4 sm:p-5 shadow-md cursor-pointer active:scale-[0.99] transition-transform min-h-[100px] sm:min-h-[112px] touch-manipulation select-none"
            >
              <span className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500/20 text-amber-600 text-2xl sm:text-3xl font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate tracking-tight">{shop.name}</h3>
                <p className="text-base sm:text-lg text-gray-600 flex items-center gap-1 tracking-wide mt-1">
                  <span className="text-amber-500 text-lg">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
                </p>
                <span className="inline-block mt-2 text-sm font-semibold text-orange-500 tracking-wide">자세히 보기</span>
              </div>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  width={112}
                  height={112}
                  sizes="(max-width: 640px) 96px, 112px"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}

          {/* 모바일/태블릿: 4~10위 - 2열 그리드 - 인식률 강화 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {shops.slice(3, 10).map((shop, index) => (
              <div
                key={shop.id}
                onClick={() => handleDetail(shop, index + 3)}
                className="bg-[#fafaf5] rounded-2xl p-4 sm:p-5 shadow-md cursor-pointer active:scale-[0.99] transition-transform min-h-[96px] sm:min-h-[108px] touch-manipulation select-none flex flex-col justify-center"
              >
                <span className="text-2xl sm:text-3xl font-bold text-amber-600 block mb-1 tracking-tight">
                  {index + 4}
                </span>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate tracking-tight">{shop.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 flex items-center gap-0.5 mt-1 tracking-wide">
                  <span className="text-amber-500">★</span> {shop.rating} · {shop.reviewCount.toLocaleString()}
                </p>
                <span className="inline-block mt-2 text-sm font-semibold text-orange-500 tracking-wide">자세히 보기</span>
              </div>
            ))}
          </div>
        </section>

        {/* PC: 5열 2행 - 화면 꽉 채움 (완벽 1페이지) */}
        <section className="hidden lg:flex flex-1 min-h-0 w-full justify-center items-stretch px-2">
          <div className="grid grid-cols-5 grid-rows-2 gap-3 w-full h-full min-h-0">
            {shops.map((shop, index) => (
              <div
                key={shop.id}
                onClick={() => handleDetail(shop, index)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col text-center min-h-0 cursor-pointer active:scale-[0.99] transition-transform"
              >
                <div className="flex flex-col items-center gap-0.5 mb-1 flex-shrink-0">
                  <span className="w-16 h-16 rounded-full bg-orange-500 text-white text-3xl font-bold flex items-center justify-center tracking-tight">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-gray-900 truncate w-full text-3xl tracking-tight">{shop.name}</h3>
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
                  <p className="text-2xl text-gray-500 flex items-center justify-center gap-0.5 tracking-wide">
                    <span className="text-yellow-500">★</span> {shop.rating} · 리뷰 {shop.reviewCount.toLocaleString()}
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
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-orange-500 text-white text-2xl font-bold flex items-center justify-center flex-shrink-0 tracking-tight">
                      {expandedShop.index + 1}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{expandedShop.shop.name}</h2>
                  </div>
                  {getYoutubeVideoId(expandedShop.shop.youtubeUrl) ? (
                    <div className="relative w-full aspect-[9/16] max-h-[320px] rounded-xl overflow-hidden mb-4 bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(expandedShop.shop.youtubeUrl)}?autoplay=1&mute=0`}
                        title={`${expandedShop.shop.name} 유튜브 후기`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
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
                    <p><span className="font-semibold text-gray-900">전화:</span> {expandedShop.shop.phone}</p>
                    <p><span className="font-semibold text-gray-900">영업시간:</span> {expandedShop.shop.hours}</p>
                    <p><span className="font-semibold text-gray-900">주차:</span> {expandedShop.shop.parking}</p>
                    <p><span className="font-semibold text-gray-900">대표메뉴 가격:</span> {expandedShop.shop.menuPrice}</p>
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
                    <a
                      href={expandedShop.shop.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 w-full py-7 px-8 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-2xl transition-colors tracking-wide"
                    >
                      <svg className="w-16 h-16 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      유튜브 후기 보기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <footer className="py-1 lg:py-0.5 w-full flex-shrink-0 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:pb-0 hidden lg:block">
          <p className="text-[10px] lg:text-xs text-gray-500 text-right tracking-wide">
            * 이것은 샘플이며, 실제 업체명과 사진은 다를 수 있습니다.
          </p>
        </footer>
      </main>
    </div>
  );
}
