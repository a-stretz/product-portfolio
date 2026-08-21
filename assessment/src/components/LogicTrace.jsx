import { DIAGNOSTICS } from '../data/diagnostics.js'
import { getScoreClass } from '../logic/scoring.js'
import { SCORE_LABELS } from '../logic/pathing.js'
import { INTERVENTION_PATHS } from '../data/interventionPaths.js'

function FactorTrace({ factor, rawValue, normalized, polarity }) {
  if (rawValue === null || rawValue === undefined) return null
  const pct = Math.round(Math.abs(normalized ?? 0) * 100)
  const isPos = (polarity === 'positive' && normalized > 0.5) || (polarity === 'constraining' && normalized > 0.5)
  return (
    <div className={`trace-row ${isPos ? 'trace-pos' : 'trace-neg'}`}>
      <div className="trace-label">
        <span style={{ marginRight: 4 }}>{isPos ? '↑' : '↓'}</span>
        {factor.label}
        <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>[{factor.type === 'binary' ? rawValue : `${rawValue}/${factor.max}`}] w{factor.weight}</span>
      </div>
      <div className="trace-bar"><div className="trace-bar-fill" style={{ width: `${pct}%` }} /></div>
      <span style={{ fontSize: 11, color: 'var(--text-3)', width: 28, textAlign: 'right' }}>{pct}%</span>
    </div>
  )
}

export default function LogicTrace({ sectionScores, factorResponses, pathResult, readinessScore, readinessBand }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 4 }}>Logic Trace</h1>
        <p style={{ fontSize: 13 }}>How each diagnostic score was inferred, which factors contributed most, and why the selected intervention path was chosen.</p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>Weighted Readiness Score</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>{readinessScore ?? '—'}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-3)' }}>/100</span></div>
          </div>
          {readinessBand && <div className={`band-indicator ${readinessBand.cssClass}`}>{readinessBand.label}</div>}
          {pathResult?.recommendedPath && (
            <div style={{ marginLeft: 'auto' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>Recommended Path</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Path {pathResult.recommendedPath.number}: {pathResult.recommendedPath.title}</div>
            </div>
          )}
        </div>
      </div>

      {pathResult && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>Path Selection Logic</h3>
          {pathResult.rationale && (
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>{pathResult.rationale}</div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginTop: 8 }}>
            {INTERVENTION_PATHS.map(p => {
              const isRec = p.number === pathResult.finalPathNumber
              const isCapped = pathResult.rawPathNumber > pathResult.finalPathNumber && p.number > pathResult.finalPathNumber
              return (
                <div key={p.id} style={{ padding: '10px 8px', borderRadius: 'var(--radius)', border: `2px solid ${isRec ? 'var(--accent)' : isCapped ? 'var(--red)' : 'var(--border)'}`, background: isRec ? 'var(--accent-light)' : isCapped ? 'var(--red-light)' : 'var(--surface-2)', textAlign: 'center', fontSize: 11 }}>
                  <div style={{ fontWeight: 700, color: isRec ? 'var(--accent)' : isCapped ? 'var(--red)' : 'var(--text-3)', marginBottom: 3 }}>{isRec ? '✓ ' : isCapped ? '⛔ ' : ''}Path {p.number}</div>
                  <div style={{ color: isRec ? 'var(--text)' : 'var(--text-3)', lineHeight: 1.3 }}>{p.shortTitle}</div>
                </div>
              )
            })}
          </div>
          {pathResult.pathCapped && (
            <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--amber-light)', border: '1px solid var(--amber)', borderRadius: 'var(--radius)', fontSize: 12, color: 'var(--amber)' }}>
              ⚠ Hard gating has capped the recommendation at Path {pathResult.finalPathNumber}. Without gating, the score-based recommendation would be Path {pathResult.rawPathNumber}.
            </div>
          )}
          {pathResult.blockers.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6 }}>Gate Conditions Triggered:</div>
              {pathResult.blockers.map((b, i) => <div key={i} style={{ fontSize: 12, color: 'var(--red)', marginBottom: 4 }}>⛔ {b.message}</div>)}
            </div>
          )}
        </div>
      )}

      {DIAGNOSTICS.map(section => {
        const result = sectionScores[section.id]
        if (!result || result.score === null) return null
        const allFactors = section.factorGroups.flatMap(g => g.factors)
        const answered = allFactors.filter(f => factorResponses[f.id] !== null && factorResponses[f.id] !== undefined)
        if (answered.length === 0) return null
        return (
          <div key={section.id} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span className={`score-badge ${getScoreClass(result.score)}`}>{result.score}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{section.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{SCORE_LABELS[result.score]} · {answered.length}/{allFactors.length} factors · {Math.round((result.normalizedScore ?? 0) * 100)}% raw signal</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-3)' }}>Weight: {section.weight}%</div>
            </div>
            {result.contributions && result.contributions
              .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
              .map(c => {
                const factor = allFactors.find(f => f.id === c.factorId)
                if (!factor) return null
                return <FactorTrace key={c.factorId} factor={factor} rawValue={c.rawValue} normalized={c.normalized} polarity={c.polarity} />
              })
            }
          </div>
        )
      })}

      {!Object.values(sectionScores).some(s => s?.score !== null) && (
        <div className="empty-state"><h3>No factor data yet</h3><p>Complete the diagnostic sections to see the logic trace.</p></div>
      )}
    </div>
  )
}
