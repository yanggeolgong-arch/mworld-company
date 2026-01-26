'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const strategies = [
  {
    title: 'Creative Visual & Curator',
    description: '알고리즘을 지배하는 시네마틱 숏폼(릴스/쇼츠) 제작 및 고감도 인플루언서 매칭.',
    category: 'Content',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'Local Search & Spatial Branding',
    description: '단순 노출을 넘어 방문 시그널을 설계하는 네이버 플레이스 및 스마트블록 점유 전략.',
    category: 'Local',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'AI-Native Semantic DNA',
    description: '시맨틱 DNA 기술을 통해 구글과 AI 검색 엔진의 뇌에 브랜드 권위자를 각인시키는 독점 기술.',
    category: 'Global',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'M-World Digital Authority Engine',
    description: '실시간 트렌드를 즉각 자산화하여 트래픽과 구매 전환을 폭발시키는 차세대 웹 시스템 구축.',
    category: 'Engine',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'Elite Executive Mentorship',
    description: '대행사 대표들을 가르치는 1:1 프라이빗 클래스. <span className="text-emerald-400">10년</span> 노하우를 전수하여 즉시 창업 및 실행이 가능한 마스터 커리큘럼.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'Hyper-Data Insight',
    description: '<span className="text-[#d4af37]">1,000여</span> 곳의 F&B/뷰티 성공 데이터를 기반으로 설계된 초개인화 마케팅 로드맵.',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
  },
];

export default function StrategyPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.strategy-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-stagger');
                card.classList.add(`animate-stagger-delay-${Math.min(index + 1, 6)}`);
              }, index * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="strategy-heading">
        <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
          <h1 id="strategy-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The Strategy
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
            복제 불가능한 기술력으로 구축된
            <br />
            6대 핵심 솔루션으로 브랜드의 디지털 DNA를 재구성합니다.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
            <span className="text-sm font-light text-slate-200">
              <span className="text-emerald-400">10년</span>의 데이터, <span className="text-[#d4af37]">1,000개</span>의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div ref={sectionRef} className="w-full mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {strategies.map((strategy, index) => (
            <section
              key={index}
              className="strategy-card group w-full max-w-sm flex flex-col overflow-hidden rounded-2xl bg-slate-900/50 text-center transition-all hover:scale-105 hover:shadow-2xl border border-white/5 backdrop-blur-sm"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={strategy.image}
                  alt={strategy.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6 items-center">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {strategy.title}
                </h2>
                <p className="mt-4 flex-1 text-slate-300 leading-relaxed font-light max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: strategy.description }} />
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="w-full mx-auto mt-32 max-w-2xl flex flex-col items-center justify-center text-center">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-black p-8 border border-white/5">
            <h3 className="text-2xl font-light text-white mb-4">
              <span className="text-emerald-400">10년</span> 차 마스터의 실시간 트렌드 컨설팅 받기
            </h3>
            <a
              href="tel:010-4074-9343"
              className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-medium text-slate-900 transition-all hover:bg-emerald-400 hover:shadow-lg"
            >
              <span>📞</span>
              010-4074-9343
            </a>
            <p className="mt-4 text-sm font-light text-slate-400">
              대표 직통 컨설팅
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
