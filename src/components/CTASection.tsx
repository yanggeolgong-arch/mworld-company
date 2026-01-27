export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-black p-8 border border-white/5">
          <h3 className="text-2xl font-light text-white mb-4">
            <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가의 실시간 트렌드 컨설팅 받기
          </h3>
          <a
            href="tel:010-4074-9343"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-medium text-slate-900 transition-all hover:bg-emerald-400 hover:shadow-lg"
          >
            <span>📞</span>
            010-4074-9343
          </a>
          <p className="mt-4 text-sm font-light text-slate-400">
            대표 직통 컨설팅
          </p>
        </div>
      </div>
    </section>
  );
}
