import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { graphqlClient, GET_POSTS } from '@/lib/graphql';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { generateOptimizedUrl, optimizeSlug } from '@/lib/url-optimizer';
import { getAllStaticPosts, type StaticPost } from '@/lib/static-posts';

export const metadata: Metadata = {
  title: '엠월드컴퍼니 | 알고리즘 확산 최적화 블로그',
  description: '엠월드컴퍼니는 광고대행사 창업, 숏폼 마케팅 실무, 플레이스 알고리즘 최적화 실전 노하우를 공유합니다.',
  keywords: '엠월드컴퍼니, 알고리즘 확산, 광고대행사 창업, 숏폼 마케팅 실무, 플레이스 알고리즘, 네이버 플레이스 최적화',
  alternates: {
    canonical: 'https://www.aijeju.co.kr/blog',
  },
  openGraph: {
    title: '엠월드컴퍼니 | 알고리즘 확산 최적화 블로그',
    description: '엠월드컴퍼니는 알고리즘 확산 실전 노하우를 공유합니다.',
    type: 'website',
    url: 'https://www.aijeju.co.kr/blog',
  },
};

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
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
}

interface PostsData {
  posts: {
    edges: Array<{
      node: Post;
    }>;
  };
}

async function getWordPressPosts(): Promise<Post[]> {
  try {
    const data = await graphqlClient.request<PostsData>(GET_POSTS, {
      first: 20,
    });
    return data.posts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// 통합된 포스트 타입
interface UnifiedPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  categorySlug: string;
  featuredImage?: string;
  isStatic: boolean;
}

function convertToUnifiedPost(post: Post | StaticPost, isStatic: boolean): UnifiedPost {
  if (isStatic) {
    const staticPost = post as StaticPost;
    return {
      id: `static-${staticPost.slug}`,
      title: staticPost.title,
      excerpt: staticPost.excerpt || staticPost.description,
      slug: staticPost.slug,
      date: staticPost.date,
      category: staticPost.category,
      categorySlug: staticPost.categorySlug,
      featuredImage: staticPost.featuredImage,
      isStatic: true,
    };
  } else {
    const wpPost = post as Post;
    return {
      id: wpPost.id,
      title: wpPost.title,
      excerpt: wpPost.excerpt.replace(/<[^>]*>/g, ''),
      slug: wpPost.slug,
      date: wpPost.date,
      category: wpPost.categories.nodes[0]?.name || '알고리즘 확산',
      categorySlug: wpPost.categories.nodes[0]?.slug || 'algorithm-diffusion',
      featuredImage: wpPost.featuredImage?.node?.sourceUrl,
      isStatic: false,
    };
  }
}

// 정적 포스트 URL 생성 함수
function getPostUrl(post: UnifiedPost): string {
  // 정적 포스트는 정확한 slug로 직접 링크
  if (post.isStatic) {
    return `/blog/${post.slug}`;
  }
  // WordPress 포스트는 최적화된 URL 사용
  return generateOptimizedUrl(post.slug, post.title, post.category);
}

export default async function BlogPage() {
  const [wordPressPosts, staticPosts] = await Promise.all([
    getWordPressPosts(),
    Promise.resolve(getAllStaticPosts()),
  ]);

  // WordPress 포스트와 정적 포스트를 통합
  const allPosts: UnifiedPost[] = [
    ...wordPressPosts.map((post) => convertToUnifiedPost(post, false)),
    ...staticPosts.map((post) => convertToUnifiedPost(post, true)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Blog 스키마 생성
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: '엠월드컴퍼니 알고리즘 확산 최적화 블로그',
    description: '광고대행사 창업, 숏폼 마케팅 실무, 플레이스 알고리즘 최적화 전문가의 실전 노하우',
    url: 'https://www.aijeju.co.kr/blog',
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aijeju.co.kr/logo.png',
      },
    },
    blogPost: allPosts.slice(0, 10).map((post) => {
      const postUrl = getPostUrl(post);
      return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt.substring(0, 160),
        url: `https://www.aijeju.co.kr${postUrl}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: '엠월드컴퍼니',
          jobTitle: '10년 이상 실행 업무 전문가',
        },
        image: post.featuredImage || 'https://www.aijeju.co.kr/logo.png',
      };
    }),
  };

  return (
    <>
      <StructuredData data={blogSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="blog-heading">
          <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
            <h1 id="blog-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              엠월드컴퍼니 알고리즘 확산 최적화 블로그
            </h1>
            <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
              엠월드컴퍼니 <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가 실전 노하우
              <br />
              광고대행사 창업, 숏폼 마케팅 실무, 플레이스 알고리즘 최적화 전략을 공유합니다.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
              <span className="text-sm font-light text-slate-200">
                <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가 칼럼
              </span>
            </div>
          </header>

          {/* 키워드 카테고리 네비게이션 */}
          <nav className="w-full mx-auto mt-12 max-w-4xl flex flex-wrap items-center justify-center gap-4" aria-label="Blog categories">
            <Link
              href="/blog/ad-agency-startup"
              className="px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors text-sm font-medium"
            >
              광고대행사 창업
            </Link>
            <Link
              href="/blog/shortform-marketing-practice"
              className="px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors text-sm font-medium"
            >
              숏폼 마케팅 실무
            </Link>
            <Link
              href="/blog/place-algorithm"
              className="px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors text-sm font-medium"
            >
              플레이스 알고리즘
            </Link>
          </nav>

          {/* 블로그 포스트 리스트 */}
          <div className="w-full mx-auto mt-20 max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {allPosts.length === 0 ? (
              <section className="w-full col-span-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm text-center">
                <p className="text-slate-300 font-light">
                  아직 게시된 글이 없습니다.
                </p>
              </section>
            ) : (
              allPosts.map((post, index) => {
                const postUrl = getPostUrl(post);
                return (
                  <article
                    key={post.id}
                    className="group w-full max-w-sm flex flex-col overflow-hidden rounded-2xl bg-slate-900/50 text-center transition-all hover:scale-105 hover:shadow-2xl border border-white/5 backdrop-blur-sm"
                  >
                    <Link href={postUrl} className="flex flex-col h-full">
                      {post.featuredImage && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            loading={index < 3 ? 'eager' : 'lazy'}
                            quality={85}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6 items-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
                          <span className="font-light">{post.category}</span>
                          <span>•</span>
                          <time dateTime={post.date} className="font-light">
                            {new Date(post.date).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight text-white text-center mb-3">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-2 flex-1 text-slate-300 line-clamp-3 font-light text-sm max-w-2xl mx-auto">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-4 text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]">
                          자세히 보기 →
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })
            )}
          </div>
        </section>
        
        <div className="mt-24">
          <CTASection />
        </div>
      </article>
    </>
  );
}
