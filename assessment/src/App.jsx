import { useState, useMemo, useCallback } from 'react'
import { DIAGNOSTICS } from './data/diagnostics.js'
import { inferDiagnosticScore, calculateReadinessScore, getReadinessBand, getRankedSections } from './logic/scoring.js'
import { selectInterventionPath, getStrengthsAndWeaknesses, buildNextActions } from './logic/pathing.js'
import IntakeForm from './components/IntakeForm.jsx'
import DiagnosticsWorkspace from './components/DiagnosticsWorkspace.jsx'
import ScorePanel from './components/ScorePanel.jsx'
import FinalReport from './components/FinalReport.jsx'
import LogicTrace from './components/LogicTrace.jsx'

const VIEWS = ['intake', 'diagnostics', 'report', 'trace']
const VIEW_LABELS = { intake: 'Intake', diagnostics: 'Diagnostics', report: 'Report', trace: 'Logic Trace' }

const DEFAULT_INTAKE = {
  companyName: '',
  operatorName: '',
  companyType: '',
  companySummary: '',
  notes: '',
  status: 'in_progress',
  hardGatingEnabled: true,
  evidenceRequired: false,
}

export default function App() {
  const [view, setView] = useState('intake')
  const [intake, setIntake] = useState(DEFAULT_INTAKE)
  const [factorResponses, setFactorResponses] = useState({})
  const [sectionNotes, setSectionNotes] = useState({})

  const handleIntakeChange = useCallback((field, value) => {
    setIntake(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleFactorChange = useCallback((factorId, value) => {
    setFactorResponses(prev => ({ ...prev, [factorId]: value }))
  }, [])

  const handleSectionNote = useCallback((sectionId, note) => {
    setSectionNotes(prev => ({ ...prev, [sectionId]: note }))
  }, [])

  const sectionScores = useMemo(() => {
    const result = {}
    for (const section of DIAGNOSTICS) {
      result[section.id] = inferDiagnosticScore(section.id, factorResponses)
    }
    return result
  }, [factorResponses])

  const readinessScore = useMemo(() => calculateReadinessScore(sectionScores), [sectionScores])
  const readinessBand = useMemo(() => getReadinessBand(readinessScore), [readinessScore])
  const rankedSections = useMemo(() => getRankedSections(sectionScores), [sectionScores])
  const pathResult = useMemo(() => selectInterventionPath(sectionScores, intake.hardGatingEnabled), [sectionScores, intake.hardGatingEnabled])
  const { strengths, weaknesses } = useMemo(() => getStrengthsAndWeaknesses(sectionScores), [sectionScores])
  const nextActions = useMemo(() => buildNextActions(pathResult, sectionScores), [pathResult, sectionScores])

  const hasIntake = Boolean(intake.companyName && intake.companyType)
  const answeredCount = Object.keys(factorResponses).filter(k => factorResponses[k] !== null && factorResponses[k] !== undefined).length
  const totalFactors = DIAGNOSTICS.flatMap(d => d.factorGroups.flatMap(g => g.factors)).length

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-brand">
          <span className="brand-dot" />
          AI Readiness Assessment
        </div>
        <nav className="app-nav">
          {VIEWS.map(v => (
            <button
              key={v}
              className={`nav-btn${view === v ? ' active' : ''}`}
              onClick={() => setView(v)}
              disabled={v !== 'intake' && !hasIntake}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </nav>
        {hasIntake && (
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
            {intake.companyName} · {answeredCount}/{totalFactors} factors
          </div>
        )}
      </header>

      <div className="app-body">
        <main className="main-content">
          {view === 'intake' && (
            <IntakeForm
              intake={intake}
              onChange={handleIntakeChange}
              onNext={() => setView('diagnostics')}
            />
          )}
          {view === 'diagnostics' && (
            <DiagnosticsWorkspace
              factorResponses={factorResponses}
              sectionNotes={sectionNotes}
              sectionScores={sectionScores}
              companyType={intake.companyType}
              onFactorChange={handleFactorChange}
              onSectionNote={handleSectionNote}
              onViewReport={() => setView('report')}
            />
          )}
          {view === 'report' && (
            <FinalReport
              intake={intake}
              sectionScores={sectionScores}
              readinessScore={readinessScore}
              readinessBand={readinessBand}
              pathResult={pathResult}
              strengths={strengths}
              weaknesses={weaknesses}
              nextActions={nextActions}
              sectionNotes={sectionNotes}
            />
          )}
          {view === 'trace' && (
            <LogicTrace
              sectionScores={sectionScores}
              factorResponses={factorResponses}
              pathResult={pathResult}
              readinessScore={readinessScore}
              readinessBand={readinessBand}
            />
          )}
        </main>

        {(view === 'diagnostics' || view === 'trace') && (
          <aside className="side-panel">
            <ScorePanel
              sectionScores={sectionScores}
              readinessScore={readinessScore}
              readinessBand={readinessBand}
              rankedSections={rankedSections}
              pathResult={pathResult}
              hardGatingEnabled={intake.hardGatingEnabled}
              onViewReport={() => setView('report')}
            />
          </aside>
        )}
      </div>
    </div>
  )
}
