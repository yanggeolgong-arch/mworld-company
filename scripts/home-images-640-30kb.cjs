/**
 * 초기 화면(홈) 이미지 4개: 최대 너비 640px, WebP 품질 65%, 파일당 30KB 이하.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const imagesDir = path.join(process.cwd(), 'public', 'images');
const outDir = path.join(process.cwd(), 'public', 'images', '_home_640');
const MAX_WIDTH = 640;
const MAX_KB = 30;
const QUALITY = 65;

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
      console.log('  -> Copy failed (file locked?). Run: Copy-Item public/images/_home_640/*.webp public/images/ -Force');
    }
    console.log(f, (fs.statSync(dest).size / 1024).toFixed(1), 'KB', 'quality', quality);
  }
  try {
    fs.rmSync(outDir, { recursive: true, force: true });
  } catch (_) {}
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
