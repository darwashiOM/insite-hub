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

  if (auth === null) {
    return <div className="cms-admin"><div className="cms-center">Loading…</div></div>;
  }
  if (!auth.loggedIn) return <AdminLogin />;
  return <AdminDashboard role={auth.role} onLogout={adminLogout} />;
}
