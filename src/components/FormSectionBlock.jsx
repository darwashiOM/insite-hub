import { useForm } from '../lib/forms';
import CmsForm from './CmsForm';

// Embeds a CMS form (by slug) inside a built page — lets a marketer place a form
// on any landing page. Loads the public (stripped) form definition.
export default function FormSectionBlock({ slug, heading }) {
  const { form, loading, error } = useForm(slug || '');
  if (!slug) return null;
  return (
    <section className="shell" style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px' }}>
      {heading && <h2 className="t-display" style={{ marginBottom: 20 }}>{heading}</h2>}
      {loading ? <p style={{ color: '#8a94a0' }}>Loading…</p>
        : error || !form ? <p style={{ color: '#8a94a0' }}>This form isn’t available.</p>
          : <CmsForm form={form} />}
    </section>
  );
}
