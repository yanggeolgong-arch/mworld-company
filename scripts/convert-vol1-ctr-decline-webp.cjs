/**
 * public/raw-images/ 1~15 → public/images/blog/vol1/ blog-ctr-decline-01~15.webp (WebP, 70%+ 용량 절감)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const rawDir = path.join(process.cwd(), 'public', 'raw-images');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1');

async function run() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  let lastSrc = null;
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const dest = path.join(outDir, `blog-ctr-decline-${num}.webp`);
    const jpeg = path.join(rawDir, `${i}.jpeg`);
    const jpg = path.join(rawDir, `${i}.jpg`);
    let src = fs.existsSync(jpeg) ? jpeg : fs.existsSync(jpg) ? jpg : null;
    if (!src && lastSrc) {
      await sharp(lastSrc).webp({ quality: 65, effort: 6 }).toFile(dest);
      console.log('OK: (copy)', i, '→', `blog-ctr-decline-${num}.webp`);
      continue;
    }
    if (!src) {
      console.warn('Skip: source not found for', i);
      continue;
    }
    lastSrc = src;
    await sharp(src).webp({ quality: 65, effort: 6 }).toFile(dest);
    console.log('OK:', i, '→', `blog-ctr-decline-${num}.webp`);
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
