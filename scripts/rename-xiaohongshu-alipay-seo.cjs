/**
 * Jeju Gourmet AI Research Lab - Image SEO
 * 1~15번 사진을 영문 키워드 파일명으로 변경 (제주맛집, 알리페이, 샤오홍슈, 보조배터리 등)
 */
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'blog', 'xiaohongshu-alipay-strategy');

const INDEX_TO_SEO_FILENAME = {
  1: 'jeju-restaurant-xiaohongshu-alipay-expert-guide.webp',
  2: 'jeju-restaurant-alipay-scan-payment.webp',
  3: 'jeju-food-xiaohongshu-note-search.webp',
  4: 'jeju-restaurant-alipay-wechat-logo-sign.webp',
  5: 'jeju-cafe-alipay-checkout.webp',
  6: 'jeju-cafe-alipay-power-bank-rental.webp',
  7: 'jeju-restaurant-full-house-scene.webp',
  8: 'jeju-alipay-d2-settlement.webp',
  9: 'jeju-alipay-official-sticker.webp',
  10: 'jeju-xiaohongshu-realtime-review-photo.webp',
  11: 'jeju-food-alipay-wechat-logo-placement.webp',
  12: 'jeju-restaurant-exterior.webp',
  13: 'jeju-alipay-consultation-on-site.webp',
  14: 'jeju-xiaohongshu-alipay-registration.webp',
  15: 'jeju-mworld-executive-brand.webp',
};

function run() {
  for (let i = 1; i <= 15; i++) {
    const oldPath = path.join(PUBLIC_DIR, `${i}.webp`);
    const newName = INDEX_TO_SEO_FILENAME[i];
    const newPath = path.join(PUBLIC_DIR, newName);
    if (!fs.existsSync(oldPath)) {
      console.warn(`Skip: ${oldPath} not found`);
      continue;
    }
    fs.renameSync(oldPath, newPath);
    console.log(`OK: ${i}.webp → ${newName}`);
  }
}

run();
