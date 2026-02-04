import type { Metadata } from 'next';
import Image from 'next/image';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';

export const metadata: Metadata = {
  title: '엠월드컴퍼니 성공 사례 | 실행력으로 증명된 압도적 성과',
  description: '엠월드컴퍼니는 10년 이상 실행력으로 증명된 압도적 성과를 통해 브랜드 성장 스토리를 만듭니다.',
  alternates: {
    canonical: 'https://www.aijeju.co.kr/success-cases',
  },
};

const cases = [
  {
    title: '동영상 숏폼 20개 제작 + 대형 채널 페이지 33곳 업로드',
    result: '전 채널 누적 5,000만 뷰 돌파 / 네이버 플레이스 순위 상승 최적화',
    description: '단순 제작을 넘어, 수많은 성공 거래처 숏폼 알고리즘을 실시간으로 분석합니다. 특히 네이버 플레이스 알고리즘 확산 가점을 위한 전략 이벤트를 기획하여, 브랜드 확산과 순위 상승이라는 두 마리 토끼를 동시에 잡아 압도적 매출 퍼포먼스를 만들어냅니다.',
    category: 'Shortform',
    image: '/shortform-mosaic.webp',
  },
  {
    title: '맛집 브랜드 A',
    result: '네이버 플레이스 방문객 400% 증가 / 알고리즘 확산 최적화',
    description: '알고리즘 최적화와 공간 브랜딩 전략으로 단순 노출을 넘어 실질 방문으로 전환했습니다.',
    category: 'F&B',
    image: '/restaurant-brand-a.png',
  },
  {
    title: '맛집 브랜드 B',
    result: '매출 성장 / 맞춤형 SNS 마케팅',
    description: '매장 컨셉에 맞는 브랜드 컨텐츠 제작과 최적화를 실행하여 맞춤 제작하여 브랜드 이미지와 매출 향상을 목표로 진행되었습니다.',
    category: 'F&B',
    image: '/restaurant-brand-b.png',
  },
  {
    title: '프리미엄 뷰티 브랜드',
    result: '팔로워 300% 증가 / 6개월 만에 타겟 오디언스 장악',
    description: '정교한 콘텐츠 전략으로 브랜드 감성을 전달하며 충성도 높은 고객층을 확보했습니다.',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=640&h=480&fit=crop&q=75',
  },
  {
    title: '테크 스타트업',
    result: '리드 생성 250% 향상 / 마케팅 자동화 성공',
    description: 'AI 기반 자동화 시스템을 통해 리드 생성 비용을 절감하면서 품질을 크게 향상시켰습니다.',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=480&fit=crop&q=75',
  },
  {
    title: '비공개 1:1 마스터 클래스 (대행사 창업 실무)',
    result: '광고대행사 대표 및 창업 준비생 전용 / 현직 대표 수강생 80% 이상',
    description: '온라인의 흔한 강의가 아닙니다. <span className="text-emerald-400">10년 이상</span> 실행사의 영업 비밀과 운영 로직을 오직 1:1 비공개로만 전수합니다. 대행사 대표님들이 직접 찾아 듣는, 즉시 창업과 매출 최적화가 가능한 하이엔드 실무 교육입니다.',
    category: 'MasterClass',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=640&h=480&fit=crop&q=75',
  },
];

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: '홈', url: '/' },
  { name: '성공 사례', url: '/success-cases' },
]);

export default function SuccessCasesPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="cases-heading">
        <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
          <h1 id="cases-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            성공 사례
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
            <span className="text-emerald-400">10년 이상</span> 실행력으로 증명된 압도적 성과
            <br />
            검증된 성공 사례를 통해 전문성과 결과를 확인하세요.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
            <span className="text-sm font-light text-slate-200">
              <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가, <span className="text-[#d4af37]">1,000개</span>의 신화. 엠월드컴퍼니는 결과로만 말합니다.
            </span>
          </div>
        </header>

        <div className="w-full mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {cases.map((caseItem, index) => (
            <section
              key={index}
              className={`group w-full max-w-sm flex flex-col overflow-hidden rounded-2xl text-center transition-all hover:scale-105 hover:shadow-2xl border ${
                caseItem.category === 'F&B' || caseItem.category === 'Shortform' || caseItem.category === 'MasterClass'
                  ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-emerald-400/20'
                  : 'bg-slate-900/50 border-white/5'
              } backdrop-blur-sm`}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 3}
                  loading={index >= 3 ? 'lazy' : 'eager'}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {(caseItem.category === 'F&B' || caseItem.category === 'Shortform' || caseItem.category === 'MasterClass') && (
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-[#d4af37] px-2 py-1 text-xs font-semibold text-white">
                      {caseItem.category === 'Shortform' ? '숏폼' : caseItem.category === 'MasterClass' ? '마스터클래스' : '맛집'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 items-center">
                <h2 className="text-xl font-semibold tracking-tight text-white text-center">
                  {caseItem.title}
                </h2>
                <p className={`mt-2 text-lg font-semibold text-center ${
                  caseItem.category === 'F&B' || caseItem.category === 'Shortform' || caseItem.category === 'MasterClass' ? 'text-[#d4af37]' : 'text-emerald-400'
                }`}>
                  {caseItem.result}
                </p>
                <p className="mt-4 flex-1 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto text-center" dangerouslySetInnerHTML={{ __html: caseItem.description }} />
              </div>
            </section>
          ))}
        </div>
      </section>
      
      <div className="mt-24">
        <CTASection />
      </div>
    </article>
    </>
  );
}
