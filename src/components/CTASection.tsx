export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#001f3f] to-[#0a2d5a] p-8 dark:from-[#0a0a0a] dark:to-[#1a1a1a] border border-[#d4af37]/10">
          <h3 className="text-2xl font-light text-white dark:text-[#e8e8e8] mb-4">
            10년 차 마스터의 실시간 트렌드 컨설팅 받기
          </h3>
          <a
            href="tel:010-4074-9343"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-medium text-[#001f3f] transition-all hover:bg-[#e8d68a] hover:shadow-lg"
          >
            <span>📞</span>
            010-4074-9343
          </a>
          <p className="mt-4 text-sm font-light text-white/80 dark:text-gray-400">
            대표 직통 컨설팅
          </p>
        </div>
      </div>
    </section>
  );
}
