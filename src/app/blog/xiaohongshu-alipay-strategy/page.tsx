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
import { formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'xiaohongshu-alipay-strategy';

/** 15장 전체 중국어 키워드 alt (기술 SEO·접근성) */
const XIAOHONGSHU_ALIPAY_ALT_ZH: Record<number, string> = {
  1: '小红书济州岛美食支付宝支付攻略',
  2: '济州岛餐厅支付宝扫码支付',
  3: '济州岛美食小红书笔记搜索',
  4: '支付宝微信支付门店标识',
  5: '济州岛咖啡厅支付宝结账',
  6: '济州岛咖啡厅支付宝充电宝租借',
  7: '济州岛餐厅满座场景',
  8: '支付宝D+2结算到账',
  9: '支付宝官方贴纸',
  10: '小红书实时点评拍照',
  11: '济州岛美食支付宝微信支付标识摆放',
  12: '济州岛餐厅外景',
  13: '现场咨询支付宝开通',
  14: '小红书支付宝注册咨询',
  15: '济州岛第一执行品牌',
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

export default async function XiaohongshuAlipayStrategyPage() {
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
  // 1,2,6,11번 WebP 80% 적용·priority 로딩으로 성능 98점 유지
  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 15; i++) {
    const useWebp = [1, 2, 6, 11].includes(i);
    imageMap[String(i)] = {
      src: `/images/blog/xiaohongshu-alipay-strategy/${i}.${useWebp ? 'webp' : 'jpeg'}`,
      alt: XIAOHONGSHU_ALIPAY_ALT_ZH[i] || `济州岛美食支付宝小红书 ${i}`,
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
    dateModified: '2026-02-07',
    author: { '@type': 'Person', name: '엠월드컴퍼니 최고실행자', jobTitle: '10년 이상 실행사 대표 전문가' },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '小红书, 支付宝, 济州岛美食, 充电宝, 微信支付, 제주맛집, 샤오홍슈, 알리페이',
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

            {/* Expert Insight 박스: 보조배터리·로고 배치 팁 강조 (별도 구성) */}
            <aside
              className="mt-10 p-6 rounded-xl border-2 border-[#FFD700]/40 bg-[#0a0a0a] text-[#F2F2F2]"
              aria-label="Expert Insight"
            >
              <h2 className="text-lg font-semibold text-[#FFD700] mb-4">Expert Insight</h2>
              <p className="text-sm text-[#F2F2F2]/90 mb-4">
                엠월드컴퍼니 최고실행자 10년 차 현장 인사이트를 시스템에 강제 주입한 핵심 두 가지입니다.
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong className="text-amber-400">보조배터리(充电宝)</strong>: 중화권 손님은 결제·촬영·소셜 공유로
                  배터리 소모가 크다. 대여·충전 서비스를 제공하면 체류 시간과 UGC(小红书 노트·리뷰)가 동시에 늘어난다.
                </li>
                <li>
                  <strong className="text-amber-400">로고 배치</strong>: 支付宝·微信 로고를 입구·결제대·테이블 tent
                  카드 등 2~3곳에 반복 노출하면, &quot;정식 가맹·결제 가능&quot; 신뢰와 검색 일치도가 올라간다.
                </li>
              </ul>
            </aside>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: KakaoTalk SG7979 | 010-4074-9343 | <span className="text-emerald-400">10년 이상</span> 실행 업무
                전문가
              </p>
              <p className="mt-2 text-sm text-[#F2F2F2]/70">엠월드컴퍼니는 결과로만 말합니다.</p>
            </div>

            {/* AI-Human 하이브리드 표기: 신뢰도 강화 */}
            <p className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-[#F2F2F2]/60">
              엠월드컴퍼니 10년 현장 데이터 기반 AI 최적화 원고
            </p>

            <nav className="mt-8 pt-6 border-t border-white/10 text-center" aria-label="시리즈 다시 보기">
              <h2 className="text-sm font-medium text-[#FFD700] mb-4">시리즈 다시 보기</h2>
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap list-none">
                <li>
                  <Link
                    href="/blog/global-payment-dazhong-dianping"
                    className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2"
                  >
                    글로벌 결제 & 따종디엔핑
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/xiaohongshu-zhonghua-mz"
                    className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2"
                  >
                    샤오홍슈 중화권 MZ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </article>
    </>
  );
}
