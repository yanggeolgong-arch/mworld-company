/**
 * public/assets/images/jeju-marketing/ 1.jpeg~15.jpeg → jeju-marketing-company-expert-01.avif~15.avif
 * AVIF 포맷, 파일당 30KB 미만 (구글 상위 노출 최적화)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(process.cwd(), 'public', 'assets', 'images', 'jeju-marketing');
const outDir = srcDir;
const MAX_WIDTH = 640;
const MAX_KB = 30;

async function ensureSourceFiles() {
  const rawDir = path.join(process.cwd(), 'public', 'raw-images');
  for (let i = 1; i <= 15; i++) {
    const jpegName = `${i}.jpeg`;
    const src = path.join(srcDir, jpegName);
    const rawPath = path.join(rawDir, jpegName);
    const fallback = path.join(rawDir, `${i === 6 ? 5 : i}.jpeg`);
    if (!fs.existsSync(src)) {
      const from = fs.existsSync(rawPath) ? rawPath : fallback;
      if (fs.existsSync(from)) {
        fs.copyFileSync(from, src);
        console.log('Copied source:', jpegName);
      }
    }
  }
}

async function run() {
  await ensureSourceFiles();
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const src = path.join(srcDir, `${i}.jpeg`);
    const dest = path.join(outDir, `jeju-marketing-company-expert-${num}.avif`);
    if (!fs.existsSync(src)) {
      console.warn('Skip (not found):', src);
      continue;
    }
    let lastQ = 30;
    for (let q = 50; q >= 20; q -= 5) {
      await sharp(src)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .avif({ quality: q, effort: 6 })
        .toFile(dest);
      const sizeKb = fs.statSync(dest).size / 1024;
      if (sizeKb < MAX_KB) {
        lastQ = q;
        break;
      }
      lastQ = q;
    }
    const sizeKb = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`jeju-marketing-company-expert-${num}.avif`, sizeKb, 'KB');
  }
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
