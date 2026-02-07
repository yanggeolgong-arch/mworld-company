/**
 * 초기 화면(홈) 이미지 4개: 모바일 기준 최대 너비 480px, WebP 품질 50%, 파일당 20KB 이하.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const imagesDir = path.join(process.cwd(), 'public', 'images');
const outDir = path.join(process.cwd(), 'public', 'images', '_home_480');
const MAX_WIDTH = 480;
const MAX_KB = 20;
const QUALITY = 50;

const files = [
  'ai-marketing-insights-automation.webp',
  'agency-startup-ai-automation.webp',
  'unmanned-automation-workflow-system.webp',
  'jeju-local-marketing-performance-report.webp',
];

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  for (const f of files) {
    const src = path.join(imagesDir, f);
    if (!fs.existsSync(src)) {
      console.warn('Skip (not found):', f);
      continue;
    }
    const dest = path.join(outDir, f);
    let quality = QUALITY;
    for (let q = QUALITY; q >= 24; q -= 8) {
      await sharp(src)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toFile(dest);
      const stat = fs.statSync(dest);
      if (stat.size < MAX_KB * 1024) {
        quality = q;
        break;
      }
      quality = q;
    }
    try {
      fs.copyFileSync(dest, src);
    } catch (err) {
      console.log('  -> Copy failed (file locked?). Run: Copy-Item public/images/_home_480/*.webp public/images/ -Force');
    }
    console.log(f, (fs.statSync(dest).size / 1024).toFixed(1), 'KB', 'quality', quality);
  }
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
