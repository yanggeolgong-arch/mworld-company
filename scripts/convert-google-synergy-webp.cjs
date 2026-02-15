/**
 * 공양걸AI연구소 최고실행자 프로토콜 - 성능 98점 WebP
 * google-maps-xiaohongshu-synergy/ → google-synergy/google-review-agency-synergy-01~15.webp
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SRC_DIR = path.join(process.cwd(), 'public', 'images', 'blog', 'google-maps-xiaohongshu-synergy');
const DEST_DIR = path.join(process.cwd(), 'public', 'images', 'blog', 'google-synergy');

async function run() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }
  for (let i = 1; i <= 15; i++) {
    const src = path.join(SRC_DIR, `${i}.jpeg`);
    const dest = path.join(DEST_DIR, `google-review-agency-synergy-${String(i).padStart(2, '0')}.webp`);
    if (!fs.existsSync(src)) {
      console.warn(`Skip: ${src} not found`);
      continue;
    }
    await sharp(src)
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    console.log(`OK: ${i}.jpeg → google-review-agency-synergy-${String(i).padStart(2, '0')}.webp`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
