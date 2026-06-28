// Shown for unrecognized paths instead of silently rendering the homepage.
export default function NotFoundPage({ setPage }) {
  return (
    <section className="section section-light" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div className="mw">
        <p className="ey">404</p>
        <h1 className="h2">Page not found</h1>
        <p style={{ color: 'var(--bd)', maxWidth: 460, margin: '0 auto 24px' }}>
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <button className="bp" onClick={() => setPage('home')}>Back to home</button>
      </div>
    </section>
  );
}
