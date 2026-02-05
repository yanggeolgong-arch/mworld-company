import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { getSchemaDatesSyncToToday, getTodayISO, formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug('insta-shortform');
  if (!staticPost) {
    return { title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl('/blog/insta-shortform');
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

const INSTA_ALT_TEXTS: Record<number, string> = {
  1: '제주맛집 인스타그램 숏폼이 조회수 0인 이유',
  2: '조회수 0인 인스타 숏폼의 특징',
  3: '인스타그램 숏폼 알고리즘 핵심',
  4: '제주맛집 인스타 마케팅 실수',
  5: '릴스 20개 촬영 제작 배포 성공 사례',
  6: '숏폼 훅 설계',
  7: '숏폼 자막과 리듬',
  8: '채널 확장과 지속 업로드',
  9: '제주맛집 스토리텔링',
  10: '20편 단위 제작의 이점',
  11: '제주맛집 숏폼 체크리스트',
  12: '엠월드컴퍼니 10년 이상 실행 업무 전문가',
  13: '제주맛집 인스타 마케팅 정리',
  14: '성공 사례 1번 릴스 20개 연동',
  15: '시리즈 예고 따종디엔핑 정복',
};

export default async function InstaShortformPage() {
  const staticPost = getStaticPostBySlug('insta-shortform');
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', 'insta-shortform.mdx');
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
      src: `/images/blog/insta/${i}.jpeg`,
      alt: INSTA_ALT_TEXTS[i] || `제주맛집 인스타 숏폼 이미지 ${i}`,
    };
  }

  let processedMarkdown = markdownContent;
  for (let i = 1; i <= 15; i++) {
    const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
    processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
  }

  const raw = marked(processedMarkdown);
  const htmlContent = typeof raw === 'string' ? raw : await raw;

  const canonicalUrl = generateCanonicalUrl('/blog/insta-shortform');
  const breadcrumbs = generateBlogBreadcrumbs('insta-shortform', staticPost.title, staticPost.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const schemaDates = getSchemaDatesSyncToToday();
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: staticPost.title,
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: schemaDates.datePublished,
    dateModified: schemaDates.dateModified,
    author: { '@type': 'Person', name: '엠월드컴퍼니 최고실행자', jobTitle: '10년 이상 실행사 대표 전문가' },
    publisher: { '@type': 'Organization', name: '엠월드컴퍼니', logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '제주맛집 인스타그램, 숏폼 마케팅, 인스타 릴스, 제주 맛집 SNS',
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
                <time dateTime={getTodayISO()} className="font-light">
                  {formatBlogDate(getTodayISO())}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center">
                {staticPost.title}
              </h1>
            </header>

            {/* 본문: 다크모드 가독성 - 본문 slate-200, 제목 h2/h3 포인트 컬러 */}
            <div className="[&_.prose]:text-slate-200 [&_.prose_p]:text-slate-200 [&_.prose_ul]:text-slate-200 [&_.prose_ol]:text-slate-200 [&_.prose_li]:text-slate-200 [&_.prose_blockquote]:text-slate-300 [&_.prose_h2]:text-orange-400 [&_.prose_h3]:text-cyan-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} />
            </div>

            {/* 성공 사례 1번 연동 CTA */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-slate-200 mb-4">
                실제 매출로 증명된 성공 사례 1번 상품의 노하우를 그대로 적용해 드립니다.
              </p>
              <Link
                href="/success-cases"
                className="inline-flex items-center justify-center rounded-xl bg-[#d4af37] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-500 hover:shadow-xl"
              >
                성공 사례 보기 (릴스 20개 촬영·제작·배포)
              </Link>
            </div>

            {/* 고정 문구 & 브랜딩 */}
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-slate-300">
                엠월드컴퍼니 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가 | KakaoTalk: SG7979
              </p>
              <p className="mt-2 text-sm text-slate-400">엠월드컴퍼니는 결과로만 말합니다.</p>
            </div>

            {/* 시리즈 #3 예고 */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-slate-400 mb-2">다음 시리즈</p>
              <Link
                href="/blog/category/dazhong-dianping"
                className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors underline underline-offset-2"
              >
                [시리즈 #3] 따종디엔핑 정복
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
