'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-stagger');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-stagger');
          card.classList.add(`animate-stagger-delay-${Math.min(index + 1, 3)}`);
        }, index * 100);
      });
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-32 lg:px-8" aria-labelledby="hero-heading">
        <div ref={heroRef} className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2">
            <span className="text-xs font-medium text-[#d4af37] uppercase tracking-wider">
              M-World Company
            </span>
          </div>
          <h1 id="hero-heading" className="text-6xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-7xl lg:text-8xl">
            10년의 데이터
            <br />
            <span className="font-semibold">1,000개의 신화</span>
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-[#36454f] dark:text-gray-400">
            엠월드컴퍼니는 결과로만 말합니다.
          </p>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            F&B(맛집) 마케팅의 절대 강자
            <br />
            1,000개 이상의 성공 레퍼런스로 증명된 압도적 성과
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/strategy"
              className="rounded-full bg-[#001f3f] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#0a2d5a] dark:bg-[#e8e8e8] dark:text-[#001f3f] dark:hover:bg-[#c0c0c0]"
            >
              전략 알아보기
            </Link>
            <Link
              href="/insights"
              className="text-sm font-medium leading-6 text-[#36454f] transition-colors hover:text-[#001f3f] dark:text-gray-400 dark:hover:text-[#e8e8e8]"
            >
              인사이트 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 10년 역사 시각화 */}
        <div className="mx-auto mt-24 max-w-5xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-light text-[#001f3f] dark:text-[#e8e8e8]">10</div>
              <div className="text-sm font-light text-[#36454f] dark:text-gray-400">년의 경력</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-[#001f3f] dark:text-[#e8e8e8]">1,000+</div>
              <div className="text-sm font-light text-[#36454f] dark:text-gray-400">성공 레퍼런스</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-[#001f3f] dark:text-[#e8e8e8]">100%</div>
              <div className="text-sm font-light text-[#36454f] dark:text-gray-400">결과 중심</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" aria-labelledby="features-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-3xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-4xl">
            우리의 핵심 역량
          </h2>
        </div>
        <div ref={featuresRef} className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="feature-card group flex flex-col gap-4 rounded-2xl bg-white p-6 transition-all hover:shadow-lg dark:bg-[#0a0a0a] sm:p-8 border border-[#e5e7eb] dark:border-[#1a1a1a]">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-[#001f3f]/5 dark:bg-[#e8e8e8]/5" />
                  <p className="text-xs font-medium text-[#36454f] dark:text-gray-400">Strategy</p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              The Strategy
            </h3>
            <p className="flex-1 text-[#36454f] dark:text-gray-400 font-light">
              데이터 분석과 시장 인사이트를 바탕으로 한 맞춤형 마케팅 전략을 수립합니다.
            </p>
            <Link
              href="/strategy"
              className="mt-auto text-sm font-medium text-[#001f3f] transition-colors hover:text-[#36454f] dark:text-[#e8e8e8] dark:hover:text-gray-400"
            >
              자세히 보기 →
            </Link>
          </article>

          <article className="feature-card group flex flex-col gap-4 rounded-2xl bg-white p-6 transition-all hover:shadow-lg dark:bg-[#0a0a0a] sm:p-8 border border-[#e5e7eb] dark:border-[#1a1a1a]">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-[#001f3f]/5 dark:bg-[#e8e8e8]/5" />
                  <p className="text-xs font-medium text-[#36454f] dark:text-gray-400">Growth</p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              Growth Engine
            </h3>
            <p className="flex-1 text-[#36454f] dark:text-gray-400 font-light">
              AI 기반 자동화 시스템으로 지속 가능한 성장 동력을 만들어냅니다.
            </p>
            <Link
              href="/growth-engine"
              className="mt-auto text-sm font-medium text-[#001f3f] transition-colors hover:text-[#36454f] dark:text-[#e8e8e8] dark:hover:text-gray-400"
            >
              자세히 보기 →
            </Link>
          </article>

          <article className="feature-card group flex flex-col gap-4 rounded-2xl bg-white p-6 transition-all hover:shadow-lg dark:bg-[#0a0a0a] sm:p-8 border border-[#e5e7eb] dark:border-[#1a1a1a]">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-[#001f3f]/5 dark:bg-[#e8e8e8]/5" />
                  <p className="text-xs font-medium text-[#36454f] dark:text-gray-400">Success</p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              Success Cases
            </h3>
            <p className="flex-1 text-[#36454f] dark:text-gray-400 font-light">
              10년의 업력으로 증명된 압도적 성과를 통해 브랜드의 성장 스토리를 만들어갑니다.
            </p>
            <Link
              href="/success-cases"
              className="mt-auto text-sm font-medium text-[#001f3f] transition-colors hover:text-[#36454f] dark:text-[#e8e8e8] dark:hover:text-gray-400"
            >
              자세히 보기 →
            </Link>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="text-3xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-4xl">
            함께 성장할 파트너를 찾고 계신가요?
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            전문가 팀과 함께 브랜드의 다음 단계로 나아가세요.
          </p>
          <div className="mt-10">
            <Link
              href="/partnership"
              className="rounded-full bg-[#001f3f] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#0a2d5a] dark:bg-[#e8e8e8] dark:text-[#001f3f] dark:hover:bg-[#c0c0c0]"
            >
              파트너십 문의하기
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </article>
  );
}
