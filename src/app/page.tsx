import Link from 'next/link';
import Image from 'next/image';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <section className="relative w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center min-h-[70vh]" style={{ minHeight: '70vh' }} aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" aria-hidden="true" />
        <div className="relative w-full mx-auto max-w-4xl flex flex-col items-center justify-center text-center animate-stagger">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              엠월드컴퍼니
            </span>
          </div>
          <h1 id="hero-heading" className="text-6xl font-light tracking-tight text-white sm:text-7xl lg:text-8xl">
            사무실 없는 1인 기업, AI 자동화로{' '}
            <span className="font-semibold text-[#d4af37]">[대행사 창업]</span>의 수익 한계를 깨다.
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-slate-200 max-w-2xl mx-auto">
            10년 차 전문가가 직접 설계한 지능형 엔진. 직원 없이, 임대료 없이 오직 성과로 증명하는 무인 대행사 운영 시스템.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:010-4074-9343" className="text-lg font-bold text-slate-200 hover:underline">
              문의: 010-4074-9343
            </a>
            <Link
              href="/insights"
              className="text-sm font-medium leading-6 text-slate-200 transition-colors hover:text-emerald-400"
            >
              인사이트 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 10년 이상 실행 업무 전문가 시각화 */}
        <div className="relative w-full mx-auto mt-32 max-w-5xl flex flex-col items-center justify-center text-center">
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-emerald-400">10년+</div>
              <div className="text-sm font-light text-slate-300">실행 업무 전문가</div>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-[#d4af37]">1,000+</div>
              <div className="text-sm font-light text-slate-300">성공 레퍼런스</div>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-emerald-400">100%</div>
              <div className="text-sm font-light text-slate-300">결과 중심</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced Spacing & Images */}
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="features-heading">
        <div className="w-full mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            엠월드컴퍼니 핵심 역량
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
            복제 불가 기술력으로 구축한 프리미엄 솔루션
          </p>
        </div>
        <div className="w-full mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          <article className="feature-card animate-stagger animate-stagger-delay-1 group w-full max-w-sm flex flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/images/ai-marketing-insights-automation.webp"
                alt="AI 마케팅 실무 인사이트 자동화"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                priority
                fetchPriority="high"
                decoding="async"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              마케팅 전략
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              알고리즘 확산을 위한 데이터 분석과 시장 인사이트로 맞춤 마케팅 전략을 수립합니다.
            </p>
            <Link
              href="/strategy"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              마케팅 전략 자세히 보기 →
            </Link>
          </article>

          <article className="feature-card animate-stagger animate-stagger-delay-2 group w-full max-w-sm flex flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/images/agency-startup-ai-automation.webp"
                alt="대행사 창업 AI 자동화 성장 엔진"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              성장 엔진
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              효율성 극대화 AI 자동화로 지속 가능한 성장 동력을 만듭니다.
            </p>
            <Link
              href="/growth-engine"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              성장 엔진 알아보기 →
            </Link>
          </article>

          <article className="feature-card animate-stagger animate-stagger-delay-3 group w-full max-w-sm flex flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/images/unmanned-automation-workflow-system.webp"
                alt="무인 자동화 워크플로우 시스템"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              성공 사례
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              <span className="text-emerald-400">10년 이상</span> 실행력으로 증명한 압도적 성과로 브랜드 성장 스토리를 만듭니다.
            </p>
            <Link
              href="/success-cases"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              성공 사례 자세히 보기 →
            </Link>
          </article>

          <article className="feature-card animate-stagger animate-stagger-delay-4 group w-full max-w-sm flex flex-col gap-4 rounded-2xl bg-slate-900/50 p-6 text-center transition-all hover:scale-105 hover:shadow-2xl sm:p-8 border border-white/5 backdrop-blur-sm">
            <div className="relative mx-auto w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/images/jeju-local-marketing-performance-report.webp"
                alt="제주 로컬 성과 보고서 마케팅 데이터"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              제주 로컬 성과 보고서
            </h3>
            <p className="flex-1 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              제주 로컬 시장 데이터와 성과 지표로 검증된 마케팅 결과를 보고합니다.
            </p>
            <Link
              href="/insights"
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              성과 보고서 보기 →
            </Link>
          </article>
        </div>
      </section>

      {/* CTA Section - Enhanced Spacing */}
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="cta-heading">
        <div className="w-full mx-auto max-w-2xl flex flex-col items-center justify-center text-center">
          <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            함께 성장할 파트너를 찾고 계신가요?
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
            전문가 팀과 함께 브랜드 다음 단계로 나아가세요. 협업 문의 카카오톡: SG7979
          </p>
          <div className="mt-10">
            <Link
              href="/partnership"
              className="rounded-full bg-[#d4af37] px-8 py-4 text-sm font-bold !text-black transition-all hover:bg-emerald-400 hover:shadow-xl"
            >
              협업 문의 (카카오톡: SG7979)
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </article>
  );
}
