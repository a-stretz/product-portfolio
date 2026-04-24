/* ============================================================
   FULL REPORT — v0.43 — PART 2 (Diagnostics)
   ============================================================ */

const { DiagnosticIcons: DIcons } = window;

// Reusable diagnostic component
const Diagnostic = ({ num, title, icon, objective, processes, rubric, folio, runhead, footer, marginNote }) => (
  <section className="page" data-runhead={runhead} data-folio={folio}>
    <div className="margin">
      <div className="m-label">Diagnostic</div>
      <div className="m-note"><span className="m-num">§ 3.{num}</span>{title}</div>
      <div className="m-label">Scoring</div>
      <div className="m-note">0–4 scale · evidence-based</div>
      {marginNote && <>
        <div className="m-label">Note</div>
        <div className="m-note">{marginNote}</div>
      </>}
    </div>
    <div className="body-col">
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10}}>
        <div style={{color: 'var(--primary)', display: 'flex', alignItems: 'center'}}>{icon}</div>
        <div className="eyebrow" style={{marginBottom: 0}}>Diagnostic · 3.{num}</div>
      </div>
      <h2 className="section-title" style={{fontSize: '24pt'}}>{title}</h2>
      <hr className="rule-primary"/>

      <h3 className="sub-title">Diagnostic Objective</h3>
      <p style={{fontFamily: 'var(--font-serif)', fontSize: '10.5pt', lineHeight: 1.45, color: 'var(--ink-2)'}}>{objective}</p>

      <h3 className="sub-title">Diagnostic Processes & Outputs</h3>
      <div className="grid-2" style={{gap: 10, marginTop: 8}}>
        {processes.map((p, i) => (
          <div key={i} style={{borderTop: '0.5pt solid var(--ink)', paddingTop: 8}}>
            <div className="mono" style={{fontSize: '7pt', letterSpacing: '0.14em', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 3}}>{p.name}</div>
            <div style={{fontFamily: 'var(--font-sans)', fontSize: '9pt', lineHeight: 1.4, color: 'var(--ink-2)'}}>{p.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="sub-title">Scoring Rubric</h3>
      <div className="rubric">
        {rubric.map((r, i) => (
          <div key={i} className="rubric-cell" data-level={i}>
            <span className="r-num">Score {i}</span>
            <span className="r-name">{r.name}</span>
            {r.desc}
          </div>
        ))}
      </div>

      {footer && <div style={{marginTop: 14}}>{footer}</div>}
    </div>
  </section>
);

// ---- Section 3 opener ----
const EvaluateOpener = () => (
  <section className="page divider">
    <div className="d-top">
      <div>Stage 01 · Evaluate</div>
      <div>Folio 007</div>
    </div>
    <div className="d-main">
      <div className="d-num" style={{color: 'var(--c-evaluate)'}}>03</div>
      <h2 style={{color: 'var(--ink)'}}>The <em style={{color: 'var(--c-evaluate)', fontStyle: 'italic'}}>Eight Diagnostics</em>.</h2>
      <div className="d-blurb">Eight dimensions. One standardized structure. Every engagement scored the same way so findings compare across a 45-company portfolio.</div>
    </div>
    <div className="d-bottom">
      <div>3.1 Strategic Urgency — 3.8 Competitive Position</div>
      <div>Scoring 0–4</div>
    </div>
  </section>
);

const D1 = () => <Diagnostic
  num="1" title="Strategic Urgency & Business Case"
  icon={<DIcons.strategic/>}
  runhead="§ 3.1 · STRATEGIC URGENCY & BUSINESS CASE" folio="008"
  objective="Whether AI is important enough to justify investment now, based on business value, demonstrated customer demand, and competitive pressure. This diagnostic tests whether the case for AI is real, timely, and tied to an identifiable outcome rather than general interest or market noise."
  processes={[
    {name: 'Strategic Urgency Assessment', desc: 'Review of business priorities, growth goals, and near-term strategic pressure.'},
    {name: 'Customer Demand Assessment', desc: 'Analysis of customer demand signals, buying signals, competitive pressure, and cost of inaction.'},
    {name: 'Preliminary Business Case', desc: 'Initial test of whether the top AI opportunities can be tied to credible business value.'},
  ]}
  rubric={[
    {name: 'No Case', desc: 'No customer demand or business case for AI.'},
    {name: 'Vague Interest', desc: 'General but vague interest in AI; no specific outcome.'},
    {name: 'Emerging Case', desc: 'Plausible use case identified; some demand signals.'},
    {name: 'Strong Case', desc: 'Clear, validated customer demand and business value.'},
    {name: 'Critical Imperative', desc: 'AI is strategically necessary; inaction carries real cost.'},
  ]}
  marginNote="The case for AI must be real, timely, and tied to an identifiable outcome, not general interest."
/>;

const D2 = () => <Diagnostic
  num="2" title="Leadership Readiness & Alignment"
  icon={<DIcons.leadership/>}
  runhead="§ 3.2 · LEADERSHIP READINESS & ALIGNMENT" folio="009"
  objective="Leadership sponsorship, alignment, and decision-making readiness for AI. This diagnostic evaluates whether there is clear ownership, shared commitment, and enough organizational support to move from interest to execution — including how leadership has handled prior AI initiatives or adjacent transformation efforts."
  processes={[
    {name: 'Leadership Alignment Assessment', desc: 'Review of executive priorities, alignment, and decision-making consistency around AI.'},
    {name: 'AI Ownership Map', desc: 'Who owns AI strategy, with what authority, budget, and accountability.'},
    {name: 'Sponsorship Assessment', desc: 'Evaluation of leadership willingness to resource and sustain AI efforts; lessons from prior initiatives.'},
  ]}
  rubric={[
    {name: 'Absent', desc: 'No ownership or priority.'},
    {name: 'Fragmented', desc: 'Unclear alignment or commitment.'},
    {name: 'Emerging', desc: 'Some support but not durable.'},
    {name: 'Aligned', desc: 'Clear ownership and sponsorship.'},
    {name: 'Embedded', desc: 'Part of leadership strategy.'},
  ]}
  marginNote="Leadership is the primary gate. Weak sponsorship caps readiness regardless of technical capability."
/>;

const D3 = () => <Diagnostic
  num="3" title="Product & Workflow Clarity"
  icon={<DIcons.workflow/>}
  runhead="§ 3.3 · PRODUCT & WORKFLOW CLARITY" folio="010"
  objective="Product and workflow clarity across the core user journeys where AI may create value. This diagnostic evaluates how well the company understands its most important workflows, decision points, friction areas, and override behavior — and whether that understanding is strong enough to target AI in a useful and defensible way."
  processes={[
    {name: 'Workflow Mapping', desc: 'End-to-end documentation of the top 3–5 workflows, including steps, decision points, and system interactions.'},
    {name: 'Friction Heatmap', desc: 'Where users spend disproportionate time, where error rates peak, and where abandonment occurs.'},
    {name: 'Override Analysis', desc: 'Catalog every point where users override, correct, or bypass system defaults.'},
    {name: 'Decision Point Inventory', desc: 'Classify key human decisions by complexity, frequency, and reversibility.'},
  ]}
  rubric={[
    {name: 'Opaque', desc: 'Workflows not understood.'},
    {name: 'Informal', desc: 'Anecdotal workflow knowledge only.'},
    {name: 'Partial', desc: 'Key workflows partly understood.'},
    {name: 'Clear', desc: 'Workflows support AI targeting.'},
    {name: 'Instrumented', desc: 'Workflows measured with confidence.'},
  ]}
  marginNote="Override points are the strongest signal of AI opportunity: they reveal where rules fail and judgment takes over."
/>;

const D4 = () => <Diagnostic
  num="4" title="Data & Instrumentation Maturity"
  icon={<DIcons.data/>}
  runhead="§ 3.4 · DATA & INSTRUMENTATION MATURITY" folio="011"
  objective="Data readiness, instrumentation quality, and accessibility across the workflows where AI may create value. This diagnostic evaluates whether the company has the behavioral, outcome, and system-level data needed to support useful, measurable, and scalable AI applications."
  processes={[
    {name: 'Event Schema Audit', desc: 'Review of event-level, behavioral, and correction data currently captured.'},
    {name: 'Data Pipeline Review', desc: 'Accessibility, movement, latency, and usability for analysis or AI workflows.'},
    {name: 'Outcome Linkage Test', desc: 'Whether actions can be tied to business outcomes in a reliable way.'},
    {name: 'Data Quality Assessment', desc: 'Completeness, consistency, and reliability of available data.'},
  ]}
  rubric={[
    {name: 'No Foundation', desc: 'No usable data base.'},
    {name: 'Basic Capture', desc: 'Limited data coverage.'},
    {name: 'Partial Pipeline', desc: 'Important gaps remain.'},
    {name: 'Strong Foundation', desc: 'Data supports key use cases.'},
    {name: 'AI-Ready', desc: 'Scalable and reliable for AI.'},
  ]}
  marginNote="AI without data is guessing. A score of 0–1 here caps readiness at Level 1 regardless of other strengths."
/>;

const D5 = () => <Diagnostic
  num="5" title="Technical System & Architecture"
  icon={<DIcons.architecture/>}
  runhead="§ 3.5 · TECHNICAL SYSTEM & ARCHITECTURE" folio="012"
  objective="Technical architecture, system flexibility, and production readiness for AI. This diagnostic evaluates whether the company's systems can support experimentation, deployment, monitoring, and iteration for AI features in a practical and scalable way."
  processes={[
    {name: 'Architecture Review', desc: 'Current system architecture, major dependencies, coupling points, and technical constraints.'},
    {name: 'Deployment Velocity', desc: 'How quickly the team can ship, test, and roll back changes in production.'},
    {name: 'Observability Audit', desc: 'Logging, monitoring, and alerting readiness for AI features and model outputs.'},
  ]}
  rubric={[
    {name: 'Rigid', desc: 'Not ready for AI delivery.'},
    {name: 'Constrained', desc: 'Limited flexibility and control.'},
    {name: 'Functional', desc: 'Supports some AI work.'},
    {name: 'Flexible', desc: 'Supports rollout and monitoring.'},
    {name: 'AI-Optimized', desc: 'Built for scalable AI operations.'},
  ]}
/>;

const D6 = () => <Diagnostic
  num="6" title="Trust, Risk & Governance"
  icon={<DIcons.trust/>}
  runhead="§ 3.6 · TRUST, RISK & GOVERNANCE" folio="013"
  objective="User trust, error tolerance, governance maturity, and regulatory constraints around AI. This diagnostic evaluates whether the company can introduce AI in a way that is safe, controllable, and credible for users, operators, and the business."
  processes={[
    {name: 'Governance & Compliance Review', desc: 'Regulatory constraints, compliance requirements, and ability to monitor, override, and recover from AI-driven decisions.'},
    {name: 'Error Impact Assessment', desc: 'Business, operational, legal, and reputational consequences of AI being wrong.'},
    {name: 'User Trust Assessment', desc: 'User willingness to rely on AI outputs, including where control, explainability, or override is required.'},
  ]}
  rubric={[
    {name: 'Unexamined', desc: 'Trust and risk not assessed.'},
    {name: 'Informal', desc: 'Concerns known but loosely managed.'},
    {name: 'Basic', desc: 'Key issues understood.'},
    {name: 'Defined', desc: 'Controls and boundaries clear.'},
    {name: 'Mature', desc: 'Strong governance and oversight.'},
  ]}
  marginNote="Trust is a gating constraint: 0–1 caps at Level 2 (assistive only), regardless of data or talent maturity."
/>;

const D7 = () => <Diagnostic
  num="7" title="Technical Talent & Engineering Capability"
  icon={<DIcons.talent/>}
  runhead="§ 3.7 · TECHNICAL TALENT & CAPABILITY" folio="014"
  objective="Technical talent, engineering capability, and execution capacity for production-grade AI development and enablement. This diagnostic evaluates whether the company has the people, skills, and delivery capacity to build, integrate, support, and sustain AI initiatives in a practical way."
  processes={[
    {name: 'Engineering Capability', desc: 'Team size, technical skill mix, and experience with AI, ML, data, and production delivery.'},
    {name: 'Build / Buy / Partner', desc: 'Whether likely opportunities should be built internally, enabled through third-party tools, or supported through external partners.'},
    {name: 'Execution Capacity', desc: 'Current bandwidth, technical debt, and ability to take on AI work alongside existing priorities.'},
  ]}
  rubric={[
    {name: 'No Capability', desc: 'Lacks skills or capacity.'},
    {name: 'Consumer Level', desc: 'Personal use only.'},
    {name: 'API Capable', desc: 'Can integrate external tools.'},
    {name: 'AI Competent', desc: 'Meaningful delivery capability.'},
    {name: 'AI Native', desc: 'Strong in-house AI capability.'},
  ]}
/>;

const D8 = () => <Diagnostic
  num="8" title="Competitive Position & Market Context"
  icon={<DIcons.competitive/>}
  runhead="§ 3.8 · COMPETITIVE POSITION & MARKET CONTEXT" folio="015"
  objective="Competitive position, market pressure, and external demand signals related to AI. This diagnostic evaluates whether AI is becoming a meaningful factor in the company's market, how exposed the company is to competitive risk, and how well leadership understands the external landscape."
  processes={[
    {name: 'Competitive Landscape Review', desc: 'Competitor AI capabilities, launches, positioning, and visible market movement.'},
    {name: 'Customer Demand Signals', desc: 'Customer requests, buyer expectations, and sales or retention signals related to AI.'},
    {name: 'Market Position Assessment', desc: 'Where the company sits relative to peers and how urgently AI may affect its position.'},
  ]}
  rubric={[
    {name: 'Non-Factor', desc: 'AI not relevant in market.'},
    {name: 'Emerging', desc: 'Early AI signals only.'},
    {name: 'Heating Up', desc: 'AI visibility increasing.'},
    {name: 'Competitive Pressure', desc: 'AI affects position.'},
    {name: 'AI-Defined Market', desc: 'AI is a major buying criterion.'},
  ]}
/>;

// ---- Diagnostic quick reference ----
const DiagnosticQuickRef = () => (
  <section className="page" data-runhead="§ 3.X · DIAGNOSTIC QUICK REFERENCE" data-folio="016">
    <div className="margin">
      <div className="m-label">Reference</div>
      <div className="m-note"><span className="m-num">§ 3.X</span>Quick Reference</div>
      <div className="m-label">Use</div>
      <div className="m-note">Printable card for live assessments. All eight diagnostics on one page.</div>
    </div>
    <div className="body-col">
      <span className="eyebrow">Diagnostic Scoring Quick Reference</span>
      <h2 className="section-title">All eight dimensions, side by side.</h2>
      <p className="lead">Keep this page within reach during the scoring session. Each row shows the 0–4 scale for one dimension.</p>

      <table className="framework-table" style={{marginTop: 14}}>
        <thead>
          <tr>
            <th style={{width: '22%'}}>Diagnostic</th>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['1 · Strategic Urgency','No case','Vague interest','Emerging case','Strong case','Critical imperative'],
            ['2 · Leadership','Absent','Fragmented','Emerging','Aligned','Embedded'],
            ['3 · Workflow Clarity','Opaque','Informal','Partial','Clear','Instrumented'],
            ['4 · Data & Instrumentation','No foundation','Basic capture','Partial pipeline','Strong foundation','AI-ready'],
            ['5 · Architecture','Rigid','Constrained','Functional','Flexible','AI-optimized'],
            ['6 · Trust & Governance','Unexamined','Informal','Basic','Defined','Mature'],
            ['7 · Technical Talent','No capability','Consumer level','API capable','AI competent','AI native'],
            ['8 · Competitive Position','Non-factor','Emerging','Heating up','Pressure','AI-defined'],
          ].map(r => (
            <tr key={r[0]}>
              <th>{r[0]}</th>
              <td style={{color: 'var(--ink-3)'}}>{r[1]}</td>
              <td style={{color: 'var(--ink-2)'}}>{r[2]}</td>
              <td>{r[3]}</td>
              <td style={{fontWeight: 600}}>{r[4]}</td>
              <td style={{fontWeight: 700, color: 'var(--primary)'}}>{r[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout" style={{marginTop: 20}}>
        <span className="c-label">Reading the rubric</span>
        Scores move from organizational absence (0) to strategic embedding (4). <strong>2</strong> is the working threshold. Below 2, the dimension is a blocker that must be addressed before higher-order AI is viable.
      </div>

      <div style={{marginTop: 18}}>
        <h3 className="sub-title">Sample Portfolio Profile — Illustrative</h3>
        <p className="muted" style={{fontFamily: 'var(--font-sans)', fontSize: '9pt'}}>Hypothetical Series-B vertical SaaS company. Strong strategic case and competitive pressure, constrained by data maturity and trust posture. This profile caps at Level 2 (Assistive Intelligence) pending data instrumentation.</p>
        <div style={{maxWidth: '4.5in', margin: '6px auto 0'}}>
          <DiagnosticRadar scores={[4, 3, 3, 1, 2, 1, 2, 3]}/>
        </div>
      </div>
    </div>
  </section>
);

window.ReportPart2 = {
  EvaluateOpener, D1, D2, D3, D4, D5, D6, D7, D8, DiagnosticQuickRef
};
