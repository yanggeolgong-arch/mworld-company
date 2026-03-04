/**
 * public/images 내 모든 JPEG/PNG → AVIF 강제 변환 (용량 축소)
 * - stealth-best-10/*.jpeg → *.avif (966×645)
 * - jeju-map/*.png → *.avif
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const stealthDir = path.join(process.cwd(), 'public', 'images', 'stealth-best-10');
const jejuMapDir = path.join(process.cwd(), 'public', 'images', 'jeju-map');

async function convertStealthBest10() {
  const files = fs.readdirSync(stealthDir).filter((f) => f.endsWith('.jpeg')).sort((a, b) => parseInt(a) - parseInt(b));
  for (const f of files) {
    const src = path.join(stealthDir, f);
    const dest = path.join(stealthDir, f.replace(/\.jpeg$/i, '.avif'));
    const before = fs.statSync(src).size;
    await sharp(src)
      .resize(966, 645, { fit: 'cover', position: 'center' })
      .avif({ quality: 50, effort: 6 })
      .toFile(dest);
    const after = fs.statSync(dest).size;
    fs.unlinkSync(src);
    console.log(`${f} → ${path.basename(dest)}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`);
  }
}

async function convertJejuMap() {
  const png = path.join(jejuMapDir, 'jeju-osm.png');
  if (!fs.existsSync(png)) return;
  const dest = path.join(jejuMapDir, 'jeju-osm.avif');
  const before = fs.statSync(png).size;
  await sharp(png)
    .avif({ quality: 55, effort: 6 })
    .toFile(dest);
  const after = fs.statSync(dest).size;
  fs.unlinkSync(png);
  console.log(`jeju-osm.png → jeju-osm.avif: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`);
}

async function run() {
  console.log('=== stealth-best-10 ===');
  await convertStealthBest10();
  console.log('=== jeju-map ===');
  await convertJejuMap();
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
