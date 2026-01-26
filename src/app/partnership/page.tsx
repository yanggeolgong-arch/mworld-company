import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Partnership - M-World Company',
  description: '10년 이상의 경력을 가진 전문가 팀과 함께 브랜드의 다음 단계로 나아가세요.',
};

export default function PartnershipPage() {
  return (
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      <section className="mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="partnership-heading">
        <header className="mx-auto max-w-3xl text-center">
          <h1 id="partnership-heading" className="text-4xl font-semibold tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-5xl">
            Partnership
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            10년 이상의 SNS 광고 대행 경력을 가진 전문가 팀과 함께
            <br />
            브랜드의 다음 단계로 나아가세요.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2">
            <span className="text-sm font-light text-[#001f3f] dark:text-[#e8e8e8]">
              10년의 데이터, 1,000개의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div className="mx-auto mt-20 max-w-3xl space-y-16 text-center">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-[#001f3f] dark:text-[#e8e8e8]">
              맞춤형 솔루션 제공
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light leading-relaxed">
              각 브랜드의 고유한 요구사항과 목표를 이해하고,
              최적화된 마케팅 솔루션을 제공합니다. 단순한 광고 대행을 넘어
              전략적 파트너로서 브랜드 성장에 기여합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-[#001f3f] dark:text-[#e8e8e8]">
              전문가 팀
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light leading-relaxed">
              디지털 마케팅, 데이터 분석, 콘텐츠 크리에이션 등
              각 분야의 전문가로 구성된 팀이 브랜드의 성공을 위해
              최선을 다합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-[#001f3f] dark:text-[#e8e8e8]">
              지속적인 협업
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light leading-relaxed">
              일회성 프로젝트가 아닌 장기적인 파트너십을 통해
              브랜드의 지속적인 성장을 지원합니다. 정기적인 리포트와
              전략 회의를 통해 항상 최적의 방향으로 나아갑니다.
            </p>
          </section>

          <section className="rounded-2xl bg-white p-8 dark:bg-[#0a0a0a] border border-white/10 dark:border-white/10">
            <h2 className="text-2xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
              문의하기
            </h2>
            <p className="mt-4 text-[#36454f] dark:text-gray-400 font-light">
              파트너십에 관심이 있으시다면 언제든지 연락주세요.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:010-4074-9343"
                className="flex items-center gap-2 text-lg font-semibold text-[#001f3f] transition-colors hover:text-[#d4af37] dark:text-[#e8e8e8] dark:hover:text-[#d4af37]"
              >
                <span className="text-[#d4af37]">📞</span>
                010-4074-9343 →
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                대표: 10년 경력 전문가
              </p>
              <a
                href="mailto:contact@aijeju.co.kr"
                className="block text-sm font-medium text-gray-600 transition-colors hover:text-[#001f3f] dark:text-gray-400 dark:hover:text-[#e8e8e8]"
              >
                contact@aijeju.co.kr →
              </a>
            </div>
          </section>
        </div>
      </section>
      <CTASection />
    </article>
  );
}
