import { useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import './RichText.css';

const exec = (cmd, val) => document.execCommand(cmd, false, val);

// Pasting from Google Docs / Word keeps only the formatting we support (bold,
// italic, links, lists) and drops the font/span cruft — WordPress-style.
const cleanPaste = (e) => {
  e.preventDefault();
  const html = e.clipboardData.getData('text/html');
  if (html) {
    exec('insertHTML', DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'br'],
      ALLOWED_ATTR: ['href'],
    }));
  } else {
    exec('insertText', e.clipboardData.getData('text/plain'));
  }
};

// Minimal rich-text field (bold / italic / list / link) over a contentEditable,
// outputting HTML. Sanitized on render (DOMPurify) wherever it's shown. The value
// is applied on mount only, so typing never jumps the caret; the component
// remounts (via key) when you switch between items/blocks.
export default function RichText({ value, onChange, placeholder }) {
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
        onInput={emit} onPaste={(e) => { cleanPaste(e); emit(); }} data-placeholder={placeholder || ''} />
    </div>
  );
}
