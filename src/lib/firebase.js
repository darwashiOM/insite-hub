import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
