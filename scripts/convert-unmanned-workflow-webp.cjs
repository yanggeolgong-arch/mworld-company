/**
 * public/raw-images/3.jpeg → public/images/unmanned-automation-workflow-system.webp (WebP, quality 80)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const src = path.join(process.cwd(), 'public', 'raw-images', '3.jpeg');
const dest = path.join(process.cwd(), 'public', 'images', 'unmanned-automation-workflow-system.webp');

async function run() {
  if (!fs.existsSync(src)) {
    console.error('Source not found:', src);
    process.exit(1);
  }
  const imagesDir = path.dirname(dest);
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  await sharp(src).webp({ quality: 80, effort: 4 }).toFile(dest);
  console.log('OK:', path.basename(src), '→', path.basename(dest));
}
run().catch((e) => { console.error(e); process.exit(1); });
