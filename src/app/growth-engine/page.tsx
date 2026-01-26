import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Growth Engine - M-World Company',
  description: '10년 이상의 경력과 AI 기반 자동화 시스템으로 지속 가능한 성장 동력을 만듭니다.',
};

export default function GrowthEnginePage() {
  return (
    <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="growth-heading">
        <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
          <h1 id="growth-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Growth Engine
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
            <span className="text-emerald-400">10년</span> 이상의 경력과 AI 기술, 자동화 시스템을 통해
            <br />
            브랜드의 성장을 가속화하는 강력한 엔진을 구축합니다.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
            <span className="text-sm font-light text-slate-200">
              <span className="text-emerald-400">10년</span>의 데이터, <span className="text-[#d4af37]">1,000개</span>의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div className="w-full mx-auto mt-20 max-w-3xl space-y-16 flex flex-col items-center justify-center text-center">
          <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              AI 기반 자동화
            </h2>
            <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              머신러닝과 AI 알고리즘을 활용하여 콘텐츠 최적화, 타겟팅,
              예산 배분을 자동화합니다. 24/7 지속적인 최적화로
              인적 리소스를 최소화하면서 성과를 극대화합니다.
            </p>
          </section>

          <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              실시간 성과 분석
            </h2>
            <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              실시간 대시보드를 통해 캠페인 성과를 즉시 확인하고
              데이터 기반 의사결정을 내릴 수 있습니다. 예측 분석을 통해
              미래 트렌드를 선제적으로 대응합니다.
            </p>
          </section>

          <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              확장 가능한 인프라
            </h2>
            <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              브랜드의 성장에 따라 자동으로 확장되는 인프라로
              언제든지 규모를 조정할 수 있습니다. 클라우드 기반 시스템으로
              안정성과 성능을 보장합니다.
            </p>
          </section>
        </div>
      </section>
      <CTASection />
    </article>
  );
}
