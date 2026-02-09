import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { MasterClassHomeBacklink } from '@/components/MasterClassHomeBacklink';
import { BlogSeriesBacklinks } from '@/components/BlogSeriesBacklinks';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate, getTodayISO } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export const dynamic = 'force-static';

const SLUG = 'agency-recommendation';
const IMAGE_ALT = '제주 마케팅 대행사 추천 라이프스타일';

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  return {
    title: `${staticPost.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
    description: staticPost.description,
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

export default async function AgencyRecommendationPage() {
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
  // agency-rec: 15장 jeju-marketing-agency-recommendation-01~15.webp, 640x360, 1·2번 priority(LCP)
  const imageMap: Record<string, { src: string; alt: string; width: number; height: number }> = {};
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    imageMap[String(i)] = {
      src: `/images/blog/agency-rec/jeju-marketing-agency-recommendation-${num}.webp`,
      alt: IMAGE_ALT,
      width: 640,
      height: 360,
    };
  }
  const priorityImageKeys = ['1', '2'];

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
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: staticPost.title,
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: staticPost.date,
    dateModified: getTodayISO(),
    author: { '@type': 'Person', name: '엠월드컴퍼니 최고실행자', jobTitle: '10년 이상 실행 실무 전문가' },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '제주 마케팅 대행사 추천, 라이프스타일 마케팅, 제주 광고대행사',
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
                    <Link
                      href={item.url}
                      className={index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-slate-400 hover:text-emerald-400 transition-colors'}
                    >
                      {item.name}
                    </Link>
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

            <div className="[&_.prose]:text-white [&_.prose_p]:text-slate-200 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages
                htmlContent={htmlContent}
                imageMap={imageMap}
                priorityImageKeys={priorityImageKeys}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <MasterClassHomeBacklink />
            </div>

            <BlogSeriesBacklinks currentSlug={SLUG} />
          </div>
        </section>
      </article>
    </>
  );
}
