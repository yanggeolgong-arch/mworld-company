'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <article className="min-h-screen bg-slate-950">
      {/* Hero Section - Premium Dark Gradient */}
      <section className="relative mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
        <div ref={heroRef} className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              M-World Company
            </span>
          </div>
          <h1 id="hero-heading" className="text-6xl font-light tracking-tight text-white sm:text-7xl lg:text-8xl">
            <span className="text-emerald-400">10년</span>의 데이터
            <br />
            <span className="font-semibold text-[#d4af37]">1,000개</span>의 신화
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-slate-200">
            엠월드컴퍼니는 결과로만 말합니다.
          </p>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300">
            F&B(맛집) 마케팅의 절대 강자
            <br />
            <span className="text-emerald-400">1,000개</span> 이상의 성공 레퍼런스로 증명된 압도적 성과
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/strategy"
              className="rounded-full bg-[#d4af37] px-8 py-4 text-sm font-medium text-slate-900 transition-all hover:bg-emerald-400 hover:shadow-xl"
            >
              전략 알아보기
            </Link>
            <Link
              href="/insights"
              className="text-sm font-medium leading-6 text-slate-200 transition-colors hover:text-emerald-400"
            >
              인사이트 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 10년 역사 시각화 */}
        <div className="relative mx-auto mt-32 max-w-5xl text-center">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-light text-emerald-400">10</div>
              <div className="text-sm font-light text-slate-300">년의 경력</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-[#d4af37]">1,000+</div>
              <div className="text-sm font-light text-slate-300">성공 레퍼런스</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-emerald-400">100%</div>
              <div className="text-sm font-light text-slate-300">결과 중심</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced Spacing & Images */}
      <section className="mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="features-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            우리의 핵심 역량
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300">
            복제 불가능한 기술력으로 구축된 프리미엄 솔루션
          </p>
        </div>
        <div ref={featuresRef} className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          <article className="feature-card group mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80"
                alt="Strategy"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              The Strategy
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed">
              데이터 분석과 시장 인사이트를 바탕으로 한 맞춤형 마케팅 전략을 수립합니다.
            </p>
            <Link
              href="/strategy"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              자세히 보기 →
            </Link>
          </article>

          <article className="feature-card group mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80"
                alt="Growth"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              Growth Engine
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed">
              AI 기반 자동화 시스템으로 지속 가능한 성장 동력을 만들어냅니다.
            </p>
            <Link
              href="/growth-engine"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              자세히 보기 →
            </Link>
          </article>

          <article className="feature-card group mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
                alt="Success"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              Success Cases
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed">
              <span className="text-emerald-400">10년</span>의 업력으로 증명된 압도적 성과를 통해 브랜드의 성장 스토리를 만들어갑니다.
            </p>
            <Link
              href="/success-cases"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              자세히 보기 →
            </Link>
          </article>
        </div>
      </section>

      {/* CTA Section - Enhanced Spacing */}
      <section className="mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            함께 성장할 파트너를 찾고 계신가요?
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300">
            전문가 팀과 함께 브랜드의 다음 단계로 나아가세요.
          </p>
          <div className="mt-10">
            <Link
              href="/partnership"
              className="rounded-full bg-[#d4af37] px-8 py-4 text-sm font-medium text-slate-900 transition-all hover:bg-emerald-400 hover:shadow-xl"
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
