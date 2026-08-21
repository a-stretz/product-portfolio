import { getScoreClass } from '../logic/scoring.js'
import { SCORE_LABELS } from '../logic/pathing.js'

export default function ScorePanel({ sectionScores, readinessScore, readinessBand, rankedSections, pathResult, hardGatingEnabled, onViewReport }) {
  const hasAnyScore = Object.values(sectionScores).some(s => s?.score !== null && s?.score !== undefined)

  return (
    <div>
      <div className="score-panel-section">
        <div className="panel-label">Readiness Score</div>
        <div className="readiness-score-display">
          <div className="readiness-score-number" style={{ color: readinessBand ? `var(--${readinessBand.id === 'low' ? 'red' : readinessBand.id === 'developing' ? 'amber' : readinessBand.id === 'strong' ? 'green' : 'accent'})` : 'var(--text-3)' }}>
            {readinessScore !== null ? readinessScore : '—'}
          </div>
          <div className="readiness-score-label">out of 100</div>
          {readinessBand && <div className={`band-indicator ${readinessBand.cssClass}`} style={{ marginTop: 8 }}>{readinessBand.label}</div>}
          {!hasAnyScore && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Enter factor inputs to see inferred score</div>}
        </div>
        {hardGatingEnabled && (
          <div style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, background: 'var(--amber-light)', color: 'var(--amber)', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>GATING ON</span>
            Hard gating enabled
          </div>
        )}
      </div>

      <div className="score-panel-section">
        <div className="panel-label">Diagnostic Scores</div>
        {rankedSections.map(section => (
          <div key={section.id} className="diagnostic-score-row">
            <div className="dsr-label">{section.shortTitle}</div>
            <div className="dsr-bar">
              <div className="dsr-bar-fill" style={{ width: section.score !== null ? `${((section.score - 1) / 3) * 100}%` : '0%', background: section.score === null ? 'var(--border)' : section.score <= 1 ? 'var(--red)' : section.score <= 2 ? 'var(--amber)' : section.score <= 3 ? 'var(--green)' : 'var(--accent)' }} />
            </div>
            <span className={`score-badge ${getScoreClass(section.score)}`}>{section.score ?? '—'}</span>
          </div>
        ))}
      </div>

      <div className="score-panel-section">
        <div className="panel-label">Recommended Path</div>
        {pathResult?.recommendedPath ? (
          <div className="path-rec-card">
            <div className="path-rec-num">Path {pathResult.recommendedPath.number}</div>
            <div className="path-rec-title">{pathResult.recommendedPath.title}</div>
            {pathResult.pathCapped && <div style={{ fontSize: 11, color: 'var(--amber)', marginTop: 6 }}>⚠ Capped by hard gating from Path {pathResult.rawPathNumber}</div>}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Enter diagnostic data to see path recommendation</div>
        )}
      </div>

      {pathResult?.blockers && pathResult.blockers.length > 0 && (
        <div className="score-panel-section">
          <div className="panel-label">Active Blockers</div>
          {pathResult.blockers.map((b, i) => (
            <div key={i} className="blocker-item">
              <span className="blocker-icon">⚠</span>
              <span>{b.message}</span>
            </div>
          ))}
        </div>
      )}

      {rankedSections.filter(s => s.score !== null && s.score <= 2).length > 0 && (
        <div className="score-panel-section">
          <div className="panel-label">Weakest Areas</div>
          {rankedSections.filter(s => s.score !== null && s.score <= 2).slice(-3).reverse().map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className={`score-badge ${getScoreClass(s.score)}`} style={{ width: 22, height: 22, fontSize: 11 }}>{s.score}</span>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{s.shortTitle}</span>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary w-full" style={{ marginTop: 4 }} onClick={onViewReport}>View Full Report</button>
    </div>
  )
}
