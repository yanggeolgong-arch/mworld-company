/**
 * public/images/blog/vol1/ 모든 WebP를 가로 최대 800px 리사이즈, 50KB 이하로 압축.
 * 출력: public/images/blog/vol1_800_50kb/ (생성 후 여기 파일을 vol1로 교체)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const vol1Dir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1_800_50kb');
const MAX_WIDTH = 800;
const MAX_KB = 50;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const files = fs.readdirSync(vol1Dir).filter((f) => f.endsWith('.webp') && !f.startsWith('_'));
  for (const f of files) {
    const src = path.join(vol1Dir, f);
    const dest = path.join(outDir, f);
    let quality = 42;
    for (let q = 42; q >= 28; q -= 4) {
      await sharp(src)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: q, effort: 6 })
        .toFile(dest);
      const stat = fs.statSync(dest);
      if (stat.size <= MAX_KB * 1024) {
        quality = q;
        break;
      }
      quality = q;
    }
    console.log(f, (fs.statSync(dest).size / 1024).toFixed(1), 'KB', 'quality', quality);
  }
  console.log('Done. Copy vol1_800_50kb/* to vol1/ to apply.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
