import './Breadcrumbs.css';

// Visible breadcrumb trail (Home › Section › Page). `items` = [{ name, page? }];
// the last item is the current page and isn't a link. `go(page)` navigates.
export default function Breadcrumbs({ items, go }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span className="crumb" key={i}>
            {last || !it.page
              ? <span className="crumb-current" aria-current="page">{it.name}</span>
              : <button className="crumb-link" onClick={() => go?.(it.page)}>{it.name}</button>}
            {!last && <span className="crumb-sep" aria-hidden="true">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
