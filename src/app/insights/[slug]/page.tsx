import type { Metadata } from 'next';
import Image from 'next/image';
import { requestPosts, GET_POST_BY_SLUG } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import { StructuredData } from '@/components/StructuredData';
import { generateCanonicalUrl, optimizeSlug } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateKeywords } from '@/lib/keyword-generator';

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
    const data = await requestPosts<PostData>(GET_POST_BY_SLUG, { slug });
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
      title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다',
    };
  }

  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const canonicalUrl = generateCanonicalUrl(`/insights/${optimizeSlug(post.slug || post.title)}`);
  
  // 키워드 스터핑 방지: 포스트 내용에 맞게 동적으로 생성
  const keywords = generateKeywords(post.title, post.categories.nodes, post.content);

  return {
    title: `${post.title} - 엠월드컴퍼니 성공 노하우`,
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = generateCanonicalUrl(`/insights/${optimizeSlug(post.slug || post.title)}`);

  // BreadcrumbList 스키마 생성
  const breadcrumbs = [
    { name: '홈', url: '/' },
    { name: '성공 노하우', url: '/insights' },
    { name: post.title, url: `/insights/${optimizeSlug(post.slug || post.title)}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
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
