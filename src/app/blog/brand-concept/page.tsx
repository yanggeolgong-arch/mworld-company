import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { BlogSeriesBacklinks } from '@/components/BlogSeriesBacklinks';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

// marked 설정: HTML 이스케이프 비활성화 (이미 안전한 콘텐츠)
marked.setOptions({
  breaks: true,
  gfm: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug('brand-concept');
  if (!staticPost) {
    return {
      title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다',
    };
  }

  const canonicalUrl = generateCanonicalUrl(`/blog/brand-concept`);
  const keywords = generateStaticPostKeywords(staticPost.title, staticPost.category, staticPost.description);

  return {
    title: `${staticPost.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
    description: staticPost.description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: staticPost.title,
      description: staticPost.description,
      type: 'article',
      publishedTime: staticPost.date,
      url: canonicalUrl,
    },
  };
}

export default async function BrandConceptPage() {
  const staticPost = getStaticPostBySlug('brand-concept');
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  // MDX 파일 읽기
  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', 'brand-concept.mdx');
  let mdxContent = '';
  try {
    mdxContent = readFileSync(mdxPath, 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  // JSON-LD 스키마 제거하고 마크다운만 추출
  const markdownContent = mdxContent.replace(/^\{[\s\S]*?\}\n\n/, '');
  
  // 이미지 SEO 소급: 영문 키워드 파일명·WebP·문장형 alt (성능 98점)
  const CONCEPT_SEO_FILES: Record<number, string> = {
    1: 'jeju-google-ranking-concept-check-expert.webp',
    2: 'google-clear-message-brand-concept.webp',
    3: 'semantic-dna-brand-recognition.webp',
    4: 'concept-ad-efficiency-difference.webp',
    5: 'concept-check-checklist-before-ad.webp',
    6: 'brand-identity-definition.webp',
    7: 'core-message-clarification.webp',
    8: 'target-customer-definition.webp',
    9: 'competitive-differentiation.webp',
    10: 'search-engine-brand-understanding.webp',
    11: 'advertising-without-concept-result.webp',
    12: 'mworld-concept-check-process.webp',
    13: 'brand-concept-diagnosis.webp',
    14: 'channel-message-consistency.webp',
    15: 'google-ranking-concept-check.webp',
  };
  const CONCEPT_ALT: Record<number, string> = {
    1: '엠월드컴퍼니 전문가가 말하는 광고 전 컨셉 점검의 중요성과 구글 상위 노출',
    2: '구글이 선호하는 명확한 메시지와 브랜드 컨셉',
    3: '시맨틱 DNA와 브랜드 인식으로 검색 노출을 높이는 방법',
    4: '컨셉에 따른 광고 효율 차이를 보여주는 실무 데이터',
    5: '광고 전 필수 컨셉 점검 체크리스트',
    6: '브랜드 정체성 정의가 구글 상위 노출의 시작',
    7: '핵심 메시지 명확화로 광고 전환을 높이는 법',
    8: '타겟 고객 정의와 컨셉 점검',
    9: '경쟁 차별점을 담은 컨셉 개발',
    10: '검색 엔진이 이해하는 브랜드 메시지 설계',
    11: '컨셉 없이 광고할 때의 결과와 리스크',
    12: '엠월드컴퍼니 컨셉 점검 프로세스',
    13: '브랜드 컨셉 진단으로 광고 전 기초 다지기',
    14: '채널별 메시지 일관성과 구글 상위 노출',
    15: '구글 상위 노출과 컨셉 점검의 연관성',
  };
  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 15; i++) {
    imageMap[String(i)] = {
      src: `/images/blog/concept/${CONCEPT_SEO_FILES[i]}`,
      alt: CONCEPT_ALT[i] || `브랜드 컨셉·구글 상위 노출 전문가 인사이트 ${i}`,
    };
  }
  const priorityImageKeys = ['1'];

  // 이미지 마커를 특별한 placeholder로 변환
  let processedMarkdown = markdownContent;
  for (let i = 1; i <= 15; i++) {
    const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
    processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
  }
  
  // 마크다운을 HTML로 변환 (marked v17은 Promise 반환 가능)
  const raw = marked(processedMarkdown);
  const htmlContent = typeof raw === 'string' ? raw : await raw;

  const canonicalUrl = generateCanonicalUrl(`/blog/brand-concept`);
  const breadcrumbs = generateBlogBreadcrumbs('brand-concept', staticPost.title, staticPost.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: staticPost.title,
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: staticPost.date,
    dateModified: '2026-02-06',
    author: {
      '@type': 'Person',
      name: '엠월드컴퍼니 최고실행자',
      jobTitle: '10년 이상 실행사 대표 전문가',
    },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aijeju.co.kr/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: '브랜드 컨셉, 구글 상위 노출, 광고 전략, 브랜드 메시지, 컨셉 점검',
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogPostingSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
            {/* Breadcrumb 네비게이션 */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm text-slate-400">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <a
                      href={item.url}
                      className={`hover:text-emerald-400 transition-colors ${
                        index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-slate-400'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <header className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                <span className="font-light">{staticPost.category}</span>
                <span>•</span>
<time dateTime={staticPost.date} className="font-light">
                {formatBlogDate(staticPost.date)}
              </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center">
                {staticPost.title}
              </h1>
            </header>

            {/* 콘텐츠를 섹션별로 분리하여 이미지 삽입 */}
            <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} priorityImageKeys={priorityImageKeys} />

            {/* 고정 문구 */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-slate-300">
                문의: 카카오톡 SG7979 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가
              </p>
              <p className="mt-2 text-sm text-slate-400">
                엠월드컴퍼니는 결과로만 말합니다.
              </p>
            </div>

            <BlogSeriesBacklinks currentSlug="brand-concept" />
          </div>
        </section>
      </article>
    </>
  );
}
