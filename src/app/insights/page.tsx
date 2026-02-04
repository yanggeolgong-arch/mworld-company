import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { requestPosts, GET_POSTS } from '@/lib/graphql';
import { CTASection } from '@/components/CTASection';
import { MasterClassSample } from '@/components/MasterClassSample';
import { StructuredData } from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';

export const metadata: Metadata = {
  title: '엠월드컴퍼니 성공 노하우 | 10년 차 전문가의 마케팅 인사이트',
  description: '엠월드컴퍼니는 10년 이상 실행 업무 노하우에서 나온 SNS 마케팅 인사이트와 최신 트렌드를 공유합니다.',
  alternates: {
    canonical: 'https://www.aijeju.co.kr/insights',
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

async function getPosts(): Promise<Post[]> {
  try {
    const data = await requestPosts<PostsData>(GET_POSTS, { first: 10 });
    return data.posts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: '홈', url: '/' },
  { name: '성공 노하우', url: '/insights' },
]);

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="insights-heading">
          <header className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center text-center">
            <h1 id="insights-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              성공 노하우
            </h1>
            <p className="mt-6 text-lg font-light leading-8 text-slate-300 max-w-2xl mx-auto">
              <span className="text-emerald-400">10년 이상</span> 실행 업무 노하우에서 나온
              <br />
              마케팅 인사이트와 최신 트렌드를 확인하세요.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
              <span className="text-sm font-light text-slate-200">
                <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가의 칼럼
              </span>
            </div>
          </header>

          {/* Master Class Sample - Featured */}
          <div className="w-full mx-auto mt-16 max-w-3xl flex flex-col items-center justify-center">
            <MasterClassSample />
          </div>

          {/* 추가 인사이트 */}
          {posts.length > 0 && (
            <div className="w-full mx-auto mt-20 max-w-3xl flex flex-col items-center justify-center">
              <div className="mb-8 text-center">
                <h3 className="text-xl font-light text-slate-300">
                  추가 인사이트
                </h3>
              </div>
            </div>
          )}

          <div className="w-full mx-auto max-w-3xl space-y-8 flex flex-col items-center justify-center" role="list">
            {posts.length === 0 ? (
              <section className="w-full rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm text-center">
                <p className="text-slate-300 font-light">
                  아직 게시된 글이 없습니다.
                </p>
              </section>
            ) : (
              posts.map((post, index) => (
                <article
                  key={post.id}
                  className="w-full rounded-2xl bg-slate-900/50 p-8 text-center transition-all hover:scale-105 hover:shadow-2xl border border-white/5 backdrop-blur-sm"
                  role="listitem"
                >
                  <Link href={`/insights/${post.slug}`} className="flex flex-col items-center">
                    {post.featuredImage?.node && (
                      <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg mx-auto relative">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
                          className="object-cover"
                          loading={index < 2 ? 'eager' : 'lazy'}
                          quality={75}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
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
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-4 text-slate-300 line-clamp-3 font-light max-w-2xl mx-auto">
                        {post.excerpt.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    <div className="mt-6 text-sm font-medium text-emerald-400 transition-colors hover:text-[#d4af37]">
                      자세히 보기 →
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>
        <CTASection />
      </article>
    </>
  );
}
