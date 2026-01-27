import type { Metadata } from 'next';
import Image from 'next/image';
import { graphqlClient, GET_POST_BY_SLUG } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/StructuredData';

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

async function getPost(slug: string) {
  try {
    const data = await graphqlClient.request<PostData>(GET_POST_BY_SLUG, {
      slug,
    });
    return data.post;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - M-World Company',
    };
  }

  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${post.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
    description: description || '10년 이상 실행 업무 전문가의 알고리즘 확산 최적화 전략',
    keywords: '알고리즘 확산, 광고대행사 창업, 숏폼 마케팅 실무, 플레이스 알고리즘, 네이버 플레이스 최적화',
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
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
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // BlogPosting 스키마 생성
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    url: `https://aijeju.co.kr/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: '엠월드컴퍼니',
      jobTitle: '10년 이상 실행 업무 전문가',
    },
    publisher: {
      '@type': 'Organization',
      name: 'M-World Company (엠월드컴퍼니)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aijeju.co.kr/logo.png',
      },
    },
    image: post.featuredImage?.node?.sourceUrl || 'https://aijeju.co.kr/logo.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aijeju.co.kr/blog/${slug}`,
    },
    keywords: post.categories.nodes.map((cat) => cat.name).join(', '),
  };

  return (
    <>
      <StructuredData data={blogPostingSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm">
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
                  quality={90}
                />
              </div>
            )}

            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-slate-300 prose-p:font-light prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-[#d4af37] prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:text-slate-300 prose-img:rounded-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
