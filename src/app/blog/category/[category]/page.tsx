import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { requestPosts, GET_POSTS } from '@/lib/graphql';
import { StructuredData } from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { blogCategories, getCategoryBySlug } from '@/lib/blog-categories';
import { generateCategoryPageSchema } from '@/lib/geo-master-schema';
import { generateOptimizedUrl } from '@/lib/url-optimizer';
import { getAllStaticPosts } from '@/lib/static-posts';
import { getTodayISO, formatBlogDate } from '@/lib/blog-dates';

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
    const data = await requestPosts<PostsData>(GET_POSTS, { first: 50 });
    return data.posts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

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

function convertToUnifiedPost(post: Post, categorySlug: string): UnifiedPost {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt.replace(/<[^>]*>/g, ''),
    slug: post.slug,
    date: post.date,
    category: post.categories.nodes[0]?.name || '',
    categorySlug,
    featuredImage: post.featuredImage?.node?.sourceUrl,
    isStatic: false,
  };
}

function getPostUrl(post: UnifiedPost): string {
  return generateOptimizedUrl(post.slug, post.title, post.category);
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = getCategoryBySlug(category);

  if (!categoryInfo) {
    return {
      title: '엠월드컴퍼니 | 카테고리를 찾을 수 없습니다',
    };
  }

  return {
    title: `${categoryInfo.name} - 엠월드컴퍼니 블로그`,
    description: categoryInfo.description,
    keywords: categoryInfo.seoKeywords.join(', '),
    alternates: {
      canonical: `https://www.aijeju.co.kr/blog/category/${category}`,
    },
    openGraph: {
      title: `${categoryInfo.name} - 엠월드컴퍼니 블로그`,
      description: categoryInfo.description,
      type: 'website',
      url: `https://www.aijeju.co.kr/blog/category/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = getCategoryBySlug(category);

  if (!categoryInfo) {
    return null;
  }

  const [wordPressPosts, staticPosts] = await Promise.all([
    getWordPressPosts(),
    Promise.resolve(getAllStaticPosts()),
  ]);

  const allPosts: UnifiedPost[] = [
    ...wordPressPosts
      .filter((post) => {
        const postCategorySlug = post.categories.nodes[0]?.slug || '';
        return postCategorySlug === category || postCategorySlug.includes(category);
      })
      .map((post) => convertToUnifiedPost(post, category)),
    ...staticPosts
      .filter((post) => post.categorySlug === category)
      .map((post) => ({
        id: `static-${post.slug}`,
        title: post.title,
        excerpt: post.excerpt || post.description,
        slug: post.slug,
        date: post.date,
        category: post.category,
        categorySlug: post.categorySlug,
        featuredImage: post.featuredImage,
        isStatic: true,
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const breadcrumbs = [
    { name: '홈', url: '/' },
    { name: '블로그', url: '/blog' },
    { name: categoryInfo.name, url: `/blog/category/${category}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const categorySchema = generateCategoryPageSchema(
    categoryInfo.name,
    category,
    categoryInfo.description,
    categoryInfo.seoKeywords
  );

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={categorySchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center">
          <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {categoryInfo.name}
            </h1>
            <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </header>

          {allPosts.length === 0 ? (
            <section className="w-full mx-auto mt-20 max-w-3xl rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm text-center">
              <p className="text-slate-300 font-light">
                아직 게시된 글이 없습니다.
              </p>
            </section>
          ) : (
            <div className="w-full mx-auto mt-20 max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {allPosts.map((post, index) => {
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
                            quality={75}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6 items-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
                          <time dateTime={getTodayISO()} className="font-light">
                            {formatBlogDate(getTodayISO())}
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
                          카테고리 포스트 읽기 →
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </article>
    </>
  );
}
