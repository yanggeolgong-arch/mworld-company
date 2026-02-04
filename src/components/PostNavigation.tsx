/**
 * 포스트 이전/다음 글 네비게이션 위젯
 */

import Link from 'next/link';

interface PostNavigationProps {
  prevPost?: {
    title: string;
    slug: string;
    url: string;
  } | null;
  nextPost?: {
    title: string;
    slug: string;
    url: string;
  } | null;
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Post navigation">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevPost ? (
          <Link
            href={prevPost.url}
            className="group flex flex-col p-4 rounded-lg bg-slate-900/50 border border-white/5 hover:border-emerald-400/30 transition-all hover:bg-slate-900/70"
          >
            <div className="text-xs text-slate-400 mb-2 font-light">이전 글</div>
            <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
              {prevPost.title}
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
        {nextPost ? (
          <Link
            href={nextPost.url}
            className="group flex flex-col p-4 rounded-lg bg-slate-900/50 border border-white/5 hover:border-emerald-400/30 transition-all hover:bg-slate-900/70 sm:text-right"
          >
            <div className="text-xs text-slate-400 mb-2 font-light">다음 글</div>
            <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
              {nextPost.title}
            </div>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
