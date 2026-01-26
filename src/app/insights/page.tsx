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
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8" aria-labelledby="insights-heading">
        <header className="mx-auto max-w-3xl">
          <h1 id="insights-heading" className="text-4xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-5xl">
            Insights
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-[#36454f] dark:text-gray-400">
            10년 이상의 SNS 광고 대행 경력에서 나온
            <br />
            마케팅 인사이트와 최신 트렌드를 확인하세요.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2">
            <span className="text-sm font-light text-[#001f3f] dark:text-[#e8e8e8]">
              10년 차 마케터의 칼럼
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
              <h3 className="text-xl font-light text-[#36454f] dark:text-gray-400">
                추가 인사이트
              </h3>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-8" role="list">
          {posts.length === 0 ? (
            <section className="rounded-2xl bg-white p-8 dark:bg-[#0a0a0a] border border-[#e5e7eb] dark:border-[#1a1a1a]">
              <p className="text-[#36454f] dark:text-gray-400 font-light">
                아직 게시된 글이 없습니다.
              </p>
            </section>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white p-8 transition-all hover:shadow-lg dark:bg-[#0a0a0a] dark:hover:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#1a1a1a]"
                role="listitem"
              >
                <Link href={`/insights/${post.slug}`}>
                  {post.featuredImage?.node && (
                    <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#36454f] dark:text-gray-400">
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
                  <h2 className="mt-4 text-2xl font-semibold text-[#001f3f] dark:text-[#e8e8e8]">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-4 text-[#36454f] dark:text-gray-400 line-clamp-3 font-light">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  <div className="mt-6 text-sm font-medium text-[#001f3f] transition-colors hover:text-[#36454f] dark:text-[#e8e8e8] dark:hover:text-gray-400">
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
