import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Success Cases - M-World Company',
  description: '10년의 업력으로 증명된 압도적 성과를 통해 브랜드의 성장 스토리를 만듭니다.',
};

const cases = [
  {
    title: 'F&B 맛집 브랜드 A',
    result: '네이버 플레이스 방문객 400% 증가',
    description: '네이버 플레이스 알고리즘 최적화와 공간 브랜딩 전략으로 단순 노출을 넘어 실질적인 방문으로 전환시켰습니다. 3개월 만에 일일 방문객 수가 4배 증가했습니다.',
    category: 'F&B',
  },
  {
    title: 'F&B 맛집 브랜드 B',
    result: '매출 350% 성장',
    description: '10년 경력의 전문가가 직접 수립한 맞춤형 SNS 마케팅 전략으로 브랜드 인지도와 매출을 동시에 급성장시켰습니다.',
    category: 'F&B',
  },
  {
    title: '프리미엄 뷰티 브랜드',
    result: '팔로워 300% 증가',
    description: '타겟 오디언스 분석과 맞춤형 콘텐츠 전략으로 6개월 만에 팔로워를 3배 증가시켰습니다.',
    category: 'Beauty',
  },
  {
    title: '테크 스타트업',
    result: '리드 생성 250% 향상',
    description: 'AI 기반 자동화 시스템을 통해 리드 생성 비용을 절감하면서 품질을 크게 향상시켰습니다.',
    category: 'Tech',
  },
  {
    title: '럭셔리 패션 브랜드',
    result: '매출 180% 성장',
    description: '데이터 기반 인플루언서 마케팅 전략으로 브랜드 인지도와 매출을 동시에 성장시켰습니다.',
    category: 'Fashion',
  },
];

export default function SuccessCasesPage() {
  return (
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" aria-labelledby="cases-heading">
        <header className="mx-auto max-w-3xl">
          <h1 id="cases-heading" className="text-4xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-5xl">
            Success Cases
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            10년의 업력으로 증명된 압도적 성과
            <br />
            검증된 성공 사례를 통해 우리의 전문성과 결과를 확인하세요.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2">
            <span className="text-sm font-light text-[#001f3f] dark:text-[#e8e8e8]">
              10년의 데이터, 1,000개의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem, index) => (
            <section
              key={index}
              className={`group flex flex-col overflow-hidden rounded-2xl transition-all hover:shadow-lg border ${
                caseItem.category === 'F&B'
                  ? 'bg-gradient-to-br from-white to-[#d4af37]/5 border-[#d4af37]/20 dark:from-[#0a0a0a] dark:to-[#d4af37]/10 dark:border-[#d4af37]/30'
                  : 'bg-white dark:bg-[#0a0a0a] border-[#e5e7eb] dark:border-[#1a1a1a]'
              }`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#1a1a1a] dark:to-[#0a0a0a]">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className={`mx-auto mb-2 h-12 w-12 rounded-full ${
                      caseItem.category === 'F&B' ? 'bg-[#d4af37]/20' : 'bg-[#001f3f]/10 dark:bg-[#e8e8e8]/10'
                    }`} />
                    <p className="text-xs font-light text-[#36454f] dark:text-gray-400">
                      {caseItem.category}
                    </p>
                  </div>
                </div>
                {caseItem.category === 'F&B' && (
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-[#d4af37] px-2 py-1 text-xs font-semibold text-white">
                      F&B
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
                  {caseItem.title}
                </h2>
                <p className={`mt-2 text-lg font-semibold ${
                  caseItem.category === 'F&B' ? 'text-[#d4af37]' : 'text-[#0a2d5a] dark:text-[#c0c0c0]'
                }`}>
                  {caseItem.result}
                </p>
                <p className="mt-4 flex-1 text-[#36454f] dark:text-gray-400 font-light">
                  {caseItem.description}
                </p>
              </div>
            </section>
          ))}
        </div>
      </section>
      <CTASection />
    </article>
  );
}
