/**
 * Firebase Firestore 기반 상호작용 통계 (optional)
 * NEXT_PUBLIC_FIREBASE_CONFIG, NEXT_PUBLIC_FIREBASE_APP_ID 미설정 시 비활성화
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, increment } from 'firebase/firestore';

let app: FirebaseApp | null = null;
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
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        onReady(uid);
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

export async function trackInteraction(shopId: number, type: 'view' | 'youtube' | 'naver' | 'google'): Promise<void> {
  const config = getConfig();
  if (!config || !app) return;

  try {
    const db = getFirestore(app);
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', `shop_${shopId}`);
    await updateDoc(docRef, { [type]: increment(1) });
  } catch (e) {
    try {
      const db = getFirestore(app!);
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', `shop_${shopId}`);
      await setDoc(docRef, { view: 0, youtube: 0, naver: 0, google: 0, [type]: 1 }, { merge: true });
    } catch {
      // ignore
    }
  }
}
