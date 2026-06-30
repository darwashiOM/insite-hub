import { useEffect } from 'react';
import { useForm } from '../lib/forms';
import CmsForm from '../components/CmsForm';
import '../components/ArticleLayout.css';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

// Hosted page for a CMS form at /forms/<slug>.
export default function CmsFormPage() {
  const { form, loading, error } = useForm(slugFromPath());

  useEffect(() => {
    if (form) {
      document.title = `${form.title || form.name} · Proxa Labs`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && form.intro) meta.content = form.intro;
    }
  }, [form]);

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : error ? (
          <p className="blog-sub">Couldn’t load this form. Please refresh.</p>
        ) : !form ? (
          <>
            <h1 className="blog-title">Form not found</h1>
            <p className="blog-sub">It may have moved or been unpublished.</p>
          </>
        ) : (
          <>
            <h1 className="blog-title">{form.title || form.name}</h1>
            {form.intro && <p className="blog-sub">{form.intro}</p>}
            <CmsForm form={form} />
          </>
        )}
      </section>
    </div>
  );
}
