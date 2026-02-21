import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';

const REPORTS: Record<string, { title: string; subtext: string }> = {
  gourmet: {
    title: 'AI-Curated Jeju Gourmet Top 10',
    subtext: 'Real-time Sentiment & Density Analysis',
  },
  cafe: {
    title: 'AI-Curated Jeju Cafe Top 10',
    subtext: 'Viewpoint & Photo-Genic Index Data',
  },
  stay: {
    title: 'AI-Curated Jeju Premium Stay Top 10',
    subtext: 'Thermal Stability & Privacy Tiering',
  },
};

export async function generateStaticParams() {
  return Object.keys(REPORTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = REPORTS[slug];
  if (!report) return {};
  return {
    title: `${report.title} | Jeju Gourmet AI Research Lab`,
    description: `Intelligence Report: ${report.title}. ${report.subtext}`,
  };
}

export default async function EnReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = REPORTS[slug];
  if (!report) notFound();

  return (
    <main className="min-h-screen bg-white text-[#1a202c]">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#0070f3]">
          Intelligence Report · Dataset
        </p>
        <h1 className="mb-4 text-2xl font-semibold text-[#1a202c]">{report.title}</h1>
        <p className="mb-8 text-slate-600">{report.subtext}</p>
        <p className="mb-8 text-sm text-slate-500">
          Data-Driven Culinary Intelligence. We analyze. We don&apos;t blog.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-gray-200 bg-white/70 px-4 py-2 text-sm text-slate-700 transition hover:bg-gray-50"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
