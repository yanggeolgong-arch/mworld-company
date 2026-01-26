import type { Metadata } from 'next';
import Link from 'next/link';
import { graphqlClient, GET_POSTS } from '@/lib/graphql';
import { CTASection } from '@/components/CTASection';
import { MasterClassSample } from '@/components/MasterClassSample';

export const metadata: Metadata = {
  title: 'Insights - M-World Company',
  description: '10년 이상의 경력에서 나온 SNS 마케팅 인사이트와 최신 트렌드를 확인하세요.',
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
    const data = await graphqlClient.request<PostsData>(GET_POSTS, {
      first: 10,
    });
    return data.posts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <article className="min-h-screen bg-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-48 lg:px-8" aria-labelledby="insights-heading">
        <header className="mx-auto max-w-3xl text-center">
          <h1 id="insights-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Insights
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-slate-300">
            <span className="text-emerald-400">10년</span> 이상의 SNS 광고 대행 경력에서 나온
            <br />
            마케팅 인사이트와 최신 트렌드를 확인하세요.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
            <span className="text-sm font-light text-slate-200">
              <span className="text-emerald-400">10년</span> 차 마케터의 칼럼
            </span>
          </div>
        </header>

        {/* Master Class Sample - Featured */}
        <div className="mx-auto mt-16 max-w-3xl">
          <MasterClassSample />
        </div>

        {/* Additional Insights */}
        {posts.length > 0 && (
          <div className="mx-auto mt-20 max-w-3xl">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-light text-slate-300">
                추가 인사이트
              </h3>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-8" role="list">
          {posts.length === 0 ? (
            <section className="rounded-2xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-sm text-center">
              <p className="text-slate-300 font-light">
                아직 게시된 글이 없습니다.
              </p>
            </section>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-slate-900/50 p-8 text-center transition-all hover:scale-105 hover:shadow-2xl border border-white/5 backdrop-blur-sm"
                role="listitem"
              >
                <Link href={`/insights/${post.slug}`}>
                  {post.featuredImage?.node && (
                    <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg mx-auto">
                      <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        className="h-full w-full object-cover"
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
                    <p className="mt-4 text-slate-300 line-clamp-3 font-light">
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
  );
}
