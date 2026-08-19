import { COMPANY_TYPES } from '../data/companyTypes.js'

const STATUS_OPTIONS = [
  { value: 'in_progress', label: 'In Progress' },
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Under Review' },
  { value: 'complete', label: 'Complete' },
]

export default function IntakeForm({ intake, onChange, onNext }) {
  const canProceed = intake.companyName.trim() && intake.companyType

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ marginBottom: 6 }}>Assessment Intake</h1>
        <p style={{ fontSize: 14 }}>Capture the company context before beginning diagnostic assessment. All fields marked as required must be completed before proceeding.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Company Information</div>
            <div className="card-desc">Basic context for this assessment</div>
          </div>
          <span className="badge badge-blue">Required</span>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Company Name *</label>
            <input
              type="text"
              value={intake.companyName}
              onChange={e => onChange('companyName', e.target.value)}
              placeholder="Acme Corp"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Operator Name</label>
            <input
              type="text"
              value={intake.operatorName}
              onChange={e => onChange('operatorName', e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Company Type *</div>
            <div className="card-desc">Determines framing, example language, and play recommendations</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {COMPANY_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => onChange('companyType', type.id)}
              style={{
                padding: '14px 16px',
                border: `2px solid ${intake.companyType === type.id ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                background: intake.companyType === type.id ? 'var(--accent-light)' : 'var(--surface)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, color: intake.companyType === type.id ? 'var(--accent)' : 'var(--text)', marginBottom: 4 }}>
                {type.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.4 }}>
                {type.description}
              </div>
            </button>
          ))}
        </div>

        {intake.companyType && (
          <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            {(() => {
              const ct = COMPANY_TYPES.find(t => t.id === intake.companyType)
              return ct ? (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>Framing for {ct.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{ct.emphasis}</div>
                </div>
              ) : null
            })()} 
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Assessment Context</div>
            <div className="card-desc">Optional background and configuration</div>
          </div>
          <span className="badge badge-gray">Optional</span>
        </div>

        <div className="form-group">
          <label>Company Summary</label>
          <textarea
            value={intake.companySummary}
            onChange={e => onChange('companySummary', e.target.value)}
            placeholder="Brief description of the company: what it does, stage, scale, and any relevant context for this assessment."
          />
        </div>

        <div className="form-group">
          <label>Operator Notes</label>
          <textarea
            value={intake.notes}
            onChange={e => onChange('notes', e.target.value)}
            placeholder="Internal context, prior knowledge, assumptions, or notes from initial discovery conversations."
          />
        </div>

        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Assessment Status</label>
            <select value={intake.status} onChange={e => onChange('status', e.target.value)}>
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Assessment Configuration</div>
            <div className="card-desc">Controls scoring behavior and output logic</div>
          </div>
        </div>

        <div className="toggle-row">
          <div>
            <div className="toggle-label">Hard Gating</div>
            <div className="toggle-desc">Prevents advanced path recommendations when foundational conditions are not met. Recommended for structured assessments.</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={intake.hardGatingEnabled}
              onChange={e => onChange('hardGatingEnabled', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="toggle-row">
          <div>
            <div className="toggle-label">Evidence Required</div>
            <div className="toggle-desc">Flag incomplete sections where no evidence or notes have been provided.</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={intake.evidenceRequired}
              onChange={e => onChange('evidenceRequired', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <button
          className={`btn btn-lg ${canProceed ? 'btn-primary' : 'btn-secondary'}`}
          onClick={onNext}
          disabled={!canProceed}
        >
          Begin Assessment →
        </button>
      </div>
    </div>
  )
}
