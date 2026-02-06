/**
 * public/raw-images/ 1~15 → public/images/blog/master-class/ (WebP quality 80)
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const NAMES = {
  1: 'agency-startup-ai-hero.webp',
  2: 'legacy-agency-inefficiency.webp',
  3: 'one-person-ai-company-efficiency.webp',
  4: 'ai-intelligent-engine-core.webp',
  5: 'data-hijacking-engine-01.webp',
  6: 'ai-content-factory-engine-02.webp',
  7: 'algorithm-control-engine-03.webp',
  8: 'local-data-power-abstract.webp',
  9: '10-year-expertise-symbol.webp',
  10: 'location-independent-operation.webp',
  11: 'unmanned-automation-flow.webp',
  12: 'overwhelming-revenue-graph.webp',
  13: 'entrepreneur-pov-setup.webp',
  14: 'blackbox-system-mystery.webp',
  15: 'system-initiate-cta.webp',
};

const rawDir = path.join(process.cwd(), 'public', 'raw-images');
const outDir = path.join(process.cwd(), 'public', 'images', 'blog', 'master-class');

async function run() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  for (let i = 1; i <= 15; i++) {
    const jpeg = path.join(rawDir, `${i}.jpeg`);
    const jpg = path.join(rawDir, `${i}.jpg`);
    const src = fs.existsSync(jpeg) ? jpeg : fs.existsSync(jpg) ? jpg : null;
    if (!src) {
      console.warn('Skip: source not found for', i);
      continue;
    }
    const dest = path.join(outDir, NAMES[i]);
    await sharp(src).webp({ quality: 80, effort: 4 }).toFile(dest);
    console.log('OK:', i, '→', NAMES[i]);
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
