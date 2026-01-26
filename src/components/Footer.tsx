import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">M-World Company</h3>
            <p className="mt-4 text-sm font-light text-slate-300">
              <span className="text-emerald-400">10년</span>의 데이터, <span className="text-[#d4af37]">1,000개</span>의 신화.
            </p>
            <p className="mt-2 text-xs font-medium text-slate-300">
              엠월드컴퍼니는 결과로만 말합니다.
            </p>
            <p className="mt-2 text-xs font-light text-[#d4af37]">
              F&B(맛집) 마케팅의 절대 강자
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">서비스</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/strategy" className="text-slate-300 hover:text-emerald-400 font-light transition-colors">
                  The Strategy
                </Link>
              </li>
              <li>
                <Link href="/growth-engine" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Growth Engine
                </Link>
              </li>
              <li>
                <Link href="/success-cases" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Success Cases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">리소스</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/insights" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Partnership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">연락처</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:010-4074-9343"
                  className="flex items-center gap-2 font-semibold text-emerald-400 transition-colors hover:text-[#d4af37]"
                >
                  <span className="text-[#d4af37]">📞</span>
                  010-4074-9343
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aijeju.co.kr"
                  className="text-slate-300 transition-colors hover:text-emerald-400"
                >
                  contact@aijeju.co.kr
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              대표: <span className="text-emerald-400">10년</span> 경력 전문가
            </p>
          </div>
        </div>
          <div className="mt-8 border-t border-white/5 pt-8">
            <p className="text-xs text-slate-400 font-light">
            &copy; {new Date().getFullYear()} M-World Company (엠월드컴퍼니). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
