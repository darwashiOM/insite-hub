import { useState } from 'react';
import { usePageContent } from '../lib/content';

/*
 * Innovation Collective — private, invite-only event landing (/innovation-collective).
 * No-index (registered in App's NOINDEX_PAGES), not in sitemap/nav/llms. Uses the
 * site's Nav + Footer (rendered by App) — the handoff's own topbar is dropped.
 * Copy + headshots + report cover are CMS-editable via usePageContent('innovation').
 * The registration form POSTs to submitEventRegistration, which emails Mercy for
 * manual review (nobody is auto-confirmed).
 */

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Princeton+Innovation+Center+BioLabs+303A+College+Road+East+Princeton+NJ';
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALUE_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3" /><line x1="12" y1="15" x2="12" y2="15.01" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg>,
];

const BLANK = {
  fullName: '', title: '', company: '', email: '', inviter: '', challenge: '',
  plusOne: '', colleagueName: '', colleagueEmail: '', onsite: false, _hp: '',
};

export default function InnovationCollectivePage() {
  const c = usePageContent('innovation');
  const [form, setForm] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const u = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => { const n = { ...er }; delete n[k]; return n; });
  };

  const scrollToReserve = (e) => {
    e.preventDefault();
    document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = () => {
    const er = {};
    if (!form.fullName.trim()) er.fullName = 'Enter your full name.';
    if (!form.title.trim()) er.title = 'Enter your title.';
    if (!form.company.trim()) er.company = 'Enter your company.';
    if (!emailRe.test(form.email.trim())) er.email = 'Enter a valid work email.';
    if (!form.inviter.trim()) er.inviter = 'Let us know who invited you.';
    if (!form.challenge.trim()) er.challenge = 'Share the challenge on your plate.';
    if (form.plusOne !== 'yes' && form.plusOne !== 'no') er.plusOne = 'Please choose one.';
    if (form.plusOne === 'yes') {
      if (!form.colleagueName.trim()) er.colleagueName = "Enter your colleague's name.";
      if (!emailRe.test(form.colleagueEmail.trim())) er.colleagueEmail = "Enter your colleague's work email.";
    }
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) document.getElementById(first === 'plusOne' ? 'ic-plusone-yes' : 'ic-' + first)?.focus();
    return Object.keys(er).length === 0;
  };

  const submit = async () => {
    if (status === 'sending') return;
    if (!validate()) return;
    setStatus('sending');
    try {
      const url = import.meta.env.VITE_EVENT_REGISTER_URL || '/api/event-register';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'innovation-collective',
          fullName: form.fullName.trim(),
          title: form.title.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          inviter: form.inviter.trim(),
          challenge: form.challenge.trim(),
          plusOne: form.plusOne,
          colleagueName: form.plusOne === 'yes' ? form.colleagueName.trim() : '',
          colleagueEmail: form.plusOne === 'yes' ? form.colleagueEmail.trim() : '',
          onsite: !!form.onsite,
          _hp: form._hp,
        }),
      });
      if (!res.ok) throw new Error('status ' + res.status);
      setStatus('done');
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      setStatus('error');
    }
  };

  const field = (key, label, opts = {}) => (
    <div className={'ic-field' + (opts.full ? ' full' : '') + (errors[key] ? ' err' : '')}>
      <label htmlFor={'ic-' + key}>{label}{opts.hint && <span className="ic-hint"> {opts.hint}</span>}</label>
      {opts.textarea
        ? <textarea id={'ic-' + key} value={form[key]} onChange={u(key)} />
        : <input id={'ic-' + key} type={opts.type || 'text'} autoComplete={opts.autoComplete} value={form[key]} onChange={u(key)} />}
      {errors[key] && <div className="ic-errmsg">{errors[key]}</div>}
    </div>
  );

  const firstName = form.fullName.trim().split(/\s+/)[0];

  return (
    <div className="ic-page">
      <header className="ic-hero">
        <div className="ic-wrap">
          <h1 className="ic-h1">{c('hero.title')}</h1>
          <p className="ic-lede">{c('hero.lede')}</p>
          <div className="ic-quickmeta">
            {c('hero.datetime')}<br />
            <strong><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{c('hero.location')}</a></strong>
          </div>
          <div className="ic-lunchline">{c('hero.lunchline')}</div>
          <div className="ic-sponsorline">{c('hero.sponsorline')}</div>
          <a className="ic-btn" href="#reserve" onClick={scrollToReserve}>{c('hero.ctaLabel')}</a>
        </div>
      </header>

      <section id="event" className="ic-section">
        <div className="ic-wrap">
          <h2 className="ic-h2">{c('event.heading')}</h2>
          <p>{c('event.p1')}</p>
          <p>{c('event.p2')}</p>
          <p>{c('event.p3')} <strong>{c('event.p3strong')}</strong></p>

          <h3 className="ic-h3">{c('value.heading')}</h3>
          <div className="ic-value-grid">
            {[0, 1, 2].map((i) => (
              <div className="ic-value-card" key={i}>
                <div className="ic-icon" aria-hidden="true">{VALUE_ICONS[i]}</div>
                <h4>{c(`value.${i}.title`)}</h4>
                <p>{c(`value.${i}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="speakers" className="ic-section">
        <div className="ic-wrap">
          <h2 className="ic-h2">{c('speakers.heading')}</h2>
          <div className="ic-speakers-grid">
            {[0, 1, 2].map((i) => (
              <div className="ic-speaker" key={i}>
                <div className="ic-speaker-photo-wrap"><img src={c(`speakers.${i}.photo`)} alt={c(`speakers.${i}.name`)} /></div>
                <div className="ic-speaker-name">{c(`speakers.${i}.name`)}</div>
                <div className="ic-speaker-co">{c(`speakers.${i}.company`)}</div>
              </div>
            ))}
          </div>
          <div className="ic-bio-callout">
            <div className="ic-bio-label">{c('bio.label')}</div>
            <p>{c('bio.text')}</p>
          </div>
        </div>
      </section>

      <section id="details" className="ic-section">
        <div className="ic-wrap">
          <h2 className="ic-h2">{c('details.heading')}</h2>
          <div className="ic-details-grid">
            <div className="ic-detail-card">
              <span className="ic-k">When</span>
              <div className="ic-v">{c('details.whenValue')}</div>
              <div className="ic-sub">{c('details.whenSub')}</div>
            </div>
            <div className="ic-detail-card">
              <span className="ic-k">Where</span>
              <div className="ic-v"><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{c('details.whereName')}</a></div>
              <div className="ic-sub">{c('details.whereAddr1')}<br />{c('details.whereAddr2')}</div>
            </div>
          </div>
          <div className="ic-lunch-note">{c('details.lunchNote')}</div>
          <ul className="ic-agenda">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>
                <span className="ic-time">{c(`agenda.${i}.time`)}</span>
                <div><h4>{c(`agenda.${i}.title`)}</h4><p>{c(`agenda.${i}.body`)}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="report" className="ic-section">
        <div className="ic-wrap">
          <h2 className="ic-h2">{c('report.heading')}</h2>
          <p className="ic-report-intro">{c('report.intro')}</p>
          <div className="ic-report-slice">
            <img className="ic-report-cover" src={c('report.cover')} alt="The State of AI in Commercial L&D for Life Sciences — Executive Edition cover" />
            <div className="ic-report-body">
              <p className="ic-report-lead">{c('report.lead')}</p>
              <ul>
                {[0, 1, 2].map((i) => <li key={i}>{c(`report.bullet${i}`)}</li>)}
              </ul>
              <p className="ic-report-cta">{c('report.cta')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reserve" className="ic-section">
        <div className="ic-wrap">
          <h2 className="ic-h2">{c('reserve.heading')}</h2>
          <p>{c('reserve.intro')}</p>

          {status === 'done' ? (
            <div className="ic-form-card ic-form-done">
              <div className="ic-done-check" aria-hidden="true">✓</div>
              <h3>Your request is in.</h3>
              <p>Thanks{firstName ? `, ${firstName}` : ''}. We review every registration personally and confirm each seat by email — watch your inbox.</p>
            </div>
          ) : (
            <div className="ic-form-card">
              <div className="ic-form-grid">
                {field('fullName', 'Full name', { autoComplete: 'name' })}
                {field('title', 'Title', { autoComplete: 'organization-title' })}
                {field('company', 'Company', { autoComplete: 'organization' })}
                {field('email', 'Work email', { type: 'email', autoComplete: 'email' })}
                {field('inviter', 'Who extended your invitation?', { full: true })}
                {field('challenge', 'What is the biggest AI challenge on your plate right now?', { full: true, textarea: true, hint: 'Your answer helps shape the session.' })}

                <div className={'ic-field full' + (errors.plusOne ? ' err' : '')}>
                  <label>Will you bring a colleague?</label>
                  <div className="ic-radio-row">
                    <label><input id="ic-plusone-yes" type="radio" name="plusone" value="yes" checked={form.plusOne === 'yes'} onChange={u('plusOne')} /> Yes</label>
                    <label><input type="radio" name="plusone" value="no" checked={form.plusOne === 'no'} onChange={u('plusOne')} /> No, just me</label>
                  </div>
                  {errors.plusOne && <div className="ic-errmsg">{errors.plusOne}</div>}
                </div>

                {form.plusOne === 'yes' && (
                  <div className="ic-plusone-fields">
                    {field('colleagueName', "Colleague's name", { hint: 'Please have your colleague complete their own registration as well.' })}
                    {field('colleagueEmail', "Colleague's work email", { type: 'email', hint: 'So we can confirm their seat directly.' })}
                  </div>
                )}

                <div className="ic-checkbox-row">
                  <input id="ic-onsite" type="checkbox" checked={form.onsite} onChange={u('onsite')} />
                  <label htmlFor="ic-onsite">Can't make this date? Check here if you'd like us to bring this session to your team on site, and we'll reach out directly.</label>
                </div>

                {/* honeypot — hidden from real users */}
                <input className="ic-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form._hp} onChange={u('_hp')} />
              </div>

              {status === 'error' && (
                <p className="ic-form-error">Something went wrong sending your request. Please try again in a moment.</p>
              )}
              <button className="ic-btn ic-btn-block" type="button" onClick={submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Request my seat'}
              </button>
              <p className="ic-form-note">{c('form.note')}</p>
              <p className="ic-form-fineprint">{c('form.fineprint')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
