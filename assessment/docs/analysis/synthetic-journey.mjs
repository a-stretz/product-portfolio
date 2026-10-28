// Synthetic journey runner
// ---------------------------------------------------------------------------
// Runs one synthetic company through the real assessment engine at a series of
// checkpoints. Between checkpoints, the company does work. Each piece of work
// changes specific answers. The engine then scores the new answers.
//
//   node assessment/docs/analysis/synthetic-journey.mjs            # summary + checks
//   node assessment/docs/analysis/synthetic-journey.mjs --markdown # journey section for the doc
//
// The design is described in docs/AI-Readiness-Synthetic-Journey-v1.0.md.
// No dependencies. Deterministic.
// ---------------------------------------------------------------------------

import { DIAGNOSTICS } from '../../src/data/diagnostics.js'
import { inferDiagnosticScore, calculateReadinessScore, getReadinessBand } from '../../src/logic/scoring.js'
import { selectInterventionPath } from '../../src/logic/pathing.js'
import { INTERVENTION_PATHS } from '../../src/data/interventionPaths.js'

const SECTIONS = DIAGNOSTICS.map(d => d.id)
const FACTOR = Object.fromEntries(DIAGNOSTICS.flatMap(d => d.factorGroups.flatMap(g => g.factors.map(f => [f.id, { ...f, section: d.id }]))))
const AREA_NAME = {
  leadership: 'Leadership', workflow: 'Workflows', data: 'Data', user: 'People & Trust',
  execution: 'Technical Ability', governance: 'Oversight', measurement: 'Measurement', sora: 'Storing → Doing',
}
const PATH_NAME = Object.fromEntries(INTERVENTION_PATHS.map(p => [p.number, p.title]))

// ---------------------------------------------------------------------------
// COMPANY PROFILE
// ---------------------------------------------------------------------------
export const COMPANY = {
  name: 'Northline Field Services',
  note: 'Fictional company. Any match to a real company is accidental.',
  type: 'services_plus_software',
  summary: [
    'Northline sells scheduling and job-tracking software to about 1,400 heating, cooling and plumbing contractors.',
    'It also runs an after-hours call center. The call center books emergency jobs for those contractors.',
    'The company has 180 employees: 22 engineers, 38 dispatchers and call agents, and sales, support and finance teams.',
    'A growth investor owns a majority stake. The investor asked for an AI plan after a competitor announced an "AI dispatcher".',
  ],
}

// ---------------------------------------------------------------------------
// BASELINE ANSWERS (Month 0). One answer per question, 67 in total.
// ---------------------------------------------------------------------------
export const BASELINE = {
  // Leadership
  l1: 'no', l2: 'yes', l3: 'yes', l4: 'no', l5: 'no', l6: 'no', l7: 1, l8: 1, l9: 1,
  // Workflows
  w1: 'no', w2: 'no', w3: 'no', w4: 'no', w5: 'no', w6: 'no', w7: 'no', w8: 1, w9: 2,
  // Data
  d1: 'no', d2: 'yes', d3: 'yes', d4: 'no', d5: 2, d6: 2, d7: 1, d8: 'no', d9: 'no', d10: 'no',
  // People & Trust
  u1: 'no', u2: 'yes', u3: 'no', u4: 'no', u5: 'no', u6: 5, u7: 1, u8: 2,
  // Technical Ability
  e1: 'no', e2: 'yes', e3: 'no', e4: 'no', e5: 'no', e6: 2, e7: 1, e8: 2, e9: 1,
  // Oversight
  g1: 'no', g2: 'yes', g3: 'no', g4: 'no', g5: 'no', g6: 'no', g7: 1, g8: 1,
  // Measurement
  m1: 'no', m2: 'no', m3: 'yes', m4: 'no', m5: 'no', m6: 2, m7: 1,
  // Storing → Doing
  s1: 'yes', s2: 'yes', s3: 'no', s4: 'no', s5: 1, s6: 1, s7: 1,
}

// ---------------------------------------------------------------------------
// JOURNEY. Each step = one assessment checkpoint.
//   work.source: 'play'   = a play from the path the last assessment recommended
//                'unlock' = work on the unlock conditions of that path
//   events.kind: 'event'       = something outside the plan (setback, incident)
//                'side-effect' = an unplanned result of planned work
// ---------------------------------------------------------------------------
export const STEPS = [
  {
    month: 0,
    title: 'The first assessment',
    meaning: 'Every area is weak except Technical Ability. That area is Partial, because the company has good software engineers and does not depend on outside vendors. The index is 5. All four deal-breakers are on. The tool recommends Path 1: align leadership before any technical work.',
    situation: [
      'The investor asks for an AI plan. The CEO asks an outside operator to assess the company.',
      'Three teams test a public chat tool on their own. Nobody owns AI.',
      'Four senior dispatchers know how dispatch works. Nothing is written down.',
      'Call agents type bookings into shared spreadsheets. Technicians fill in paper job tickets.',
    ],
    work: [],
    events: [],
  },
  {
    month: 3,
    title: 'Leadership agrees on why, who and what',
    meaning: 'Leadership is now Strong. Nothing else changed much, so the index is only 15. This is normal. Path 1 work is decisions, and decisions do not change workflows or data. The path moves to 2, because Workflows and Data are still weak.',
    situation: [
      'The company starts Path 1. The leadership team has a two-day workshop with the operator.',
    ],
    work: [
      { path: 1, source: 'play', what: 'The CEO named the COO as the executive owner of AI.', changes: { l1: 'yes', l2: 'no' } },
      { path: 1, source: 'play', what: 'The team stopped the three separate chat-tool tests and put them under one steering group that meets every month.', changes: { l3: 'no', l7: 3 } },
      { path: 1, source: 'play', what: 'Leadership chose three priority workflows: after-hours emergency booking, daily dispatch scheduling, and unpaid-invoice follow-up.', changes: { l4: 'yes' } },
      { path: 1, source: 'play', what: 'The COO wrote a four-page business case and presented it at the all-hands meeting.', changes: { l5: 'yes', l9: 3, m3: 'no', m7: 2 } },
      { path: 1, source: 'play', what: 'Leadership drafted success targets, for example "book an emergency job in under 5 minutes". Finance did not accept the targets yet, because nobody had measured the current numbers.', changes: { l8: 2 } },
      { path: 1, source: 'play', what: 'The steering group published a one-page AI use policy: no customer data goes into public chat tools.', changes: { g8: 2 } },
    ],
    events: [],
  },
  {
    month: 6,
    title: 'The company maps its work and finds its data',
    meaning: 'Workflows and Measurement are now Strong. Data is Partial, because many technicians still use paper tickets. The index more than doubled, from 15 to 37, but the path stays at 2. The tool says: finish the data work before any AI pilot.',
    situation: [
      'The company starts Path 2. The operator runs mapping workshops with dispatchers, call agents and the billing team.',
    ],
    work: [
      { path: 2, source: 'play', what: 'Dispatchers and call agents mapped the three priority workflows on a wall with sticky notes. An analyst drew the final maps in a diagram tool.', changes: { w1: 'yes', w6: 'yes', w7: 'yes', w8: 3 } },
      { path: 2, source: 'play', what: 'The workshops found 11 types of exception, for example "no heat, tenant calls but landlord pays" and "technician sick, job must move".', changes: { w2: 'yes' } },
      { path: 2, source: 'play', what: 'The CEO named the Dispatch Operations Lead as the owner of the dispatch and after-hours booking workflows.', changes: { w5: 'yes', w9: 3 } },
      { path: 2, source: 'play', what: 'A data audit found three different "sources of truth" for bookings. Call agents now enter bookings in the product booking form, not in spreadsheets.', changes: { d1: 'yes', d2: 'no', d5: 3, d6: 3, d9: 'yes' } },
      { path: 2, source: 'play', what: 'The team measured the baseline. Booking an emergency job took 9.2 minutes. Agents missed 18% of after-hours calls. Technicians fixed 71% of jobs on the first visit.', changes: { m1: 'yes', m6: 3 } },
      { path: 2, source: 'play', what: 'A weekly KPI review now tracks these numbers on a dashboard.', changes: { m2: 'yes', m5: 'yes' } },
      { path: 2, source: 'play', what: 'The engineering team added an automated build and test pipeline before the cloud move.', changes: { e6: 3 } },
    ],
    events: [
      { kind: 'side-effect', what: 'Dispatchers took part in the workshops. Their fear of replacement went down.', changes: { u6: 4, u7: 2 } },
    ],
  },
  {
    month: 9,
    title: 'Paper goes away and the targets become official',
    meaning: 'Data is now Strong. Leadership is Advanced, because finance accepted the targets. The path moves to 3. Technical Ability and Oversight are still weak, so the tool allows a supervised pilot, but not a redesign.',
    situation: [
      'Path 2 continues. Data is still the weakest foundation, so the company stays on data work.',
    ],
    work: [
      { path: 2, source: 'play', what: 'All 140 technicians moved to the mobile app. The company stopped paper job tickets and scanned two years of old tickets.', changes: { d3: 'no' } },
      { path: 2, source: 'play', what: 'Engineers connected the product database to the accounting system, so invoices and jobs now match automatically.', changes: { d4: 'yes' } },
      { path: 2, source: 'play', what: 'The booking form now requires address, equipment type and urgency.', changes: { d5: 4 } },
      { path: 2, source: 'play', what: 'An analyst started to tag two years of job records with fault codes.', changes: { d7: 2 } },
      { path: 2, source: 'play', what: 'Finance accepted the success targets, because the baseline now exists.', changes: { l6: 'yes', l8: 3 } },
      { path: 2, source: 'unlock', what: 'The product moved to a cloud platform.', changes: { e5: 'yes', e7: 2 } },
      { path: 2, source: 'unlock', what: 'The board approved a budget to hire a machine-learning engineer.', changes: {} },
      { path: 2, source: 'unlock', what: 'The company gave one support manager the job of change lead for AI work.', changes: { u8: 3 } },
    ],
    events: [
      { kind: 'side-effect', what: 'The new dashboards showed agents where calls were lost. Trust in the program went up.', changes: { u6: 3 } },
      { kind: 'side-effect', what: 'The open job for a machine-learning engineer makes the question "AI talent is planned but not yet hired" true. The Technical Ability score goes down a little until the person starts.', changes: { e4: 'yes' } },
    ],
  },
  {
    month: 12,
    title: 'The first AI pilot goes live, with a human check',
    meaning: 'Six areas went up in one quarter. A real pilot makes a company build oversight, measurement, technical skill and user trust at the same time. The index jumped from 47 to 77. The path moves to 4. Storing → Doing is still Partial: the product can suggest, but it cannot act yet.',
    situation: [
      'The company starts Path 3. It picks one workflow for a pilot: after-hours emergency booking.',
    ],
    work: [
      { path: 3, source: 'play', what: 'The team built an AI booking assistant inside the booking screen. It writes a draft booking from the call recording.', changes: { u1: 'yes', u2: 'no', u5: 'yes', s3: 'yes', s5: 2 } },
      { path: 3, source: 'play', what: 'The call agent checks and confirms every draft. The AI cannot book a job alone.', changes: { u3: 'yes', g4: 'yes' } },
      { path: 3, source: 'play', what: 'Each field in the draft shows the part of the call it came from.', changes: { u4: 'yes' } },
      { path: 3, source: 'play', what: 'QA staff check 200 random drafts each week. Accuracy went from 88% to 95% in 10 weeks.', changes: { g5: 'yes', g7: 3, e8: 3 } },
      { path: 3, source: 'play', what: 'The Head of Support QA owns AI output quality. A written plan says what to do when a draft is wrong: call the customer back within 15 minutes and log the incident.', changes: { g1: 'yes', g3: 'yes', g6: 'yes', g8: 3 } },
      { path: 3, source: 'play', what: 'Results after one quarter: 5.4 minutes to book (was 9.2) and 10% of calls missed (was 18%).', changes: { m4: 'yes', m7: 3 } },
      { path: 3, source: 'unlock', what: 'The company hired a senior machine-learning engineer. The team uses an outside speech-to-text service but builds the assistant itself.', changes: { e1: 'yes', e4: 'no', e7: 3 } },
      { path: 3, source: 'unlock', what: 'Analysts can now query job data in a cloud data warehouse.', changes: { d8: 'yes' } },
    ],
    events: [
      { kind: 'side-effect', what: 'When the pilot started, a rumor said AI would replace call agents. Adoption risk went up for a short time.', changes: { u6: 4 } },
    ],
  },
  {
    month: 15,
    title: 'A setback: new CEO, no AI owner',
    meaning: 'Leadership fell from Advanced to Partial. The leadership deal-breaker now caps the result at Path 1, but the area scores alone point to Path 4. The index is 70 (Strong), but the recommendation is Path 1. The tool does not say the work was wrong. It says that nobody can lead the next step.',
    situation: [
      'The company starts Path 4 in month 13. It begins to redesign daily dispatch around AI.',
      'In month 14, the board appoints a new CEO. Two weeks later, the COO who owned AI leaves the company.',
    ],
    work: [
      { path: 4, source: 'play', what: 'Before the change, dispatchers and designers held three workshops for the new dispatch process. The design is ready but not built.', changes: { w8: 4 } },
    ],
    events: [
      { kind: 'event', what: 'The AI owner left. The CTO and the VP of Support both now claim the AI roadmap.', changes: { l1: 'no', l2: 'yes', l7: 2 } },
      { kind: 'event', what: 'The new CEO paused the business case for review. The steering group stopped meeting.', changes: { l5: 'no', l8: 2 } },
      { kind: 'side-effect', what: 'The booking pilot kept running. Agents now like it, so adoption risk went down.', changes: { u6: 2, u7: 3 } },
    ],
  },
  {
    month: 18,
    title: 'Leadership recovers and the dispatch redesign goes live',
    meaning: 'Leadership recovered in one quarter, because the business case and the targets survived the change of CEO. Technical Ability went to Advanced and Storing → Doing went to Strong. The index is 88 (Advanced), but the path stays at 4. Oversight is 3, and Path 5 needs Oversight at 4.',
    situation: [
      'The company does short Path 1 work first. It goes fast, because the business case and targets already exist.',
      'After the new owner starts, the dispatch redesign from Path 4 continues.',
    ],
    work: [
      { path: 1, source: 'play', what: 'The new CEO reviewed the AI program for six weeks and kept it. The CEO named the VP of Operations as the executive owner. The annual plan now has a budget line for AI.', changes: { l1: 'yes', l2: 'no', l5: 'yes', l7: 4, l8: 3, l9: 4 } },
      { path: 4, source: 'play', what: 'The new dispatch process went live: the AI proposes the next-day schedule for routine maintenance jobs. Dispatchers approve the schedule and handle exceptions only.', changes: { s1: 'no', s5: 3, s6: 3, s7: 2 } },
      { path: 4, source: 'play', what: 'The company digitized the skills of all 140 technicians, so the AI can match each job to a qualified technician.', changes: { d7: 3 } },
      { path: 4, source: 'play', what: 'All 38 dispatchers and call agents completed training. Two senior dispatchers became "exception dispatchers".', changes: { u7: 4, u8: 4 } },
      { path: 4, source: 'play', what: 'The new CEO told staff in writing that AI savings will not cause layoffs in the call center.', changes: { u6: 2 } },
      { path: 4, source: 'play', what: 'Results: daily schedule planning takes 1 hour (was 3.5 hours). First-visit fixes rose to 78% (was 71%).', changes: { e9: 3 } },
    ],
    events: [],
  },
  {
    month: 21,
    title: 'Oversight becomes a system, not a few careful people',
    meaning: 'Oversight is now Advanced, because it no longer depends on a few careful people. Storing → Doing is Advanced, because the product can act. All Path 5 conditions are true. The snowstorm incident did not lower any score. The failure plan worked as written.',
    situation: [
      'Path 4 continues. The last barrier to Path 5 is oversight: it must be highly reliable before the AI acts alone.',
    ],
    work: [
      { path: 4, source: 'unlock', what: 'The company set up a monthly AI review board with operations, legal, support QA and engineering.', changes: { g2: 'no', g8: 4 } },
      { path: 4, source: 'unlock', what: 'The review board wrote approval rules for every AI action: what the AI can do alone, what needs a person, and who approves exceptions.', changes: { g7: 5 } },
      { path: 4, source: 'unlock', what: 'Engineers built monitoring for the AI: error rates, model versions and an automatic alert when accuracy drops.', changes: { e6: 4, e7: 4, e8: 4 } },
      { path: 4, source: 'unlock', what: 'The product can now update schedules and send customer text confirmations directly, with a full log of each change.', changes: { s4: 'yes', s5: 4, s6: 4, s7: 3 } },
    ],
    events: [
      { kind: 'event', what: 'During a January snowstorm, a calendar sync error made the AI double-book 9 technicians. Dispatchers went back to manual in 20 minutes. Engineers fixed the cause in 2 days and added a new rule. The failure plan worked.', changes: {} },
    ],
  },
  {
    month: 24,
    title: 'AI-native operations: the AI acts, within limits',
    meaning: "All eight areas are Advanced. The index is 100, the maximum. The path stays at 5. The score cannot go higher, so the work changes. The company now widens the AI's limits one step at a time and checks each step.",
    situation: [
      'The company starts Path 5. The AI now books and dispatches some jobs with no person in the loop, inside written limits.',
    ],
    work: [
      { path: 5, source: 'play', what: 'The AI now books routine maintenance visits alone, but only inside five written limits. The customer has a service contract. The job takes less than 2 hours. The cost is less than $400. The job is not gas or electrical safety work. The customer confirms by text.', changes: { s7: 4 } },
      { path: 5, source: 'play', what: 'Any job outside these limits goes to a person. The AI pauses itself if its error rate is over 2% on any day.', changes: {} },
      { path: 5, source: 'play', what: 'QA staff audit a 5% sample of AI actions every week. A live dashboard shows every action the AI takes.', changes: { m6: 4 } },
      { path: 5, source: 'play', what: 'Results: the AI books 62% of routine maintenance jobs with no human touch. Only 3% of after-hours calls are missed (was 18%). Six call agents moved into customer success roles.', changes: { e9: 4 } },
      { path: 4, source: 'play', what: 'Catch-up work: the team mapped the third priority workflow, unpaid-invoice follow-up, and listed the last manual workarounds. One board now shows every queue in all three workflows.', changes: { w3: 'yes', w4: 'yes' } },
      { path: 5, source: 'play', what: 'Northline started to sell the AI dispatcher to its own contractor customers. 210 contractors bought it in the first quarter.', changes: { u5: 'yes' } },
    ],
    events: [],
  },
]

// ---------------------------------------------------------------------------
// ENGINE RUN
// ---------------------------------------------------------------------------
function assess(answers, gating = true) {
  const scores = Object.fromEntries(SECTIONS.map(id => [id, inferDiagnosticScore(id, answers)]))
  const index = calculateReadinessScore(scores)
  const band = getReadinessBand(index)
  const path = selectInterventionPath(scores, gating)
  return { scores, index, band, path }
}

const normalized = (id, v) => {
  const f = FACTOR[id]
  if (f.type === 'binary') return (v === 'yes') === (f.polarity === 'positive') ? 1 : 0
  const n = (v - 1) / 4
  return f.polarity === 'positive' ? n : 1 - n
}

export function runJourney() {
  let answers = { ...BASELINE }
  const results = []
  let prev = null
  for (const [i, step] of STEPS.entries()) {
    const before = { ...answers }
    const changes = []
    for (const item of [...step.work.map(w => ({ ...w, kind: w.source })), ...step.events]) {
      for (const [id, value] of Object.entries(item.changes)) {
        if (!(id in FACTOR)) throw new Error(`unknown question ${id} in step ${i + 1}`)
        changes.push({ id, from: answers[id], to: value, by: item })
        answers[id] = value
      }
    }
    const r = assess(answers)
    const off = assess(answers, false)
    results.push({ step: i + 1, ...step, before, answers: { ...answers }, changes, result: r, ungated: off, prev })
    prev = r
  }
  return results
}

// ---------------------------------------------------------------------------
// COHERENCE CHECKS (the realism rules from the design)
// ---------------------------------------------------------------------------
export function checkJourney(results) {
  const issues = []
  for (const s of results) {
    if (!s.prev) continue
    // Rule 1: do not skip ahead. Work may come from the recommended path or any lower path.
    // If a deal-breaker capped the last result, work from the uncapped path is allowed only
    // when the same period's work clears that deal-breaker.
    const prevBlockers = s.prev.path.blockers.map(b => b.id)
    const nowGates = new Set(s.result.path.activeGates.map(g => g.id))
    const cleared = prevBlockers.length > 0 && prevBlockers.every(id => !nowGates.has(id))
    const maxPath = s.prev.path.pathCapped && cleared ? s.prev.path.rawPathNumber : s.prev.path.finalPathNumber
    for (const w of s.work) {
      if (w.path > maxPath) issues.push(`Step ${s.step}: work uses Path ${w.path}, above the allowed Path ${maxPath}: "${w.what.slice(0, 60)}…"`)
    }
    for (const c of s.changes) {
      const f = FACTOR[c.id]
      if (f.type === 'scale' && Math.abs(c.to - c.from) > 2) issues.push(`Step ${s.step}: ${c.id} moved ${c.from} → ${c.to}, more than 2 points in one period`)
      const worse = normalized(c.id, c.to) < normalized(c.id, c.from)
      if (worse && c.by.kind !== 'event' && c.by.kind !== 'side-effect') issues.push(`Step ${s.step}: ${c.id} got worse (${c.from} → ${c.to}) from planned work, not from an event or side-effect`)
    }
  }
  return issues
}

// ---------------------------------------------------------------------------
// OUTPUT
// ---------------------------------------------------------------------------
const yn = v => (v === 'yes' ? 'Yes' : v === 'no' ? 'No' : String(v))
const arrow = (a, b) => (a === null || b === null || a === undefined ? '' : b > a ? ' ▲' : b < a ? ' ▼' : '')

function summary(results) {
  console.log(`${COMPANY.name}: synthetic journey through the real engine\n`)
  const head = ['Step', 'Month', ...SECTIONS.map(id => AREA_NAME[id].slice(0, 10)), 'Index', 'Band', 'Raw', 'Final', 'Gates']
  console.log(head.join('\t'))
  for (const s of results) {
    const r = s.result
    console.log([s.step, s.month, ...SECTIONS.map(id => r.scores[id].score), r.index, r.band.label.split(' ')[0], r.path.rawPathNumber, r.path.finalPathNumber + (r.path.pathCapped ? '*' : ''), r.path.activeGates.map(g => g.id.replace('gate_', '')).join(',') || '-'].join('\t'))
  }
  console.log('\nNormalized section values (distance to thresholds matters):')
  for (const s of results) console.log(`  step ${s.step}: ` + SECTIONS.map(id => `${id.slice(0, 4)} ${s.result.scores[id].normalizedScore.toFixed(2)}`).join('  '))
  const issues = checkJourney(results)
  console.log(`\nCoherence checks: ${issues.length === 0 ? 'ALL PASS' : issues.length + ' ISSUE(S)'}`)
  for (const i of issues) console.log('  - ' + i)
}

function markdown(results) {
  const out = []
  const p = (...l) => out.push(...l)
  // overview table
  p('| Step | Month | ' + SECTIONS.map(id => AREA_NAME[id]).join(' | ') + ' | Index | Band | Path |')
  p('|---|---|' + SECTIONS.map(() => '---|').join('') + '---|---|---|')
  for (const s of results) {
    const r = s.result
    const pathCell = r.path.pathCapped ? `**${r.path.finalPathNumber}** (capped from ${r.path.rawPathNumber})` : `**${r.path.finalPathNumber}**`
    p(`| ${s.step} | ${s.month} | ` + SECTIONS.map(id => r.scores[id].score).join(' | ') + ` | ${r.index} | ${r.band.label.replace(' Readiness', '')} | ${pathCell} |`)
  }
  p('')
  // index chart
  p('```')
  p('Readiness index (0-100), by month')
  for (const s of results) {
    const r = s.result
    const bar = '█'.repeat(Math.round(r.index / 2.5))
    p(`Month ${String(s.month).padStart(2)}  ${bar.padEnd(40)} ${String(r.index).padStart(3)}  Path ${r.path.finalPathNumber}${r.path.pathCapped ? ' (capped)' : ''}`)
  }
  p('```')
  p('')
  // steps
  p('### 7.3 Step by step', '')
  for (const s of results) {
    const r = s.result
    p(`#### Step ${s.step}: Month ${s.month}. ${s.title}`, '')
    p('**Situation.** ' + s.situation.join(' '), '')
    if (s.work.length) {
      p('**Work done since the last assessment.**', '')
      for (const w of s.work) p(`- ${w.what} *(Path ${w.path} ${w.source === 'play' ? 'play' : 'unlock work'})*`)
      p('')
    }
    if (s.events.length) {
      p('**Events and side effects.**', '')
      for (const e of s.events) p(`- ${e.kind === 'event' ? '**Event:**' : '**Side effect:**'} ${e.what}`)
      p('')
    }
    if (s.changes.length) {
      p('**Answers that changed.**', '')
      p('| Question | Area | Before | After |')
      p('|---|---|---|---|')
      for (const c of s.changes) p(`| \`${c.id}\` ${FACTOR[c.id].label} | ${AREA_NAME[FACTOR[c.id].section]} | ${yn(c.from)} | ${yn(c.to)} |`)
      p('')
    }
    p('**Assessment result.**', '')
    p('| ' + SECTIONS.map(id => AREA_NAME[id]).join(' | ') + ' | Index | Path |')
    p('|' + SECTIONS.map(() => '---|').join('') + '---|---|')
    const cell = id => {
      const now = r.scores[id].score
      const was = s.prev ? s.prev.scores[id].score : null
      return was === null || now === was ? String(now) : `**${now}**${arrow(was, now)}`
    }
    const idxCell = s.prev ? `${r.index}${arrow(s.prev.index, r.index)}` : String(r.index)
    const pathCell = r.path.pathCapped ? `**${r.path.finalPathNumber}** (capped from ${r.path.rawPathNumber})` : `**${r.path.finalPathNumber}**`
    p('| ' + SECTIONS.map(cell).join(' | ') + ` | ${idxCell} | ${pathCell} |`)
    p('')
    const gates = r.path.activeGates.map(g => '`' + g.id + '`').join(', ') || 'none'
    const binding = r.path.blockers.map(b => '`' + b.id + '`').join(', ') || 'none'
    p(`Band: **${r.band.label}**. Deal-breakers triggered: ${gates}. Deal-breakers that changed the result: ${binding}. Recommended: **Path ${r.path.finalPathNumber}: ${PATH_NAME[r.path.finalPathNumber]}**.`, '')
    p('**What the result means.** ' + s.meaning, '')
    const next = INTERVENTION_PATHS.find(x => x.number === r.path.finalPathNumber).nextActions
    p('**Next actions in the report** *(quoted from the path library)*:', '')
    next.forEach((a, k) => p(`${k + 1}. ${a}`))
    p('')
  }
  console.log(out.join('\n'))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = runJourney()
  if (process.argv.includes('--markdown')) markdown(results)
  else summary(results)
}
