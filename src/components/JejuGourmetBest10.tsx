'use client';

import React, { useState } from 'react';
import { LucideMapPin, LucideStar, LucideX, LucidePhone, LucideClock, LucideCar, LucideBanknote, LucideBus, LucideNavigation } from 'lucide-react';
import { initialShops, getYoutubeVideoId, type Shop } from '@/data/stealth-best-10';

/**
 * Fisher-Yates Shuffle (성능 최적화 랜덤 알고리즘)
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function JejuGourmetBest10() {
  const [shops] = useState<Shop[]>(() => fisherYatesShuffle([...initialShops]));
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        body { font-family: 'Noto Sans KR', sans-serif; }
        
        /* Zero CLS: 이미지 컨테이너 비율 고정 */
        .stealth-card-container {
          display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 1rem;
        }
        .image-aspect {
          width: 100%; aspect-ratio: 4 / 3; background: #e5e7eb; border-radius: 12px; overflow: hidden;
        }
        
        /* 모달 애니메이션 */
        .modal-enter { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Header */}
      <header className="bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-black text-gray-800">제주도 맛집 베스트 10</h1>
      </header>

      {/* 리스트 영역 */}
      <main className="max-w-md mx-auto">
        <div className="stealth-card-container">
          {shops.map((shop, index) => (
            <article
              key={shop.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => setSelectedShop(shop)}
            >
              <div className="flex p-4 gap-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={shop.img}
                    alt={shop.imgAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-black text-lg">{index + 1}</span>
                    <h3 className="font-bold text-lg">{shop.name}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <LucideStar size={14} className="text-orange-400 fill-orange-400 mr-1" />
                    <span className="font-bold text-gray-700">{shop.rating}</span>
                    <span className="mx-1">·</span>
                    <span>{shop.reviewCount.toLocaleString()}</span>
                  </div>
                  <div className="text-blue-500 text-xs font-bold mt-2">자세히 보기</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* 클릭 시에만 나타나는 모달 (유튜브 자동 재생) */}
      {selectedShop && (
        <div
          className="fixed inset-0 z-[1000] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 modal-enter"
          onClick={() => setSelectedShop(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 상단 헤더 & 닫기 */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <span className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
                  {shops.indexOf(selectedShop) + 1}
                </span>
                <h2 className="text-2xl font-black">{selectedShop.name}</h2>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <LucideX size={24} />
              </button>
            </div>

            {/* 유튜브 자동 재생 영역 (클릭된 순간에만 로드됨) */}
            {getYoutubeVideoId(selectedShop.youtubeUrl) && (
              <div className="w-full aspect-video bg-black relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedShop.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* 상세 정보 */}
            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="flex items-start gap-3">
                <LucideMapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>주소:</strong> {selectedShop.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <LucidePhone className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>전화:</strong> {selectedShop.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <LucideClock className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>영업시간:</strong> {selectedShop.hours}</p>
              </div>
              <div className="flex items-center gap-3">
                <LucideCar className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>주차:</strong> {selectedShop.parking}</p>
              </div>
              <div className="flex items-center gap-3">
                <LucideBanknote className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>대표메뉴 가격:</strong> {selectedShop.menuPrice}</p>
              </div>
              <div className="flex items-center gap-3">
                <LucideNavigation className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>공항에서 차로:</strong> 약 {selectedShop.carMinutesFromAirport}분</p>
              </div>
              <div className="flex items-center gap-3">
                <LucideBus className="text-gray-400 flex-shrink-0" size={18} />
                <p className="text-sm"><strong>공항 버스:</strong> {selectedShop.busRoutesFromAirport}</p>
              </div>

              <div className="pt-4 border-t flex flex-col gap-3">
                <a
                  href={selectedShop.naverPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full py-4 px-5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-lg transition-colors"
                >
                  <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#03C75A] font-black text-2xl flex-shrink-0">N</span>
                  네이버 플레이스
                </a>
                <a
                  href={selectedShop.googlePlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full py-4 px-5 rounded-xl border-2 border-gray-200 hover:bg-gray-50 font-bold text-lg transition-colors"
                >
                  <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  구글 플레이스
                </a>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-400 font-bold mb-2">공항에서 {selectedShop.name} 위치</p>
                <div className="relative w-full aspect-[16/10] max-h-[260px] rounded-xl overflow-hidden bg-gray-100">
                  <iframe
                    title={`${selectedShop.name} 위치 - 제주도 지도`}
                    src={(() => {
                      const AIRPORT_LAT = 33.507;
                      const AIRPORT_LNG = 126.492;
                      const lat = selectedShop.lat;
                      const lng = selectedShop.lng;
                      const pad = 0.08;
                      const minLon = Math.min(AIRPORT_LNG, lng) - pad;
                      const maxLon = Math.max(AIRPORT_LNG, lng) + pad;
                      const minLat = Math.min(AIRPORT_LAT, lat) - pad;
                      const maxLat = Math.max(AIRPORT_LAT, lat) + pad;
                      const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
                      return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;
                    })()}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
