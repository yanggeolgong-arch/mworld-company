/**
 * Firebase Admin SDK - 서버 전용 (클라이언트 인증 불필요)
 * FIREBASE_SERVICE_ACCOUNT_JSON 설정 시 뷰카운트 API 사용
 */
import admin from 'firebase-admin';

const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? 'ai-jeju-stealth';

function getAdminApp(): admin.app.App | null {
  if (admin.apps.length > 0) return admin.apps[0] as admin.app.App;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const cred = JSON.parse(raw);
    return admin.initializeApp({ credential: admin.credential.cert(cred) });
  } catch {
    return null;
  }
}

export function isAdminEnabled(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
}

export async function incrementStat(shopId: number, type: 'view' | 'youtube' | 'naver' | 'google'): Promise<boolean> {
  const app = getAdminApp();
  if (!app) return false;
  try {
    const db = admin.firestore(app);
    const ref = db.doc(`artifacts/${appId}/public/data/stats/shop_${shopId}`);
    await ref.set(
      { [type]: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
    return true;
  } catch {
    return false;
  }
}

export async function getStats(): Promise<Record<number, { view: number; youtube: number; naver: number; google: number }>> {
  const app = getAdminApp();
  const out: Record<number, { view: number; youtube: number; naver: number; google: number }> = {};
  if (!app) return out;
  try {
    const db = admin.firestore(app);
    for (let id = 1; id <= 10; id++) {
      const snap = await db.doc(`artifacts/${appId}/public/data/stats/shop_${id}`).get();
      const d = snap.data();
      out[id] = {
        view: d?.view ?? 0,
        youtube: d?.youtube ?? 0,
        naver: d?.naver ?? 0,
        google: d?.google ?? 0,
      };
    }
  } catch {
    // ignore
  }
  return out;
}

/** Blackbox: user_logs ENTRY (페이지 진입) */
export async function logUserEntry(utm_term?: string, utm_source?: string): Promise<boolean> {
  const app = getAdminApp();
  if (!app) return false;
  try {
    const db = admin.firestore(app);
    const ref = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('user_logs');
    await ref.add({
      type: 'ENTRY',
      utm_term: utm_term ?? null,
      utm_source: utm_source ?? null,
      ts: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}

/** Blackbox: user_logs ACTION (카드 클릭, 유튜브, 네이버 등) */
export async function logUserAction(
  action: 'card_click' | 'youtube_play' | 'naver_map' | 'google_map',
  shopId: number
): Promise<boolean> {
  const app = getAdminApp();
  if (!app) return false;
  try {
    const db = admin.firestore(app);
    const ref = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('user_logs');
    await ref.add({
      type: 'ACTION',
      action,
      shopId,
      ts: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}
