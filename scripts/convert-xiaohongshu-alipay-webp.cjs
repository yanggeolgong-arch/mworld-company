/**
 * 공양걸AI연구소 최고실행자 프로토콜 - 성능 98점 WebP 80%
 * public/images/blog/xiaohongshu-alipay-strategy/ 내 1,2,6,11번 → WebP 변환
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'blog', 'xiaohongshu-alipay-strategy');
const ALL_INDEXES = Array.from({ length: 15 }, (_, i) => String(i + 1));

async function run() {
  for (const name of ALL_INDEXES) {
    const src = path.join(PUBLIC_DIR, `${name}.jpeg`);
    const dest = path.join(PUBLIC_DIR, `${name}.webp`);
    if (!fs.existsSync(src)) {
      console.warn(`Skip: ${src} not found`);
      continue;
    }
    await sharp(src)
      .webp({ quality: 80, effort: 4 })
      .toFile(dest);
    console.log(`OK: ${name}.jpeg → ${name}.webp (quality 80)`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
