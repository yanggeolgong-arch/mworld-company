/**
 * vol1 WebP: 너비 640px, 품질 60%, 파일당 30KB 미만 강제.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const vol1Dir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1_640_30kb');
const MAX_WIDTH = 640;
const MAX_KB = 30;
const QUALITY = 60;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const files = fs.readdirSync(vol1Dir).filter((f) => f.endsWith('.webp') && !f.startsWith('_'));
  for (const f of files) {
    const src = path.join(vol1Dir, f);
    const dest = path.join(outDir, f);
    let quality = QUALITY;
    for (let q = QUALITY; q >= 24; q -= 6) {
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
    console.log(f, (fs.statSync(dest).size / 1024).toFixed(1), 'KB', 'quality', quality);
  }
  console.log('Done. Copy vol1_640_30kb/* to vol1/ to apply.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
