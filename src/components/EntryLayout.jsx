import Breadcrumbs from './Breadcrumbs';
import { cleanHtml } from '../lib/sanitize';
import './ArticleLayout.css';
import './EntryLayout.css';

function FieldValue({ field, value }) {
  switch (field.type) {
    case 'richtext': return <div className="entry-rt" dangerouslySetInnerHTML={cleanHtml(value)} />;
    case 'textarea': return <div>{String(value).split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>;
    case 'image': return <img src={value} alt="" style={{ maxWidth: '100%', borderRadius: 12, display: 'block' }} />;
    case 'boolean': return <p>{value ? 'Yes' : 'No'}</p>;
    case 'url': return <p><a href={value} target="_blank" rel="noopener noreferrer">{value}</a></p>;
    case 'date': { const d = Date.parse(value); return <p>{Number.isNaN(d) ? value : new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>; }
    default: return <p>{String(value)}</p>;
  }
}

// Presentational detail view for a custom content-type entry. Shared by the public
// page and the editor preview.
export default function EntryLayout({ type, entry, setPage }) {
  const fields = (type && type.fields) || [];
  const values = entry.values || {};
  return (
    <div className="proxa-article">
      <section className="shell blog-index" style={{ maxWidth: 760 }}>
        <Breadcrumbs go={setPage} items={[
          { name: 'Home', page: 'home' },
          { name: (type && (type.listTitle || type.label)) || 'Content', page: type && type.key },
          { name: entry.title || 'Entry' },
        ]} />
        <h1 className="blog-title">{entry.title}</h1>
        {entry.summary && <p className="blog-sub">{entry.summary}</p>}
        {fields.map((f) => {
          const v = values[f.key];
          if (v == null || v === '' || v === false) return null;
          return (
            <div key={f.key} style={{ marginTop: 26 }}>
              {f.type !== 'image' && <h2 className="t-h2" style={{ fontSize: '1.15rem', marginBottom: 8 }}>{f.label}</h2>}
              <FieldValue field={f} value={v} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
