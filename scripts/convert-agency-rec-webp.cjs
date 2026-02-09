/**
 * public/images/blog/agency-rec/ 15장 JPEG → jeju-marketing-agency-recommendation-01~15.webp
 * WebP 640px, 품질 65%, 파일당 30KB 미만
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(process.cwd(), 'public', 'images', 'blog', 'agency-rec');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'agency-rec');
const MAX_WIDTH = 640;
const MAX_KB = 30;
const QUALITY = 65;

async function run() {
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const src = path.join(srcDir, `${i}.jpeg`);
    const dest = path.join(outDir, `jeju-marketing-agency-recommendation-${num}.webp`);
    if (!fs.existsSync(src)) {
      console.warn('Skip (not found):', src);
      continue;
    }
    let quality = QUALITY;
    for (let q = QUALITY; q >= 24; q -= 8) {
      await sharp(src)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toFile(dest);
      if (fs.statSync(dest).size < MAX_KB * 1024) {
        quality = q;
        break;
      }
      quality = q;
    }
    console.log(`jeju-marketing-agency-recommendation-${num}.webp`, (fs.statSync(dest).size / 1024).toFixed(1), 'KB', 'q', quality);
  }
  // 원본 jpeg 삭제
  for (let i = 1; i <= 15; i++) {
    const p = path.join(srcDir, `${i}.jpeg`);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (_) {}
    }
  }
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
