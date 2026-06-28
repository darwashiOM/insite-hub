import { useState } from 'react';
import { adminLogin } from '../lib/adminBlog';

// Password gate. On success, the auth state flips and AdminPage swaps to the dashboard.
export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError('');
    try {
      await adminLogin(password);
      // AdminPage's auth listener will render the dashboard.
    } catch (err) {
      setError(err.message || 'Login failed.');
      setBusy(false);
    }
  };

  return (
    <div className="cms-admin">
      <div className="cms-login">
        <form className="cms-login-card" onSubmit={submit}>
          <h1>Proxa Labs Website Editor</h1>
          <p>Enter the password to edit the website.</p>
          {error && <p className="cms-err">{error}</p>}
          <div className="cms-field">
            <label htmlFor="cms-pw">Password</label>
            <input
              id="cms-pw"
              className="cms-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button className="cms-btn cms-btn-primary" type="submit" disabled={busy} style={{ width: '100%' }}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
