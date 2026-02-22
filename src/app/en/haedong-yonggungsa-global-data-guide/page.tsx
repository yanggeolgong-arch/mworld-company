import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

const IMG_BASE = '/images/blog/haedong-yonggungsa';
const IMAGES = Array.from({ length: 15 }, (_, i) => ({
  src: `${IMG_BASE}/haedong-yonggungsa-temple-busan-${String(i + 1).padStart(2, '0')}.avif`,
  alt: `Haedong Yonggungsa Temple Busan - Scenic view ${i + 1}`,
}));

/** 표시 664x371 대비 반응형 sizes: 모바일 100vw, 데스크톱 664px */
const IMG_SIZES = '(max-width: 768px) 100vw, 664px';

export const metadata = {
  title: 'Haedong Yonggungsa Temple Busan | Global Data Guide',
  description:
    'Haedong Yonggungsa Temple Busan - coastal temple scenic views. Data-driven travel intelligence.',
};

export default function HaedongYonggungsaPage() {
  return (
    <main className="min-h-screen bg-white text-[#1a202c]">
      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-4 text-2xl font-bold text-[#000000]">
          Haedong Yonggungsa Temple Busan
        </h1>
        <p className="mb-8 text-slate-600">
          Coastal temple scenic views. Data-Driven Culinary Intelligence.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {IMAGES.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={img.alt}
                width={664}
                height={371}
                sizes={IMG_SIZES}
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
                quality={75}
                className="h-auto w-full object-cover"
              />
            </figure>
          ))}
        </div>

        <footer className="mt-12 border-t border-gray-200 pt-6">
          <Link
            href="/"
            className="text-sm text-[#0070f3] hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </footer>
      </article>
    </main>
  );
}
