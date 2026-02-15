import Link from 'next/link';
import Image from 'next/image';
import { CTASection } from '@/components/CTASection';

/**
 * 메인 페이지 첫 화면 아래 영역: Features 그리드, CTA, CTASection.
 * next/dynamic(ssr: false)로 지연 로딩하여 LCP(히어로)에만 리소스 집중.
 */
export function HomeBelowFold() {
  return (
    <>
      {/* Features Grid */}
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="features-heading">
        <div className="w-full mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            공양걸AI연구소 핵심 역량
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
                alt="공양걸AI연구소 AI 마케팅 실무 인사이트 자동화"
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
              prefetch={false}
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
              prefetch={false}
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
              prefetch={false}
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
              prefetch={false}
              className="mt-auto text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]"
            >
              성과 보고서 보기 →
            </Link>
          </article>
        </div>
      </section>

      {/* CTA Section */}
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
              prefetch={false}
              className="rounded-full bg-[#d4af37] px-8 py-4 text-sm font-bold !text-black transition-all hover:bg-emerald-400 hover:shadow-xl"
            >
              협업 문의 (카카오톡: SG7979)
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
