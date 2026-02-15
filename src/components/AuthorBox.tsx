interface AuthorBoxProps {
  authorName: string;
  jobTitle: string;
  quote?: string;
  imageSrc: string;
  imageAlt: string;
  verificationText?: string;
}

/** E-E-A-T 시각적 분석가 박스: 신뢰 보고서 저자 정보 */
export function AuthorBox({
  authorName,
  jobTitle,
  quote,
  imageSrc,
  imageAlt,
  verificationText,
}: AuthorBoxProps) {
  return (
    <section
      className="mt-12 p-6 rounded-xl border border-white/20 bg-slate-900/50 flex flex-col sm:flex-row items-center gap-6"
      aria-label="분석가 정보"
    >
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={80}
          height={80}
          className="rounded-full object-cover aspect-square"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <strong className="text-lg font-semibold text-white">{authorName}</strong>
        <p className="text-sm text-slate-400 mt-1">{jobTitle}</p>
        {verificationText && (
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">{verificationText}</p>
        )}
        {quote && (
          <p className="text-sm text-emerald-400/90 mt-2 italic">&quot;{quote}&quot;</p>
        )}
      </div>
    </section>
  );
}
