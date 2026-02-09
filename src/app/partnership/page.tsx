import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';

export const metadata: Metadata = {
  title: '엠월드컴퍼니 협업 문의 | 카카오톡 SG7979',
  description: '엠월드컴퍼니는 10년 이상 실행 업무 노하우를 가진 전문가 팀과 함께 브랜드 다음 단계로 나아갑니다. 협업 문의 카카오톡: SG7979',
  alternates: {
    canonical: 'https://www.aijeju.co.kr/partnership',
  },
};

export const dynamic = 'force-static';

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: '홈', url: '/' },
  { name: '협업 문의', url: '/partnership' },
]);

export default function PartnershipPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="partnership-heading">
          <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
            <h1 id="partnership-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              협업 문의
            </h1>
            <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
              <span className="text-emerald-400">10년 이상</span> 실행 업무 노하우를 가진 전문가 팀과 함께
              <br />
              브랜드 다음 단계로 나아가세요.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
              <span className="text-sm font-light text-slate-200">
                <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가, <span className="text-[#d4af37]">1,000개</span>의 신화. 엠월드컴퍼니는 결과로만 말합니다.
              </span>
            </div>
          </header>

          <div className="w-full mx-auto mt-20 max-w-3xl space-y-16 flex flex-col items-center justify-center text-center">
            <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                맞춤형 솔루션 제공
              </h2>
              <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                각 브랜드의 고유한 요구사항과 목표를 이해하고,
                최적화된 마케팅 솔루션을 제공합니다. 단순한 광고 대행을 넘어
                전략적 파트너로서 브랜드 성장에 기여합니다.
              </p>
            </section>

            <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                전문가 팀
              </h2>
              <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                디지털 마케팅, 데이터 분석, 콘텐츠 크리에이션 등
                각 분야의 전문가로 구성된 팀이 브랜드의 성공을 위해
                최선을 다합니다.
              </p>
            </section>

            <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                지속적인 협업
              </h2>
              <p className="mt-4 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                일회성 프로젝트가 아닌 장기적인 파트너십을 통해
                브랜드의 지속적인 성장을 지원합니다. 정기적인 리포트와
                전략 회의를 통해 항상 최적의 방향으로 나아갑니다.
              </p>
            </section>

            <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                협업 문의
              </h2>
              <p className="mt-4 text-slate-300 font-light max-w-2xl mx-auto">
                협업에 관심이 있으시다면 언제든지 연락주세요.
              </p>
              <div className="mt-6 space-y-3 flex flex-col items-center">
                <p className="text-lg font-bold text-emerald-400 text-center">
                  협업 문의: 카카오톡 SG7979
                </p>
                <a
                  href="tel:010-4074-9343"
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-emerald-400 transition-colors hover:text-[#d4af37]"
                >
                  <span className="text-[#d4af37]">📞</span>
                  대표번호: 010-4074-9343 →
                </a>
                <p className="text-xs text-slate-400">
                  대표: <span className="text-emerald-400">10년 이상</span> 실행사 대표 전문가
                </p>
              </div>
            </section>
          </div>
        </section>
        <CTASection />
      </article>
    </>
  );
}
