import { useState } from 'react'
import { DIAGNOSTICS } from '../data/diagnostics.js'
import DiagnosticSection from './DiagnosticSection.jsx'
import { getScoreClass } from '../logic/scoring.js'

function StatusDot({ completeness }) {
  if (completeness === 0) return <span className="status-dot status-empty" />
  if (completeness < 0.7) return <span className="status-dot status-partial" />
  return <span className="status-dot status-complete" />
}

export default function DiagnosticsWorkspace({
  factorResponses,
  sectionNotes,
  sectionScores,
  companyType,
  onFactorChange,
  onSectionNote,
  onViewReport,
}) {
  const [activeSection, setActiveSection] = useState(DIAGNOSTICS[0].id)

  const currentSection = DIAGNOSTICS.find(d => d.id === activeSection)
  const answeredSections = DIAGNOSTICS.filter(d => (sectionScores[d.id]?.completeness ?? 0) > 0)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1 style={{ marginBottom: 4 }}>Diagnostic Assessment</h1>
            <p style={{ fontSize: 13 }}>
              Select observed factors and conditions for each diagnostic dimension.
              The system infers readiness scores from your inputs — do not pick scores directly.
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={onViewReport}>
            View Report →
          </button>
        </div>

        <div className="progress-bar" style={{ margin: '16px 0 0' }}>
          <div
            className="progress-fill"
            style={{ width: `${(answeredSections.length / DIAGNOSTICS.length) * 100}%` }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
          {answeredSections.length} of {DIAGNOSTICS.length} sections started
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 200, flexShrink: 0 }}>
          <div className="section-nav">
            {DIAGNOSTICS.map((d, i) => {
              const completeness = sectionScores[d.id]?.completeness ?? 0
              const score = sectionScores[d.id]?.score
              return (
                <button
                  key={d.id}
                  className={`section-nav-item${activeSection === d.id ? ' active' : ''}`}
                  onClick={() => setActiveSection(d.id)}
                >
                  <span style={{ fontSize: 10, color: activeSection === d.id ? 'var(--accent)' : 'var(--text-3)', width: 14, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <StatusDot completeness={completeness} />
                  <span className="sni-label">{d.shortTitle}</span>
                  {score !== null && score !== undefined && (
                    <span className={`score-badge ${getScoreClass(score)}`} style={{ width: 22, height: 22, fontSize: 11 }}>
                      {score}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div style={{ padding: '12px 10px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: 11, color: 'var(--text-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontWeight: 600, color: 'var(--text-2)' }}>Score Guide</div>
            {[
              ['1', 'Weak / Mostly Absent', 'score-1'],
              ['2', 'Partial / Inconsistent', 'score-2'],
              ['3', 'Strong / Mostly in Place', 'score-3'],
              ['4', 'Advanced / Highly Reliable', 'score-4'],
            ].map(([s, label, cls]) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span className={`score-badge ${cls}`} style={{ width: 18, height: 18, fontSize: 10 }}>{s}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {currentSection && (
            <DiagnosticSection
              section={currentSection}
              factorResponses={factorResponses}
              note={sectionNotes[currentSection.id] || ''}
              scoreResult={sectionScores[currentSection.id]}
              companyType={companyType}
              onFactorChange={onFactorChange}
              onNoteChange={note => onSectionNote(currentSection.id, note)}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button
              className="btn btn-secondary btn-sm"
              disabled={DIAGNOSTICS.findIndex(d => d.id === activeSection) === 0}
              onClick={() => {
                const idx = DIAGNOSTICS.findIndex(d => d.id === activeSection)
                if (idx > 0) setActiveSection(DIAGNOSTICS[idx - 1].id)
              }}
            >
              ← Previous
            </button>
            {DIAGNOSTICS.findIndex(d => d.id === activeSection) === DIAGNOSTICS.length - 1 ? (
              <button className="btn btn-primary btn-sm" onClick={onViewReport}>
                View Report →
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const idx = DIAGNOSTICS.findIndex(d => d.id === activeSection)
                  if (idx < DIAGNOSTICS.length - 1) setActiveSection(DIAGNOSTICS[idx + 1].id)
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
