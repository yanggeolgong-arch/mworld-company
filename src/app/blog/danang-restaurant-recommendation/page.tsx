import type { Metadata } from 'next';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { AuthorBox } from '@/components/AuthorBox';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate } from '@/lib/blog-dates';
import { getSchemaDates } from '@/lib/blog-dates';
import { ARNAR_PERSON_SCHEMA, createAnalysisNewsArticleSchema, createDanangReviewSchema } from '@/lib/eeat-schema';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'danang-restaurant-recommendation';
const IMAGE_BASE = '/images/blog/danang-seo/';
const OG_IMAGE_URL = 'https://www.aijeju.co.kr/images/blog/danang-restaurant-recommendation/main.png';

/** 8.webp: 흰색 고양이 EEAT 캐릭터 (분석가 프로필 박스). 변환 전에는 SVG 폴백 */
const AUTHOR_IMAGE = (() => {
  const webp = join(process.cwd(), 'public', 'images', 'blog', 'danang-seo', 'white-cat-analyst-arnar.webp');
  return existsSync(webp) ? `${IMAGE_BASE}white-cat-analyst-arnar.webp` : `${IMAGE_BASE}gongyanggeol-analysis.svg`;
})();

const DANANG_SEO_IMAGES: Record<number, { file: string; alt: string }> = {
  1: { file: 'main-2026-vietnam-danang.webp', alt: '2026 베트남 다낭 맛집 추천 메인 타이틀 이미지' },
  2: { file: 'moc-quan-2026-data.webp', alt: '2026 베트남 다낭 목 식당 데이터 이미지' },
  3: { file: 'banh-mi-phu-logic.webp', alt: '2026 베트남 다낭 반미프엉 키워드 로직 이미지' },
  4: { file: 'my-khe-quality-score.webp', alt: '2026 베트남 다낭 냐벱 리뷰 품질 이미지' },
  5: { file: 'cong-cafe-ugc-analysis.webp', alt: '2026 베트남 다낭 포박 63 UGC 분석 이미지' },
  6: { file: 'lau-restaurant-synergy.webp', alt: '2026 베트남 다낭 피자 4P\'s 시너지 이미지' },
  7: { file: 'gongyanggeol-data-chart.webp', alt: '2026 베트남 다낭 공양걸AI연구소 데이터 차트' },
  8: { file: 'white-cat-analyst-arnar.webp', alt: '2026 베트남 다낭 전문 분석가 공양걸 흰색 고양이' },
};

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '공양걸AI연구소 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const keywords = generateStaticPostKeywords(
    staticPost.title,
    staticPost.category,
    staticPost.description
  );
  return {
    title: `${staticPost.title} - 공양걸AI연구소 알고리즘 확산 블로그`,
    description: staticPost.description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: staticPost.title,
      description: staticPost.description,
      type: 'article',
      publishedTime: staticPost.date,
      url: canonicalUrl,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: '다낭 맛집 추천 대표 이미지',
        },
      ],
    },
    other: {
      'max-image-preview': 'large',
    },
  };
}

export default async function DanangRestaurantRecommendationPage() {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', `${SLUG}.mdx`);
  let mdxContent = '';
  try {
    mdxContent = readFileSync(mdxPath, 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  const markdownContent = mdxContent.replace(/^---[\s\S]*?---\s*\n\n?/, '');
  const raw = marked(markdownContent);
  const htmlContent = typeof raw === 'string' ? raw : await raw;

  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 8; i++) {
    const item = DANANG_SEO_IMAGES[i];
    imageMap[String(i)] = {
      src: `${IMAGE_BASE}${item.file}`,
      alt: item.alt,
    };
  }
  const priorityImageKeys = ['1', '2'];

  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const breadcrumbs = generateBlogBreadcrumbs(SLUG, staticPost.title, staticPost.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const dates = getSchemaDates(staticPost.date);

  const DANANG_KEYWORDS = '2026 베트남 다낭 맛집, 2026 다낭 맛집 추천, 다낭 쌀국수 맛집, 베트남 여행 정보, 베트남 다낭 자유여행';

  const analysisNewsArticleSchema = createAnalysisNewsArticleSchema({
    headline: '2026 베트남 다낭 맛집 추천: 광고 대행사가 로직으로 분석한 실패 없는 5곳',
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
    keywords: DANANG_KEYWORDS,
  });

  const reviewSchema = createDanangReviewSchema({
    name: staticPost.title,
    url: canonicalUrl,
    datePublished: dates.datePublished,
    authorName: '공양걸',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '다낭 맛집 추천 | 2026 베트남 미식 여행 가이드',
    image: ['https://www.aijeju.co.kr/images/blog/danang-restaurant-recommendation/main.png'],
    datePublished: '2026-02-19T09:00:00+09:00',
    dateModified: '2026-02-19T09:00:00+09:00',
    author: {
      '@type': 'Person',
      name: 'aijeju',
      url: 'https://www.aijeju.co.kr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'aijeju',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aijeju.co.kr/logo.png',
      },
    },
    description:
      '2026년 베트남 다낭 여행 필수 코스! 현지인과 여행객 모두가 극찬한 다낭 최고의 맛집들을 소개합니다.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={ARNAR_PERSON_SCHEMA} />
      <StructuredData data={analysisNewsArticleSchema} />
      <StructuredData data={reviewSchema} />
      <article className="min-h-screen bg-black flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-white/10 p-8 bg-black">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm text-[#F2F2F2]/80">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <Link
                      href={item.url}
                      prefetch={false}
                      className={
                        index === breadcrumbs.length - 1
                          ? 'text-[#F2F2F2] font-medium'
                          : 'text-[#F2F2F2]/80 hover:text-emerald-400 transition-colors'
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <header className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-[#F2F2F2]/80 mb-4">
                <span className="font-light">{staticPost.category}</span>
                <span>•</span>
                <time dateTime={staticPost.date} className="font-light">
                  {formatBlogDate(staticPost.date)}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#F2F2F2] sm:text-5xl text-center">
                {staticPost.title}
              </h1>
              <p className="mt-3 text-center text-sm text-emerald-400/90">
                2026 Freshness Update: 2026년 최신 구글 맵 데이터와 베트남 현지 트래픽 기반 전문 리포트
              </p>
            </header>

            <div className="[&_.prose]:text-[#F2F2F2] [&_.prose_p]:text-[#F2F2F2] [&_.prose_ul]:text-[#F2F2F2] [&_.prose_ol]:text-[#F2F2F2] [&_.prose_li]:text-[#F2F2F2] [&_.prose_blockquote]:text-[#F2F2F2]/90 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages
                htmlContent={htmlContent}
                imageMap={imageMap}
                priorityImageKeys={priorityImageKeys}
              />
            </div>

            <AuthorBox
              authorName="공양걸"
              jobTitle="공양걸AI연구소 수석 데이터 분석가 | Google SEO Specialist"
              quote="데이터는 거짓말을 하지 않습니다. 공양걸은 기술로 맛집의 권위를 증명합니다."
              imageSrc={AUTHOR_IMAGE}
              imageAlt="2026 베트남 다낭 전문 분석가 공양걸 - 공양걸AI연구소 흰색 고양이 EEAT 캐릭터"
              verificationText="본 분석은 공양걸AI연구소 2026 베트남 다낭 전문 분석가가 직접 현지 데이터와 구글 랭킹 로직을 대조하여 작성한 신뢰 보고서입니다."
            />

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: KakaoTalk SG7979 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가
              </p>
              <p className="mt-2 text-sm text-[#F2F2F2]/70">공양걸AI연구소는 결과로만 말합니다.</p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
