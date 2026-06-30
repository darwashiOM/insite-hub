import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { app, USING_EMULATOR } from './firebase';

// Admin-only: imported solely by the (code-split) admin chunk, so Firebase Auth
// and Storage don't ship in the public bundle.
export const auth = getAuth(app);
// Blog images live in a dedicated Firebase-linked bucket.
export const storage = getStorage(app, 'gs://insite-hub-web-blog');

if (USING_EMULATOR) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}
