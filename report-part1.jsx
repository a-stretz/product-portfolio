/* ============================================================
   FULL REPORT — v0.43
   ============================================================ */

const { FrameworkFlow, ReadinessLadder, DiagnosticRadar, GatingDecisionTree,
  PrioritizationMatrix, CompoundingCurve, GradeScale, DiagnosticIcons } = window;

// ---- Cover page ----
const CoverPage = () =>
<section className="page cover no-margin-col" data-runhead="" data-folio="">
    <div className="c-top">
      <div><span className="c-mark">◆</span> &nbsp; AI Portfolio Practice</div>
      <div>
</div>
    </div>

    <div className="c-title-block">
      <div className="c-kicker">A diagnostic & execution framework</div>
      <h1 className="title">The AI Product <em>Value Creation</em> Framework</h1>
      <p className="c-sub">A repeatable system to assess, classify, and accelerate AI value creation across portfolio companies, regardless of vertical, stage, or maturity.</p>
    </div>

    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 40 }}>
      <svg viewBox="0 0 400 240" style={{ width: '5.6in' }}>
        {/* Abstract: 8 diagnostic nodes feeding 6 stages */}
        {/* diagnostics column */}
        {Array.from({ length: 8 }, (_, i) => <g key={i}>
            <circle cx={40} cy={30 + i * 26} r={5} fill="var(--primary)" />
            <line x1={46} y1={30 + i * 26} x2={180} y2={120} stroke="var(--primary)" strokeWidth="0.3" opacity="0.3" />
          </g>
      )}
        {/* central stage axis */}
        <line x1={180} y1={120} x2={360} y2={120} stroke="var(--ink)" strokeWidth="0.8" />
        {Array.from({ length: 6 }, (_, i) =>
      <g key={i}>
            <circle cx={180 + i * 36} cy={120} r={7} fill={i < 2 ? 'var(--c-evaluate)' : i < 4 ? 'var(--c-grade)' : 'var(--c-roadmap)'} />
            <text x={180 + i * 36} y={124} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--paper)" fontWeight="700">{'0' + (i + 1)}</text>
          </g>
      )}
        {/* feedback loop */}
        <path d={`M 360 128 Q 360 200 180 200 Q 40 200 40 130`} fill="none" stroke="var(--garnet-2)" strokeWidth="0.6" strokeDasharray="3 2" />
        <polygon points={`40,130 36,136 44,136`} fill="var(--garnet-2)" />

        <text x={40} y={225} fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.6" fill="var(--ink-3)">8 DIAGNOSTICS</text>
        <text x={240} y={225} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.6" fill="var(--ink-3)">6 STAGES</text>
        <text x={360} y={225} textAnchor="end" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.6" fill="var(--garnet-2)">FEEDBACK</text>
      </svg>
    </div>

    <div className="c-bottom">
      <div className="c-meta">
        <div><span className="m-k">Author</span>Austin Stretz</div>
        <div><span className="m-k">Date</span>April 2026</div>
        <div><span className="m-k">Version</span>1.02</div>
      </div>
    </div>
  </section>;


// ---- Table of contents ----
const TOCPage = () =>
<section className="page" data-runhead="TABLE OF CONTENTS · VALUE CREATION FRAMEWORK · Austin Stretz" data-folio="II">
    <div className="margin">
      <div className="m-label">Reading this document</div>
      <div className="m-note">Each stage produces a concrete output that informs the next. The framework is sequential. Some stages overlap in practice, but none are optional.</div>
      <div className="m-label">Convention</div>
      <div className="m-note">Section numbers follow the six-stage spine. Diagnostics are numbered 3.1–3.8.</div>
    </div>
    <div className="body-col">
      <span className="eyebrow">Table of Contents</span>
      <h2 className="section-title">Contents</h2>
      <hr className="rule-heavy" />
      {[
    ['01', 'Framework Overview', '003'],
    ['02', 'The Six Stages: Diagnostics to Value Creation', '005'],
    ['03', 'Evaluate — The Eight Diagnostics', '007'],
    ['3.1', '  Strategic Urgency & Business Case', '008'],
    ['3.2', '  Leadership Readiness & Alignment', '009'],
    ['3.3', '  Product & Workflow Clarity', '010'],
    ['3.4', '  Data & Instrumentation Maturity', '011'],
    ['3.5', '  Technical System & Architecture', '012'],
    ['3.6', '  Trust, Risk & Governance', '013'],
    ['3.7', '  Technical Talent & Engineering Capability', '014'],
    ['3.8', '  Competitive Position & Market Context', '015'],
    ['—', '  Diagnostic Scoring Quick Reference', '016'],
    ['04', 'Grade — Composite Grade & AI Readiness Levels', '017'],
    ['05', 'Roadmap — Opportunity Prioritization & Sequencing', '019'],
    ['06', 'Execute — Pilot Architecture & Launch Readiness', '022'],
    ['07', 'Validate — Measure, Iterate, Decide', '025'],
    ['08', 'Compound — Portfolio Intelligence', '027'],
    ['09', 'Opportunity Prioritization Matrix', '028']].
    map((r, i) => {
      const indent = r[1].startsWith('  ');
      return (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '44px 1fr 48px',
          alignItems: 'baseline',
          padding: '6px 0',
          borderBottom: '0.5pt dotted var(--rule-2)',
          fontFamily: indent ? 'var(--font-sans)' : 'var(--font-serif)',
          fontSize: indent ? '9.5pt' : '11pt',
          color: indent ? 'var(--ink-2)' : 'var(--ink)',
          fontWeight: indent ? 400 : 500
        }}>
            <span className="mono" style={{ fontSize: '8pt', color: indent ? 'var(--ink-4)' : 'var(--primary)', fontWeight: 600, letterSpacing: '0.08em' }}>{r[0]}</span>
            <span>{r[1].trim()}</span>
            <span className="mono" style={{ fontSize: '8pt', color: 'var(--ink-3)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r[2]}</span>
          </div>);

    })}
    </div>
  </section>;


// ---- Section 1: Overview ----
const OverviewPage = () =>
<section className="page" data-runhead="§ 01 · FRAMEWORK OVERVIEW · Austin Stretz" data-folio="003">
    <div className="margin">
      <div className="m-label">Section</div>
      <div className="m-note"><span className="m-num">§ 01</span>Framework Overview</div>
      <div className="m-label">Thesis</div>
      <div className="m-note">A repeatable diagnostic system produces consistent portfolio decisions and compounding intelligence across engagements.</div>
      <div className="m-label">Output</div>
      <div className="m-note">Composite Grade, AI Readiness Level, Priority Opportunity Set, Execution Roadmap.</div>
    </div>
    <div className="body-col">
      <span className="eyebrow">Section One · Framework Overview</span>
      <h2 className="section-title">A common system for where AI matters, what each company is ready for, and what should happen next.</h2>
      <hr className="rule-primary" />
      <p className="lead" style={{ marginTop: 10 }}>The AI Product Value Creation Framework is a decision-making instrument. It is most valuable when used consistently across a portfolio: when findings compare, lessons compound, and each engagement sharpens the next one.</p>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="cell">
          <div className="c-head">The Problem</div>
          <h4>AI decisions vary by engagement.</h4>
          <p>Without a common system, AI efforts are evaluated inconsistently, recommendations vary by engagement, and lessons learned do not compound across the portfolio. Each engagement starts from zero.</p>
        </div>
        <div className="cell">
          <div className="c-head">The Solution</div>
          <h4>One diagnostic spine, six stages.</h4>
          <p>A repeatable way to diagnose readiness, classify appropriate investment, direct the right next actions, and measure outcomes, turning each engagement into reusable portfolio intelligence.</p>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 18 }}>
        <span className="c-label">Framework orientation</span>
        This is a <strong>decision-oriented</strong> framework, not exploratory consulting. Each stage produces a concrete output that informs the next decision. Stages can overlap in practice; none are arbitrary time blocks.
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div>
          <h3 className="sub-title">Guiding Principles</h3>
          <ul className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt', lineHeight: 1.42 }}>
            <li>Start with customer needs and known workflows, not features.</li>
            <li>Prioritize data and instrumentation as foundational prerequisites.</li>
            <li>Treat trust as a gating constraint: sequence before scaling.</li>
            <li>Assess current reality honestly; plan for ambition realistically.</li>
            <li>Every finding produces an action; validate relentlessly.</li>
            <li>Build the portfolio intelligence loop; each engagement improves the next.</li>
          </ul>
        </div>
        <div>
          <h3 className="sub-title">Core Deliverables</h3>
          <ul className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt', lineHeight: 1.42 }}>
            <li>Portfolio company diagnostic artifacts.</li>
            <li>Scorecards across eight diagnostic dimensions.</li>
            <li>Composite Grade and AI Readiness Level.</li>
            <li>Key blockers, gating constraints, and prioritized opportunity list.</li>
            <li>Recommended action path: readiness actions or AI Plays.</li>
            <li>Execution roadmap with success criteria.</li>
            <li>Portfolio-level patterns and reusable insights over time.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>;


// ---- Section 2: Six Stages ----
const StagesPage = () =>
<section className="page" data-runhead="§ 02 · THE SIX STAGES · Austin Stretz" data-folio="005">
    <div className="margin">
      <div className="m-label">Section</div>
      <div className="m-note"><span className="m-num">§ 02</span>The Six Stages</div>
      <div className="m-label">Spine</div>
      <div className="m-note">Evaluate · Grade · Roadmap · Execute · Validate · Value Creation</div>
      <div className="m-label">Cyclical</div>
      <div className="m-note">Validate returns evidence to Evaluate. The loop is the engine.</div>
    </div>
    <div className="body-col">
      <span className="eyebrow">Section Two · Framework Spine</span>
      <h2 className="section-title">Six stages from diagnostics to value creation.</h2>
      <p className="lead">Each stage has a distinct purpose, a defined output, and a clear handoff. Some run concurrently. One is explicitly cyclical. None are arbitrary time blocks.</p>

      <div style={{ margin: '18px 0 6px' }}>
        <FrameworkFlow />
      </div>

      <hr className="rule" />

      <table className="framework-table">
        <thead>
          <tr><th style={{ width: '6%' }}>#</th><th style={{ width: '22%' }}>Stage</th><th style={{ width: '28%' }}>Role</th><th>Purpose & Output</th></tr>
        </thead>
        <tbody>
          {[
        ['01', 'Evaluate', 'Deep Diagnostic', 'Score the company across eight diagnostic dimensions. Identify strengths, gaps, critical blockers, and produce the artifacts that feed downstream decisions.'],
        ['02', 'Grade', 'Readiness Classification', 'Translate diagnostic scores into a Composite Grade and AI Readiness Level. Gating constraints preserve framework integrity.'],
        ['03', 'Roadmap', 'Opportunity Prioritization', 'Determine what should happen first, which actions are available now, and how to sequence the next set of opportunities.'],
        ['04', 'Execute', 'Build, Pilot, Launch', 'Carry out selected readiness actions or AI Plays in a controlled sequence tied to current readiness.'],
        ['05', 'Validate', 'Measure, Iterate, Decide', 'Measure results, identify what worked or failed, and determine whether to expand, adjust, defer, or stop.'],
        ['06', 'Value Creation', 'Portfolio Intelligence', 'Capture repeatable patterns, proven plays, and lessons across the portfolio to improve future engagements.']].
        map((r) =>
        <tr key={r[0]}>
              <td className="num" style={{ color: 'var(--primary)', fontWeight: 700 }}>{r[0]}</td>
              <th>{r[1]}</th>
              <td style={{ fontWeight: 600 }}>{r[2]}</td>
              <td style={{ color: 'var(--ink-2)' }}>{r[3]}</td>
            </tr>
        )}
        </tbody>
      </table>

      <div className="callout quote" style={{ marginTop: 14 }}>
        <span className="c-label">Framework integrity</span>
        The feedback loop from <em>Validate</em> back to <em>Evaluate</em> is not decorative. It is what turns individual engagements into a compounding operating system.
      </div>
    </div>
  </section>;


window.ReportPart1 = { CoverPage, TOCPage, OverviewPage, StagesPage };