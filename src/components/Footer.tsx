import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950 flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 justify-items-center items-center text-center justify-center w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">Jeju Gourmet AI Research Lab</h3>
              <p className="mt-4 text-base font-medium text-slate-300 text-center">
                Data-Driven Culinary Intelligence for Jeju Island.
              </p>
              <p className="mt-2 text-sm font-medium text-slate-300 text-center">
                We don&apos;t blog. We analyze.
              </p>
              <p className="mt-2 text-sm font-medium text-[#d4af37] text-center">
                AI-powered gourmet research
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">서비스 안내</h3>
              <ul className="mt-4 space-y-2 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <Link href="/strategy" prefetch={false} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    마케팅 전략
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/growth-engine" prefetch={false} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성장 엔진
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/success-cases" prefetch={false} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성공 사례
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">자료실</h3>
              <ul className="mt-4 space-y-2 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <Link href="/insights" prefetch={false} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성공 노하우
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/partnership" prefetch={false} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    협업 문의
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">고객센터</h3>
              <ul className="mt-4 space-y-3 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <a
                    href="https://pf.kakao.com/_SG7979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 font-bold hover:text-emerald-400 transition-colors"
                  >
                    카카오톡: SG7979
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="tel:010-4074-9343"
                    className="flex items-center justify-center gap-2 font-semibold text-emerald-400 transition-colors hover:text-[#d4af37] text-center"
                  >
                    <span className="text-[#d4af37]">📞</span>
                    010-4074-9343
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm font-medium text-slate-400 text-center">
                대표: <span className="text-emerald-400">10년 이상</span> 실행사 대표 전문가
              </p>
            </div>
          </div>
        </div>
          <div className="w-full mt-8 border-t border-white/5 pt-8 text-center flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-slate-400 text-center">
            &copy; {new Date().getFullYear()} Jeju Gourmet AI Research Lab. All rights reserved.
          </p>
        </div>
        
        {/* 사업자 정보 */}
        <div className="w-full mt-6 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-slate-400">
            <p className="font-medium text-slate-300 text-center">
              상호명: 공양걸AI연구소 (Jeju Gourmet AI Research Lab) | 대표자: 공양걸
            </p>
            <p className="text-center">
              주소: 제주특별자치도 제주시 삼동2길 10, 201호(연동)
            </p>
            <p className="text-center">
              대표번호: 010-4074-9343 | 사업자번호: 603-20-65775
            </p>
            <p className="text-center">
              통신판매번호: 2022-제주연동-0226호
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
