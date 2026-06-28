import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { app } from './firebase';

// Admin-only: imported solely by the (code-split) admin chunk, so Firebase Auth
// and Storage don't ship in the public bundle.
export const auth = getAuth(app);
// Blog images live in a dedicated Firebase-linked bucket.
export const storage = getStorage(app, 'gs://insite-hub-web-blog');
