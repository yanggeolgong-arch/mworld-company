/**
 * 엠월드컴퍼니 최고실행자 프로토콜 - Image Protocol
 * public/images/blog/global/ 내 1.jpeg, 2.jpeg → WebP 변환 (LCP·성능 98점 사수)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'blog', 'global');
const FILES = ['1', '2'];

async function run() {
  for (const name of FILES) {
    const src = path.join(PUBLIC_DIR, `${name}.jpeg`);
    const dest = path.join(PUBLIC_DIR, `${name}.webp`);
    if (!fs.existsSync(src)) {
      console.warn(`Skip: ${src} not found`);
      continue;
    }
    await sharp(src)
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    console.log(`OK: ${name}.jpeg → ${name}.webp`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
