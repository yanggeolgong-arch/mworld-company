import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { requestPosts, GET_POST_BY_SLUG, GET_POSTS } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { BlogSeriesBacklinks } from '@/components/BlogSeriesBacklinks';
import { generateOptimizedUrl, generateCanonicalUrl, optimizeSlug } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { getStaticPostBySlug, getAllStaticPosts } from '@/lib/static-posts';
import { PostNavigation } from '@/components/PostNavigation';
import { MasterClassHomeBacklink } from '@/components/MasterClassHomeBacklink';
import { generateGeoMasterSchema } from '@/lib/geo-master-schema';
import { generateKeywords, generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getSchemaDatesSyncToToday, formatBlogDate, getTodayISO } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export const dynamic = 'force-static';

interface PostData {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    slug: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    categories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
  };
}

interface PostsData {
  posts: {
    edges: Array<{
      node: PostData['post'];
    }>;
  };
}

async function getWordPressPost(slug: string) {
  try {
    const data = await requestPosts<PostData>(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const staticPosts = getAllStaticPosts();
  return staticPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // 정적 포스트 확인
  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) {
    const canonicalUrl = generateCanonicalUrl(`/blog/${slug}`);
    // 키워드 스터핑 방지: 포스트 내용에 맞게 동적으로 생성
    const keywords = generateStaticPostKeywords(staticPost.title, staticPost.category, staticPost.description);
    return {
      title: `${staticPost.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
      description: staticPost.description || '10년 이상 실행 업무 전문가의 알고리즘 확산 최적화 전략',
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

  // WordPress 포스트 확인
  const post = await getWordPressPost(slug);
  if (!post) {
    return {
      title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다',
    };
  }

  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const optimizedUrl = generateOptimizedUrl(post.slug, post.title, post.categories.nodes[0]?.name);
  const canonicalUrl = generateCanonicalUrl(optimizedUrl);
  
  // 키워드 스터핑 방지: 포스트 내용에 맞게 동적으로 생성
  const keywords = generateKeywords(post.title, post.categories.nodes, post.content);

  return {
    title: `${post.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
    description: description || '10년 이상 실행 업무 전문가의 알고리즘 확산 최적화 전략',
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      url: canonicalUrl,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 정적 포스트 확인: MDX 기반 정적 포스트는 여기서 렌더 (404 방지)
  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) {
    let mdxContent = '';
    try {
      mdxContent = readFileSync(join(process.cwd(), 'src', 'content', 'blog', `${slug}.mdx`), 'utf-8');
    } catch (_) {
      // MDX 없으면 아래 WordPress 경로로 진행
    }
    if (mdxContent) {
      const markdownContent = mdxContent.replace(/^\{[\s\S]*?\}\n\n/, '');
      let imageMap: Record<string, { src: string; alt: string; width: number; height: number }> = {};
      let priorityImageKeys: string[] = [];
      if (slug === 'agency-recommendation') {
        const alt = '제주 마케팅 대행사 추천 라이프스타일';
        for (let i = 1; i <= 15; i++) {
          const num = String(i).padStart(2, '0');
          imageMap[String(i)] = {
            src: `/images/blog/agency-rec/jeju-marketing-agency-recommendation-${num}.webp`,
            alt,
            width: 640,
            height: 360,
          };
        }
        priorityImageKeys = ['1', '2'];
      }
      if (Object.keys(imageMap).length > 0) {
        let processedMarkdown = markdownContent;
        for (let i = 1; i <= 15; i++) {
          const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
          processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
        }
        const raw = marked(processedMarkdown);
        const htmlContent = typeof raw === 'string' ? raw : await raw;
        const canonicalUrl = generateCanonicalUrl(`/blog/${slug}`);
        const breadcrumbs = generateBlogBreadcrumbs(slug, staticPost.title, staticPost.category);
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
          keywords: staticPost.category,
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
                  <BlogSeriesBacklinks currentSlug={slug} />
                </div>
              </section>
            </article>
          </>
        );
      }
    }
  }

  // WordPress 포스트 처리
  const post = await getWordPressPost(slug);
  if (!post) {
    // 정적 포스트도 없고 WordPress 포스트도 없으면 404
    notFound();
  }

  // 같은 카테고리의 포스트 목록 가져오기 (이전/다음 글용)
  const categorySlug = post.categories.nodes[0]?.slug || '';
  const [allWpPosts, allStaticPosts] = await Promise.all([
    requestPosts<PostsData>(GET_POSTS, { first: 100 }).catch(() => ({ posts: { edges: [] } })),
    Promise.resolve(getAllStaticPosts()),
  ]);

  const categoryPosts = [
    ...allWpPosts.posts.edges
      .map((edge) => edge.node)
      .filter((p) => {
        const pCategorySlug = p.categories.nodes[0]?.slug || '';
        return pCategorySlug === categorySlug || pCategorySlug.includes(categorySlug);
      })
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        date: p.date,
        isStatic: false,
      })),
    ...allStaticPosts
      .filter((p) => p.categorySlug === categorySlug)
      .map((p) => ({
        id: `static-${p.slug}`,
        slug: p.slug,
        title: p.title,
        date: p.date,
        isStatic: true,
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = categoryPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null;

  // URL 최적화
  const optimizedUrl = generateOptimizedUrl(post.slug, post.title, post.categories.nodes[0]?.name);
  const canonicalUrl = generateCanonicalUrl(optimizedUrl);

  // BreadcrumbList 스키마 생성
  const breadcrumbs = generateBlogBreadcrumbs(
    optimizeSlug(post.slug || post.title),
    post.title,
    post.categories.nodes[0]?.name
  );
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // BlogPosting 스키마: datePublished·dateModified 오늘 시각으로 동기화 (알고리즘 확산)
  const schemaDates = getSchemaDatesSyncToToday();
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    url: canonicalUrl,
    datePublished: schemaDates.datePublished,
    dateModified: schemaDates.dateModified,
    author: {
      '@type': 'Person',
      name: '엠월드컴퍼니',
      jobTitle: '10년 이상 실행 업무 전문가',
    },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aijeju.co.kr/logo.png',
      },
    },
    image: post.featuredImage?.node?.sourceUrl || 'https://www.aijeju.co.kr/logo.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.categories.nodes.map((cat) => cat.name).join(', '),
  };

  // GEO Master 스키마 생성
  const geoMasterSchema = generateGeoMasterSchema({
    name: post.title,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    url: canonicalUrl,
    image: post.featuredImage?.node?.sourceUrl,
    category: post.categories.nodes[0]?.name,
    keywords: post.categories.nodes.map((cat) => cat.name),
    address: {
      addressLocality: '제주시',
      addressRegion: '제주특별자치도',
      addressCountry: 'KR',
    },
  });

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogPostingSchema} />
      <StructuredData data={geoMasterSchema} />
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
                {post.categories.nodes.map((category) => (
                  <span key={category.slug} className="font-light">
                    {category.name}
                  </span>
                ))}
                <span>•</span>
                <time dateTime={post.date} className="font-light">
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center">
                {post.title}
              </h1>
            </header>

            {post.featuredImage?.node && (
              <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg relative mb-8">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
                  className="object-cover"
                  priority
                  quality={75}
                />
              </div>
            )}

            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-white prose-p:font-light prose-p:leading-relaxed prose-a:text-[#22d3ee] prose-a:no-underline hover:prose-a:text-[#fde047] prose-strong:text-[#fde047] prose-strong:font-semibold prose-ul:text-white prose-ol:text-white prose-li:text-white prose-img:rounded-lg prose-img:my-8 prose-blockquote:text-[#f3f4f6] prose-blockquote:border-l-[#22d3ee]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* 이전/다음 글 네비게이션 */}
            <PostNavigation
              prevPost={
                prevPost
                  ? {
                      title: prevPost.title,
                      slug: prevPost.slug,
                      url: generateOptimizedUrl(prevPost.slug, prevPost.title, post.categories.nodes[0]?.name),
                    }
                  : null
              }
              nextPost={
                nextPost
                  ? {
                      title: nextPost.title,
                      slug: nextPost.slug,
                      url: generateOptimizedUrl(nextPost.slug, nextPost.title, post.categories.nodes[0]?.name),
                    }
                  : null
              }
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
            <MasterClassHomeBacklink />
          </div>
        </section>
      </article>
    </>
  );
}
