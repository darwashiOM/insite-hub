import DOMPurify from 'dompurify';

// Sanitize admin-authored HTML before dangerouslySetInnerHTML (defense in depth —
// only an authenticated admin can write it, but never trust stored markup).
export const cleanHtml = (html) => ({ __html: DOMPurify.sanitize(html || '') });
