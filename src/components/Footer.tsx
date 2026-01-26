import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="w-full mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 justify-items-center items-center text-center w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">M-World Company</h3>
              <p className="mt-4 text-base font-medium text-slate-300 text-center">
                <span className="text-emerald-400">10년</span>의 데이터, <span className="text-[#d4af37]">1,000개</span>의 신화.
              </p>
              <p className="mt-2 text-sm font-medium text-slate-300 text-center">
                엠월드컴퍼니는 결과로만 말합니다.
              </p>
              <p className="mt-2 text-sm font-medium text-[#d4af37] text-center">
                F&B(맛집) 마케팅의 절대 강자
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">서비스 안내</h3>
              <ul className="mt-4 space-y-2 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <Link href="/strategy" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    마케팅 전략
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/growth-engine" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성장 엔진
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/success-cases" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성공 사례
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">자료실</h3>
              <ul className="mt-4 space-y-2 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <Link href="/insights" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    성공 노하우
                  </Link>
                </li>
                <li className="text-center">
                  <Link href="/partnership" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors text-center">
                    협력 문의
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="text-base font-semibold text-white text-center">고객센터</h3>
              <ul className="mt-4 space-y-3 text-base flex flex-col items-center justify-center">
                <li className="text-center">
                  <a
                    href="tel:010-4074-9343"
                    className="flex items-center justify-center gap-2 font-semibold text-emerald-400 transition-colors hover:text-[#d4af37]"
                  >
                    <span className="text-[#d4af37]">📞</span>
                    010-4074-9343
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="mailto:contact@aijeju.co.kr"
                    className="text-slate-300 font-medium transition-colors hover:text-emerald-400 text-center"
                  >
                    contact@aijeju.co.kr
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm font-medium text-slate-400 text-center">
                대표: <span className="text-emerald-400">10년</span> 경력 전문가
              </p>
            </div>
          </div>
        </div>
          <div className="mt-8 border-t border-white/5 pt-8 text-center">
            <p className="text-sm font-medium text-slate-400 text-center">
            &copy; {new Date().getFullYear()} M-World Company (엠월드컴퍼니). All rights reserved.
          </p>
        </div>
        
        {/* 사업자 정보 */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-slate-400">
            <p className="font-medium text-slate-300 text-center w-full">
              상호명: 엠월드컴퍼니 | 대표자: 공양걸
            </p>
            <p className="text-center w-full">
              주소: 제주특별자치도 제주시 삼동2길 10, 201호(연동)
            </p>
            <p className="text-center w-full">
              대표번호: 010-4074-9343 | 사업자번호: 603-20-65775
            </p>
            <p className="text-center w-full">
              통신판매번호: 2022-제주연동-0226호
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
