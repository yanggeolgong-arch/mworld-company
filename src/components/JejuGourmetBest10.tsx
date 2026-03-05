'use client';

import React, { useState } from 'react';
import { LucideMapPin, LucideStar, LucideX, LucidePhone, LucideClock, LucideCar, LucideChevronRight } from 'lucide-react';
import { initialShops, getYoutubeVideoId, type Shop } from '@/data/stealth-best-10';

/**
 * Fisher-Yates Shuffle (성능 최적화 랜덤 알고리즘)
 * 첫 렌더링 시점에 단 한 번만 실행되어 연산 오버헤드를 제로화합니다.
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
    <div className="h-[100dvh] flex flex-col bg-[#f8f9fa] text-[#1a1c1e] font-sans overflow-hidden">
      {/* Critical CSS 인라인화 및 폰트 로드 최적화 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
        body { font-family: 'Noto Sans KR', sans-serif; -webkit-font-smoothing: antialiased; }

        /* 럭셔리 그리드: 3열 상단 + 2열 하단 */
        .top-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 0 8px;
          margin-bottom: 8px;
        }

        .luxury-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 8px;
        }

        /* Zero CLS: 가로세로 비율 미리 확보 (4:3 비율 근사치) */
        .image-aspect {
          width: 100%;
          aspect-ratio: 1 / 1.35;
          background: #eef0f2;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .item-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          contain: layout;
        }

        .rank-badge {
          position: absolute;
          top: 0; left: 0;
          background: linear-gradient(135deg, #ff8a00, #ff5c00);
          color: white;
          padding: 3px 8px;
          font-weight: 900;
          font-size: 13px;
          border-bottom-right-radius: 12px;
          z-index: 10;
        }

        .modal-enter { animation: modalIn 0.2s cubic-bezier(0, 0, 0.2, 1); }
        @keyframes modalIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .text-title { font-size: 14px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px; }
        .text-meta { font-size: 11px; color: #94a3b8; }
      `}</style>

      {/* Header */}
      <header className="flex-shrink-0 bg-white pt-[max(2.5rem,env(safe-area-inset-top))] pb-6 text-center">
        <h1 className="text-2xl font-black text-[#1a1c1e] tracking-tighter">제주도 맛집 베스트</h1>
        <p className="text-[12px] text-gray-400 mt-1">접속 시 마다 순위가 바뀌는 실시간 큐레이션</p>
      </header>

      {/* 스크롤 영역 - body overflow:hidden 대응, PC 중앙 정렬 */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain flex justify-center" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        <div className="w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8">
          {/* 상단 3열 (TOP 1, 2, 3 - LCP 최우선) */}
          <div className="top-row">
            {shops.slice(0, 3).map((shop, index) => (
              <article key={shop.id} className="item-card cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedShop(shop)}>
                <div className="image-aspect">
                  <div className="rank-badge">{index + 1}</div>
                  <img
                    src={shop.img}
                    alt={shop.imgAlt}
                    width={300}
                    height={405}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="text-title truncate">{shop.name}</h3>
                  <div className="flex items-center text-meta mt-1">
                    <LucideStar size={10} className="text-orange-400 fill-orange-400 mr-1" />
                    <span className="font-bold text-gray-700">{shop.rating}</span>
                    <span className="mx-1">·</span>
                    <span>상세보기</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 하단 2열 (지연 로딩) */}
          <div className="luxury-grid">
            {shops.slice(3).map((shop, index) => (
              <article key={shop.id} className="item-card cursor-pointer active:scale-95 transition-transform" onClick={() => setSelectedShop(shop)}>
                <div className="image-aspect">
                  <div className="rank-badge" style={{ background: '#64748b' }}>{index + 4}</div>
                  <img
                    src={shop.img}
                    alt={shop.imgAlt}
                    width={400}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-title truncate">{shop.name}</h3>
                  <div className="flex items-center text-[12px] mt-1">
                    <LucideStar size={12} className="text-orange-400 fill-orange-400 mr-1" />
                    <span className="font-bold text-gray-700">{shop.rating}</span>
                    <span className="text-gray-300 mx-1.5">|</span>
                    <span className="text-gray-400">{shop.reviewCount.toLocaleString()} 리뷰</span>
                  </div>
                  <div className="text-[#ff6b00] text-[11px] font-black mt-3 flex items-center">
                    자세히 보기 <LucideChevronRight size={10} className="ml-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="py-12 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-[11px] text-gray-300">
            <p>© 2026 JEJU GOURMET AI RESEARCH INSTITUTE</p>
          </footer>
        </div>
      </main>

      {/* 지연 로딩 모달 (유튜브 원클릭 자동 재생) */}
      {selectedShop && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedShop(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <span className="bg-[#ff6b00] text-white w-8 h-8 flex items-center justify-center rounded-lg font-black">{shops.indexOf(selectedShop) + 1}</span>
                <h2 className="text-xl font-black">{selectedShop.name}</h2>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="닫기"
              >
                <LucideX size={20} />
              </button>
            </div>

            {/* 유튜브 동적 로드 */}
            {getYoutubeVideoId(selectedShop.youtubeUrl) && (
              <div className="w-full aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedShop.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1&mute=0`}
                  title={`${selectedShop.name} 소개 영상`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* 상세 정보 */}
            <div className="p-5 space-y-4 text-[14px] max-h-[42vh] overflow-y-auto">
              <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
                <LucideMapPin className="text-blue-500 mt-0.5" size={16} />
                <p><strong>주소:</strong> {selectedShop.address}</p>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <LucidePhone className="text-blue-500" size={16} />
                <p><strong>전화:</strong> {selectedShop.phone}</p>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <LucideClock className="text-blue-500" size={16} />
                <p><strong>영업시간:</strong> {selectedShop.hours}</p>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <LucideCar className="text-blue-500" size={16} />
                <p><strong>주차:</strong> {selectedShop.parking}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <a
                    href={selectedShop.naverPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#03cf5d] text-white py-3.5 rounded-xl font-bold text-center text-[13px]"
                  >
                    네이버 플레이스
                  </a>
                  <a
                    href={selectedShop.googlePlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border border-gray-200 py-3.5 rounded-xl font-bold text-center text-[13px]"
                  >
                    구글 지도
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
