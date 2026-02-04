import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
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
  
  // 이미지 정보 정의 (1.jpeg ~ 15.jpeg) - 경로: /images/blog/concept/[번호].jpeg
  const imageMap: Record<string, { src: string; alt: string }> = {};
  const altTexts: Record<number, string> = {
    1: '제주맛집 사장님의 고민',
    2: '제주맛집 사장님의 고민',
    3: '컨셉 없는 제주맛집',
    4: '명확한 정체성',
    5: '구글이 좋아하는 명확한 브랜드',
    6: '타겟 고객',
    7: '타겟 고객별 맞춤 서비스',
    8: '차별점',
    9: '차별화된 제주맛집',
    10: '메시지 일관성',
    11: '일관된 메시지 전달',
    12: '검색 엔진 최적화',
    13: '구글 상위 노출',
    14: '성공하는 제주맛집',
    15: '구글 AI가 좋아하는 착한 브랜드',
  };
  
  for (let i = 1; i <= 15; i++) {
    imageMap[String(i)] = {
      src: `/images/blog/concept/${i}.jpeg`,
      alt: altTexts[i] || `제주맛집 컨셉 이미지 ${i}`,
    };
  }

  // 이미지 마커를 특별한 placeholder로 변환
  let processedMarkdown = markdownContent;
  for (let i = 1; i <= 15; i++) {
    const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
    processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
  }
  
  // 마크다운을 HTML로 변환
  const htmlContent = marked(processedMarkdown);

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
    dateModified: staticPost.date,
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
                  {new Date(staticPost.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center">
                {staticPost.title}
              </h1>
            </header>

            {/* 콘텐츠를 섹션별로 분리하여 이미지 삽입 */}
            <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} />

            {/* 고정 문구 */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-slate-300">
                문의: 카카오톡 SG7979 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가
              </p>
              <p className="mt-2 text-sm text-slate-400">
                엠월드컴퍼니는 결과로만 말합니다.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
