import './Breadcrumbs.css';

// Visible breadcrumb trail (Home › Section › Page). `items` = [{ name, page? }];
// items with a `page` are links, ones without (the current page) are plain text.
// `go(page)` navigates.
export default function Breadcrumbs({ items, go }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span className="crumb" key={i}>
            {it.page && go
              ? <button className="crumb-link" onClick={() => go(it.page)}>{it.name}</button>
              : <span className="crumb-current" aria-current="page">{it.name}</span>}
            {!last && <span className="crumb-sep" aria-hidden="true">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
