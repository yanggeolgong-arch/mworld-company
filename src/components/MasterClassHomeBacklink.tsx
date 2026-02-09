import Link from 'next/link';

/** 모든 블로그 포스팅 하단 공통: [대행사 창업 마스터 클래스 개요] 홈 백링크 (알고리즘 확산 내부 링크) */
export function MasterClassHomeBacklink() {
  return (
    <div className="mt-6 pt-6 border-t border-white/5 text-center">
      <Link
        href="/blog/agency-startup-master-class-secrets"
        prefetch={false}
        className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
      >
        [대행사 창업 마스터 클래스 개요]
      </Link>
    </div>
  );
}
