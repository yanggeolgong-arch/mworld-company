import Link from 'next/link';

interface NextPostTeaserProps {
  title: string;
  slug: string;
  publishDate?: string;
}

export function NextPostTeaser({ title, slug, publishDate }: NextPostTeaserProps) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10 text-center">
      <p className="text-base font-medium text-slate-300 mb-4">
        🚀 다음 이야기:{' '}
        <Link
          href={`/blog/${slug}`}
          className="text-emerald-400 hover:text-[#d4af37] transition-colors underline"
        >
          {title}
        </Link>
      </p>
      {publishDate && (
        <p className="text-sm text-slate-400">{publishDate}</p>
      )}
    </div>
  );
}
