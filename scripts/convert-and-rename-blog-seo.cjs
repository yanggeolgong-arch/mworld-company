/**
 * Jeju Gourmet AI Research Lab - Image SEO optimization
 * concept, global, insta 폴더: JPEG → WebP 변환 후 영문 SEO 파일명으로 일괄 변경
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const BLOG_IMG = path.join(process.cwd(), 'public', 'images', 'blog');

const CONCEPT_SEO = {
  1: 'jeju-google-ranking-concept-check-expert.webp',
  2: 'google-clear-message-brand-concept.webp',
  3: 'semantic-dna-brand-recognition.webp',
  4: 'concept-ad-efficiency-difference.webp',
  5: 'concept-check-checklist-before-ad.webp',
  6: 'brand-identity-definition.webp',
  7: 'core-message-clarification.webp',
  8: 'target-customer-definition.webp',
  9: 'competitive-differentiation.webp',
  10: 'search-engine-brand-understanding.webp',
  11: 'advertising-without-concept-result.webp',
  12: 'mworld-concept-check-process.webp',
  13: 'brand-concept-diagnosis.webp',
  14: 'channel-message-consistency.webp',
  15: 'google-ranking-concept-check.webp',
};

const GLOBAL_SEO = {
  1: 'jeju-icb-official-agent-certificate.webp',
  2: 'jeju-qrick-alipay-wechat-kakao-payment.webp',
  3: 'jeju-restaurant-young-global-guests.webp',
  4: 'jeju-dazhong-dianping-app-review-rank.webp',
  5: 'jeju-smartphone-qr-scan-payment.webp',
  6: 'jeju-payment-success-global-couple.webp',
  7: 'jeju-restaurant-full-house-interior.webp',
  8: 'jeju-krw-d2-settlement-sms.webp',
  9: 'jeju-alipay-official-sticker-interior.webp',
  10: 'jeju-dazhong-dianping-realtime-review-photo.webp',
  11: 'jeju-local-parking-storefront.webp',
  12: 'jeju-restaurant-waiting-global-guests.webp',
  13: 'jeju-mworld-consulting-on-site.webp',
  14: 'jeju-dazhong-dianping-inquiry.webp',
  15: 'jeju-mworld-brand-execution-no1.webp',
};

const INSTA_SEO = {
  1: 'jeju-instagram-shortform-zero-views-reason.webp',
  2: 'jeju-instagram-shortform-zero-views-feature.webp',
  3: 'jeju-instagram-shortform-algorithm.webp',
  4: 'jeju-instagram-marketing-mistake.webp',
  5: 'jeju-reels-20-production-success-case.webp',
  6: 'jeju-shortform-hook-design.webp',
  7: 'jeju-shortform-subtitle-rhythm.webp',
  8: 'jeju-channel-expansion-upload.webp',
  9: 'jeju-restaurant-storytelling.webp',
  10: 'jeju-20-episode-production-benefit.webp',
  11: 'jeju-shortform-checklist.webp',
  12: 'jeju-mworld-10year-execution-expert.webp',
  13: 'jeju-instagram-marketing-summary.webp',
  14: 'jeju-reels-20-success-case.webp',
  15: 'jeju-series-next-dazhong-dianping.webp',
};

async function convertToWebp(dir, indexes) {
  for (const i of indexes) {
    const src = path.join(dir, `${i}.jpeg`);
    const dest = path.join(dir, `${i}.webp`);
    if (!fs.existsSync(src)) {
      console.warn(`Skip: ${src} not found`);
      continue;
    }
    await sharp(src).webp({ quality: 80, effort: 4 }).toFile(dest);
    console.log(`  ${i}.jpeg → ${i}.webp`);
  }
}

function renameToSeo(dir, nameToSeo) {
  for (let i = 1; i <= 15; i++) {
    const oldPath = path.join(dir, `${i}.webp`);
    const newName = nameToSeo[i];
    const newPath = path.join(dir, newName);
    if (!fs.existsSync(oldPath)) continue;
    fs.renameSync(oldPath, newPath);
    console.log(`  ${i}.webp → ${newName}`);
  }
}

async function run() {
  // concept: 1-15 jpeg → webp, then rename
  const conceptDir = path.join(BLOG_IMG, 'concept');
  if (fs.existsSync(conceptDir)) {
    console.log('\n[concept] WebP 변환');
    await convertToWebp(conceptDir, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    console.log('[concept] SEO 파일명 변경');
    renameToSeo(conceptDir, CONCEPT_SEO);
  }

  // global: 3-15 jpeg → webp (1,2 already webp), then rename 1-15
  const globalDir = path.join(BLOG_IMG, 'global');
  if (fs.existsSync(globalDir)) {
    console.log('\n[global] WebP 변환 (3-15)');
    await convertToWebp(globalDir, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    console.log('[global] SEO 파일명 변경');
    renameToSeo(globalDir, GLOBAL_SEO);
  }

  // insta: 1-15 jpeg → webp, then rename
  const instaDir = path.join(BLOG_IMG, 'insta');
  if (fs.existsSync(instaDir)) {
    console.log('\n[insta] WebP 변환');
    await convertToWebp(instaDir, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    console.log('[insta] SEO 파일명 변경');
    renameToSeo(instaDir, INSTA_SEO);
  }

  console.log('\nDone.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
