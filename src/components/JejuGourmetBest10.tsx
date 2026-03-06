'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  LucideMapPin, LucideStar, LucideX, LucidePhone, LucideClock, LucideCar, LucideBus, LucideChevronRight,
  LucideYoutube, LucideEye, LucideEyeOff, LucideShieldCheck, LucideShare2,
} from 'lucide-react';
import { SnsShareButtons } from './SnsShareButtons';
import { initialShops, getYoutubeVideoId, type Shop } from '@/data/stealth-best-10';
import { initFirebase, initStatsFromApi, isFirebaseEnabled, trackInteraction, type StatsState } from '@/lib/firebase-stats';

/**
 * Fisher-Yates Shuffle (성능 최적화 랜덤 알고리즘)
 * 페이지 로드 시 단 한 번만 실행되어 연산 오버헤드를 줄입니다.
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 1번 틀 규칙: 3+2+2+2+1 반복 (1,2,3 / 4,5 / 6,7 / 8,9 / 10단일) */
type LayoutRow = { type: 'triple' | 'double' | 'single'; shops: Shop[]; startIndex: number };
function buildLayoutRows(shops: Shop[]): LayoutRow[] {
  const CYCLE = [3, 2, 2, 2, 1]; // 3-col, 2-col, 2-col, 2-col, 1-col
  const rows: LayoutRow[] = [];
  let i = 0;
  let startIndex = 0;
  while (i < shops.length) {
    const cyclePos = (i % 10); // 0-9
    let count: number;
    if (cyclePos < 3) count = 3;
    else if (cyclePos < 5) count = 2;
    else if (cyclePos < 7) count = 2;
    else if (cyclePos < 9) count = 2;
    else count = 1;

    const slice = shops.slice(i, i + count);
    if (slice.length === 0) break;

    const type: LayoutRow['type'] = count === 3 ? 'triple' : count === 1 ? 'single' : 'double';
    rows.push({ type, shops: slice, startIndex });
    startIndex += slice.length;
    i += slice.length;
  }
  return rows;
}

export default function JejuGourmetBest10() {
  const [shops] = useState<Shop[]>(() => fisherYatesShuffle([...initialShops]));
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [openWithShareExpanded, setOpenWithShareExpanded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsState>({});
  const [showAdminStats, setShowAdminStats] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'about' | null>(null);

  /** 뒤로가기 시 모달만 닫고 페이지 이탈 방지 */
  useEffect(() => {
    const handlePopState = () => {
      setSelectedShop(null);
      setLegalModal(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  /** 모달 열릴 때 history.pushState → 뒤로가기 시 popstate로 모달만 닫힘 (페이지 이탈 방지) */
  useEffect(() => {
    if (selectedShop || legalModal) {
      window.history.pushState({ modal: true }, '', window.location.href);
    }
  }, [selectedShop, legalModal]);

  const closeModalWithHistory = () => {
    setSelectedShop(null);
    setLegalModal(null);
    if (typeof window !== 'undefined' && window.history.state?.modal) window.history.back();
  };

  useEffect(() => {
    let done = false;
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const adm = params.get('_adm');
    if (adm) {
      // 비밀번호 URL 접속 시 즉시 어드민·뷰카운트 표시 (API 결과와 무관하게 유지)
      setIsAdminMode(true);
      setShowAdminStats(true);
      fetch('/api/admin-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adm }),
        credentials: 'same-origin',
      })
        .then((r) => {
          if (r.status === 503 && typeof console !== 'undefined') console.warn('[Admin] Vercel에 ADMIN_SECRET 환경변수 추가 후 Redeploy 필요');
        })
        .catch(() => {});
    } else {
      fetch('/api/admin-status', { credentials: 'same-origin' })
        .then((r) => r.json())
        .then((data) => {
          if (!done && data?.ok === true) {
            setIsAdminMode(true);
            setShowAdminStats(true);
          }
        })
        .catch(() => {});
    }
    return () => { done = true; };
  }, []);

  useEffect(() => {
    const onStats = (shopId: number, data: { view: number; youtube: number; naver: number; google: number }) =>
      setStats((prev) => ({ ...prev, [shopId]: data }));
    if (isFirebaseEnabled()) {
      return initFirebase((uid) => setUserId(uid), onStats);
    }
    setUserId('api');
    return initStatsFromApi(onStats);
  }, []);

  /** Blackbox: ENTRY 로그 (utm_term, utm_source) */
  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    fetch('/api/log/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utm_term: params.get('utm_term') ?? undefined,
        utm_source: params.get('utm_source') ?? undefined,
      }),
      credentials: 'same-origin',
    }).catch(() => {});
  }, []);

  /** 카드가 뷰포트에 들어올 때마다 view 카운트 (어떤 경로든, 중복 포함) */
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());
  useEffect(() => {
    const observers = new Map<number, IntersectionObserver>();
    const timer = setTimeout(() => {
      shops.forEach((shop) => {
        const el = cardRefs.current.get(shop.id);
        if (!el) return;
        const shopId = shop.id;
        const obs = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) trackInteraction(shopId, 'view');
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
        observers.set(shopId, obs);
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, [shops]);

  const handleOpenDetail = (shop: Shop) => {
    setOpenWithShareExpanded(false);
    setSelectedShop(shop);
    trackInteraction(shop.id, 'youtube');
    fetch('/api/log/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'card_click', shopId: shop.id }),
      credentials: 'same-origin',
    }).catch(() => {});
    fetch('/api/log/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'youtube_play', shopId: shop.id }),
      credentials: 'same-origin',
    }).catch(() => {});
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#f8f9fa] text-[#1a1c1e] font-sans overflow-hidden">
      {/* Critical CSS 인라인화 (성능 극대화) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
        body { font-family: 'Noto Sans KR', sans-serif; -webkit-font-smoothing: antialiased; }
        
        /* 1번 틀: 2열 그리드 */
        .layout-row-double {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          padding: 0 12px 12px;
        }

        /* 1번 틀: 3열 그리드 */
        .layout-row-triple {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          padding: 0 12px 12px;
        }

        /* 1번 틀: 1열 단일 큰화면 - 전체 너비, 4/3 비율로 2열의 2배 크기 */
        .layout-row-single {
          padding: 0 12px 12px;
        }

        .image-aspect-single {
          aspect-ratio: 4 / 3;
          min-height: 220px;
        }

        /* Zero CLS: 4/3 비율 (원본 이미지 비율, 잘림 최소화) */
        .image-aspect {
          width: 100%;
          aspect-ratio: 4 / 3;
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
          min-width: 0;
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

        .text-title { font-size: 15px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px; }
        .text-meta { font-size: 11px; color: #94a3b8; }
        .stat-overlay { position: absolute; bottom: 8px; right: 8px; display: flex; flex-direction: column; gap: 4px; pointer-events: none; }
        .stat-badge { background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); color: white; padding: 3px 8px; border-radius: 8px; font-size: 10px; font-weight: 900; display: flex; align-items: center; gap: 5px; border: 1px solid rgba(255,255,255,0.1); }
      `}</style>

      {/* Admin Control Bar - ?_adm=4470 으로만 표시 */}
      {isAdminMode && (
      <div className="bg-[#1e293b] text-white py-1.5 px-4 flex justify-between items-center text-[10px] font-bold sticky top-0 z-[1100] shadow-md">
        <div className="flex items-center gap-2">
          <LucideShieldCheck size={12} className="text-blue-400" />
          <span className="opacity-60 font-mono tracking-tighter">ADMIN: {userId?.substring(0, 8) ?? '...'}</span>
        </div>
        <button
          onClick={() => setShowAdminStats(!showAdminStats)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${showAdminStats ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          {showAdminStats ? <LucideEye size={12} /> : <LucideEyeOff size={12} />}
          <span>{showAdminStats ? 'STATS LIVE' : 'STATS HIDDEN'}</span>
        </button>
      </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 bg-white pt-[max(2.5rem,env(safe-area-inset-top))] pb-6 text-center">
        <h1 className="text-2xl font-black text-[#1a1c1e] tracking-tighter">제주도 맛집 베스트</h1>
        <p className="text-[12px] text-gray-400 mt-1">공항에서 바로 떠나는 실시간 큐레이션</p>
      </header>

      {/* 스크롤 영역 - body overflow:hidden 대응, 하단까지 스크롤 보장 */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain flex justify-center items-start" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        <div className="w-full max-w-4xl min-w-0 shrink-0 px-4 sm:px-6 lg:px-8">
        {/* 1번 틀: 3+2+2+2+1 반복 레이아웃 */}
        {buildLayoutRows(shops).map((row) => (
          <div
            key={row.startIndex}
            className={
              row.type === 'triple' ? 'layout-row-triple' :
              row.type === 'double' ? 'layout-row-double' :
              'layout-row-single'
            }
          >
            {row.shops.map((shop, idx) => {
              const rank = row.startIndex + idx + 1;
              const isSingle = row.type === 'single';
              const isTopThree = rank <= 3;
              return (
                <article
                  key={shop.id}
                  ref={(el) => { if (el) cardRefs.current.set(shop.id, el); }}
                  className="item-card cursor-pointer active:scale-95 transition-transform"
                  onClick={() => handleOpenDetail(shop)}
                >
                  <div className={`image-aspect relative ${isSingle ? 'image-aspect-single' : ''}`}>
                    <div
                      className="rank-badge"
                      style={isTopThree ? undefined : { background: '#64748b' }}
                    >
                      {rank}
                    </div>
                    <img
                      src={shop.img}
                      alt={shop.imgAlt}
                      width={isSingle ? 800 : 400}
                      height={isSingle ? 450 : 540}
                      loading={rank <= 3 ? 'eager' : 'lazy'}
                      fetchPriority={rank <= 3 ? 'high' : undefined}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    {isAdminMode && showAdminStats && (
                      <div className="stat-overlay">
                        <div className="stat-badge">👁 {stats[shop.id]?.view ?? 0}</div>
                        <div className="stat-badge"><LucideYoutube size={10} className="text-red-500" /> {stats[shop.id]?.youtube ?? 0}</div>
                      </div>
                    )}
                  </div>
                  <div className={isSingle ? 'p-4' : 'p-2.5'}>
                    <h3 className={`text-title truncate ${isSingle ? 'text-lg' : ''}`}>{shop.name}</h3>
                    <div className={`flex items-center ${isSingle ? 'text-[14px]' : 'text-meta'} mt-1`}>
                      <LucideStar size={isSingle ? 14 : 10} className="text-orange-400 fill-orange-400 mr-1" />
                      <span className="font-bold text-gray-700">{shop.rating}</span>
                      {isTopThree ? (
                        <>
                          <span className="mx-1">·</span>
                          <span>상세보기</span>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-300 mx-1.5">|</span>
                          <span className="text-gray-400">{shop.reviewCount.toLocaleString()} 리뷰</span>
                        </>
                      )}
                    </div>
                    {isAdminMode && showAdminStats && !isTopThree && (
                      <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-1">
                        <LucideYoutube size={10} /> {stats[shop.id]?.youtube ?? 0} PLAYS TRACKED
                      </div>
                    )}
                    {!isTopThree && (
                      <div className="text-[#ff6b00] text-[11px] font-black mt-3 flex items-center">
                        자세히 보기 <LucideChevronRight size={10} className="ml-1" />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ))}

        {/* FAQ 섹션 - 셔플된 순서 동기화 (1위 업체가 모든 섹션에서 1위) */}
        <section className="px-6 py-8 border-t border-gray-100" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-base font-black text-[#1a1c1e] mb-4">제주도 맛집 베스트 순위</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {shops.map((shop, i) => (
              <li key={shop.id} className="flex items-center gap-2">
                <span className="bg-[#ff6b00]/10 text-[#ff6b00] w-6 h-6 flex items-center justify-center rounded font-black text-[11px] flex-shrink-0">{i + 1}</span>
                {shop.name}
              </li>
            ))}
          </ul>
        </section>

        <footer className="py-12 bg-white border-t border-slate-100 px-6 mt-20 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div className="max-w-5xl mx-auto text-[11px] text-slate-400 leading-relaxed font-medium">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 font-black text-slate-800 uppercase tracking-tighter">
              <button type="button" onClick={() => setLegalModal('privacy')} className="underline decoration-blue-500 decoration-2 underline-offset-4 text-left">개인정보처리방침</button>
              <button type="button" onClick={() => setLegalModal('terms')} className="text-left">이용약관</button>
              <button type="button" onClick={() => setLegalModal('about')} className="text-left">연구소 소개</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-12">
              <div className="space-y-1">
                <p>상호명: 공양걸AI미식데이터연구소 (Gong Yang Geol AI Gourmet Data Lab)</p>
                <p>대표자: 공양걸</p>
                <p>사업자등록번호: 603-20-65775</p>
                <p>소재지: 제주특별자치도 제주시 삼동2길 10 돌담빌 2동 201호</p>
              </div>
              <div className="space-y-1">
                <p>연락처: 010-4074-9343</p>
                <p>이메일: yanggeolgong@gmail.com</p>
                <p>개인정보보호책임자: 공양걸</p>
              </div>
            </div>

            <p className="mt-8 opacity-40 uppercase tracking-[0.2em] font-black">
              © 2026 AI KOREA DATA LAB PERFORMANCE ENGINE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>

        {/* 법적 필수 팝업: 개인정보처리방침·이용약관·연구소 소개 */}
        {legalModal && (
          <div
            className="fixed inset-0 z-[1100] bg-black/60 flex items-center justify-center p-4"
            onClick={closeModalWithHistory}
          >
            <div
              className="bg-white w-full max-w-xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b shrink-0">
                <h3 className="text-base font-black text-slate-800">
                  {legalModal === 'privacy' && '개인정보 처리방침'}
                  {legalModal === 'terms' && '서비스 이용약관'}
                  {legalModal === 'about' && '연구소 소개'}
                </h3>
                <button type="button" onClick={closeModalWithHistory} className="p-2 rounded-full hover:bg-slate-100">
                  <LucideX size={20} />
                </button>
              </div>
              <div className="p-5 overflow-y-auto text-[12px] text-slate-600 leading-relaxed space-y-4 max-h-[70vh]">
                {legalModal === 'privacy' && (
                  <div className="space-y-4">
                    <p>공양걸AI미식데이터연구소(이하 &apos;연구소&apos;)는 이용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다.</p>
                    <p>수집 항목: 접속 IP, 쿠키, 서비스 이용 기록(클릭 로그), 유입 경로(Referrer), 광고 식별 파라미터(UTM Source, Medium, Term, Campaign), 기기 정보.</p>
                    <p>수집 목적:</p>
                    <p>사용자의 검색 의도 분석을 통한 맛집 추천 알고리즘 고도화.</p>
                    <p>구글/메타 광고 최적화 및 광고 성과 측정(ROAS 분석).</p>
                    <p>서비스 방문 통계 산출 및 보안 강화.</p>
                    <p>보유 및 이용기간: 수집된 데이터는 통계 분석을 위해 최대 1년간 보관 후 식별 불가능한 형태로 파기합니다.</p>
                    <p>거부 권리: 이용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있으나, 이 경우 맞춤형 서비스 이용에 제한이 있을 수 있습니다.</p>
                  </div>
                )}
                {legalModal === 'terms' && (
                  <div className="space-y-4">
                    <p><strong>제1조 (정보의 성격 및 서비스의 정의)</strong></p>
                    <p>본 서비스에서 제공하는 모든 정보는 연구소의 독자적인 AI 알고리즘과 데이터 분석 기술을 통해 생성된 <strong>&apos;AI 기반 정보성 콘텐츠&apos;</strong>입니다.</p>
                    <p>본 콘텐츠는 방대한 양의 로컬 데이터를 AI가 학습하고 분석하여 최적의 결과를 도출한 것이며, 이용자의 편의를 돕기 위한 목적으로 제공됩니다.</p>
                    <p><strong>제2조 (책임의 제한 및 면책)</strong></p>
                    <p>연구소는 제공되는 정보의 정확성과 신뢰성을 높이기 위해 최선을 다하나, AI 기술의 특성 및 데이터 수집 시점에 따라 실제 매장의 현황(영업 시간, 가격, 메뉴 구성, 위치 등)과 일시적으로 차이가 발생할 수 있습니다.</p>
                    <p>본 서비스는 정보 제공을 주 목적으로 하며, 연구소는 이용자가 본 사이트의 정보를 신뢰하여 행한 결정이나 행동으로 인해 발생한 어떠한 형태의 직접적·간접적 손실에 대해서도 법적 책임을 지지 않습니다.</p>
                    <p>이용자는 실제 방문 전 해당 매장의 공식 채널을 통해 최신 정보를 최종 확인해야 할 의무가 있습니다.</p>
                    <p><strong>제3조 (지식재산권 및 이용 제한)</strong></p>
                    <p>본 서비스의 디자인, UI/UX 구조, AI 분석 로직, 그리고 연구소에서 직접 가공 및 기술하여 생성된 텍스트 및 이미지 결과물은 연구소의 소중한 지식재산입니다. 단, 서비스 내에 인용 또는 연결된 외부 링크(유튜브 등), 공공 데이터(버스 노선, 메뉴 정보 등) 및 제3자의 저작물에 대한 권리는 해당 원저작권자에게 귀속됩니다.</p>
                    <p>이용자는 연구소의 사전 서면 동의 없이 본 서비스를 무단 복제, 수정, 배포하거나 상업적 목적으로 활용할 수 없습니다.</p>
                    <p>이용 제한의 예외:</p>
                    <p>연구소는 서비스의 원활한 검색 노출 및 이용자 유입을 위해 범용 검색 엔진(Google, Bing 등)의 검색 인덱싱 목적의 크롤링은 허용합니다.</p>
                    <p>단, 상업적 경쟁 서비스 구축을 위한 대량 스크래핑, 연구소의 동의 없는 데이터베이스 통째 복제, 그리고 본 서비스를 거치지 않고 정보만 추출하여 제공하는 행위는 엄격히 금지합니다.</p>
                    <p>또한, 인공지능(AI) 모델의 학습 및 훈련 목적으로 데이터를 무단 활용하여 연구소의 정당한 이익을 침해하는 행위에 대해서는 민형사상의 책임을 물을 수 있습니다.</p>
                    <p><strong>제4조 (글로벌 서비스 운영)</strong></p>
                    <p>본 서비스는 전 세계 각 지역의 데이터를 다루며, 접속 지역에 따라 최적화된 URL 구조(.com/&#123;REGION&#125;/&#123;CATEGORY&#125;-&#123;LANG&#125;)를 제공합니다.</p>
                    <p>각 지역별 데이터는 해당 국가 및 도시의 공공 데이터와 로컬 트렌드를 분석하여 생성됩니다.</p>
                    <p><strong>제5조 (약관의 개정)</strong></p>
                    <p>연구소는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 수시로 개정할 수 있습니다.</p>
                    <p>약관이 개정될 경우 사이트 하단을 통해 공지하며, 공지된 시점부터 효력이 발생합니다.</p>
                    <p><strong>[연구소 정보]</strong></p>
                    <p>상호명: 공양걸AI미식데이터연구소</p>
                    <p>대표자: 공양걸</p>
                    <p>사업자등록번호: 603-20-65775</p>
                    <p>이메일: yanggeolgong@gmail.com</p>
                  </div>
                )}
                {legalModal === 'about' && (
                  <p>공양걸AI미식데이터연구소는 제주 로컬 미식 데이터를 AI로 분석하여 가장 정밀한 GEO(지역) 타겟팅 마케팅 솔루션을 제공하는 퍼포먼스 데이터 센터입니다. 우리는 단순한 맛집 나열을 넘어, 사용자 행동 데이터를 기반으로 한 최적의 미식 경험을 설계합니다.</p>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      {/* 킬러 모달 (유튜브 원클릭 자동 재생) */}
      {selectedShop && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeModalWithHistory}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="bg-[#ff6b00] text-white w-8 h-8 flex items-center justify-center rounded-lg font-black flex-shrink-0">
                  {shops.indexOf(selectedShop) + 1}
                </span>
                <h2 className="text-xl font-black truncate">{selectedShop.name}</h2>
                <button
                  onClick={() => setOpenWithShareExpanded((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[12px] flex-shrink-0 transition-all ${
                    openWithShareExpanded
                      ? 'bg-[#ff6b00] text-white shadow-md'
                      : 'bg-[#ff6b00]/10 text-[#ff6b00] hover:bg-[#ff6b00]/20'
                  }`}
                >
                  <LucideShare2 size={16} />
                  SNS 공유하기
                </button>
              </div>
              <button
                onClick={closeModalWithHistory}
                className="p-2 bg-gray-100 rounded-full ml-2 flex-shrink-0"
              >
                <LucideX size={20} />
              </button>
            </div>

            {/* 유튜브 영역 (헤더 바로 아래, 상단까지 확장) */}
            {getYoutubeVideoId(selectedShop.youtubeUrl) && (
              <div className="w-full min-h-[50vh] aspect-video bg-black relative">
                {isAdminMode && showAdminStats && (
                  <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
                    <div className="bg-black/80 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2 backdrop-blur-md border border-white/20">👁 VIEW: {stats[selectedShop.id]?.view ?? 0}</div>
                    <div className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2 backdrop-blur-md border border-white/20"><LucideYoutube size={12} fill="white" /> PLAY: {stats[selectedShop.id]?.youtube ?? 0}</div>
                  </div>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedShop.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1&mute=0`}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* SNS 공유 패널 (11개 아이콘) - 토글 시 표시 */}
            {openWithShareExpanded && (
              <div className="px-4 pt-3 pb-4 border-b bg-gray-50/50">
                <SnsShareButtons shopName={selectedShop.name} expanded={true} />
              </div>
            )}

            {/* 상세 정보 */}
            <div className="p-5 space-y-4 text-[14px] max-h-[42vh] overflow-y-auto">
              {selectedShop.ratingSource.includes('착한가격업소') && (
                <div className="bg-[#22c55e] text-white px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2">
                  <LucideShieldCheck size={18} />
                  행정안전부 선정 착한가격업소
                </div>
              )}
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
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center">
                <LucideBus className="text-blue-500" size={16} />
                <p><strong>공항 버스 노선:</strong> {selectedShop.busRoutesFromAirport}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <a
                    href={selectedShop.googlePlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackInteraction(selectedShop.id, 'google');
                      fetch('/api/log/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'google_map', shopId: selectedShop.id }), credentials: 'same-origin' }).catch(() => {});
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 py-3.5 rounded-xl font-bold text-center text-[13px]"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded overflow-hidden flex-shrink-0" aria-hidden>
                      <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </span>
                    구글 플레이스
                    {isAdminMode && showAdminStats && <span className="bg-gray-100 text-gray-500 px-1.5 rounded text-[9px] border font-black">{stats[selectedShop.id]?.google ?? 0}</span>}
                  </a>
                  <a
                    href={selectedShop.naverPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackInteraction(selectedShop.id, 'naver');
                      fetch('/api/log/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'naver_map', shopId: selectedShop.id }), credentials: 'same-origin' }).catch(() => {});
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#03cf5d] text-white py-3.5 rounded-xl font-bold text-center text-[13px]"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded border-2 border-white/80 text-white text-[11px] font-black">N</span>
                    네이버 플레이스
                    {isAdminMode && showAdminStats && <span className="bg-black/20 px-1.5 rounded text-[9px] font-black">{stats[selectedShop.id]?.naver ?? 0}</span>}
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
