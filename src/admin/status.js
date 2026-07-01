// Derive draft/review/published status from a stored doc (back-compat: older docs
// only have a `published` boolean).
export function statusOf(doc) {
  if (!doc) return 'draft';
  if (doc.status) return doc.status;
  return doc.published ? 'published' : 'draft';
}
