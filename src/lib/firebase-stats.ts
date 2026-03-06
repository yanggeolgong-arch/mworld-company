/**
 * 상호작용 통계 - API 우선 (무조건 동작), Firebase 클라이언트는 실시간 표시용
 * FIREBASE_SERVICE_ACCOUNT_JSON(서버) 설정 시 API로 뷰카운트, 클라이언트 config는 선택
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, increment } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let authReady: Promise<void> | null = null;
let authReadyResolve: (() => void) | null = null;
const appId = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  : 'ai-jeju-stealth';

function getConfig(): object | null {
  if (typeof process === 'undefined') return null;
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isFirebaseEnabled(): boolean {
  return getConfig() !== null;
}

export type StatsState = Record<number, { view: number; youtube: number; naver: number; google: number }>;

export function initFirebase(
  onReady: (uid: string) => void,
  onStats: (shopId: number, data: { view: number; youtube: number; naver: number; google: number }) => void
): () => void {
  const config = getConfig();
  if (!config) return () => {};

  try {
    if (!app) {
      app = initializeApp(config);
    }
    const auth = getAuth(app);
    const db = getFirestore(app);

    const initAuth = async () => {
      const token = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_TOKEN : undefined;
      try {
        if (token) await signInWithCustomToken(auth, token);
        else await signInAnonymously(auth);
      } catch (err) {
        console.error('[Firebase] Auth Error:', err);
      }
    };

    let uid: string | null = null;
    authReady = Promise.race([
      new Promise<void>((resolve) => {
        authReadyResolve = resolve;
      }),
      new Promise<void>((r) => setTimeout(r, 5000)),
    ]);
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        onReady(uid);
        authReadyResolve?.();
        authReadyResolve = null;
      }
    });

    initAuth();

    const shopIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const unsubs = shopIds.map((shopId) => {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', `shop_${shopId}`);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const d = docSnap.data();
          onStats(shopId, {
            view: d?.view ?? 0,
            youtube: d?.youtube ?? 0,
            naver: d?.naver ?? 0,
            google: d?.google ?? 0,
          });
        }
      });
    });

    return () => {
      unsubAuth();
      unsubs.forEach((u) => u());
    };
  } catch (err) {
    console.error('[Firebase] Init Error:', err);
    return () => {};
  }
}

/** API 폴링으로 stats 로드 (Firebase 클라이언트 미설정 시) */
export function initStatsFromApi(
  onStats: (shopId: number, data: { view: number; youtube: number; naver: number; google: number }) => void
): () => void {
  let cancelled = false;
  const poll = async () => {
    if (cancelled) return;
    try {
      const res = await fetch('/api/stats');
      if (!res.ok || cancelled) return;
      const data = await res.json();
      for (let id = 1; id <= 10; id++) {
        if (cancelled) return;
        const d = data[id];
        if (d) onStats(id, { view: d.view ?? 0, youtube: d.youtube ?? 0, naver: d.naver ?? 0, google: d.google ?? 0 });
      }
    } catch {
      // ignore
    }
    if (!cancelled) setTimeout(poll, 3000);
  };
  poll();
  return () => { cancelled = true; };
}

/** API 우선 호출 (서버에 FIREBASE_SERVICE_ACCOUNT_JSON 있으면 무조건 동작) */
export async function trackInteraction(shopId: number, type: 'view' | 'youtube' | 'naver' | 'google'): Promise<void> {
  try {
    const res = await fetch('/api/stats/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId, type }),
      credentials: 'same-origin',
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.ok) return;
    }
  } catch {
    // fallback to client Firestore
  }
  const config = getConfig();
  if (!config || !app) return;
  if (authReady) await authReady;
  try {
    const db = getFirestore(app);
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', `shop_${shopId}`);
    await updateDoc(docRef, { [type]: increment(1) });
  } catch (e) {
    try {
      const docRef = doc(getFirestore(app!), 'artifacts', appId, 'public', 'data', 'stats', `shop_${shopId}`);
      await setDoc(docRef, { view: 0, youtube: 0, naver: 0, google: 0, [type]: 1 }, { merge: true });
    } catch {
      // ignore
    }
  }
}
