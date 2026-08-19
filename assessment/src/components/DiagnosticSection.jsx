import { getScoreClass } from '../logic/scoring.js'
import { SCORE_LABELS } from '../logic/pathing.js'

function BinaryInput({ value, onChange }) {
  return (
    <div className="binary-input">
      <button
        className={`binary-btn${value === 'yes' ? ' selected-yes' : ''}`}
        onClick={() => onChange(value === 'yes' ? null : 'yes')}
      >
        Yes
      </button>
      <button
        className={`binary-btn${value === 'no' ? ' selected-no' : ''}`}
        onClick={() => onChange(value === 'no' ? null : 'no')}
      >
        No
      </button>
    </div>
  )
}

function ScaleInput({ value, min = 1, max = 5, onChange }) {
  return (
    <div className="scale-input">
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => (
        <button
          key={n}
          className={`scale-btn${value === n ? ' selected' : ''}`}
          onClick={() => onChange(value === n ? null : n)}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

function ScoreDisplay({ score, normalizedScore, topPositive, topConstraining }) {
  if (score === null || score === undefined) return null
  const pct = Math.round((normalizedScore || 0) * 100)
  return (
    <div style={{ padding: '14px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span className={`score-badge ${getScoreClass(score)}`}>{score}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Inferred Score: {score}/4</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{SCORE_LABELS[score]}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Raw signal</div>
          <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{pct}%</div>
        </div>
      </div>
      {topPositive && topPositive.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--green)', marginBottom: 4 }}>Positive Contributors</div>
          {topPositive.map(c => <div key={c.factorId} style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 2 }}>↑ {c.label}</div>)}
        </div>
      )}
      {topConstraining && topConstraining.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--red)', marginBottom: 4 }}>Constraining Factors</div>
          {topConstraining.map(c => <div key={c.factorId} style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 2 }}>↓ {c.label}</div>)}
        </div>
      )}
    </div>
  )
}

export default function DiagnosticSection({ section, factorResponses, note, scoreResult, onFactorChange, onNoteChange }) {
  const allFactors = section.factorGroups.flatMap(g => g.factors)
  const answeredCount = allFactors.filter(f => factorResponses[f.id] !== undefined && factorResponses[f.id] !== null).length

  return (
    <div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h2 style={{ marginBottom: 4 }}>{section.title}</h2>
            <p style={{ fontSize: 13, marginBottom: 12 }}>{section.description}</p>
            <div style={{ padding: '10px 14px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--accent)', fontStyle: 'italic' }}>
              {section.question}
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Weight</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{section.weight}%</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(answeredCount / allFactors.length) * 100}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0 }}>{answeredCount}/{allFactors.length} factors</span>
        </div>
      </div>

      {scoreResult?.score !== null && scoreResult?.score !== undefined && (
        <ScoreDisplay score={scoreResult.score} normalizedScore={scoreResult.normalizedScore} topPositive={scoreResult.topPositive} topConstraining={scoreResult.topConstraining} />
      )}

      {section.factorGroups.map(group => (
        <div key={group.id} className="card" style={{ marginBottom: 12 }}>
          <div className="factor-group-title">{group.label}</div>
          {group.factors.map(factor => (
            <div key={factor.id} className="factor-row">
              <div className="factor-label">
                {factor.label}
                {factor.helper && <span className="helper">{factor.helper}</span>}
              </div>
              <span className={`factor-polarity ${factor.polarity === 'positive' ? 'polarity-pos' : 'polarity-neg'}`}>
                {factor.polarity === 'positive' ? '+' : '−'}
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-3)', flexShrink: 0, marginRight: 4 }}>w{factor.weight}</span>
              {factor.type === 'binary' ? (
                <BinaryInput value={factorResponses[factor.id] ?? null} onChange={v => onFactorChange(factor.id, v)} />
              ) : (
                <ScaleInput value={factorResponses[factor.id] ?? null} min={factor.min} max={factor.max} onChange={v => onFactorChange(factor.id, v)} />
              )}
            </div>
          ))}
        </div>
      ))}

      {section.exampleChips && section.exampleChips.length > 0 && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="factor-group-title" style={{ marginBottom: 8 }}>Example Signals</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>These are illustrative signals — not direct scoring inputs. They help calibrate what you're looking for.</div>
          <div className="chips-area">
            {section.exampleChips.map((chip, i) => <span key={i} className={`chip ${chip.type}`}>{chip.label}</span>)}
          </div>
        </div>
      )}

      <div className="card">
        <label style={{ marginBottom: 8, display: 'block' }}>Evidence & Notes</label>
        <textarea
          value={note}
          onChange={e => onNoteChange(e.target.value)}
          placeholder="Record evidence, assumptions, direct quotes, or observations that informed your inputs for this diagnostic. This context will appear in the report."
          style={{ minHeight: 80 }}
        />
      </div>
    </div>
  )
}
