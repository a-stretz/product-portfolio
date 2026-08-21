import { DIAGNOSTICS } from '../data/diagnostics.js'
import { COMPANY_TYPE_MAP } from '../data/companyTypes.js'
import { getScoreClass } from '../logic/scoring.js'
import { SCORE_LABELS } from '../logic/pathing.js'

function buildNarrative(intake, readinessScore, readinessBand, strengths, weaknesses, pathResult) {
  const ct = COMPANY_TYPE_MAP[intake.companyType]
  const companyLabel = ct ? ct.label : 'company'
  const bandLabel = readinessBand?.label ?? 'early-stage readiness'
  const pathTitle = pathResult?.recommendedPath?.title ?? 'early-stage alignment'
  const topStrengths = strengths.slice(0, 2).map(s => s.shortTitle).join(' and ')
  const topWeaknesses = weaknesses.slice(0, 2).map(s => s.shortTitle).join(' and ')
  const name = intake.companyName || 'This company'
  const score = readinessScore !== null ? ` Overall weighted readiness score is ${readinessScore}/100, placing it in the ${bandLabel} band.` : ''
  let body = `${name} is a ${companyLabel} currently assessed at ${bandLabel}.${score}`
  if (topStrengths) body += ` Strongest dimensions are ${topStrengths}, which represent the clearest foundation for AI investment.`
  if (topWeaknesses) body += ` Dimensions requiring attention are ${topWeaknesses}, which create friction for more advanced AI work.`
  body += ` The recommended intervention path is Path ${pathResult?.recommendedPath?.number}: ${pathTitle}.`
  if (pathResult?.pathCapped) body += ` Note that hard gating has capped the recommendation below the uncapped path (${pathResult.rawPathNumber}), reflecting foundational gaps that must be resolved first.`
  return body
}

export default function FinalReport({ intake, sectionScores, readinessScore, readinessBand, pathResult, strengths, weaknesses, nextActions, sectionNotes }) {
  const ct = COMPANY_TYPE_MAP[intake.companyType]
  const hasData = readinessScore !== null
  const scoreColor = readinessBand?.id === 'low' ? 'var(--red)' : readinessBand?.id === 'developing' ? 'var(--amber)' : readinessBand?.id === 'strong' ? 'var(--green)' : readinessBand?.id === 'advanced' ? 'var(--accent)' : 'var(--text-3)'
  const circleClass = readinessBand?.id === 'low' ? 'circle-low' : readinessBand?.id === 'developing' ? 'circle-developing' : readinessBand?.id === 'strong' ? 'circle-strong' : 'circle-advanced'
  const narrative = buildNarrative(intake, readinessScore, readinessBand, strengths, weaknesses, pathResult)
  const rankedForReport = DIAGNOSTICS.map(d => ({ id: d.id, shortTitle: d.shortTitle, title: d.title, score: sectionScores[d.id]?.score ?? null, weight: d.weight })).filter(d => d.score !== null)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>Assessment Report</h1>
          <p style={{ fontSize: 13 }}>Framework-aligned diagnostic output and intervention recommendation</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>Print / Export</button>
      </div>

      <div className="report-container">
        <div className="report-header">
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>AI Readiness Assessment</div>
          <h1>{intake.companyName || 'Unnamed Company'}</h1>
          <p>Diagnostic summary and intervention path recommendation</p>
          <div className="report-meta">
            <div className="report-meta-item"><div className="label">Company Type</div><div className="value">{ct?.label ?? '—'}</div></div>
            <div className="report-meta-item"><div className="label">Operator</div><div className="value">{intake.operatorName || '—'}</div></div>
            <div className="report-meta-item"><div className="label">Date</div><div className="value">{today}</div></div>
            <div className="report-meta-item"><div className="label">Hard Gating</div><div className="value">{intake.hardGatingEnabled ? 'Enabled' : 'Disabled'}</div></div>
            <div className="report-meta-item"><div className="label">Status</div><div className="value" style={{ textTransform: 'capitalize' }}>{intake.status?.replace('_', ' ') ?? '—'}</div></div>
          </div>
        </div>

        <div className="report-score-hero">
          <div className={`score-circle ${hasData ? circleClass : ''}`}>
            <div className="score-circle-num" style={{ color: hasData ? undefined : 'var(--text-3)' }}>{readinessScore ?? '—'}</div>
            <div className="score-circle-sub">/ 100</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em', color: hasData ? scoreColor : 'var(--text-3)' }}>{readinessBand?.label ?? 'No data yet'}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4, marginBottom: 12 }}>Weighted readiness across 8 universal diagnostics</div>
            {pathResult?.recommendedPath && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>PATH {pathResult.recommendedPath.number}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{pathResult.recommendedPath.title}</span>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {rankedForReport.slice(0, 4).map(d => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={`score-badge ${getScoreClass(d.score)}`} style={{ width: 22, height: 22, fontSize: 11 }}>{d.score}</span>
                <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{d.shortTitle}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <div className="report-section-title">Executive Summary</div>
          <div className="narrative-block">{narrative}</div>
          {intake.companySummary && <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}><strong style={{ color: 'var(--text)' }}>Company context:</strong> {intake.companySummary}</div>}
        </div>

        <div className="report-section">
          <div className="report-section-title">Diagnostic Scores</div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  <th style={{ padding: '8px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dimension</th>
                  <th style={{ padding: '8px 14px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score</th>
                  <th style={{ padding: '8px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level</th>
                  <th style={{ padding: '8px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {DIAGNOSTICS.map((d, i) => {
                  const score = sectionScores[d.id]?.score ?? null
                  return (
                    <tr key={d.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--text)' }}>{d.title}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}><span className={`score-badge ${getScoreClass(score)}`}>{score ?? '—'}</span></td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-2)', fontSize: 12 }}>{score ? SCORE_LABELS[score] : 'Not assessed'}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-3)', fontSize: 12 }}>{d.weight}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {strengths.length > 0 && (
          <div className="report-section">
            <div className="report-section-title">Diagnostic Strengths</div>
            {strengths.map(s => (
              <div key={s.id} className="strength-row">
                <span className={`score-badge ${getScoreClass(s.score)}`}>{s.score}</span>
                <span style={{ flex: 1, fontWeight: 500 }}>{s.title}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{SCORE_LABELS[s.score]}</span>
              </div>
            ))}
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="report-section">
            <div className="report-section-title">Diagnostic Weaknesses</div>
            {weaknesses.map(s => (
              <div key={s.id} className="weakness-row">
                <span className={`score-badge ${getScoreClass(s.score)}`}>{s.score}</span>
                <span style={{ flex: 1, fontWeight: 500 }}>{s.title}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{SCORE_LABELS[s.score]}</span>
              </div>
            ))}
          </div>
        )}

        {pathResult?.recommendedPath && (
          <div className="report-section">
            <div className="report-section-title">Recommended Intervention Path</div>
            <div style={{ padding: '16px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)', marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>PATH {pathResult.recommendedPath.number}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{pathResult.recommendedPath.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{pathResult.recommendedPath.description}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, borderLeft: '3px solid var(--border)', paddingLeft: 12 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Rationale:</strong> {pathResult.rationale}
            </div>
          </div>
        )}

        {pathResult?.blockers && pathResult.blockers.length > 0 && (
          <div className="report-section">
            <div className="report-section-title">Active Blockers & Gating Conditions</div>
            {pathResult.blockers.map((b, i) => (
              <div key={i} style={{ marginBottom: 10, padding: '12px 14px', background: 'var(--red-light)', border: '1px solid var(--red)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--red)', marginBottom: 4 }}>⚠ {b.message}</div>
                <div style={{ fontSize: 12, color: 'var(--red)' }}>{b.detail}</div>
              </div>
            ))}
          </div>
        )}

        {pathResult?.recommendedPath?.plays && (
          <div className="report-section">
            <div className="report-section-title">Recommended Execute-Stage Plays</div>
            <div className="plays-grid">
              {pathResult.recommendedPath.plays.map((play, i) => (
                <div key={i} className="play-card">
                  <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 3 }}>{i + 1}</div>
                  {play}
                </div>
              ))}
            </div>
          </div>
        )}

        {nextActions && nextActions.length > 0 && (
          <div className="report-section">
            <div className="report-section-title">Immediate Next Actions</div>
            {nextActions.map((action, i) => (
              <div key={i} className="next-action-item">
                <span className="action-num">{i + 1}</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        )}

        {Object.entries(sectionNotes).some(([, n]) => n && n.trim()) && (
          <div className="report-section">
            <div className="report-section-title">Evidence & Operator Notes</div>
            {DIAGNOSTICS.map(d => {
              const note = sectionNotes[d.id]
              if (!note || !note.trim()) return null
              return (
                <div key={d.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{d.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', lineHeight: 1.6 }}>{note}</div>
                </div>
              )
            })}
          </div>
        )}

        {!hasData && (
          <div className="report-section">
            <div className="empty-state">
              <h3>No diagnostic data yet</h3>
              <p>Complete the diagnostic assessment to generate the full report output.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
