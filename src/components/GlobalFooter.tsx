'use client';

import React, { useState, useEffect } from 'react';
import { LucideX } from 'lucide-react';

export function GlobalFooter() {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'about' | null>(null);

  useEffect(() => {
    const handlePopState = () => setLegalModal(null);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (legalModal) {
      window.history.pushState({ legalModal: true }, '', window.location.href);
    }
  }, [legalModal]);

  const closeModalWithHistory = () => {
    setLegalModal(null);
    if (typeof window !== 'undefined' && window.history.state?.legalModal) window.history.back();
  };

  const openModal = (type: 'privacy' | 'terms' | 'about') => setLegalModal(type);

  return (
    <>
      <footer className="py-12 bg-white border-t border-slate-100 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="max-w-5xl mx-auto text-[11px] text-slate-400 leading-relaxed font-medium">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 font-black text-slate-800 uppercase tracking-tighter">
            <button type="button" onClick={() => openModal('privacy')} className="underline decoration-blue-500 decoration-2 underline-offset-4 text-left">
              개인정보처리방침
            </button>
            <button type="button" onClick={() => openModal('terms')} className="text-left">
              이용약관
            </button>
            <button type="button" onClick={() => openModal('about')} className="text-left">
              연구소 소개
            </button>
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
                  <p>공양걸AI미식데이터연구소(이하 &apos;연구소&apos;)는 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 방침은 연구소가 운영하는 서비스(이하 &apos;서비스&apos;)를 이용하는 사용자들의 데이터를 어떻게 수집, 이용, 보호하는지 상세히 고지하기 위해 작성되었습니다.</p>
                  <p><strong>제1조 (개인정보의 수집 항목 및 방법)</strong></p>
                  <p>연구소는 서비스 제공 및 최적화를 위해 최소한의 데이터를 수집합니다.</p>
                  <p>자동 수집 항목: 접속 IP 주소, 쿠키(Cookie), 서비스 이용 기록, 방문 기록, 기기 정보(OS, 브라우저 종류).</p>
                  <p>마케팅 추적 항목: 유입 경로(Referrer URL), 광고 식별 파라미터(UTM Source, Medium, Term, Campaign, Content), 검색 키워드.</p>
                  <p>수집 방법: 웹사이트 접속 시 생성되는 로그 분석 도구 및 Firebase(Firestore) 엔진을 통해 실시간으로 자동 수집됩니다.</p>
                  <p><strong>제2조 (개인정보의 수집 및 이용 목적)</strong></p>
                  <p>수집된 정보는 다음의 목적을 위해서만 활용됩니다.</p>
                  <p>서비스 고도화: 사용자 행동 패턴 및 검색 키워드 분석을 통한 지역별(GEO) 맛집 추천 알고리즘의 정교화.</p>
                  <p>마케팅 분석: 구글/메타 광고 타겟팅 최적화 및 광고 성과 측정(ROAS 분석), 유입 채널별 효율성 검증.</p>
                  <p>보안 및 관리: 비정상적인 접근 차단, 서비스 방문 통계 산출 및 시스템 안정성 확보.</p>
                  <p><strong>제3조 (개인정보의 보유 및 이용 기간)</strong></p>
                  <p>연구소는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
                  <p>단, 마케팅 효율 분석 및 서비스 개선을 위한 통계 데이터는 이용자의 식별이 불가능한 형태로 변환하여 최대 1년간 보관할 수 있습니다.</p>
                  <p><strong>제4조 (개인정보의 파기 절차 및 방법)</strong></p>
                  <p>파기 절차: 목적이 달성된 데이터는 내부 방침 및 관련 법령에 따라 안전하게 파기됩니다.</p>
                  <p>파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
                  <p><strong>제5조 (이용자의 권리 및 행사 방법)</strong></p>
                  <p>이용자는 언제든지 본인의 개인정보 수집에 대한 동의를 거부할 수 있습니다.</p>
                  <p>쿠키 설정 거부: 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 맞춤형 서비스(지역별 자동 추천 등) 이용에 일부 제한이 있을 수 있습니다.</p>
                  <p><strong>제6조 (데이터 보안 조치)</strong></p>
                  <p>연구소는 수집된 로그 데이터를 안전하게 보호하기 위해 다음과 같은 조치를 취합니다.</p>
                  <p>기술적 보호: Google Firebase의 강력한 암호화 프로토콜 및 보안 규칙을 적용하여 외부 침입을 차단합니다.</p>
                  <p>관리적 보호: 수집된 데이터에 대한 접근 권한을 관리자(공양걸) 1인으로 엄격히 제한합니다.</p>
                  <p><strong>제7조 (개인정보 보호책임자 및 연락처)</strong></p>
                  <p>이용자의 개인정보 관련 문의 및 불만 처리를 위해 아래와 같이 보호책임자를 지정하고 있습니다.</p>
                  <p>상호명: 공양걸AI미식데이터연구소</p>
                  <p>성명: 공양걸 (대표자)</p>
                  <p>연락처: 010-4074-9343</p>
                  <p>이메일: yanggeolgong@gmail.com</p>
                  <p>소재지: 제주특별자치도 제주시 삼동2길 10 돌담빌 2동 201호</p>
                  <p><strong>제8조 (정책 변경에 따른 고지 의무)</strong></p>
                  <p>본 방침은 법령이나 서비스 정책의 변경에 따라 개정될 수 있으며, 개정 시 사이트 하단을 통해 즉시 공지합니다.</p>
                  <p>공고 일자: 2026년 03월 06일</p>
                  <p>시행 일자: 2026년 03월 06일</p>
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
    </>
  );
}
