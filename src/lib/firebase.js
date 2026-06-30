import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Public web config (safe to ship — access is gated by Firestore/Storage rules,
// not by these keys). The admin password is NEVER here; it lives as a server secret.
const firebaseConfig = {
  apiKey: 'AIzaSyAiaiu1-ZppLCV8UUqmvGg-Ti5XZGifkn8',
  authDomain: 'insite-hub-web.firebaseapp.com',
  projectId: 'insite-hub-web',
  storageBucket: 'insite-hub-web-blog',
  messagingSenderId: '286992843920',
  appId: '1:286992843920:web:8c068064874011effd8415',
};

export const app = initializeApp(firebaseConfig);
// Firestore only — the public site reads published content. Auth + Storage are
// initialized separately (firebaseAuth.js) so they load only in the admin chunk.
export const db = getFirestore(app);

// Local dev against the Firebase emulators. Guarded by DEV so production builds
// (where import.meta.env.DEV is statically false) never reach this branch.
// VITE_PRERENDER lets a *non-production* prerender build (vite build --mode
// prerender) read the emulator to verify dynamic snapshots — the MODE guard
// means a normal `vite build` (mode 'production') can NEVER connect to the
// emulator even if VITE_PRERENDER leaks into the env. The real deploy build is
// plain `vite build` and reads production Firestore.
export const USING_EMULATOR = (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATOR === '1')
  || (import.meta.env.MODE !== 'production' && import.meta.env.VITE_PRERENDER === '1');
if (USING_EMULATOR) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
