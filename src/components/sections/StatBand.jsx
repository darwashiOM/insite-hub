export default function StatBand({ stats, tone = 'dark' }) {
  return (
    <section className={tone === 'dark' ? 'stat-band stat-band-dark' : 'stat-band stat-band-light'}>
      <div className="stat-band-row">
        {stats.map(s => (
          <div key={s.n} className="stat-band-stat">
            <div className="stat-band-n">{s.n}</div>
            <div className="stat-band-l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
