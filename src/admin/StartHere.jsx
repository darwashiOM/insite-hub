// A plain-language "what do you want to do?" home so a non-technical editor can
// find any task without hunting through the tabs. Cards jump straight to the right
// tab. Admin-only areas are hidden for the editor role.
const groups = (isAdmin) => [
  {
    title: 'Write & publish',
    items: [
      { icon: '📝', label: 'Write a blog post', desc: 'Articles and thought leadership', tab: 'blog' },
      { icon: '📊', label: 'Add a case study', desc: 'Customer stories and results', tab: 'cs' },
      { icon: '🎥', label: 'Add a video', desc: 'Your filterable video library', tab: 'videos' },
    ],
  },
  {
    title: 'Your pages & menus',
    items: [
      isAdmin && { icon: '🏠', label: 'Edit your main pages', desc: 'Homepage, Platform, About and the other fixed pages', tab: 'pages' },
      { icon: '🧱', label: 'Build a new landing page', desc: 'Assemble a brand-new page from ready-made blocks', tab: 'landing' },
      isAdmin && { icon: '🧭', label: 'Change the top menu', desc: 'What appears in the navigation', tab: 'nav' },
      isAdmin && { icon: '🔀', label: 'Set up a redirect', desc: 'Forward an old link to a new one', tab: 'redirects' },
    ],
  },
  {
    title: 'Capture leads',
    items: [
      { icon: '📋', label: 'Create a form or gated download', desc: 'Contact forms and gated PDFs, plus submissions', tab: 'forms' },
    ],
  },
  {
    title: 'Library & extras',
    items: [
      { icon: '🖼️', label: 'Upload images & files', desc: 'Your media library', tab: 'media' },
      { icon: '✍️', label: 'Manage authors', desc: 'Blog and case-study bylines', tab: 'authors' },
      isAdmin && { icon: '🧩', label: 'Create a new content type', desc: 'e.g. Webinars, Press, Events — with your own fields', tab: 'types' },
      isAdmin && { icon: '🕓', label: 'See who changed what', desc: 'Activity history', tab: 'activity' },
    ],
  },
];

export default function StartHere({ go, isAdmin }) {
  return (
    <div className="cms-start">
      <p className="cms-start-lead">Welcome 👋 What would you like to do? Pick a task below — or use the tabs along the top anytime.</p>
      {groups(isAdmin).map((g) => {
        const items = g.items.filter(Boolean);
        if (!items.length) return null;
        return (
          <div className="cms-start-group" key={g.title}>
            <h2 className="cms-start-h">{g.title}</h2>
            <div className="cms-start-grid">
              {items.map((it) => (
                <button className="cms-start-card" key={it.label} onClick={() => go(it.tab)}>
                  <span className="cms-start-ico">{it.icon}</span>
                  <span className="cms-start-title">{it.label}</span>
                  <span className="cms-start-desc">{it.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
