import type { Metadata } from 'next';
import Image from 'next/image';
import { graphqlClient, GET_POST_BY_SLUG } from '@/lib/graphql';
import { notFound } from 'next/navigation';

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

  return {
    title: `${post.title} - M-World Company`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
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

  return (
    <article className="min-h-screen bg-[#fafafa] dark:bg-black">
      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <div className="rounded-2xl bg-white p-8 dark:bg-[#0a0a0a] border border-[#e5e7eb] dark:border-[#1a1a1a]">
          <header>
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
            <h1 className="mt-4 text-4xl font-light tracking-tight text-[#001f3f] dark:text-[#e8e8e8] sm:text-5xl">
              {post.title}
            </h1>
          </header>

          {post.featuredImage?.node && (
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg relative">
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
            className="prose prose-lg mt-8 max-w-none prose-headings:font-semibold prose-headings:text-[#001f3f] dark:prose-headings:text-[#e8e8e8] prose-p:text-[#36454f] dark:prose-p:text-gray-400 prose-p:font-light prose-a:text-[#001f3f] dark:prose-a:text-[#e8e8e8] dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </article>
  );
}
