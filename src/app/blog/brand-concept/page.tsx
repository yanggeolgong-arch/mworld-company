import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StructuredData } from '@/components/StructuredData';
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
  
  // 마크다운을 HTML로 변환
  const htmlContent = marked(markdownContent);

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

            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-slate-300 prose-p:font-light prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-[#d4af37] prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:text-slate-300 prose-img:rounded-lg prose-img:my-8 prose-blockquote:text-slate-400 prose-blockquote:border-l-emerald-400"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

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
