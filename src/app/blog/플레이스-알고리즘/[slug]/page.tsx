import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default async function PlaceAlgorithmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/blog/${slug}`);
}
