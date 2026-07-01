import { useState } from 'react';

// One plain-language line above Save that says exactly what will happen —
// so publish-vs-schedule-vs-draft never surprises anyone.
export default function PublishSummary({ status, publishAt }) {
  // snapshot once — only used to flag an already-past schedule time
  const [now] = useState(() => Date.now());
  const scheduledMs = (status !== 'published' && publishAt) ? Date.parse(publishAt) : NaN;
  const scheduled = !Number.isNaN(scheduledMs);
  let line;
  if (status === 'published') line = 'Saving will publish this — it goes live immediately.';
  else if (scheduled) {
    const when = new Date(scheduledMs).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    line = `Saving will schedule this to go live ${when}.`;
  } else if (status === 'review') line = 'Saving marks this ready for review — not on the live site yet.';
  else line = 'Saving keeps this a draft — not visible on the live site.';
  return (
    <div className="cms-publish-summary">
      <span>{line}</span>
      {scheduled && scheduledMs < now && (
        <span className="cms-publish-past"> ⚠ That time has already passed — it will go live within the hour after you save.</span>
      )}
    </div>
  );
}
