import Link from 'next/link';
import { JejuBest10List } from '@/components/JejuBest10List';
import { JEJU_BEST_10_DATA } from '@/lib/jeju-best-10-data';
import { generateCanonicalUrl } from '@/lib/url-optimizer';

export const dynamic = 'force-static';

const SLOGAN = 'Data-Driven Culinary Intelligence for Jeju Island.';
const META_DESC =
  'AI-analyzed top 10 restaurants in Jeju Island. Real-time data mining delivers optimal gourmet solutions.';

export default function JejuBest10ReportPage() {
  const canonicalUrl = generateCanonicalUrl('/reports/jeju-best-10');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: 'Jeju Best 10 - AI Gourmet Research Report',
    description: META_DESC,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: '제주 미식 AI 연구소 (Jeju Gourmet AI Research Lab)',
      url: 'https://www.aijeju.co.kr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-black">
        <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
            <nav className="mb-6" aria-label="Breadcrumb">
              <Link
                href="/reports"
                className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                ← Reports
              </Link>
              <span className="mx-2 text-slate-600">/</span>
              <Link
                href="/"
                className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                Home
              </Link>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Stealth Report · Confidential
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Jeju Best 10
            </h1>
            <p className="mt-2 text-lg text-slate-300">{SLOGAN}</p>
            <p className="mt-2 text-sm text-slate-400">
              AI-enhanced image · Data-driven analysis · Verified by real-time mining
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="mb-12 text-center text-slate-400">
            Order randomized on each visit. Fixed card height for optimal CLS score.
          </p>
          <JejuBest10List entries={JEJU_BEST_10_DATA} locale="en" />
        </main>

        <footer className="mt-24 border-t border-white/10 py-12">
          <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
            <p className="text-sm text-slate-500">
              제주 미식 AI 연구소 (Jeju Gourmet AI Research Lab) · AIJEJU.CO.KR
            </p>
            <p className="mt-2 text-sm text-slate-500">
              We don&apos;t blog. We analyze.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
