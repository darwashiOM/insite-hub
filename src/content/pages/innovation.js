/*
 * Editable-content fields for the Innovation Collective event landing page
 * (/innovation-collective). Private, no-index, invite-only. Defaults are the copy
 * from Mercy's handoff. The page renders an override when present, otherwise the
 * default — so it works with no overrides. Headshots + the report cover are image
 * fields so they can be swapped in the CMS without touching code.
 */
export default {
  label: 'Innovation Collective (event)',
  fields: [
    // Hero
    { key: 'hero.title', label: 'Hero heading', type: 'text',
      default: 'Attend the Proxa Labs Innovation Collective' },
    { key: 'hero.lede', label: 'Hero subheading', type: 'textarea',
      default: 'An exclusive, invitation-only working session on The State of AI in Commercial L&D for Life Sciences' },
    { key: 'hero.datetime', label: 'Hero date/time line', type: 'text',
      default: 'Wednesday, August 19, 2026 · 12:00–1:30 p.m. ET' },
    { key: 'hero.location', label: 'Hero location line', type: 'text',
      default: 'Princeton Innovation Center, Princeton, NJ' },
    { key: 'hero.lunchline', label: 'Hero lunch line', type: 'text', default: 'Lunch provided' },
    { key: 'hero.sponsorline', label: 'Hero sponsor line', type: 'text',
      default: 'Sponsored by the Proxa Labs AI Innovation Lab' },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text', default: 'Reserve your seat' },

    // Event intro
    { key: 'event.heading', label: 'Event heading', type: 'text', default: 'Exclusive, Invite-Only Event' },
    { key: 'event.p1', label: 'Event paragraph 1', type: 'textarea',
      default: 'The Innovation Collective is a working session for commercial learning and commercial excellence leaders in life sciences. You spend 90 minutes with peers who are working through the same AI questions you are.' },
    { key: 'event.p2', label: 'Event paragraph 2', type: 'textarea',
      default: `John Royer, Founder & Managing Partner, Proxa Labs, opens with this year's findings: where AI in commercial learning stands, why so many pilots stall, and what the organizations making real progress do differently. Then the room works on the problems you bring: compliance guardrails, pilots that actually scale, and doing more with less. You leave with answers you can use.` },
    { key: 'event.p3', label: 'Event paragraph 3', type: 'textarea',
      default: 'It fits inside a lunch. Arrive at 11:30, be back at your desk by 2. Seating is capped at 25, two per organization.' },
    { key: 'event.p3strong', label: 'Event paragraph 3 (emphasis)', type: 'text',
      default: 'Your invitation covers you and one colleague.' },

    // Value cards
    { key: 'value.heading', label: 'Value section heading', type: 'text', default: "Why You'll Want to Attend" },
    { key: 'value.0.title', label: 'Value card 1 — title', type: 'text',
      default: 'A room of peers facing the same AI pressures' },
    { key: 'value.0.body', label: 'Value card 1 — body', type: 'textarea',
      default: '90 minutes with a hand-picked group of commercial learning leaders under the same AI mandate you are. Attendance is capped at 25, two per organization, so every conversation stays candid and every voice is heard.' },
    { key: 'value.1.title', label: 'Value card 2 — title', type: 'text',
      default: 'Answers to the questions stalling your team' },
    { key: 'value.1.body', label: 'Value card 2 — body', type: 'textarea',
      default: `Bring the AI problems your organization hasn't solved for: which pilots to run, how to build regulated content, where to even start. Leave with direct, experience-backed answers from John Royer and your peers.` },
    { key: 'value.2.title', label: 'Value card 3 — title', type: 'text',
      default: `An exclusive AI report you can't get anywhere else` },
    { key: 'value.2.body', label: 'Value card 3 — body', type: 'textarea',
      default: 'Take home the printed The State of AI in Commercial L&D for Life Sciences (Executive Edition), built on proprietary AI readiness data from nearly 50 biopharma organizations. Yours when you attend the event.' },

    // Speakers
    { key: 'speakers.heading', label: 'Speakers heading', type: 'text', default: 'Presenter and Facilitators' },
    { key: 'speakers.0.name', label: 'Speaker 1 — name', type: 'text', default: 'John Royer, MS' },
    { key: 'speakers.0.company', label: 'Speaker 1 — company', type: 'text', default: 'Proxa Labs' },
    { key: 'speakers.0.photo', label: 'Speaker 1 — headshot', type: 'image', default: '/assets/innovation/john-royer.jpg' },
    { key: 'speakers.1.name', label: 'Speaker 2 — name', type: 'text', default: 'Bill Jacobs, MSIT, ID' },
    { key: 'speakers.1.company', label: 'Speaker 2 — company', type: 'text', default: 'Aimmune Therapeutics' },
    { key: 'speakers.1.photo', label: 'Speaker 2 — headshot', type: 'image', default: '/assets/innovation/bill-jacobs.jpg' },
    { key: 'speakers.2.name', label: 'Speaker 3 — name', type: 'text', default: 'Rich Waite, M.Ed.' },
    { key: 'speakers.2.company', label: 'Speaker 3 — company', type: 'text', default: 'Proxa Labs' },
    { key: 'speakers.2.photo', label: 'Speaker 3 — headshot', type: 'image', default: '/assets/innovation/rich-waite.jpg' },
    { key: 'bio.label', label: 'Bio callout — label', type: 'text', default: 'About John Royer' },
    { key: 'bio.text', label: 'Bio callout — text', type: 'textarea',
      default: `John Royer is Founder and Managing Partner of Proxa Labs. He started as an engineer at Bell Labs and has spent the 25 years since inside biopharma commercial learning, including senior roles at AstraZeneca, where his work earned the company's Vanguard Award. Last year he wrote the industry analysis on AI in commercial learning that one of the world's ten largest pharmaceutical companies still uses daily to steer its AI strategy. This year's findings on AI readiness and adoption across biopharma commercial organizations are built on the AI Readiness Maturity Model he designed, an assessment nearly 50 of those organizations have now completed. He presents this report because he did the work it describes, inside the companies it describes.` },

    // Details + agenda
    { key: 'details.heading', label: 'Details heading', type: 'text', default: 'Event Details and Tentative Agenda' },
    { key: 'details.whenValue', label: 'When — date', type: 'text', default: 'Wednesday, August 19, 2026' },
    { key: 'details.whenSub', label: 'When — sub', type: 'text', default: '12:00 p.m. to 1:30 p.m. ET (Arrival at 11:30 a.m.)' },
    { key: 'details.whereName', label: 'Where — venue name', type: 'text', default: 'Princeton Innovation Center BioLabs' },
    { key: 'details.whereAddr1', label: 'Where — address line 1', type: 'text', default: '303A College Road East' },
    { key: 'details.whereAddr2', label: 'Where — address line 2', type: 'text', default: 'Princeton, NJ' },
    { key: 'details.lunchNote', label: 'Lunch note', type: 'text', default: 'Lunch will be provided.' },
    { key: 'agenda.0.time', label: 'Agenda 1 — time', type: 'text', default: '11:30 a.m. – 12:00 p.m.' },
    { key: 'agenda.0.title', label: 'Agenda 1 — title', type: 'text', default: 'Arrival, lunch, and introductions' },
    { key: 'agenda.0.body', label: 'Agenda 1 — body', type: 'textarea',
      default: 'Lunch is served in the room, so grab a plate and settle in, get acquainted, and share the biggest AI challenge on your plate.' },
    { key: 'agenda.1.time', label: 'Agenda 2 — time', type: 'text', default: '12:00 – 12:45 p.m.' },
    { key: 'agenda.1.title', label: 'Agenda 2 — title', type: 'text',
      default: 'Interactive session: The State of AI in Commercial L&D for Life Sciences' },
    { key: 'agenda.1.body', label: 'Agenda 2 — body', type: 'textarea',
      default: `John Royer, Founder and Managing Partner, Proxa Labs presents this year's findings, from AI readiness data across the industry to where pilots fail and what separates the organizations moving fastest and most successfully.` },
    { key: 'agenda.2.time', label: 'Agenda 3 — time', type: 'text', default: '12:45 – 1:30 p.m.' },
    { key: 'agenda.2.title', label: 'Agenda 3 — title', type: 'text', default: 'Open Q&A and peer discussion' },
    { key: 'agenda.2.body', label: 'Agenda 3 — body', type: 'textarea',
      default: `Bring the questions you're wrestling with, whether that's which pilots to run, how to develop regulated content with AI, or how to get started at all.` },
    { key: 'agenda.3.time', label: 'Agenda 4 — time', type: 'text', default: 'After 1:30 p.m. · Optional' },
    { key: 'agenda.3.title', label: 'Agenda 4 — title', type: 'text', default: 'Stay and go deeper' },
    { key: 'agenda.3.body', label: 'Agenda 4 — body', type: 'textarea',
      default: 'Stick around for an informal conversation about the agentic AI tools Proxa Labs is building for commercial readiness.' },

    // Report
    { key: 'report.heading', label: 'Report heading', type: 'text',
      default: 'Get Your Copy of The State of AI in Commercial L&D for Life Sciences' },
    { key: 'report.intro', label: 'Report intro', type: 'textarea',
      default: 'Every attendee takes home the printed Executive Edition of the Proxa Labs 2026 report, The State of AI in Commercial L&D for Life Sciences, curated from more than 135 pages of original research and proprietary AI readiness data from nearly 50 biopharma organizations. It is not available for download, purchase, or email.' },
    { key: 'report.cover', label: 'Report cover image', type: 'image', default: '/assets/innovation/report-cover.jpg' },
    { key: 'report.lead', label: 'Report list lead', type: 'text', default: 'Inside the Executive Edition:' },
    { key: 'report.bullet0', label: 'Report bullet 1', type: 'textarea',
      default: 'The findings that matter — the analytics and business-impact gap, readiness versus adoption, system interoperability, AI literacy, and governance: the five themes deciding who moves and who stalls.' },
    { key: 'report.bullet1', label: 'Report bullet 2', type: 'textarea',
      default: 'A guided tour of the full 2026 report — section-by-section highlights so you know exactly where to dig deeper.' },
    { key: 'report.bullet2', label: 'Report bullet 3', type: 'textarea',
      default: 'Sample templates and tools — working materials drawn from the full report that you can put to use the week after.' },
    { key: 'report.cta', label: 'Report call-to-action note', type: 'textarea',
      default: 'Want to go further? The complete report is reserved for working sessions with the Proxa Labs team. Attendees can schedule time after the event to walk through the sections most relevant to their organization.' },

    // Reserve / form copy
    { key: 'reserve.heading', label: 'Reserve heading', type: 'text', default: 'Reserve Your Seat' },
    { key: 'reserve.intro', label: 'Reserve intro', type: 'textarea',
      default: 'Please complete the form below and watch for your confirmation via email. Seats are confirmed personally by our team. Bringing a colleague? Each attendee registers individually so we can confirm every seat.' },
    { key: 'form.note', label: 'Form note', type: 'textarea',
      default: `If your plans change, your seat may transfer to a colleague from your organization. Reply to your confirmation email and we'll handle it.` },
    { key: 'form.fineprint', label: 'Form fine print', type: 'textarea',
      default: 'No vendors, please. This session is reserved for industry practitioners; all registrations are reviewed and confirmed individually.' },
  ],
};
