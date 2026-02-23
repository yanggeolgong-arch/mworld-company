import Image from 'next/image';

export const dynamic = 'force-dynamic';

const IMAGES = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/stealth-best-10/${i + 1}.jpg`,
  alt: `Stealth Best 10 - ${i + 1}`,
}));

export default function StealthBest10Page() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      <h1 className="text-center text-white text-2xl font-bold mb-10">
        Stealth Best 10
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-800"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
