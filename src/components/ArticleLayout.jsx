import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import Breadcrumbs from './Breadcrumbs';
import './ArticleLayout.css';

const SYMBOL = '/assets/blog/proxa-symbol.png';
const QUOTE_BARS = '/assets/blog/quote-bars.png';

// Sanitize admin-authored HTML before it hits dangerouslySetInnerHTML (defense in
// depth — strips <script>, event handlers, javascript: URLs, etc.).
const clean = (html) => ({ __html: DOMPurify.sanitize(html || '') });

/*
 * Reusable Proxa Labs blog article page. Renders from an `article` data object
 * (see src/data/articles.js). The site's Nav/Footer wrap this automatically via
 * App.jsx, so only the article body lives here.
 *
 * Ported behaviors from the mock: reading-progress bar, scrollspy TOC
 * (IntersectionObserver), LinkedIn + copy-link share. Mobile TOC is a native
 * <details> accordion (no JS).
 */
export default function ArticleLayout({ article, setPage }) {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bar = root.querySelector('.progress');
    const onScroll = () => {
      const h = document.documentElement;
      const s = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
      if (bar) bar.style.width = Math.max(0, Math.min(1, s)) * 100 + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const links = [...root.querySelectorAll('#toc a')];
    let obs;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const id = e.target.id;
              links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      links.forEach((a) => {
        const sec = document.getElementById(a.getAttribute('href').slice(1));
        if (sec) obs.observe(sec);
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (obs) obs.disconnect();
    };
  }, [article]);

  const copyLink = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const shareLinkedIn = () => {
    const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href);
    window.open(url, '_blank', 'noopener');
  };

  const { author } = article;
  const hideAuthor = article.hideAuthor === true;
  const bylineMeta = (hideAuthor ? [article.date, article.readTime] : [author.role, article.date, article.readTime]).filter(Boolean);
  const related = (article.related || []).filter((c) => c.href && c.href !== '#');

  return (
    <div className="proxa-article" ref={rootRef}>
      <div className="progress" aria-hidden="true" />

      {/* HERO */}
      <section className="shell">
        <div className="pa-hero">
          <div className="hero-content">
            <Breadcrumbs go={setPage} items={[
              { name: 'Home', page: 'home' },
              { name: 'Blog', page: 'blog' },
            ]} />
            <p className="eyebrow"><img src={SYMBOL} alt="Proxa Labs" />{article.pillar}</p>
            <h1>{article.title}</h1>
            <div className="byline">
              {!hideAuthor && <span className="b-name">{author.name}</span>}
              <span className="b-rest">
                {bylineMeta.map((part, i) => (
                  <span key={i}>{i > 0 && <span className="sep">&bull;</span>}{part}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {article.showHero && article.thumb && (
        <section className="shell">
          <figure className="pa-hero-img"><img src={article.thumb} alt={article.title || ''} /></figure>
        </section>
      )}

      <div className="shell layout">
        <article className="col-main">
          {!!(article.summary || '').trim() && article.hideSummary !== true && (
            <div className="summary">
              <p className="summary-kicker">Article summary</p>
              <p dangerouslySetInnerHTML={clean(article.summary)} />
            </div>
          )}

          <div className="toc-mobile">
            <details>
              <summary>In this article</summary>
              <ol>
                {article.toc.map((t) => (
                  <li key={t.id}><a href={'#' + t.id}>{t.label}</a></li>
                ))}
              </ol>
            </details>
          </div>

          <div className="prose">
            {article.body.map((b, i) => {
              if (b.type === 'h2') {
                const Tag = b.level === 3 ? 'h3' : b.level === 4 ? 'h4' : 'h2';
                return <Tag key={i} id={b.id}>{b.text}</Tag>;
              }
              if (b.type === 'quote') {
                return (
                  <blockquote key={i} className="pull">
                    <img className="pmark" src={QUOTE_BARS} alt="" />
                    <p>{b.text}</p>
                  </blockquote>
                );
              }
              if (b.type === 'image') {
                if (!b.src) return null;
                return (
                  <figure key={i} className="body-img">
                    <img src={b.src} alt={b.alt || ''} loading="lazy" />
                    {b.caption && <figcaption>{b.caption}</figcaption>}
                  </figure>
                );
              }
              if (b.type === 'takeaways') {
                if (!(b.items || []).length) return null;
                return (
                  <aside key={i} className="takeaways">
                    <p className="takeaways-h">Key takeaways</p>
                    <ul>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
                  </aside>
                );
              }
              if (b.type === 'faq') {
                if (!(b.items || []).length) return null;
                return (
                  <section key={i} className="article-faq">
                    {b.items.map((f, j) => (
                      <div key={j} className="article-faq-item">
                        <h3>{f.q}</h3>
                        <p>{f.a}</p>
                      </div>
                    ))}
                  </section>
                );
              }
              return <p key={i} dangerouslySetInnerHTML={clean(b.html)} />;
            })}
          </div>

          <div className="endmark"><img src={SYMBOL} alt="Proxa Labs" /></div>

          {!hideAuthor && !!(author.name || '').trim() && (
            <div className="biocard">
              {author.headshot && <img className="headshot" src={author.headshot} alt={author.name} />}
              <div>
                <p className="bio-name">{author.name}</p>
                <p className="bio-role">{author.role}</p>
                <p className="bio-text">{author.bio}</p>
              </div>
            </div>
          )}
        </article>

        <aside className="sidebar">
          <ul className="toc" id="toc">
            {article.toc.map((t) => (
              <li key={t.id}><a href={'#' + t.id}>{t.label}</a></li>
            ))}
          </ul>
          <div className="share">
            <p className="share-label">Share</p>
            <div className="share-row">
              <button aria-label="Share on LinkedIn" title="Share on LinkedIn" onClick={shareLinkedIn}>
                <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z"/></svg>
              </button>
              <button aria-label={copied ? 'Link copied' : 'Copy link'} title={copied ? 'Copied!' : 'Copy link'} onClick={copyLink}>
                <svg viewBox="0 0 24 24"><path d="M9.5 13.5a3.5 3.5 0 005 0l3-3a3.54 3.54 0 00-5-5l-1.2 1.2 1.4 1.4 1.2-1.2a1.54 1.54 0 012.2 2.2l-3 3a1.5 1.5 0 01-2.2 0zm5-3a3.5 3.5 0 00-5 0l-3 3a3.54 3.54 0 005 5l1.2-1.2-1.4-1.4-1.2 1.2a1.54 1.54 0 01-2.2-2.2l3-3a1.5 1.5 0 012.2 0z"/></svg>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related — shown only when the article has related links */}
      {related.length > 0 && (
      <section className="shell related">
        <h3 className="related-head">Keep reading</h3>
        <div className="cards">
          {related.map((c) => (
            <a key={c.title} className={'card card-' + c.variant} href={c.href}>
              <div className="card-img" />
              <p className="card-pillar">{c.pillar}</p>
              <p className="card-title" dangerouslySetInnerHTML={clean(c.title)} />
              <p className="card-meta">{c.meta}</p>
            </a>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
