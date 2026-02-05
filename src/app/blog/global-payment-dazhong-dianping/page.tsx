import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
// import { BlogSeriesBacklinks } from '@/components/BlogSeriesBacklinks'; // 기존 컴포넌트 제거
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { getSchemaDatesSyncToToday, getTodayISO, formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'global-payment-dazhong-dianping';

const GLOBAL_ALT_TEXTS: Record<number, string> = {
  1: 'ICB 공식 대행사 인증서',
  2: 'QRick 통합 결제 UI 알리 위챗 카카오 통합',
  3: '20대 선남선녀 손님들이 가득한 활기찬 매장 진입',
  4: '따종디엔핑 앱으로 맛집 순위와 리뷰를 확인하는 손님들',
  5: '스마트폰 QR 스캔 결제 장면 클로즈업',
  6: '결제 성공 후 미소 짓는 글로벌 커플',
  7: '빈자리 없이 만석인 제주 맛집 내부 전경',
  8: '원화 KRW D+2 정산 입금 문자 내역 화면',
  9: '세련된 인테리어에 부착된 공식 알리페이 스티커',
  10: '음식을 촬영해 실시간으로 따종디엔핑 리뷰를 쓰는 장면',
  11: '제주 현지 실무 데이터 주차 정보 및 매장 외부 전경',
  12: '매장 밖에서 대기 중인 트렌디한 글로벌 관광객들',
  13: '엠월드컴퍼니 전문가의 상담 및 컨설팅 현장 컷',
  14: '따종디엔핑 등록문의 한글 그래픽 ID SG7979',
  15: '엠월드컴퍼니 브랜드 로고와 제주 No.1 실행 문구',
};

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

export default async function GlobalPaymentDazhongDianpingPage() {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', 'global-payment-dazhong-dianping.mdx');
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
      src: `/images/blog/global/${i}.jpeg`,
      alt: GLOBAL_ALT_TEXTS[i] || `글로벌 결제 따종디엔핑 이미지 ${i}`,
    };
  }

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
    keywords: '글로벌 결제, 따종디엔핑, 알리페이, 제주맛집, 중국 관광객, ICB, QRick',
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
                      className={index === breadcrumbs.length - 1 ? 'text-[#F2F2F2] font-medium' : 'text-[#F2F2F2]/80 hover:text-emerald-400 transition-colors'}
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
                <time dateTime={getTodayISO()} className="font-light">
                  {formatBlogDate(getTodayISO())}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#F2F2F2] sm:text-5xl text-center">
                {staticPost.title}
              </h1>
            </header>

            {/* 블랙 배경(#000) + 연한 회색(#F2F2F2) 가독성 극대화 */}
            <div className="[&_.prose]:text-[#F2F2F2] [&_.prose_p]:text-[#F2F2F2] [&_.prose_ul]:text-[#F2F2F2] [&_.prose_ol]:text-[#F2F2F2] [&_.prose_li]:text-[#F2F2F2] [&_.prose_blockquote]:text-[#F2F2F2]/90 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} />
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: KakaoTalk: SG7979 | 010-4074-9343 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가
              </p>
              <p className="mt-2 text-sm text-[#F2F2F2]/70">엠월드컴퍼니는 결과로만 말합니다.</p>
            </div>

            {/* 시리즈 다시 보기 - 백링크 3개, #FFD700 포인트 (블랙 테마 조화) */}
            <nav className="mt-8 pt-6 border-t border-white/10 text-center" aria-label="시리즈 다시 보기">
              <h2 className="text-sm font-medium text-[#FFD700] mb-4">시리즈 다시 보기</h2>
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap list-none">
                <li>
                  <Link href="/blog/brand-concept" className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    1편 · 구글 상위 노출 컨셉 점검
                  </Link>
                </li>
                <li>
                  <Link href="/blog/insta-shortform" className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    2편 · 제주맛집 인스타그램 마케팅
                  </Link>
                </li>
                <li>
                  <Link href="/blog/1인-기업-알고리즘-확산-시장-장악-로드맵" className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    3편 · 1인 기업 알고리즘 확산 로드맵
                  </Link>
                </li>
              </ul>
            </nav>

            {/* 다음 포스팅 예고 */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <h2 className="text-sm font-medium text-[#FFD700] mb-2">다음 포스팅 예고</h2>
              <p className="text-[#F2F2F2]/90 font-medium">제주맛집 기술 SEO의 비밀 - WebP 변환으로 로딩 속도 2배 높이기</p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
