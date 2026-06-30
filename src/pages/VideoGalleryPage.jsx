import { useState, useMemo, useEffect } from 'react';
import { usePublishedVideos, parseYouTubeId } from '../lib/videos';
import { setJsonLd } from '../lib/jsonLd';
import '../components/ArticleLayout.css';
import './VideoGalleryPage.css';

const ytThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const ytId = parseYouTubeId(video.videoUrl);
  const thumb = video.thumbnail || (ytId ? ytThumb(ytId) : '');
  return (
    <div className="vid-card">
      <div className="vid-frame">
        {playing ? (
          ytId ? (
            <iframe className="vid-embed" src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : video.videoUrl ? (
            <video className="vid-embed" src={video.videoUrl} controls autoPlay />
          ) : (
            <div className="vid-noembed">No video source set.</div>
          )
        ) : (
          <button className="vid-thumb" onClick={() => setPlaying(true)}
            style={thumb ? { backgroundImage: `url(${thumb})` } : undefined} aria-label={`Play ${video.title}`}>
            <span className="vid-play" aria-hidden="true">▶</span>
            {video.length && <span className="vid-length">{video.length}</span>}
          </button>
        )}
      </div>
      {video.topic && <p className="card-pillar">{video.topic}</p>}
      <p className="card-title">{video.title}</p>
      {video.description && <p className="vid-desc">{video.description}</p>}
      {video.transcript && (
        <details className="vid-transcript">
          <summary>Transcript</summary>
          <div>{video.transcript.split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>
        </details>
      )}
    </div>
  );
}

export default function VideoGalleryPage() {
  const { videos, loading, error } = usePublishedVideos();
  const [topic, setTopic] = useState('');

  const topics = useMemo(() => [...new Set(videos.map((v) => v.topic).filter(Boolean))].sort(), [videos]);
  const shown = useMemo(() => videos.filter((v) => !topic || v.topic === topic), [videos, topic]);

  // VideoObject structured data (AEO) — transcripts help these get quoted.
  useEffect(() => {
    if (!videos.length) { setJsonLd('ld-videos', null); return; }
    const graph = videos.map((v) => {
      const ytId = parseYouTubeId(v.videoUrl);
      const ld = { '@type': 'VideoObject', name: v.title };
      if (v.description) ld.description = v.description;
      const thumb = v.thumbnail || (ytId ? ytThumb(ytId) : null);
      if (thumb) ld.thumbnailUrl = thumb;
      if (ytId) ld.embedUrl = `https://www.youtube.com/embed/${ytId}`;
      else if (v.videoUrl) ld.contentUrl = v.videoUrl;
      if (v.transcript) ld.transcript = v.transcript;
      return ld;
    });
    setJsonLd('ld-videos', { '@context': 'https://schema.org', '@graph': graph });
    return () => setJsonLd('ld-videos', null);
  }, [videos]);

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow">Videos</p>
        <h1 className="blog-title">Watch &amp; learn</h1>
        <p className="blog-sub">Short, practical videos on AI in biopharma commercial learning — strategy, evidence, and the field.</p>

        {!loading && !error && topics.length > 1 && (
          <div className="blog-filters">
            <label className="blog-filter">
              <span>Topic</span>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="">All topics</option>
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </div>
        )}

        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : error ? (
          <p className="blog-sub">Couldn’t load videos. Please refresh.</p>
        ) : videos.length === 0 ? (
          <p className="blog-sub">No videos published yet — check back soon.</p>
        ) : shown.length === 0 ? (
          <p className="blog-sub">No videos match this topic.</p>
        ) : (
          <div className="vid-grid">
            {shown.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        )}
      </section>
    </div>
  );
}
