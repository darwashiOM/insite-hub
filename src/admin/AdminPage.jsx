import { useEffect, useState } from 'react';
import './admin.css';
import { onAdminAuth, adminLogout } from '../lib/adminBlog';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// Entry for /noonewillfindthis. Shows the login gate until an admin session
// exists, then the dashboard. (noindex is applied by App.jsx.)
export default function AdminPage() {
  const [authed, setAuthed] = useState(null); // null = still checking

  useEffect(() => {
    document.title = 'CMS · Proxa Labs';
    return onAdminAuth(setAuthed);
  }, []);

  if (authed === null) {
    return <div className="cms-admin"><div className="cms-center">Loading…</div></div>;
  }
  if (!authed) return <AdminLogin />;
  return <AdminDashboard onLogout={adminLogout} />;
}
