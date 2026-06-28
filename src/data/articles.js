/*
 * Blog article content, modeled as fields (title, author, date, summary,
 * TOC, body blocks, related) so the ArticleLayout component is reusable for
 * future articles. Body is an ordered list of blocks:
 *   { type: 'p', html }      paragraph (html allows <em>)
 *   { type: 'h2', id, text } section heading (id is the TOC anchor)
 *   { type: 'quote', text }  coral pull-quote
 */

export const readinessGap = {
  slug: 'the-readiness-gap',
  pillar: 'Methodology',
  title: 'The Readiness Gap: Why No Biopharma Leader Can Tell You If the Field Is Ready',
  description:
    "Biopharma teams measure training activity and assume it equals readiness. Here is why the two differ, why your tools can't close the gap, and what finally can.",
  author: {
    name: 'John Royer',
    role: 'Managing Partner & President, Proxa Labs',
    headshot: '/assets/blog/john-royer-headshot.jpg',
    bio: 'John spent twenty-five years inside biopharma commercial learning, including global commercial learning leadership at AstraZeneca, before founding Proxa Labs to help commercial organizations close the gap between AI ambition and field readiness. Proxa Labs is an advisory-first firm that diagnoses before it recommends.',
  },
  date: 'June 22, 2026',
  readTime: '7 min read',

  summary:
    '<strong>Intelligent Commercial Readiness</strong> is the discipline of ensuring a biopharma commercial organization&rsquo;s people are demonstrably capable of executing the business strategy, measured continuously and backed by evidence. Most learning functions measure activity instead: training delivered, modules completed, hours logged. Those numbers describe what was done to the field. They say nothing about whether the field can perform when a call goes off script. That distance is the readiness gap, and closing it is what turns training into readiness.',

  toc: [
    { id: 'activity', label: 'Activity is not readiness' },
    { id: 'what-icr', label: 'What ICR actually means' },
    { id: 'tools', label: "Why your tools can't close the gap" },
    { id: 'sawtooth', label: 'The sawtooth: competency decay' },
    { id: 'one-sentence', label: 'The one sentence no leader can say' },
  ],

  body: [
    { type: 'p', html: 'Every commercial leader in biopharma gets asked the same question, in one form or another. Is the field ready? Ready for the launch, the new indication, the harder payer conversation, the competitor&rsquo;s data. I have been asked it for twenty-five years, in different rooms, by chief commercial officers and brand leads and boards. In all that time I have watched capable, well-resourced leaders answer it the same way: with a confident tone and very little evidence underneath.' },
    { type: 'p', html: 'They can answer the questions next to it with precision. How much training was delivered. How many reps completed onboarding. The certification counts, the completion rates, the satisfaction scores, the hours logged. The commercial learning function is one of the most heavily instrumented parts of the business. Every one of those numbers measures activity, something done to or by the field. None of them measures whether the field can execute the strategy in front of a customer. We have spent decades optimizing the activity and trusting that enough of it adds up to readiness, with no way to check whether the trust is earned.' },

    { type: 'h2', id: 'activity', text: 'Activity Is Not Readiness' },
    { type: 'p', html: 'This is the gap that quietly governs everything else. Activity is what a rep did. Readiness is what a rep can do when the call goes somewhere unscripted. The two get treated as one thing because activity is measurable and readiness, until recently, was not. So completion became the stand-in. For thirty years, &ldquo;completed the module&rdquo; has been the closest thing the industry had to &ldquo;ready,&rdquo; and everyone in the room understood it was a proxy. We used it anyway, because it was the number we could get.' },
    { type: 'p', html: 'The cost of that substitution shows up later, where it is expensive. A field force that looked fully trained on the dashboard underperforms in the territory, and nobody can say why, because the system that declared them trained stopped watching the moment the program ended.' },

    { type: 'quote', text: 'Every commercial function is betting on readiness it cannot see. The launch, market access, medical affairs, all of it rests on a capability the organization has never been able to measure directly.' },

    { type: 'h2', id: 'what-icr', text: 'What Intelligent Commercial Readiness Actually Means' },
    { type: 'p', html: 'Categories in enterprise software usually begin as unnamed aches. Before anyone said &ldquo;CRM,&rdquo; companies knew they were losing track of customers and had no word for the fix. Commercial readiness sits at that same pre-naming moment, and the name it deserves is Intelligent Commercial Readiness.' },
    { type: 'p', html: 'It means one thing: the discipline of ensuring a commercial organization&rsquo;s people are demonstrably capable of executing what the strategy requires, measured continuously and backed by evidence. Each part of that definition does work. <em>Demonstrably capable</em> sets a behavioral bar, so the question moves from &ldquo;did they learn it&rdquo; to &ldquo;can they do it.&rdquo; <em>Executing what the strategy requires</em> ties readiness to the business rather than to a curriculum. <em>Continuously</em> treats capability as a signal the organization has to hold, since it decays the moment attention lapses. And <em>backed by evidence</em> is the part that has never been true before. Readiness has always been inferred from proxies and assumed. Now it can be measured.' },
    { type: 'p', html: 'It helps to be precise about what this is and what sits next to it. A learning management system answers what was assigned and completed, which is the proxy problem itself. A content platform supplies an input to readiness. Sales enablement equips the rep, and a well-equipped rep who still cannot perform has been equipped without being made ready. Each of those measures an input or an activity. Intelligent Commercial Readiness measures the outcome. That is the line between them, and it is a thick one.' },

    { type: 'h2', id: 'tools', text: "Why Your Current Tools Can't Close the Gap" },
    { type: 'p', html: 'If readiness is the goal, the fair question is why the existing toolset has never produced it. The industry is not short on good technology. There are strong content tools, mature learning platforms, sophisticated assessment products. The problem lives in how they are arranged.' },
    { type: 'p', html: 'The default arrangement is a stack. A content tool, a delivery platform, an assessment product, a credentialing system, each chosen as the best in its slice and wired together afterward. Every component optimizes for its own metric and exports a report. The readiness signal, the thing the business actually wants, falls into the spaces between the components, where no single tool owns it.' },
    { type: 'p', html: 'Picture the most valuable thing a learning system can find: the discovery, in assessment, that reps keep failing one specific objection. That finding points exactly to where readiness is breaking down. In a stack, it lands in a dashboard and stops there, because nothing connects an assessment result back to the content that should change in response. The next cohort fails the same objection, and the organization pays again to learn what it already knew. The architecture can re-measure the gap. It has no way to close it.' },
    { type: 'p', html: 'Integration does not solve this. Integration moves data forward faster. Closing the gap requires the system to act on the data, to route the discovery of a failure back to the thing that fixes it, and to do it without a person carrying the signal across by hand. There is a name for an arrangement built that way: a closed loop, where the output of the last stage becomes the input to the first. A system like that detects where the field is failing, regenerates the capability that addresses it, and checks whether the fix worked. That return path is the whole difference between cataloguing readiness gaps and closing them.' },

    { type: 'h2', id: 'sawtooth', text: 'The Sawtooth: Why Competency Decays' },
    { type: 'p', html: 'Even when a program works, the win tends to be temporary, and every commercial trainer knows the shape of it. A program lands beautifully. The reps are sharp, the role-plays crisp, the assessments strong. Ninety days later a quiet erosion has set in. The nuanced objection handling has flattened back to the script. The clinical depth has thinned. The field wore it down, and field conditions often reward the shortcut over the nuance, so the decay runs steeper exactly where it costs the most. The people who were ready in the training room are measurably less ready in the territory, and nothing flagged it, because measurement stopped when the program ended.' },
    { type: 'p', html: 'This is the open secret of commercial learning. It produces competency spikes and then watches them fade, and it calls the spike a success because the spike is the only thing it measures. Plotted across a year, the pattern is a sawtooth. A sharp rise during each program, a slow slide after, another program, another rise. Organizations spend heavily riding that sawtooth and mistake the peaks for the baseline, when the field&rsquo;s true operating capability, averaged across all the decay nobody sees, sits well below the post-program numbers.' },
    { type: 'p', html: 'Sustained competency is the alternative: capability held at a reliable level instead of spiked and left to fade. It needs three things the traditional model cannot supply. Continuous measurement, because you cannot sustain what you stop watching. Intervention triggered by decay, aimed at the specific person and skill that is slipping, at the moment it slips. And a definition of ready that moves as the strategy and the data move. Hold those three and the sawtooth flattens into a line kept near the bar the business actually requires.' },

    { type: 'quote', text: 'This share of the field is demonstrably ready for this launch, on this evidence, as of today. No biopharma leader has ever been able to say that sentence and mean it. That is the readiness gap, stated in one line.' },

    { type: 'h2', id: 'one-sentence', text: 'The One Sentence No Leader Has Been Able to Say' },
    { type: 'p', html: 'Put the three ideas together and they are one argument. Intelligent Commercial Readiness is the outcome the business has always wanted and never been able to see. The closed loop, the return path that sends a detected gap back to its own correction, is the architecture that can produce the outcome rather than document its absence. Sustained competency is what the outcome looks like over time: the flattened curve, the field held ready, the proof that it was real and not just another peak.' },
    { type: 'p', html: 'The payoff is that one sentence. This share of the field is demonstrably ready for this launch, on this evidence, as of today. It has never been sayable, because readiness has never been measurable, and readiness has never been measurable because the architecture had no way to connect knowing where the field was failing to fixing it.' },
    { type: 'p', html: 'There is a reason this lands now rather than five years ago. The market is saturated with AI strategy and starved for AI evidence. Most pharma AI pilots die in the meeting where someone asks what the pilot did for the business and the answer is a maturity framework. A readiness system built to close the loop is, underneath, an evidence engine. It produces the behavioral, traceable, defensible record that turns &ldquo;we deployed AI&rdquo; into &ldquo;here is what changed and how we know.&rdquo; In a market this crowded with strategy, evidence is the scarce thing.' },
    { type: 'p', html: 'For three decades the commercial learning industry has measured the activity and hoped it produced readiness. The hope was reasonable. It was simply uncheckable, because the tools to check it did not exist. They exist now. The organizations that see this first, that stop optimizing the activity and start running readiness as a measured, continuously sustained discipline, will be the ones who can answer the question every commercial leader is asked, and answer it with a number. Everyone else will still be measuring the activity and hoping.' },
    { type: 'p', html: 'If you cannot yet say that sentence about your own field, you are in the same position as nearly every leader I talk to, and that is where the work starts. It is the work Proxa Labs was built to do, beginning with a diagnosis before any recommendation.' },
  ],

  related: [
    { variant: 1, pillar: 'Methodology', title: 'The Readiness Number: What It Would Take to Trust It', meta: '6 min read', href: '#' },
    { variant: 2, pillar: 'Capability', title: 'The Sawtooth Problem, and Why Competency Won&rsquo;t Hold', meta: '5 min read', href: '#' },
    { variant: 3, pillar: 'Evidence', title: 'Why Every Pharma AI Pilot Dies in the Same Meeting', meta: '7 min read', href: '#' },
  ],
};
