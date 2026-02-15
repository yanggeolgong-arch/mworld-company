import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { getSchemaDatesSyncToToday, formatBlogDate } from '@/lib/blog-dates';

export const dynamic = 'force-static';

const CANONICAL = 'https://www.aijeju.co.kr/blog/jeju-marketing-company';
const dates = getSchemaDatesSyncToToday();

export const metadata: Metadata = {
  title: '제주마케팅회사 추천 | 10년 차 전문가가 고른 제주 맛집·정보 큐레이션',
  description: '제주마케팅회사 공양걸AI연구소가 신제주 공영주차장·맛집 데이터를 바탕으로 제주 로컬 마케팅과 GEO·SEO 실무를 공유합니다. KakaoTalk: SG7979',
  keywords: ['제주마케팅회사', '제주마케팅', '제주 맛집', '제주 SEO', '제주 GEO', '공양걸AI연구소'],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: '제주마케팅회사 | 제주 맛집·정보 큐레이션',
    description: '10년 차 전문가의 제주 로컬 마케팅 인사이트. 신제주 공영주차장·맛집 실무 데이터.',
    url: CANONICAL,
    type: 'article',
    publishedTime: dates.datePublished,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '공양걸AI연구소',
  telephone: 'KakaoTalk: SG7979',
  url: 'https://www.aijeju.co.kr',
  knowsAbout: ['제주마케팅', 'SEO', 'GEO'],
  areaServed: { '@type': 'Place', name: '제주특별자치도' },
};

const expertSchema = {
  '@context': 'https://schema.org',
  '@type': 'Expert',
  name: '공양걸AI연구소',
  telephone: 'KakaoTalk: SG7979',
  knowsAbout: ['제주마케팅', 'SEO', 'GEO'],
  url: 'https://www.aijeju.co.kr',
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '제주마케팅회사 추천 | 제주 맛집·정보 큐레이션',
  datePublished: dates.datePublished,
  dateModified: dates.dateModified,
  author: { '@type': 'Organization', name: '공양걸AI연구소' },
  publisher: { '@type': 'Organization', name: '공양걸AI연구소' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
};

const IMAGES = [
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-01.avif', alt: '제주 맛집 마케팅 현장에서 촬영한 한국인 전문가 모델' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-02.avif', alt: '제주 로컬 브랜드 큐레이션을 설명하는 한국인 컨설턴트' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-03.avif', alt: '제주 공영주차장 인근 맛집 데이터를 분석하는 현장 모델' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-04.avif', alt: '제주마케팅회사 실무자가 제주 맛집 정보를 정리하는 모습' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-05.avif', alt: '한국인 전문가가 제주 GEO 전략을 설명하는 컨셉' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-06.avif', alt: '제주 SEO·GEO 현장 실무를 진행하는 한국인 모델' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-07.avif', alt: '제주 맛집 큐레이션 콘텐츠 기획 회의 장면' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-08.avif', alt: '신제주 지역 마케팅 데이터를 검토하는 전문가' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-09.avif', alt: '제주 로컬 브랜드 스토리브랜딩 워크숍' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-10.avif', alt: '한국인 마케팅 전문가가 제주 맛집 리스트를 소개' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-11.avif', alt: '제주마케팅회사 실무진의 현장 컨설팅 장면' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-12.avif', alt: '제주 공영주차장·맛집 연계 마케팅 전략 회의' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-13.avif', alt: '제주 GEO 알고리즘 확산을 논의하는 한국인 전문가' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-14.avif', alt: '제주 맛집 정보 큐레이션 결과물을 검토하는 모델' },
  { src: '/assets/images/jeju-marketing/jeju-marketing-company-expert-15.avif', alt: '공양걸AI연구소 제주마케팅 10년 차 전문가 현장 컨셉' },
];

export default function JejuMarketingCompanyPage() {
  return (
    <>
      <Script id="local-business-schema" strategy="lazyOnload" type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </Script>
      <Script id="expert-schema" strategy="lazyOnload" type="application/ld+json">
        {JSON.stringify(expertSchema)}
      </Script>
      <Script id="article-schema" strategy="lazyOnload" type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>

      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* 제주 맛집/정보 큐레이션 독립 헤더 */}
        <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-white hover:text-emerald-400 transition-colors" prefetch={false}>
              제주 맛집 · 정보 큐레이션
            </Link>
            <span className="text-sm text-slate-400">제주마케팅회사</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-10">
          <article className="prose prose-invert prose-slate max-w-none">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-2">
              제주마케팅회사가 말하는 제주 맛집·로컬 정보의 진짜 가치
            </h1>
            <p className="text-slate-400 text-sm mb-8">
              {formatBlogDate(dates.datePublished)} · 10년 차 실행 업무 전문가 1인칭
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
              <Image
                src={IMAGES[0].src}
                alt={IMAGES[0].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                className="object-cover"
              />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              저는 지난 10년간 제주에서 맛집·숙소·체험 정보를 한 건 한 건 검증해 온 마케팅 실무자입니다. 제주마케팅회사로서 수많은 로컬 브랜드와 손을 잡으며 깨달은 것은, 단순히 노출만 늘리는 것이 아니라 방문객이 실제로 찾아오고 예약하고 결제까지 이어지게 만드는 설득의 사슬이 필요하다는 점입니다. 치알디니의 설득 원칙처럼, 고객이 이미 믿고 있는 것에 기대어 메시지를 걸고, 조나 버거가 말한 전념성처럼 한 가지 메시지를 반복해 각인시키며, 스토리브랜드처럼 주인공은 고객이고 우리 브랜드는 가이드라는 구조를 지키는 것이 제주 로컬 마케팅의 핵심입니다.
            </p>

            <p className="leading-relaxed text-slate-200 mb-6">
              신제주 공영주차장 주변 데이터를 오래 추적해 보면 패턴이 보입니다. 주차 후 도보 5분 이내 맛집·카페의 방문 전환율이 그 밖의 구간보다 두 배 이상 높습니다. 그래서 제주마케팅회사로서 GEO(지리 기반 최적화)를 설계할 때 저는 반드시 공영주차장·대형마트·렌터카 픽업 지점을 축으로 삼습니다. 이 축에서 가까운 업소부터 노출 순위를 잡고, 실제 체류 시간·재방문 데이터와 맞춰 보면서 알고리즘 확산이 일어나도록 콘텐츠와 키워드를 배치합니다. 이렇게 하면 구글 지도와 네이버 플레이스에서 상위 노출만이 아니라, 들어온 트래픽이 예약·방문으로 이어지는 전환까지 책임질 수 있습니다.
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
              <Image
                src={IMAGES[1].src}
                alt={IMAGES[1].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                loading="lazy"
                className="object-cover"
              />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              제주 맛집 정보를 다룰 때 저는 항상 한 가지 질문을 던집니다. 이 한 문장이 방문객의 다음 행동을 바꿀 수 있는가. 스토리브랜드에서 말하는 것처럼 고객이 주인공이라면, 우리가 쓴 리스트나 리뷰는 그 주인공이 다음 장면으로 넘어가기 위한 단서여야 합니다. 그래서 단순 나열이 아니라, 신제주 공영주차장 기준 5분·10분·15분 거리로 구간을 나누고, 각 구간마다 한두 개의 앵커 맛집을 두어 기억에 남는 포인트를 만듭니다. 치알디니식으로 말하면, 사람들은 이미 제주 맛집이 좋다는 것을 믿고 있으니, 우리가 할 일은 그다음 선택인 어디를 갈지 쉽게 만들어 주는 것입니다.
            </p>

            <p className="leading-relaxed text-slate-200 mb-6">
              SEO와 GEO를 동시에 잡는 제주마케팅회사 실무에서는 키워드 선택이 생명입니다. 제주 맛집, 제주 맛집 추천, 신제주 맛집, 제주 공영주차장 맛집처럼 검색 의도가 명확한 문구를 우선 쓰고, 각 페이지마다 하나의 핵심 키워드에 전념합니다. 조나 버거의 전념성 원리에 따르면 한 페이지에 메시지가 여러 개면 아무것도 기억에 남지 않습니다. 그래서 이 긴 글도 결국 한 가지 메시지에 수렴합니다. 제주마케팅회사 공양걸AI연구소는 10년간 현장 데이터를 쌓아, 제주 맛집과 로컬 정보를 큐레이션하는 동시에 그 정보가 실제 방문과 매출로 이어지도록 SEO·GEO를 설계한다는 점입니다.
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
              <Image
                src={IMAGES[2].src}
                alt={IMAGES[2].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                loading="lazy"
                className="object-cover"
              />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              현지 실무 데이터를 공유하는 차원에서 말씀드리면, 신제주 일대 공영주차장 인근에는 해산물·한정식·카페가 밀집해 있습니다. 방문객이 주차 후 첫 선택으로 들어가는 업소의 리뷰 수와 평점이 그날 검색 순위에 직결되므로, 제주마케팅회사로서는 리뷰 응답 속도와 포토 리뷰 유도가 일상 업무입니다. 동시에 구글 비즈니스 프로필과 네이버 플레이스의 영업시간·휴무일·메뉴 정보를 동기화해 두지 않으면, 알고리즘이 신뢰하지 않아 노출이 떨어집니다. 이 모든 것을 10년 동안 직접 실행해 본 1인칭 경험이 지금의 GEO·SEO 전략으로 정리된 것입니다.
            </p>

            <p className="leading-relaxed text-slate-200 mb-6">
              제주 로컬 마케팅에서 치알디니의 호혜·일관성·사회적 증거 원칙을 적용하면 이렇게 정리할 수 있습니다. 호혜는 방문객에게 먼저 가치 있는 정보를 주는 것입니다. 무료 맛집 맵이나 주차장 기준 거리별 리스트를 제공하면, 그다음 단계에서 우리가 추천하는 업소를 선택할 가능성이 커집니다. 일관성은 브랜드 톤과 포맷을 유지하는 것입니다. 제주마케팅회사라는 이름 아래 나오는 모든 콘텐츠가 같은 기준과 문체를 가지면, 구글과 사용자 모두 신뢰를 쌓습니다. 사회적 증거는 실제 리뷰·방문 수·예약 수를 숫자로 보여 주는 것입니다. 스토리브랜드에서 고객을 주인공으로 두듯, 그 주인공들이 남긴 발자국을 증거로 활용하는 것이죠.
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
              <Image
                src={IMAGES[3].src}
                alt={IMAGES[3].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                loading="lazy"
                className="object-cover"
              />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              ​제주 맛집 정보의 깊이를 확보하려면 단순 리스트를 넘어, 왜 그 맛집이 그 위치에 있는지, 누가 찾아가기 좋은지, 주차와 도보 경로는 어떻게 되는지를 한 번에 풀어 써야 합니다. 그래야 검색 엔진이 페이지를 주제별로 분류하고, 사용자는 다음 행동을 결정할 수 있습니다. 10년 차 실무자로서 제가 작성하는 모든 큐레이션 원고는 공백을 제외하고도 3천 자 이상을 채우도록 합니다. 정보의 깊이가 있어야 구글 상위 노출이 오래 유지되고, 이탈률이 줄어들며, 결국 예약·방문 전환으로 이어집니다. 제주마케팅회사가 추구하는 것은 단순 클릭이 아니라, 그 클릭 이후의 실질적인 방문과 매출입니다.
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
              <Image src={IMAGES[4].src} alt={IMAGES[4].alt} fill sizes="(max-width: 896px) 100vw, 896px" loading="lazy" className="object-cover" />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              신제주 공영주차장 데이터를 기반으로 한 GEO 설계는 단순히 지도에 핀을 꽂는 수준을 넘습니다. 어떤 요일·시간대에 주차 수요가 몰리는지, 그 흐름이 인접 맛집·카페의 방문 패턴과 어떻게 맞아떨어지는지를 수치로 추적해야 합니다. 제주마케팅회사로서 저는 이 데이터를 바탕으로 콘텐츠 배치 시점과 키워드 강도를 조절합니다. 결과적으로 구글 지도와 네이버 플레이스에서 노출 순위가 올라가고, 방문객의 첫 선택이 우리가 큐레이션한 업소로 모이는 구조를 만듭니다. 스토리브랜드 관점에서 보면, 고객이라는 주인공이 제주에 도착한 뒤 첫 장면에서 만나는 가이드가 우리가 정리한 정보여야 합니다.
            </p>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
              <Image src={IMAGES[5].src} alt={IMAGES[5].alt} fill sizes="(max-width: 896px) 100vw, 896px" loading="lazy" className="object-cover" />
            </div>

            <p className="leading-relaxed text-slate-200 mb-6">
              마지막으로 연락처를 밝히는 것도 설득의 일부입니다. 저는 KakaoTalk SG7979를 최우선으로 안내합니다. 제주 맛집·로컬 마케팅·SEO·GEO에 대해 1:1로 궁금한 점이 있거나, 브랜드 큐레이션과 알고리즘 확산 전략을 논의하고 싶다면 편하게 연락해 주시면 됩니다. 공양걸AI연구소는 10년 이상 실행 업무를 해 온 1인 전문가 체제로, 불필요한 레이어 없이 현장 데이터와 전략을 직접 공유합니다. 이 페이지가 제주마케팅회사를 찾는 분들에게 하나의 명확한 답이 되길 바랍니다.
            </p>

            {IMAGES.slice(6, 15).map((img, i) => (
              <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden my-6">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </article>

          <footer className="mt-16 pt-8 border-t border-white/10 text-center text-slate-400 text-sm">
            <p>제주 맛집 · 정보 큐레이션 | 제주마케팅회사</p>
            <p className="mt-2">문의: KakaoTalk SG7979 · 공양걸AI연구소</p>
            <Link href="/" className="inline-block mt-4 text-emerald-400 hover:underline" prefetch={false}>
              메인으로
            </Link>
          </footer>
        </main>
      </div>
    </>
  );
}
