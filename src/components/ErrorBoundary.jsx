import { Component } from 'react';

// Catches render-time errors (e.g. a malformed doc, or a lazy chunk that failed)
// so one bad page shows a recoverable message instead of white-screening the site.
export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) {
    if (typeof console !== 'undefined') console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div>
          <h1 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: 24, fontWeight: 800, color: '#12141A', margin: '0 0 10px' }}>Something went wrong</h1>
          <p style={{ color: '#5C6370', margin: '0 0 20px' }}>Please reload the page to continue.</p>
          <button onClick={() => window.location.reload()}
            style={{ background: '#f5825f', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', font: 'inherit' }}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}
