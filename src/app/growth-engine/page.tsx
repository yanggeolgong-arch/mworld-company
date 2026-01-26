import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Growth Engine - M-World Company',
  description: '10년 이상의 경력과 AI 기반 자동화 시스템으로 지속 가능한 성장 동력을 만듭니다.',
};

export default function GrowthEnginePage() {
  return (
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      <section className="mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="growth-heading">
        <header className="mx-auto max-w-3xl text-center">
          <h1 id="growth-heading" className="text-4xl font-semibold tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-5xl">
            Growth Engine
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            10년 이상의 경력과 AI 기술, 자동화 시스템을 통해
            <br />
            브랜드의 성장을 가속화하는 강력한 엔진을 구축합니다.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2">
            <span className="text-sm font-light text-[#001f3f] dark:text-[#e8e8e8]">
              10년의 데이터, 1,000개의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div className="mx-auto mt-20 max-w-3xl space-y-16 text-center">
          <section>
            <h2 className="text-2xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              AI 기반 자동화
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light">
              머신러닝과 AI 알고리즘을 활용하여 콘텐츠 최적화, 타겟팅,
              예산 배분을 자동화합니다. 24/7 지속적인 최적화로
              인적 리소스를 최소화하면서 성과를 극대화합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              실시간 성과 분석
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light">
              실시간 대시보드를 통해 캠페인 성과를 즉시 확인하고
              데이터 기반 의사결정을 내릴 수 있습니다. 예측 분석을 통해
              미래 트렌드를 선제적으로 대응합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              확장 가능한 인프라
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light">
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
