/* Diagram library — all SVG, inline, scale to container */

const FrameworkFlow = () => {
  const stages = [
    { n: '01', name: 'Evaluate', sub: 'Deep Diagnostic', color: 'var(--c-evaluate)' },
    { n: '02', name: 'Grade', sub: 'Readiness Classification', color: 'var(--c-grade)' },
    { n: '03', name: 'Roadmap', sub: 'Opportunity Prioritization', color: 'var(--c-roadmap)' },
    { n: '04', name: 'Execute', sub: 'Build, Pilot, Launch', color: 'var(--c-execute)' },
    { n: '05', name: 'Validate', sub: 'Measure, Iterate, Decide', color: 'var(--c-validate)' },
    { n: '06', name: 'Value Creation', sub: 'Portfolio Intelligence', color: 'var(--c-value)' },
  ];
  return (
    <div className="diagram-flow">
      <svg viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
        {/* connecting line */}
        <line x1="40" y1="60" x2="680" y2="60" stroke="var(--ink)" strokeWidth="0.6" />
        {/* feedback loop arrow from 05 back */}
        <path d="M 520 145 Q 520 180 280 180 Q 100 180 100 150" fill="none" stroke="var(--garnet-2)" strokeWidth="0.8" strokeDasharray="3 2" />
        <polygon points="100,150 96,156 104,156" fill="var(--garnet-2)" />
        <text x="300" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--garnet-2)" letterSpacing="2">FEEDBACK LOOP — VALIDATE UPDATES EVALUATE</text>

        {stages.map((s, i) => {
          const x = 40 + i * 128;
          return (
            <g key={s.n}>
              <circle cx={x} cy={60} r={11} fill={s.color} />
              <circle cx={x} cy={60} r={14} fill="none" stroke={s.color} strokeWidth="0.5" opacity="0.4" />
              <text x={x} y={63} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--paper)" fontWeight="700">{s.n}</text>
              <text x={x} y={92} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="11" fill="var(--ink)" fontWeight="500">{s.name}</text>
              <text x={x} y={106} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--ink-3)">{s.sub}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const ReadinessLadder = () => {
  const levels = [
    { n: '0', name: 'No Clear AI Case', band: 'Foundation', cat: 'Foundation Building' },
    { n: '1', name: 'Education & Framing', band: 'Foundation', cat: 'Foundation Building' },
    { n: '2', name: 'Assistive Intelligence', band: 'Play', cat: 'AI Play Eligible' },
    { n: '3', name: 'Product Differentiation', band: 'Play', cat: 'AI Play Eligible' },
    { n: '4', name: 'Workflow Automation', band: 'Play', cat: 'AI Play Eligible' },
    { n: '5', name: 'System of Action', band: 'Play', cat: 'AI Play Eligible' },
  ];
  return (
    <svg viewBox="0 0 720 380" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      {/* vertical axis */}
      <line x1="60" y1="40" x2="60" y2="340" stroke="var(--ink)" strokeWidth="0.8" />
      <polygon points="60,30 55,42 65,42" fill="var(--ink)" />
      <text x="42" y="28" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" fill="var(--ink-3)">SOPHISTICATION</text>

      {/* band backgrounds */}
      <rect x="80" y="230" width="620" height="110" fill="var(--emerald-wash)" opacity="0.5" />
      <rect x="80" y="40" width="620" height="188" fill="var(--sapphire-wash)" opacity="0.4" />

      <text x="700" y="56" textAnchor="end" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.8" fill="var(--sapphire-2)" fontWeight="700">AI PLAY ELIGIBLE</text>
      <text x="700" y="252" textAnchor="end" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.8" fill="var(--emerald-2)" fontWeight="700">FOUNDATION BUILDING</text>

      {levels.slice().reverse().map((l, idx) => {
        const i = 5 - idx;
        const y = 60 + idx * 48;
        const color = l.band === 'Foundation' ? 'var(--c-evaluate)' : 'var(--c-grade)';
        return (
          <g key={l.n}>
            <line x1="80" y1={y} x2="700" y2={y} stroke="var(--rule-2)" strokeWidth="0.4" strokeDasharray="2 2"/>
            <rect x="80" y={y-14} width="30" height="28" fill={color} />
            <text x="95" y={y+4} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="18" fill="var(--paper)" fontWeight="500">{l.n}</text>
            <text x="122" y={y-2} fontFamily="var(--font-serif)" fontSize="13" fill="var(--ink)" fontWeight="500">{l.name}</text>
            <text x="122" y={y+11} fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.4" fill="var(--ink-3)">LEVEL {l.n}</text>
          </g>
        );
      })}

      {/* band divider */}
      <line x1="80" y1="228" x2="700" y2="228" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="4 3"/>
      <text x="390" y="222" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2" fill="var(--ink)" fontWeight="700">GATING THRESHOLD</text>
    </svg>
  );
};

const DiagnosticRadar = ({ scores = [3, 2, 3, 2, 3, 2, 3, 2], label = 'Sample Company Profile' }) => {
  // 8 axes
  const axes = [
    'Strategic\nUrgency', 'Leadership', 'Workflow\nClarity', 'Data &\nInstrumentation',
    'Technical\nArchitecture', 'Trust, Risk\n& Governance', 'Technical\nTalent', 'Competitive\nPosition'
  ];
  const cx = 200, cy = 200, r = 140;
  const angleFor = (i) => (Math.PI * 2 * i) / 8 - Math.PI / 2;

  const pt = (i, v) => {
    const rr = (v / 4) * r;
    const a = angleFor(i);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  };

  const path = scores.map((s, i) => {
    const [x, y] = pt(i, s);
    return (i === 0 ? 'M' : 'L') + x + ',' + y;
  }).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      {/* concentric grid */}
      {[1, 2, 3, 4].map(lvl => {
        const pts = Array.from({length: 8}, (_, i) => {
          const [x, y] = pt(i, lvl);
          return x + ',' + y;
        }).join(' ');
        return <polygon key={lvl} points={pts} fill="none" stroke="var(--rule-2)" strokeWidth="0.4" strokeDasharray={lvl === 4 ? '0' : '2 2'} />;
      })}
      {/* axes */}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 4);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule-2)" strokeWidth="0.4" />;
      })}
      {/* level labels */}
      {[1,2,3,4].map(lvl => (
        <text key={lvl} x={cx + 4} y={cy - (lvl/4)*r + 3} fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-4)">{lvl}</text>
      ))}
      {/* data polygon */}
      <path d={path} fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeWidth="1.2" />
      {scores.map((s, i) => {
        const [x, y] = pt(i, s);
        return <circle key={i} cx={x} cy={y} r={3} fill="var(--primary)" />;
      })}
      {/* axis labels */}
      {axes.map((name, i) => {
        const a = angleFor(i);
        const lr = r + 26;
        const lx = cx + Math.cos(a) * lr;
        const ly = cy + Math.sin(a) * lr;
        const lines = name.split('\n');
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--ink)" fontWeight="500">
            {lines.map((ln, li) => (
              <tspan key={li} x={lx} dy={li === 0 ? -((lines.length - 1) * 5) : 10}>{ln}</tspan>
            ))}
          </text>
        );
      })}
      {/* score labels */}
      {scores.map((s, i) => {
        const [x, y] = pt(i, s);
        const a = angleFor(i);
        const lx = x + Math.cos(a) * 10;
        const ly = y + Math.sin(a) * 10 + 3;
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--primary)" fontWeight="700">{s}</text>
        );
      })}
    </svg>
  );
};

const GatingDecisionTree = () => {
  return (
    <svg viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      {/* root node: composite grade */}
      <g>
        <rect x="270" y="16" width="180" height="42" fill="var(--primary)" />
        <text x="360" y="33" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.6" fill="var(--paper)" fontWeight="700">START</text>
        <text x="360" y="48" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="11" fill="var(--paper)">Composite Grade</text>
      </g>

      {/* decision diamonds */}
      {[
        { x: 60, y: 100, label: 'Leadership\n0–1?', cap: 'Cap Level 1', capColor: 'var(--garnet-2)' },
        { x: 225, y: 100, label: 'Workflow\n0–1?', cap: 'Cap Level 1', capColor: 'var(--garnet-2)' },
        { x: 390, y: 100, label: 'Data\n0–1?', cap: 'Cap Level 1', capColor: 'var(--garnet-2)' },
        { x: 555, y: 100, label: 'Trust\n0–1?', cap: 'Cap Level 2', capColor: 'var(--amber-2)' },
      ].map((d, i) => (
        <g key={i}>
          <line x1="360" y1="58" x2={d.x + 55} y2={d.y} stroke="var(--ink)" strokeWidth="0.6" />
          <polygon points={`${d.x+55},${d.y} ${d.x+110},${d.y+30} ${d.x+55},${d.y+60} ${d.x},${d.y+30}`} fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="0.8"/>
          <text x={d.x+55} y={d.y+26} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--ink)" fontWeight="600">{d.label.split('\n')[0]}</text>
          <text x={d.x+55} y={d.y+38} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--ink)" fontWeight="600">{d.label.split('\n')[1]}</text>

          {/* Yes arrow down to cap */}
          <line x1={d.x+55} y1={d.y+60} x2={d.x+55} y2={d.y+100} stroke={d.capColor} strokeWidth="0.8" />
          <polygon points={`${d.x+55},${d.y+100} ${d.x+51},${d.y+92} ${d.x+59},${d.y+92}`} fill={d.capColor} />
          <text x={d.x+62} y={d.y+80} fontFamily="var(--font-mono)" fontSize="7" fill={d.capColor} fontWeight="700">YES</text>

          <rect x={d.x+5} y={d.y+100} width="100" height="30" fill={d.capColor} />
          <text x={d.x+55} y={d.y+120} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--paper)" letterSpacing="1.2" fontWeight="700">{d.cap}</text>
        </g>
      ))}

      {/* all no path */}
      <text x="360" y="250" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.6" fill="var(--c-grade)" fontWeight="700">ALL NO → ASSIGN LEVEL BY COMPOSITE GRADE</text>
      <line x1="60" y1="260" x2="660" y2="260" stroke="var(--c-grade)" strokeWidth="0.8" />
      <polygon points="660,260 652,256 652,264" fill="var(--c-grade)" />
    </svg>
  );
};

const PrioritizationMatrix = () => {
  const crits = [
    { name: 'User Impact', wt: 20 },
    { name: 'Data Availability', wt: 20 },
    { name: 'Frequency', wt: 15 },
    { name: 'Trust Feasibility', wt: 15 },
    { name: 'Decision Complexity', wt: 10 },
    { name: 'Implementation Complexity', wt: 10 },
    { name: 'Time to Value', wt: 10 },
  ];
  return (
    <svg viewBox="0 0 720 320" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      <text x="20" y="22" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.8" fill="var(--primary)" fontWeight="700">SEVEN WEIGHTED CRITERIA · COMPOSITE PRIORITY SCORE</text>
      <line x1="20" y1="32" x2="700" y2="32" stroke="var(--ink)" strokeWidth="0.5" />

      {crits.map((c, i) => {
        const y = 60 + i * 34;
        const barMax = 420;
        const bar = (c.wt / 20) * barMax;
        return (
          <g key={c.name}>
            <text x="20" y={y+5} fontFamily="var(--font-sans)" fontSize="10" fill="var(--ink)" fontWeight="500">{c.name}</text>
            <rect x="260" y={y-8} width={barMax} height="14" fill="var(--paper-2)" stroke="var(--rule-2)" strokeWidth="0.4" />
            <rect x="260" y={y-8} width={bar} height="14" fill="var(--primary)" />
            <text x={260 + bar + 6} y={y+3} fontFamily="var(--font-mono)" fontSize="8" fill="var(--primary)" fontWeight="700">{c.wt}%</text>
            {/* tick marks */}
            {[0, 5, 10, 15, 20].map(t => (
              <line key={t} x1={260 + (t/20)*barMax} y1={y+6} x2={260 + (t/20)*barMax} y2={y+10} stroke="var(--ink-4)" strokeWidth="0.4"/>
            ))}
          </g>
        );
      })}

      <text x="260" y={60 + 7*34 + 14} fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-4)" letterSpacing="1.2">WEIGHT</text>
    </svg>
  );
};

const CompoundingCurve = () => {
  // Y axis: time to insight. X axis: engagement number.
  const pts = [];
  for (let x = 0; x <= 45; x++) {
    const y = 110 - 85 * (1 - Math.exp(-x / 14));
    pts.push([40 + (x/45) * 640, y + 30]);
  }
  const path = pts.map((p, i) => (i===0?'M':'L') + p[0] + ',' + p[1]).join(' ');

  return (
    <svg viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      <line x1="40" y1="30" x2="40" y2="180" stroke="var(--ink)" strokeWidth="0.6"/>
      <line x1="40" y1="180" x2="700" y2="180" stroke="var(--ink)" strokeWidth="0.6"/>

      <text x="20" y="30" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1" fill="var(--ink-3)" transform="rotate(-90, 20, 100)">TIME TO FIRST AI VALUE →</text>
      <text x="370" y="200" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.6" fill="var(--ink-3)">PORTFOLIO ENGAGEMENTS COMPLETED →</text>

      {/* milestones */}
      {[
        { x: 10, label: '10\nPATTERNS EMERGE' },
        { x: 20, label: '20\nPLAYBOOK' },
        { x: 45, label: '45\nMOAT' },
      ].map(m => {
        const mx = 40 + (m.x/45) * 640;
        return (
          <g key={m.x}>
            <line x1={mx} y1="40" x2={mx} y2="180" stroke="var(--rule-2)" strokeWidth="0.4" strokeDasharray="2 2"/>
            <circle cx={mx} cy={110 - 85 * (1 - Math.exp(-m.x / 14)) + 30} r="4" fill="var(--primary)"/>
            <text x={mx} y="55" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--primary)" fontWeight="500">{m.label.split('\n')[0]}</text>
            <text x={mx} y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.2" fill="var(--ink-2)" fontWeight="700">{m.label.split('\n')[1]}</text>
          </g>
        );
      })}

      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.8"/>
    </svg>
  );
};

const GradeScale = () => {
  const grades = [
    { letter: 'A', range: '3.5–4.0', desc: 'Advanced readiness', fill: 0.95 },
    { letter: 'B', range: '2.5–3.4', desc: 'Strong foundation, targeted gaps', fill: 0.75 },
    { letter: 'C', range: '1.5–2.4', desc: 'Partial readiness', fill: 0.50 },
    { letter: 'D', range: '0.8–1.4', desc: 'Major foundational gaps', fill: 0.25 },
    { letter: 'F', range: '0.0–0.7', desc: 'Core prerequisites missing', fill: 0.05 },
  ];
  return (
    <svg viewBox="0 0 720 160" preserveAspectRatio="xMidYMid meet" style={{width:'100%', display:'block'}}>
      {grades.map((g, i) => {
        const x = 20 + i * 140;
        return (
          <g key={g.letter}>
            <rect x={x} y="20" width="130" height="120" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="0.5"/>
            <rect x={x} y={20 + 120 * (1 - g.fill)} width="130" height={120 * g.fill} fill="var(--primary)" opacity={0.15 + 0.2 * i === 0 ? 0.95 : 0.15 + (4-i)*0.2}/>
            <text x={x + 65} y="70" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="44" fill="var(--ink)" fontWeight="500">{g.letter}</text>
            <text x={x + 65} y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--primary)" letterSpacing="1" fontWeight="700">{g.range}</text>
            <text x={x + 65} y="118" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8" fill="var(--ink-2)">
              {g.desc.split(' ').reduce((acc, w) => {
                const last = acc[acc.length-1];
                if ((last + ' ' + w).trim().length < 18) acc[acc.length-1] = (last + ' ' + w).trim();
                else acc.push(w);
                return acc;
              }, ['']).slice(0, 2).map((ln, li) => (
                <tspan key={li} x={x + 65} dy={li === 0 ? 0 : 11}>{ln}</tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const DiagnosticIcons = {
  strategic: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.2"/><circle cx="20" cy="20" r="6" fill="currentColor"/><line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  leadership: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><polygon points="20,6 28,26 12,26" fill="none" stroke="currentColor" strokeWidth="1.2"/><circle cx="20" cy="20" r="2.5" fill="currentColor"/></svg>
  ),
  workflow: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><rect x="6" y="10" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="26" y="10" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="16" y="22" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2"/><line x1="14" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1"/><line x1="10" y1="18" x2="18" y2="22" stroke="currentColor" strokeWidth="1"/><line x1="30" y1="18" x2="22" y2="22" stroke="currentColor" strokeWidth="1"/></svg>
  ),
  data: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><ellipse cx="20" cy="10" rx="12" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M 8 10 L 8 30 Q 8 34 20 34 Q 32 34 32 30 L 32 10" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M 8 20 Q 8 24 20 24 Q 32 24 32 20" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  architecture: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="22" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="6" y="22" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2"/><rect x="22" y="22" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2"/><line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1"/><line x1="28" y1="18" x2="28" y2="22" stroke="currentColor" strokeWidth="1"/><line x1="18" y1="28" x2="22" y2="28" stroke="currentColor" strokeWidth="1"/></svg>
  ),
  trust: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><path d="M 20 6 L 32 12 L 32 22 Q 32 30 20 34 Q 8 30 8 22 L 8 12 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M 14 20 L 18 24 L 26 16" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  talent: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><circle cx="20" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M 8 34 Q 8 24 20 24 Q 32 24 32 34" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
  competitive: () => (
    <svg viewBox="0 0 40 40" width="24" height="24"><polyline points="6,28 14,20 20,24 28,12 34,16" fill="none" stroke="currentColor" strokeWidth="1.2"/><circle cx="28" cy="12" r="2.5" fill="currentColor"/></svg>
  ),
};

Object.assign(window, {
  FrameworkFlow, ReadinessLadder, DiagnosticRadar, GatingDecisionTree,
  PrioritizationMatrix, CompoundingCurve, GradeScale, DiagnosticIcons,
});
