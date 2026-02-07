/**
 * public/images/blog/vol1/ 내 100KB 초과 WebP만 quality 52로 재압축 (98점 유지)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const vol1Dir = path.join(process.cwd(), 'public', 'images', 'blog', 'vol1');
const MAX_KB = 100;

async function run() {
  const files = fs.readdirSync(vol1Dir).filter((f) => f.endsWith('.webp'));
  for (const f of files) {
    const p = path.join(vol1Dir, f);
    const stat = fs.statSync(p);
    const kb = stat.size / 1024;
    if (kb <= MAX_KB) continue;
    const temp = path.join(vol1Dir, `${f}.new`);
    await sharp(p)
      .webp({ quality: 52, effort: 6 })
      .toFile(temp);
    fs.unlinkSync(p);
    fs.renameSync(temp, p);
    const newStat = fs.statSync(p);
    console.log('OK:', f, kb.toFixed(1), 'KB ->', (newStat.size / 1024).toFixed(1), 'KB');
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
