#!/usr/bin/env node
/**
 * stealth-best-3 페이지 접근 검증 스크립트
 * 실행: node scripts/verify-stealth-best-3.mjs
 */
const URL = 'https://aikoreadatalab.com/stealth-best-3';

async function verify() {
  console.log(`\n🔍 검증 중: ${URL}\n`);
  try {
    const res = await fetch(URL, { redirect: 'follow' });
    const ok = res.ok;
    console.log(`상태: ${res.status} ${res.statusText}`);
    console.log(`결과: ${ok ? '✅ 접근 가능' : '❌ 404 또는 오류'}\n`);
    if (!ok) {
      console.log('배포가 완료되지 않았거나, Vercel 대시보드에서 빌드 로그를 확인하세요.');
    }
    process.exit(ok ? 0 : 1);
  } catch (err) {
    console.error('❌ 요청 실패:', err.message);
    process.exit(1);
  }
}

verify();
