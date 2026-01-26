import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-[#fafafa] dark:border-[#1a1a1a] dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-[#001f3f] dark:text-[#e8e8e8]">M-World Company</h3>
            <p className="mt-4 text-sm font-light text-[#36454f] dark:text-gray-400">
              10년의 데이터, 1,000개의 신화.
            </p>
            <p className="mt-2 text-xs font-medium text-[#36454f] dark:text-gray-400">
              엠월드컴퍼니는 결과로만 말합니다.
            </p>
            <p className="mt-2 text-xs font-light text-[#d4af37]">
              F&B(맛집) 마케팅의 절대 강자
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#001f3f] dark:text-[#e8e8e8]">서비스</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/strategy" className="text-[#36454f] hover:text-[#001f3f] dark:text-gray-400 dark:hover:text-white font-light">
                  The Strategy
                </Link>
              </li>
              <li>
                <Link href="/growth-engine" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Growth Engine
                </Link>
              </li>
              <li>
                <Link href="/success-cases" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Success Cases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#001f3f] dark:text-[#e8e8e8]">리소스</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/insights" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Partnership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#001f3f] dark:text-[#e8e8e8]">연락처</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:010-4074-9343"
                  className="flex items-center gap-2 font-semibold text-[#001f3f] transition-colors hover:text-[#d4af37] dark:text-[#e8e8e8] dark:hover:text-[#d4af37]"
                >
                  <span className="text-[#d4af37]">📞</span>
                  010-4074-9343
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aijeju.co.kr"
                  className="text-gray-600 transition-colors hover:text-[#001f3f] dark:text-gray-400 dark:hover:text-[#e8e8e8]"
                >
                  contact@aijeju.co.kr
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              대표: 10년 경력 전문가
            </p>
          </div>
        </div>
          <div className="mt-8 border-t border-[#e5e7eb] pt-8 dark:border-[#1a1a1a]">
            <p className="text-xs text-[#36454f] dark:text-gray-400 font-light">
            &copy; {new Date().getFullYear()} M-World Company (엠월드컴퍼니). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
