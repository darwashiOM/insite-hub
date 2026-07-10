import { useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import './RichText.css';

const exec = (cmd, val) => document.execCommand(cmd, false, val);

// Pasting from Google Docs / Word keeps only the formatting we support (bold,
// italic, links, lists) and drops the font/span cruft — WordPress-style.
// Returns the pasted content as one html string per paragraph.
const pasteParts = (clip) => {
  const html = clip.getData('text/html');
  if (html) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'br'],
      ALLOWED_ATTR: ['href'],
    });
    const root = new DOMParser().parseFromString(clean, 'text/html').body;
    const parts = [];
    let buf = '';
    for (const node of [...root.childNodes]) {
      if (node.nodeName === 'P') {
        if (buf.trim()) parts.push(buf.trim());
        buf = '';
        if (node.innerHTML.trim()) parts.push(node.innerHTML.trim());
      } else {
        buf += node.outerHTML || node.textContent || '';
      }
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts;
  }
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return clip.getData('text/plain').split(/\n+/).map((t) => esc(t.trim())).filter(Boolean);
};

// Minimal rich-text field (bold / italic / list / link) over a contentEditable,
// outputting HTML. Sanitized on render (DOMPurify) wherever it's shown. The value
// is applied on mount only, so typing never jumps the caret; the component
// remounts (via key) when you switch between items/blocks.
export default function RichText({ value, onChange, placeholder, onSplitPaste }) {
  const ref = useRef(null);
  useEffect(() => {
    // Apply the value on mount + when it changes externally (e.g. a block reorder),
    // but never while the user is typing here (that would jump the caret).
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== (value || '')) el.innerHTML = value || '';
  }, [value]);
  const emit = () => onChange(ref.current ? ref.current.innerHTML : '');
  const btn = (label, run, title) => (
    <button type="button" className="richtext-btn" title={title}
      onMouseDown={(e) => { e.preventDefault(); run(); emit(); }}>{label}</button>
  );
  return (
    <div className="richtext">
      <div className="richtext-toolbar">
        {btn(<b>B</b>, () => exec('bold'), 'Bold')}
        {btn(<i>I</i>, () => exec('italic'), 'Italic')}
        {btn('• List', () => exec('insertUnorderedList'), 'Bulleted list')}
        {btn('Link', () => { const u = window.prompt('Link URL (https://…)'); if (u) exec('createLink', u); }, 'Add link')}
        {btn('Clear', () => exec('removeFormat'), 'Clear formatting')}
      </div>
      <div ref={ref} className="richtext-area cms-input" contentEditable suppressContentEditableWarning
        onInput={emit}
        onPaste={(e) => {
          e.preventDefault();
          const parts = pasteParts(e.clipboardData);
          if (parts.length > 1 && onSplitPaste) { onSplitPaste(parts); return; }
          exec('insertHTML', parts.join('<br><br>')); // single block: paragraphs become spaced lines
          emit();
        }} data-placeholder={placeholder || ''} />
    </div>
  );
}
