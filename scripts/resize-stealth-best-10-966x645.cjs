/**
 * public/images/stealth-best-10/*.avif → 966×645 강제 리사이즈
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public', 'images', 'stealth-best-10');
const WIDTH = 966;
const HEIGHT = 645;

async function run() {
  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.avif'))
    .sort((a, b) => parseInt(a) - parseInt(b));

  for (const f of files) {
    const src = path.join(dir, f);
    const tmp = path.join(dir, `_tmp_${f}`);
    await sharp(src)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
      .avif({ quality: 45, effort: 6 })
      .toFile(tmp);
    fs.renameSync(tmp, src);
    const sizeKb = (fs.statSync(src).size / 1024).toFixed(1);
    console.log(f, `${WIDTH}×${HEIGHT}`, sizeKb, 'KB');
  }
  console.log('Done.');
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
