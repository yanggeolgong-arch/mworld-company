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
import { getTodayISO } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'agency-startup-master-class-secrets';

const MASTER_CLASS_FILES: Record<number, string> = {
  1: 'agency-startup-ai-hero.webp',
  2: 'legacy-agency-inefficiency.webp',
  3: 'one-person-ai-company-efficiency.webp',
  4: 'ai-intelligent-engine-core.webp',
  5: 'data-hijacking-engine-01.webp',
  6: 'ai-content-factory-engine-02.webp',
  7: 'algorithm-control-engine-03.webp',
  8: 'local-data-power-abstract.webp',
  9: '10-year-expertise-symbol.webp',
  10: 'location-independent-operation.webp',
  11: 'unmanned-automation-flow.webp',
  12: 'overwhelming-revenue-graph.webp',
  13: 'entrepreneur-pov-setup.webp',
  14: 'blackbox-system-mystery.webp',
  15: 'system-initiate-cta.webp',
};

const MASTER_CLASS_ALT: Record<number, string> = {
  1: '대행사 창업 AI 히어로 비주얼 - 1인 기업이 수익 한계를 깨는 시작점',
  2: '레거시 대행사의 비효율과 인건비·임대료 구조',
  3: '1인 AI 기업의 효율성과 대행사 대비 생산성',
  4: 'AI 지능형 엔진 코어와 자동화 파이프라인',
  5: '데이터 활용 엔진 1단계 - 수집과 분석',
  6: 'AI 콘텐츠 공장 엔진 2단계 - 대량 생산과 품질 유지',
  7: '알고리즘 제어 엔진 3단계 - 노출·전환 최적화',
  8: '로컬 데이터 역량과 지역 시장 이해',
  9: '10년 실행 실무 전문가의 심볼과 신뢰',
  10: '장소 독립 운영과 원격 시스템',
  11: '무인 자동화 워크플로우와 24시간 엔진',
  12: '압도적 수익 그래프와 1인 대행사 성과',
  13: '창업자 시점의 업무 환경과 의사결정 구조',
  14: '블랙박스가 아닌 투명한 시스템 설계와 재현 가능성',
  15: '시스템 가동 CTA와 대행사 창업 상담 시작',
};

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const keywords = generateStaticPostKeywords(staticPost.title, staticPost.category, staticPost.description);
  return {
    title: `${staticPost.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
    description: staticPost.description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: staticPost.title,
      description: staticPost.description,
      type: 'article',
      publishedTime: staticPost.date,
      url: canonicalUrl,
    },
  };
}

export default async function AgencyStartupMasterClassSecretsPage() {
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

  const markdownContent = mdxContent.replace(/^\{[\s\S]*?\}\n\n/, '');

  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 15; i++) {
    imageMap[String(i)] = {
      src: `/images/blog/master-class/${MASTER_CLASS_FILES[i]}`,
      alt: MASTER_CLASS_ALT[i] || `대행사 창업 마스터 클래스 시각 ${i}`,
    };
  }
  const priorityImageKeys = ['1'];

  let processedMarkdown = markdownContent;
  for (let i = 1; i <= 15; i++) {
    const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
    processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
  }

  const raw = marked(processedMarkdown);
  const htmlContent = typeof raw === 'string' ? raw : await raw;

  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const breadcrumbs = generateBlogBreadcrumbs(SLUG, staticPost.title, staticPost.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const dateModified = getTodayISO();

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: staticPost.title,
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: staticPost.date,
    dateModified,
    author: {
      '@type': 'Person',
      name: '엠월드컴퍼니 최고실행자',
      jobTitle: '10년 차 실행 실무 전문가',
    },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '대행사 창업, AI 자동화, 1인 기업, 무인 대행사, 알고리즘 확산, 마스터 클래스',
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogPostingSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm text-slate-400">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <a
                      href={item.url}
                      className={`hover:text-emerald-400 transition-colors ${index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-slate-400'}`}
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

            <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} priorityImageKeys={priorityImageKeys} />

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-slate-300">
                문의: 카카오톡 SG7979 | <span className="text-emerald-400">10년 이상</span> 실행 실무 전문가
              </p>
              <p className="mt-2 text-sm text-slate-400">엠월드컴퍼니는 결과로만 말합니다.</p>
            </div>

            <BlogSeriesBacklinks currentSlug={SLUG} />
          </div>
        </section>
      </article>
    </>
  );
}
