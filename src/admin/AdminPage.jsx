import { useEffect, useState } from 'react';
import './admin.css';
import { onAdminAuth, adminLogout } from '../lib/adminBlog';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// Entry for /noonewillfindthis. Shows the login gate until an admin session
// exists, then the dashboard. (noindex is applied by App.jsx.)
export default function AdminPage() {
  const [auth, setAuth] = useState(null); // null = still checking; else { loggedIn, role }

  useEffect(() => {
    document.title = 'Website Editor · Proxa Labs';
    return onAdminAuth(setAuth);
  }, []);

  // Accessibility: associate every editor field's <label> with its input so screen
  // readers announce them. Covers current + dynamically-added fields; skips labels
  // that already wrap their control (the checkbox rows). One place instead of
  // touching ~90 fields by hand.
  useEffect(() => {
    let n = 0;
    const associate = () => {
      document.querySelectorAll('.cms-admin .cms-field').forEach((field) => {
        const label = field.querySelector(':scope > label');
        const input = field.querySelector('input, textarea, select');
        if (!label || !input) return;
        if (label.querySelector('input, textarea, select')) return; // wrapping label — already associated
        if (!input.id) input.id = `cmsfld-${n++}`;
        if (!label.htmlFor) label.htmlFor = input.id;
      });
    };
    associate();
    const obs = new MutationObserver(associate);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  if (auth === null) {
    return <div className="cms-admin"><div className="cms-center">Loading…</div></div>;
  }
  if (!auth.loggedIn) return <AdminLogin />;
  return <AdminDashboard role={auth.role} onLogout={adminLogout} />;
}
