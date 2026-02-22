/**
 * public/images/blog/haedong-yonggungsa/ 1~15.avfi(.avif/.jpeg) → SEO 파일명 AVIF 변환
 * haedong-yonggungsa-temple-busan-01.avif ~ 15.avif (구글 상위 노출 최적화)
 * 표시 664x371 대비 max 828px, 파일당 30KB 미만
 *
 * 사용법: 1.avfi~15.avfi(또는 .avif/.jpeg)를 폴더에 넣고
 *        node scripts/convert-haedong-yonggungsa-avif.cjs
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const srcDir = path.join(process.cwd(), 'public', 'images', 'blog', 'haedong-yonggungsa');
const outDir = srcDir;
const MAX_WIDTH = 828;
const MAX_KB = 30;

function findSource(i) {
  const candidates = [
    `${i}.avfi`,
    `${i}.avif`,
    `${i}.jpeg`,
    `${i}.jpg`,
    `${i}.webp`,
  ];
  for (const name of candidates) {
    const p = path.join(srcDir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function run() {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
    console.log('Created:', srcDir);
    console.log('Add 1.avfi~15.avfi (or .avif/.jpeg) and run again.');
    return;
  }
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const dest = path.join(outDir, `haedong-yonggungsa-temple-busan-${num}.avif`);
    const src = findSource(i);
    if (!src) {
      console.warn('Skip (not found):', i);
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
    console.log(`haedong-yonggungsa-temple-busan-${num}.avif`, sizeKb, 'KB');
  }
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
