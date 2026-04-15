import { useState } from 'react';

const NewsletterInline = ({ buttonLabel = "Subscribe", placeholder = "your@company.com", onSuccess }) => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_FUNCTION_URL || '/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubbed(true);
        onSuccess?.();
      } else {
        setError(data.error || 'Something went wrong. Try again.');
      }
    } catch (e) {
      setError('Something went wrong. Try again.');
    } finally {
      setSending(false);
    }
  };

  if (subbed) {
    return <div style={{ fontSize: 13, color: "#34D399", fontWeight: 600 }}>✓ You're subscribed. We'll be in touch.</div>;
  }

  return (
    <div>
      <div className="fn-wrap">
        <input className="fn-in" placeholder={placeholder} value={email} onChange={e => setEmail(e.target.value)} />
        <button className="fn-btn" onClick={submit} disabled={sending}>{sending ? "..." : buttonLabel}</button>
      </div>
      {error && <div style={{ fontSize: 12, color: "#FCA5A5", marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default NewsletterInline;
