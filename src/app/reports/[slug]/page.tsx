import { notFound } from 'next/navigation';
import Link from 'next/link';
import { REPORTS } from '@/lib/reports';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return REPORTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) return {};
  return {
    title: `${report.title} | Jeju Gourmet AI Research Lab`,
    description: `Stealth Report: ${report.title}. Data-Driven Culinary Intelligence.`,
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-400/90">
          Stealth Report · {report.category}
        </p>
        <h1 className="mb-6 text-2xl font-semibold">{report.title}</h1>
        <p className="mb-8 text-slate-400">
          Data-Driven Culinary Intelligence. We analyze. We don&apos;t blog.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
