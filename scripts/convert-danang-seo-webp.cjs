/**
 * public/images/blog/danang-seo/ 1~8.jpeg → 2026 베트남 다낭 맛집 WebP 8장
 * WebP 640px, 품질 70%, 2026 SEO 키워드 파일명
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(process.cwd(), 'public', 'images', 'blog', 'danang-seo');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'danang-seo');
const MAX_WIDTH = 640;
const QUALITY = 70;

const FILE_MAP = {
  1: 'main-2026-vietnam-danang.webp',
  2: 'moc-quan-2026-data.webp',
  3: 'banh-mi-phu-logic.webp',
  4: 'my-khe-quality-score.webp',
  5: 'cong-cafe-ugc-analysis.webp',
  6: 'lau-restaurant-synergy.webp',
  7: 'danang-data-chart.webp',
  8: 'white-cat-analyst-arnar.webp',
};

async function run() {
  for (let i = 1; i <= 8; i++) {
    const src = path.join(srcDir, `${i}.jpeg`);
    const dest = path.join(outDir, FILE_MAP[i]);
    if (!fs.existsSync(src)) {
      console.warn('Skip (not found):', src);
      continue;
    }
    await sharp(src)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(dest);
    const sizeKb = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(FILE_MAP[i], sizeKb, 'KB');
  }
  for (let i = 1; i <= 8; i++) {
    const p = path.join(srcDir, `${i}.jpeg`);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (_) {}
    }
  }
  console.log('Done: 2026 베트남 다낭 맛집 8장 WebP 변환 완료');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
