/* ============================================================
   FULL REPORT — PART 3 (Grade, Roadmap, Execute, Validate, Compound, Matrix)
   ============================================================ */

const {
  ReadinessLadder: RLadder, GatingDecisionTree: GTree,
  PrioritizationMatrix: PMatrix, CompoundingCurve: CCurve, GradeScale: GScale
} = window;

// ---- Stage divider helper ----
const Divider = ({ num, color, title, em, blurb, foot1, foot2 }) =>
<section className="page divider" style={{ '--primary': color }}>
    <div className="d-top"><div>Stage {num}</div><div>Framework</div></div>
    <div className="d-main">
      <div className="d-num" style={{ color }}>{num}</div>
      <h2>{title} <em style={{ color, fontStyle: 'italic' }}>{em}</em></h2>
      <div className="d-blurb">{blurb}</div>
    </div>
    <div className="d-bottom"><div>{foot1}</div><div>{foot2}</div></div>
  </section>;


// ---- Section 4: Grade ----
const GradeOpener = () => <Divider num="04" color="var(--c-grade)" title="Grade." em="Readiness classification."
blurb="Translate diagnostic scores into a Composite Grade and AI Readiness Level. Apply gating constraints to preserve framework integrity."
foot1="§ 4 · Grade" foot2="Folio 017" />;

const GradePage = () =>
<section className="page" data-runhead="§ 04 · GRADE · READINESS CLASSIFICATION" data-folio="018">
    <div className="margin">
      <div className="m-label">Stage</div>
      <div className="m-note"><span className="m-num">§ 04</span>Grade</div>
      <div className="m-label">Why both</div>
      <div className="m-note">The Composite Grade summarizes the whole profile. The AI Readiness Level is the gating mechanism: what can actually be executed responsibly.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-grade)', '--primary-2': 'var(--c-grade-2)', '--primary-wash': 'var(--c-grade-wash)' }}>
      <span className="eyebrow">Stage 04 · Grade</span>
      <h2 className="section-title">Composite Grade & AI Readiness Levels.</h2>
      <p className="lead">Grade answers two different questions: <em>How ready is this company overall?</em> and <em>What is the most sophisticated AI they can credibly execute right now?</em></p>

      <h3 className="sub-title">Composite Grade — Overall readiness</h3>
      <div style={{ margin: '8px 0' }}><GScale /></div>

      <h3 className="sub-title">Gating Constraints — What caps readiness</h3>
      <div style={{ margin: '8px 0' }}><GTree /></div>

      <h3 className="sub-title">AI Readiness Levels — What is executable</h3>
      <div style={{ margin: '8px 0' }}><RLadder /></div>

      <div className="callout warning" style={{ marginTop: 14 }}>
        <span className="c-label">Integrity rule</span>
        A company may earn a strong Composite Grade and still be capped at a lower Readiness Level if capabilities required for advanced AI are not yet satisfied. <strong>The grade shows overall readiness. The Readiness Level shows what can actually be executed responsibly and credibly.</strong>
      </div>
    </div>
  </section>;


// ---- Section 5: Roadmap ----
const RoadmapOpener = () => <Divider num="05" color="var(--c-roadmap)" title="Roadmap." em="Opportunity prioritization."
blurb="Translate the AI Readiness Level, diagnostic profile, and company context into a prioritized roadmap. Sequence the next set of actions in a way that is realistic, defensible, and aligned to current readiness."
foot1="§ 5 · Roadmap" foot2="Folio 019" />;

const RoadmapPage1 = () =>
<section className="page" data-runhead="§ 05 · ROADMAP · PRIORITIZATION & SEQUENCING" data-folio="020">
    <div className="margin">
      <div className="m-label">Stage</div>
      <div className="m-note"><span className="m-num">§ 05</span>Roadmap</div>
      <div className="m-label">Decides</div>
      <div className="m-note">What happens first; what is deferred; how to sequence.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-roadmap)', '--primary-2': 'var(--c-roadmap-2)', '--primary-wash': 'var(--c-roadmap-wash)' }}>
      <span className="eyebrow">Stage 05 · Roadmap</span>
      <h2 className="section-title">What should happen first, and why.</h2>
      <p className="lead">The roadmap ranks eligible opportunities, sequences them against the Readiness Level, and applies trust, customer, market, and capacity constraints.</p>

      <h3 className="sub-title">How Readiness Levels gate available actions</h3>
      <table className="framework-table">
        <thead><tr><th style={{ width: '20%' }}>Level</th><th style={{ width: '42%' }}>Available Actions</th><th>What It Unlocks</th></tr></thead>
        <tbody>
          {[
        ['0 · No Clear AI Case', 'Educate', 'AI literacy, competitive context, SoR-to-SoA framing, and go/no-go on AI investment'],
        ['1 · Education & Framing', 'Educate · Workflow Map · Instrument', 'Workflow clarity, decision-point mapping, event design, and data foundations needed to reach AI Play eligibility'],
        ['2 · Assistive Intelligence', 'Intelligent Search · Summarization · Recommendation · Prioritization Scoring', 'Lower-risk AI that assists humans, proves value, and builds confidence with minimal trust exposure'],
        ['3 · Product Differentiation', 'Next-Best-Action · Intelligent Dashboard · Workflow Copilot · Predictive Analytics', 'Visible AI product capabilities that improve competitiveness, retention, and product value'],
        ['4 · Workflow Automation', 'Auto-Routing · Exception-Based Processing · Dynamic Optimization', 'AI execution of repeatable decisions with humans managing review, exceptions, and controls'],
        ['5 · System of Action', 'Agentic Execution · HITL Oversight · Audit & Control Layer', 'Multi-step AI-driven workflows with human oversight, auditability, and operational control']].
        map((r) =>
        <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td style={{ color: 'var(--ink-2)' }}>{r[2]}</td></tr>
        )}
        </tbody>
      </table>

      <div className="callout" style={{ marginTop: 14 }}>
        <span className="c-label">Sequencing principle</span>
        Levels are sequential. A company at Level 1 cannot attempt Level 3 plays regardless of how strong the business case is. <strong>The only way to advance is to complete the work at the current level and demonstrate readiness through Validate.</strong>
      </div>

      <h3 className="sub-title">How roadmap decisions are made</h3>
      <ul className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt', lineHeight: 1.45 }}>
        <li><strong>AI Readiness Level</strong> defines what actions are available: Foundation Building or AI Plays.</li>
        <li><strong>Diagnostic Profile</strong> identifies key blockers and the conditions needed to unlock higher-level plays.</li>
        <li><strong>Roadmap Constraints</strong> — trust envelope, customer gates, market gates, and capacity — further shape prioritization.</li>
        <li><strong>Opportunity Prioritization Matrix</strong> ranks eligible opportunities on user impact, business value, data readiness, trust feasibility, complexity, and time to value. See § 09.</li>
      </ul>
    </div>
  </section>;


const RoadmapPage2 = () =>
<section className="page" data-runhead="§ 05 · ROADMAP · READINESS ACTIONS & AI PLAYS" data-folio="021">
    <div className="margin">
      <div className="m-label">Actions</div>
      <div className="m-note">Educate · Workflow Map · Instrument (Levels 0–1)</div>
      <div className="m-label">Plays</div>
      <div className="m-note">Assistive (L2) · Differentiation (L3) · Automation (L4) · System of Action (L5)</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-roadmap)', '--primary-2': 'var(--c-roadmap-2)', '--primary-wash': 'var(--c-roadmap-wash)' }}>
      <h3 className="sub-title">Readiness Actions · Level 0–1 (Pre-AI)</h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>Three prerequisite actions for any AI investment. They produce no AI features; they produce the alignment, data foundation, and workflow understanding that make AI features possible.</p>

      <div className="grid-3" style={{ marginTop: 10 }}>
        {[
      { n: '01', name: 'Educate', trig: 'Leadership clarity weak. AI framing immature. No shared vocabulary.', out: 'Shared AI vocabulary · Named executive sponsor · Written AI ambition · Go/no-go decision.', t: '2–4 wks' },
      { n: '02', name: 'Workflow Map', trig: 'Product understanding shallow. Decision points unknown. AI has no clear target.', out: 'Workflow maps · Decision point inventory · Friction heatmap · Override catalog · Opportunity shortlist.', t: '3–6 wks' },
      { n: '03', name: 'Instrument', trig: 'Ideas exist but behavioral data is missing, fragmented, or inaccessible.', out: 'Event schema · Instrumentation plan · Data quality report · Pipeline architecture · Baseline metrics.', t: '4–8 wks design · 8–16 wks build' }].
      map((a) =>
      <div key={a.n} className="cell" style={{ borderTop: '1.5pt solid var(--primary)' }}>
            <div className="c-head">Readiness Action {a.n}</div>
            <h4>{a.name}</h4>
            <p><strong style={{ color: 'var(--ink)' }}>Trigger:</strong> {a.trig}</p>
            <p><strong style={{ color: 'var(--ink)' }}>Output:</strong> {a.out}</p>
            <p className="mono" style={{ fontSize: '7.5pt', letterSpacing: '0.1em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>Timeline · {a.t}</p>
          </div>
      )}
      </div>

      <div className="callout" style={{ marginTop: 12 }}>
        <span className="c-label">Sequencing</span>
        Most Level 0–1 companies need all three actions, typically in the order <strong>Educate → Workflow Map → Instrument</strong>. You cannot instrument what you haven't defined. Completing all three should move the company to Level 2, where AI Plays become viable.
      </div>

      <h3 className="sub-title" style={{ marginTop: 18 }}>AI Plays · Level 2+ (AI-Ready)</h3>
      <table className="framework-table">
        <thead><tr><th style={{ width: '15%' }}>Level</th><th>Play</th><th>Prerequisites</th></tr></thead>
        <tbody>
          <tr><th rowSpan="4" style={{ background: 'var(--c-roadmap-wash)', verticalAlign: 'top' }}>Level 2<br /><span className="mono" style={{ fontSize: '7pt', letterSpacing: '0.14em', color: 'var(--primary)' }}>ASSISTIVE</span></th><td><strong>Intelligent Search</strong> — Semantic, context-aware search replacing keyword search.</td><td>Text data available · Embedding viable · Search is a core workflow.</td></tr>
          <tr><td><strong>Summarization</strong> — Auto-generated summaries of documents, conversations, or data.</td><td>Users synthesize heavy text · Text data accessible.</td></tr>
          <tr><td><strong>Recommendation Engine</strong> — Prioritized suggestions from behavior, context, history.</td><td>High-frequency decisions · Behavioral data · Trust at Recommend level.</td></tr>
          <tr><td><strong>Prioritization Scoring</strong> — Auto-score and rank items by outcome likelihood.</td><td>Users manually prioritize volume · Outcome data available.</td></tr>

          <tr><th rowSpan="4" style={{ background: 'var(--c-roadmap-wash)', verticalAlign: 'top' }}>Level 3<br /><span className="mono" style={{ fontSize: '7pt', letterSpacing: '0.14em', color: 'var(--primary)' }}>DIFFERENTIATION</span></th><td><strong>Next-Best-Action</strong> — Proactive workflow-step suggestion from context and prediction.</td><td>Strong workflow clarity · Behavioral data · Outcome linkage.</td></tr>
          <tr><td><strong>Intelligent Dashboard</strong> — AI-driven anomalies, trends, recommended actions.</td><td>Good data foundation · Clear business metrics.</td></tr>
          <tr><td><strong>Workflow Copilot</strong> — Embedded AI assistant with contextual guidance, auto-fill.</td><td>Deep workflow understanding · Proven Level 2 accuracy.</td></tr>
          <tr><td><strong>Predictive Analytics</strong> — Forecast churn, demand, risk from historical patterns.</td><td>12+ months clean data · Outcome measurement · Validation.</td></tr>

          <tr><th rowSpan="3" style={{ background: 'var(--c-roadmap-wash)', verticalAlign: 'top' }}>Level 4<br /><span className="mono" style={{ fontSize: '7pt', letterSpacing: '0.14em', color: 'var(--primary)' }}>AUTOMATION</span></th><td><strong>Auto-Routing & Dispatch</strong> — AI routes work to optimal handler.</td><td>Mature workflow mapping · 90+ days proven accuracy.</td></tr>
          <tr><td><strong>Exception-Based Processing</strong> — AI handles standard; humans handle exceptions.</td><td>High-volume repetitive decisions · Clear exception criteria · Audit trail.</td></tr>
          <tr><td><strong>Dynamic Optimization</strong> — AI adjusts parameters within bounds.</td><td>Real-time data · Defined guardrails · Rollback capability.</td></tr>

          <tr><th rowSpan="3" style={{ background: 'var(--c-roadmap-wash)', verticalAlign: 'top' }}>Level 5<br /><span className="mono" style={{ fontSize: '7pt', letterSpacing: '0.14em', color: 'var(--primary)' }}>SYSTEM OF ACTION</span></th><td><strong>Agentic Workflow Execution</strong> — Autonomous multi-step workflow completion.</td><td>All diagnostics ≥3 · Proven Level 4 · Full audit infrastructure.</td></tr>
          <tr><td><strong>HITL Oversight System</strong> — Structured human-in-the-loop escalation and approval.</td><td>Defined escalation criteria · Trained reviewers · Real-time monitoring.</td></tr>
          <tr><td><strong>Audit & Control Layer</strong> — Complete traceability of AI decisions and outcomes.</td><td>Regulatory or business requirement · Full logging · Governance process.</td></tr>
        </tbody>
      </table>
    </div>
  </section>;


// ---- Section 6: Execute ----
const ExecuteOpener = () => <Divider num="06" color="var(--c-execute)" title="Execute." em="Pilot architecture."
blurb="Turn the prioritized roadmap into a scoped, resourced, time-bound pilot. Define success, confirm ownership, and install the conditions for internal execution to succeed."
foot1="§ 6 · Execute" foot2="Folio 022" />;

const ExecutePage1 = () =>
<section className="page" data-runhead="§ 06 · EXECUTE · PILOT ARCHITECTURE" data-folio="023">
    <div className="margin">
      <div className="m-label">Stage</div>
      <div className="m-note"><span className="m-num">§ 06</span>Execute</div>
      <div className="m-label">Principle</div>
      <div className="m-note">Scope to the weakest constraint. One workflow, one outcome.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-execute)', '--primary-2': 'var(--c-execute-2)', '--primary-wash': 'var(--c-execute-wash)' }}>
      <span className="eyebrow">Stage 06 · Execute</span>
      <h2 className="section-title">How diagnostics shape execution.</h2>
      <p className="lead">Execute is not implementation. It is the architecture that makes implementation succeed: scope, ownership, resourcing, success criteria, decision gate.</p>

      <h3 className="sub-title">Diagnostic scores → execution decisions</h3>
      <table className="framework-table">
        <thead><tr><th>Execution Decision</th><th>Primary Diagnostic Input</th><th>What Low Scores Signal</th></tr></thead>
        <tbody>
          {[
        ['Build vs. Buy vs. Partner', 'Talent (7), Architecture (5)', 'Low talent → partner or buy. Low infra → buy before build.'],
        ['Pilot Scope & Duration', 'Data (4), Workflow (3)', 'Low data → longer pilot. Low workflow → narrow scope first.'],
        ['Pilot Lead & Owner', 'Leadership (2), Talent (7)', 'Low leadership → assign sponsor first. Low talent → external PM lead.'],
        ['Trust & Rollout Approach', 'Trust (6)', 'Low trust → assistive-only, no automated actions, full human review.'],
        ['Success Metric Selection', 'Strategic (1), Data (4)', 'Low value clarity → proxy metrics. Low data → measure adoption before outcomes.']].
        map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td style={{ color: 'var(--ink-2)' }}>{r[2]}</td></tr>)}
        </tbody>
      </table>

      <div className="callout warning" style={{ marginTop: 12 }}>
        <span className="c-label">! · Diagnostic mismatch</span>
        If the proposed execution plan is inconsistent with diagnostic scores, for example, an automated workflow play at a company with Trust score 1, <strong>stop</strong>. Return to Grade and verify the AI Readiness Level assignment before proceeding.
      </div>

      <h3 className="sub-title">Build vs. Buy vs. Partner</h3>
      <div className="grid-3" style={{ gap: 10 }}>
        {[
      { t: 'Build', when: 'Talent ≥ 3 · Engineering capacity confirmed · Proprietary workflow · Long-term ownership.' },
      { t: 'Buy / Integrate', when: 'Talent ≤ 2 · Vendor solution adequate · Speed > customization · Infra ≥ 2.' },
      { t: 'Partner / Embed', when: 'Talent 0–1 · No internal PM · Play complexity exceeds team capacity.' }].
      map((o) =>
      <div key={o.t} className="cell">
            <div className="c-head">Option</div>
            <h4>{o.t}</h4>
            <p>{o.when}</p>
          </div>
      )}
      </div>

      <h3 className="sub-title">Scoping Principles</h3>
      <ol className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt', lineHeight: 1.45 }}>
        <li><strong>One workflow, one outcome.</strong> Multi-outcome pilots obscure causality.</li>
        <li><strong>Scope to the weakest constraint.</strong> The lowest diagnostic score sets the scope.</li>
        <li><strong>Define the exit before launch.</strong> Date, sample size, or metric threshold.</li>
        <li><strong>Name the owner before start.</strong> No owner, no pilot.</li>
      </ol>
    </div>
  </section>;


const ExecutePage2 = () =>
<section className="page" data-runhead="§ 06 · EXECUTE · PHASES & HANDOFF" data-folio="024">
    <div className="margin">
      <div className="m-label">Phases</div>
      <div className="m-note">Setup · Launch · Measure · Decide</div>
      <div className="m-label">Decision</div>
      <div className="m-note">Expand · Extend · Stop — with documented rationale.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-execute)', '--primary-2': 'var(--c-execute-2)', '--primary-wash': 'var(--c-execute-wash)' }}>
      <h3 className="sub-title">Four Execution Phases</h3>
      <table className="framework-table">
        <thead><tr><th style={{ width: '18%' }}>Phase</th><th>Activity</th><th style={{ width: '24%' }}>Diagnostic Inputs</th><th style={{ width: '24%' }}>Handoff</th></tr></thead>
        <tbody>
          {[
        ['01 · Setup', 'Confirm owner. Finalize scope. Resolve resource gaps. Run trust/legal review.', 'D2 sponsor · D4 data access · D6 review · D7 owner', 'Signed pilot brief · Launch criteria met.'],
        ['02 · Launch', 'Deploy to pilot segment. Establish baseline. Confirm instrumentation. Brief users on what AI does.', 'D3 workflow docs · D4 event tracking · D6 user disclosure', 'Baseline captured · Monitoring active.'],
        ['03 · Measure', 'Track primary + secondary metrics weekly. Document overrides. Sponsor midpoint review.', 'D1 business metrics · D4 behavioral data · D6 override tracking', 'Weekly report · Override catalog updated.'],
        ['04 · Decide', 'Evaluate against success criteria. Sponsor chooses: Expand, Extend, or Stop.', 'Compare pilot performance to pre-pilot diagnostic', 'Decision memo · Roadmap update if Expand.']].
        map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td className="mono" style={{ fontSize: '8pt' }}>{r[2]}</td><td style={{ color: 'var(--ink-2)' }}>{r[3]}</td></tr>)}
        </tbody>
      </table>

      <h3 className="sub-title">Owner Handoff</h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>Execute ends with a handoff. The Value Creation role defines pilot architecture and governs the decision gate. Day-to-day delivery belongs to the portfolio company.</p>
      <div className="grid-2" style={{ marginTop: 8 }}>
        <div className="cell">
          <div className="c-head">Value Creation Responsibility</div>
          <ul className="clean" style={{ fontSize: '9pt' }}>
            <li>Define pilot scope and success criteria</li>
            <li>Confirm diagnostic constraints are addressed</li>
            <li>Facilitate Build vs. Buy decision</li>
            <li>Establish measurement framework</li>
            <li>Run Phase 4 decision gate with sponsor</li>
          </ul>
        </div>
        <div className="cell">
          <div className="c-head">Portfolio Company Responsibility</div>
          <ul className="clean" style={{ fontSize: '9pt' }}>
            <li>Assign internal PM or program lead</li>
            <li>Execute sprint work and integration</li>
            <li>Manage vendor relationships if Buy chosen</li>
            <li>Own day-to-day metric tracking</li>
            <li>Implement expansion plan if Expand reached</li>
          </ul>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 14 }}>
        <span className="c-label">Resource gap = pilot blocker</span>
        If any required resource cannot be confirmed before launch date, the pilot is <strong>blocked, not delayed</strong>. A pilot that starts without an owner, data foundation, or trust review will not produce valid results.
      </div>
    </div>
  </section>;


// ---- Section 7: Validate ----
const ValidateOpener = () => <Divider num="07" color="var(--c-validate)" title="Validate." em="Measure, iterate, decide."
blurb="The accountability layer. Determine whether AI initiatives are working, why, what happens next, and whether the company's readiness profile has shifted."
foot1="§ 7 · Validate" foot2="Folio 025" />;

const ValidatePage = () =>
<section className="page" data-runhead="§ 07 · VALIDATE · MEASURE, ITERATE, DECIDE" data-folio="026">
    <div className="margin">
      <div className="m-label">Stage</div>
      <div className="m-note"><span className="m-num">§ 07</span>Validate</div>
      <div className="m-label">Loop</div>
      <div className="m-note">Validate → Evaluate. The feedback loop is what prevents this from being a one-time engagement.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-validate)', '--primary-2': 'var(--c-validate-2)', '--primary-wash': 'var(--c-validate-wash)' }}>
      <span className="eyebrow">Stage 07 · Validate</span>
      <h2 className="section-title">The accountability layer.</h2>
      <p className="lead">Without Validate, the framework produces plans but not learning. This stage turns execution into evidence, evidence into decisions, and decisions into better readiness choices over time.</p>

      <h3 className="sub-title">The Four Questions</h3>
      <ol className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '10pt', lineHeight: 1.45 }}>
        <li><strong>Did it work?</strong> Measure outcomes against the success criteria defined in Execute.</li>
        <li><strong>Why or why not?</strong> Diagnose root cause: model, data, adoption, or trust.</li>
        <li><strong>What's next?</strong> Expand, iterate, pivot, or kill.</li>
        <li><strong>Has readiness changed?</strong> Update the profile and feed back into Evaluate.</li>
      </ol>

      <h3 className="sub-title">Validation Checkpoints</h3>
      <table className="framework-table">
        <thead><tr><th>Checkpoint</th><th>Timing</th><th>Focus</th><th>Decision</th></tr></thead>
        <tbody>
          {[
        ['Pulse Check', '2–4 wks post-launch', 'Users engaging? Data flowing? Technical blockers?', 'Continue · adjust · pause and investigate.'],
        ['Performance Review', '6–8 wks', 'Meeting success criteria? Acceptance vs. override? User feedback?', 'Iterate · expand to more users · flag for pivot.'],
        ['Impact Assessment', '12–16 wks', 'Measurable business impact? ROI justifies investment?', 'Expand · pivot · iterate · kill.']].
        map((r) => <tr key={r[0]}><th>{r[0]}</th><td className="mono" style={{ fontSize: '8pt' }}>{r[1]}</td><td>{r[2]}</td><td style={{ color: 'var(--ink-2)' }}>{r[3]}</td></tr>)}
        </tbody>
      </table>

      <h3 className="sub-title">Expand · Iterate · Pivot · Kill</h3>
      <div className="grid-4" style={{ gap: 10 }}>
        {[
      { t: 'Expand', c: 'Meets or exceeds criteria across 3+ metric categories. Positive feedback. No unresolved trust or data issues.', color: 'var(--emerald-2)' },
      { t: 'Iterate', c: 'Promise in 1–2 categories; underperforms in others. Root cause addressable. Cap at 2 iterations.', color: 'var(--sapphire-2)' },
      { t: 'Pivot', c: 'Technically works but wrong use case. User behavior reveals higher-value application.', color: 'var(--amber-2)' },
      { t: 'Kill', c: 'Does not meet criteria after 2 iterations. Root cause is structural. Document why.', color: 'var(--garnet-2)' }].
      map((d) =>
      <div key={d.t} className="cell" style={{ borderTop: `1.5pt solid ${d.color}` }}>
            <div className="c-head" style={{ color: d.color }}>Decision</div>
            <h4>{d.t}</h4>
            <p style={{ fontSize: '8.5pt' }}>{d.c}</p>
          </div>
      )}
      </div>

      <div className="callout quote" style={{ marginTop: 16 }}>
        <span className="c-label">The Validate loop</span>
        If the composite grade improves by one full letter, the company may be ready to upgrade its AI Readiness Level. If the grade has not improved, investigate: instrumentation incomplete, sponsor changed, or pilot poorly scoped.
      </div>
    </div>
  </section>;


// ---- Section 8: Compound ----
const CompoundOpener = () => <Divider num="08" color="var(--c-value)" title="Compound." em="Portfolio intelligence."
blurb="Every assessment makes the next one faster, cheaper, and more precise. Convert cross-portfolio patterns into reusable intelligence: the moat."
foot1="§ 8 · Compound" foot2="Folio 027" />;

const CompoundPage = () =>
<section className="page" data-runhead="§ 08 · COMPOUND · PORTFOLIO INTELLIGENCE" data-folio="028">
    <div className="margin">
      <div className="m-label">Stage</div>
      <div className="m-note"><span className="m-num">§ 08</span>Compound</div>
      <div className="m-label">Moat</div>
      <div className="m-note">45-company playbook, vertical benchmarks, predictive pre-reads: proprietary intelligence no other firm possesses.</div>
    </div>
    <div className="body-col" style={{ '--primary': 'var(--c-value)', '--primary-2': 'var(--c-value-2)', '--primary-wash': 'var(--c-value-wash)' }}>
      <span className="eyebrow">Stage 08 · Compound</span>
      <h2 className="section-title">Each engagement improves the next.</h2>
      <p className="lead">Capture cross-portfolio patterns. Convert them into reusable intelligence. Compound over 10, 20, 45 engagements.</p>

      <div style={{ margin: '10px 0 14px' }}><CCurve /></div>

      <h3 className="sub-title">What to Capture</h3>
      <table className="framework-table">
        <thead><tr><th>Pattern</th><th>What to Record</th><th>Why It Matters</th></tr></thead>
        <tbody>
          {[
        ['Common Blockers', 'Leadership gaps, data deficits, compliance concerns, talent scarcity appearing across companies.', 'Standard remediation playbooks. Reduced diagnosis time.'],
        ['Readiness Patterns', 'Do SaaS companies cluster on workflow clarity? Logistics on data? Healthcare on trust?', 'Predictive pre-assessment. Profile new company types before the first meeting.'],
        ['Repeatable Use Cases', 'Churn prediction, intelligent scheduling, search, summarization across verticals.', 'Templated execution. Diagnosis to first pilot in days, not weeks.'],
        ['Failed Approaches', 'Skipped levels, over-invested in tech before data, launched without trust frameworks.', 'Guard rails. Most valuable learning comes from failure.'],
        ['Time-to-Value', 'Diagnosis to first measurable AI value. What accelerated or delayed.', 'Realistic expectations. Bottleneck identification.']].
        map((r) => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td style={{ color: 'var(--ink-2)' }}>{r[2]}</td></tr>)}
        </tbody>
      </table>

      <div className="callout quote" style={{ marginTop: 14 }}>
        <span className="c-label">The compounding moat</span>
        After 10 companies, patterns emerge. After 20, a playbook. After 45, a proprietary intelligence layer no other firm possesses. <em>This is the moat.</em>
      </div>
    </div>
  </section>;


// ---- Section 9: Prioritization Matrix ----
const MatrixPage = () =>
<section className="page" data-runhead="§ 09 · OPPORTUNITY PRIORITIZATION MATRIX" data-folio="029">
    <div className="margin">
      <div className="m-label">Reference</div>
      <div className="m-note"><span className="m-num">§ 09</span>Prioritization Matrix</div>
      <div className="m-label">Purpose</div>
      <div className="m-note">Ranks eligible opportunities for the 90-day plan. Applied at the Grade → Roadmap transition.</div>
    </div>
    <div className="body-col">
      <span className="eyebrow">Section 09 · Reference</span>
      <h2 className="section-title">Opportunity Prioritization Matrix.</h2>
      <p className="lead">The diagnostics identify where AI <em>could</em> create value. The matrix determines where AI <em>should</em> create value first. Every opportunity scored 1–5 across seven weighted criteria.</p>

      <div style={{ margin: '8px 0 14px' }}><PMatrix /></div>

      <h3 className="sub-title">Scoring Criteria</h3>
      <table className="framework-table">
        <thead><tr><th>Criterion</th><th>Wt</th><th>1 (Low)</th><th>3 (Medium)</th><th>5 (High)</th></tr></thead>
        <tbody>
          {[
        ['User Impact', '20%', 'Few users, minor step.', 'Meaningful segment, common workflow.', 'Majority of users, core workflow.'],
        ['Data Availability', '20%', 'Required data doesn\'t exist.', 'Some data, gaps in quality/coverage.', 'Captured, accessible, high quality, historical.'],
        ['Frequency', '15%', 'Monthly or less.', 'Weekly.', 'Daily or multiple times daily.'],
        ['Trust Feasibility', '15%', 'High-stakes, severe consequences.', 'Moderate stakes, recoverable, overridable.', 'Low-stakes or easily reversible.'],
        ['Decision Complexity', '10%', 'Simple binary, obvious answer.', 'Multi-factor, moderate ambiguity.', 'Pattern recognition, prediction, synthesis.'],
        ['Implementation', '10%', 'New infra + talent required.', 'Existing team, moderate investment.', 'Existing tools/APIs, minimal dev.'],
        ['Time to Value', '10%', '12+ months.', '3–12 months.', 'Under 3 months.']].
        map((r) => <tr key={r[0]}><th>{r[0]}</th><td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{r[1]}</td><td style={{ color: 'var(--ink-3)' }}>{r[2]}</td><td>{r[3]}</td><td style={{ fontWeight: 600 }}>{r[4]}</td></tr>)}
        </tbody>
      </table>

      <h3 className="sub-title">Prioritization Rules</h3>
      <ul className="clean" style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt', lineHeight: 1.45 }}>
        <li><strong>Data Availability = 1</strong> → automatically deferred until instrumentation is complete. No exceptions.</li>
        <li><strong>Trust Feasibility = 1</strong> → requires trust framework development before piloting. Deploy at Suggest level only, or defer.</li>
        <li><strong>Top 3 by composite score</strong> become the recommended initiative set for the 90-day plan.</li>
        <li><strong>Quick Wins</strong> → score ≥4 on both User Impact and Data Availability should be prioritized even if other scores are moderate.</li>
        <li><strong>High-Complexity, High-Impact</strong> → 5 on User Impact but ≤2 on Implementation flagged for medium-term (3–9 mo), not the first 90 days.</li>
      </ul>

      <div className="callout" style={{ marginTop: 14 }}>
        <span className="c-label">Applying the matrix</span>
        Applied at the transition from <strong>Grade → Roadmap</strong>. Revisited at each Validate checkpoint. As data improves and trust frameworks develop, previously deferred opportunities may become viable. The rank order evolves as the company evolves.
      </div>
    </div>
  </section>;


// ---- Colophon ----
const ColophonPage = () =>
<section className="page" data-runhead="" data-folio="">
    <div className="margin">
      <div className="m-label">Colophon</div>
      <div className="m-note">Typeset in Source Serif 4, Inter, and JetBrains Mono. Composed for letter-size print.</div>
    </div>
    <div className="body-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <span className="eyebrow">
</span>
        <h2 className="section-title">Colophon & Use Notes.</h2>
        <hr className="rule-heavy" />
        <p className="lead">The AI Product Value Creation Framework is a decision-making instrument. It is most valuable when used consistently across a portfolio — when findings compare, lessons compound, and each engagement sharpens the next one.</p>

        <div className="grid-2" style={{ marginTop: 20 }}>
          <div>
            <h4 className="minor">Authorship</h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>Austin Stretz, April 2026. Derived from working draft v0.43 with structural and typographic revision. Revision 1.0.</p>

            <h4 className="minor">Intended Use</h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>For portfolio-practice use. Each stage produces a concrete output that feeds the next decision. The framework is not exploratory consulting.</p>
          </div>
          <div>
            <h4 className="minor">Typography</h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>Source Serif 4 (body, display). Inter (tables, captions). JetBrains Mono (labels, folios, metadata).</p>

            <h4 className="minor">Palette</h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9.5pt' }}>Emerald (primary), Sapphire, Garnet, Amber — assigned systematically to stages and phases. Warm cream substrate with ink-black type.</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1pt solid var(--ink)', paddingTop: 12, fontFamily: 'var(--font-mono)', fontSize: '7.5pt', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
        <div>AI Product Value Creation Framework · v1.0</div>
        <div>Confidential · Portfolio Practice</div>
      </div>
    </div>
  </section>;

window.ReportPart3 = {
  GradeOpener, GradePage,
  RoadmapOpener, RoadmapPage1, RoadmapPage2,
  ExecuteOpener, ExecutePage1, ExecutePage2,
  ValidateOpener, ValidatePage,
  CompoundOpener, CompoundPage,
  MatrixPage, ColophonPage
};