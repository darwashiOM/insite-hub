// GA4 analytics. No-ops unless VITE_GA4_MEASUREMENT_ID is set, so dev/preview
// stay clean and the build works fine before the GA4 property exists.
// We send page_view manually on each route change (this is a client-rendered
// SPA), so automatic page_view is turned off in the config call below.
const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
// Optional Google Tag Manager container (set VITE_GTM_ID). Lets marketing add
// tracking/marketing tags later without a developer. GA4 + GTM can coexist.
const GTM_ID = import.meta.env.VITE_GTM_ID;

let started = false;

export function initAnalytics() {
  if (!GA_ID || started) return;
  started = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function initGtm() {
  if (!GTM_ID || window.__gtmStarted) return;
  window.__gtmStarted = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export function trackPageView(path, title) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(name, params = {}) {
  if (GA_ID && window.gtag) window.gtag('event', name, params);
  // Also surface the event on the dataLayer so a GTM container can act on it.
  if (GTM_ID && window.dataLayer) window.dataLayer.push({ event: name, ...params });
}

// Wrappers for the two key actions the CMS spec calls out (form submits + downloads).
export const trackLead = (formId, params = {}) => trackEvent('generate_lead', { form_id: formId, ...params });
export const trackDownload = (fileName, params = {}) => trackEvent('file_download', { file_name: fileName, ...params });
