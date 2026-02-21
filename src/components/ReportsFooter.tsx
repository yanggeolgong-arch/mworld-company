import Link from 'next/link';
import { REPORTS } from '@/lib/reports';

const CATEGORIES = ['Culinary', 'Hospitality', 'Tourism', 'Analytics'] as const;

type ReportItem = (typeof REPORTS)[number];

export function ReportsFooter() {
  const byCategory = CATEGORIES.reduce<Record<string, ReportItem[]>>(
    (acc, cat) => {
      acc[cat] = REPORTS.filter((r) => r.category === cat);
      return acc;
    },
    {},
  );

  return (
    <footer className="flex flex-col items-center justify-center border-t border-gray-200 bg-white px-6 py-8 text-center">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
          Stealth Reports · Crawl Index
        </p>
        <nav
          className="grid w-full max-w-4xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Report links"
        >
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex flex-col items-center justify-center">
              <h3 className="mb-2 text-sm font-medium text-slate-600">{cat}</h3>
              <ul className="flex flex-col items-center space-y-1">
                {byCategory[cat]?.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/reports/${r.slug}`}
                      className="text-sm text-slate-600 transition hover:text-[#0070f3]"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-6 text-center text-xs text-slate-500">
          Jeju Gourmet AI Research Lab · Data-Driven Culinary Intelligence
        </p>
      </div>
    </footer>
  );
}
