import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { MasterClassHomeBacklink } from '@/components/MasterClassHomeBacklink';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'google-maps-xiaohongshu-synergy';

/** 15장 WebP SEO 파일명 (구글리뷰 대행사·시너지) */
const SEO_IMAGE_FILENAMES: Record<number, string> = {
  1: 'google-review-agency-synergy-01.webp',
  2: 'google-review-agency-synergy-02.webp',
  3: 'google-review-agency-synergy-03.webp',
  4: 'google-review-agency-synergy-04.webp',
  5: 'google-review-agency-synergy-05.webp',
  6: 'google-review-agency-synergy-06.webp',
  7: 'google-review-agency-synergy-07.webp',
  8: 'google-review-agency-synergy-08.webp',
  9: 'google-review-agency-synergy-09.webp',
  10: 'google-review-agency-synergy-10.webp',
  11: 'google-review-agency-synergy-11.webp',
  12: 'google-review-agency-synergy-12.webp',
  13: 'google-review-agency-synergy-13.webp',
  14: 'google-review-agency-synergy-14.webp',
  15: 'google-review-agency-synergy-15.webp',
};

const SENTENCE_ALT: Record<number, string> = {
  1: '구글 지도와 샤오홍슈 시너지 - 구글리뷰 대행사 실행 전략',
  2: '구글 지도 리뷰 관리와 샤오홍슈 연동 구조',
  3: '제주맛집 구글 리뷰와 샤오홍슈 노트 동시 상위노출',
  4: '리뷰 연동 자동화 파이프라인 구글리뷰 대행사',
  5: '구글리뷰 대행사 실행 3단계 - 방문·打卡·리뷰',
  6: '지오펜싱 기반 위치 감지와 리뷰 연동',
  7: '제주맛집 지오펜싱 구글 지도 샤오홍슈 노출',
  8: '구글 지도 리뷰 QR 코드와 샤오홍슈 연동',
  9: 'QR 체크인 구글 리뷰 샤오홍슈 打卡 자동화',
  10: '구글 리뷰 요청 타이밍과 샤오홍슈 노트 업로드 시점',
  11: '구글리뷰 대행사 리뷰 품질 체크리스트',
  12: '제주맛집 구글 지도 샤오홍슈 시너지 상위노출 결과',
  13: '구글리뷰 대행사 연동 체크리스트',
  14: '공양걸AI연구소 구글리뷰 대행사 10년 실행 브랜드',
  15: '구글 지도 샤오홍슈 시너지 상담 KakaoTalk SG7979',
};

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '공양걸AI연구소 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  return {
    title: `${staticPost.title} - 공양걸AI연구소 알고리즘 확산 블로그`,
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

export default async function GoogleMapsXiaohongshuSynergyPage() {
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
      src: `/images/blog/google-synergy/${SEO_IMAGE_FILENAMES[i]}`,
      alt: SENTENCE_ALT[i] || `구글리뷰 대행사 구글 지도·샤오홍슈 시너지 ${i}`,
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
    dateModified: '2026-02-06',
    author: { '@type': 'Person', name: '공양걸AI연구소 최고실행자', jobTitle: '10년 이상 구글리뷰 대행사 전문가' },
    publisher: {
      '@type': 'Organization',
      name: '공양걸AI연구소',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '구글리뷰 대행사, 구글 지도 리뷰, 샤오홍슈, 시너지, 제주맛집',
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogPostingSchema} />
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
            </header>

            <div className="[&_.prose]:text-[#F2F2F2] [&_.prose_p]:text-[#F2F2F2] [&_.prose_ul]:text-[#F2F2F2] [&_.prose_ol]:text-[#F2F2F2] [&_.prose_li]:text-[#F2F2F2] [&_.prose_blockquote]:text-[#F2F2F2]/90 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages
                htmlContent={htmlContent}
                imageMap={imageMap}
                priorityImageKeys={priorityImageKeys}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: <strong className="text-cyan-400">KakaoTalk: SG7979</strong> | 10년 이상 [구글리뷰 대행사] 실행 전문가
              </p>
              <p className="mt-4 text-sm text-[#F2F2F2]/90">
                다음 시리즈: <Link href="/blog/1인-기업-알고리즘-확산-시장-장악-로드맵" prefetch={false} className="text-cyan-400 hover:underline">플레이스 알고리즘 데이터 분석 - 3사 연동 자동화</Link>
              </p>
              <MasterClassHomeBacklink />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
