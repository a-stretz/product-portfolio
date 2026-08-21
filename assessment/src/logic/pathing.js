import { INTERVENTION_PATHS } from '../data/interventionPaths.js'
import { DIAGNOSTICS } from '../data/diagnostics.js'

const GATING_RULES = [
  {
    id: 'gate_leadership',
    section: 'leadership',
    threshold: 2,
    blocksAbovePath: 1,
    message: 'Leadership and AI strategy clarity is insufficient. Path 1 is required before advancing.',
    detail: 'Without executive alignment and a clear AI thesis, higher-order paths will be fragmented and unsustainable.',
  },
  {
    id: 'gate_workflow_data',
    sections: ['workflow', 'data'],
    threshold: 2,
    blocksAbovePath: 2,
    message: 'Workflow understanding and data readiness are not strong enough to advance beyond diagnostic work.',
    detail: 'Targeted pilots and workflow redesign require that core workflows are mapped and data is accessible.',
  },
  {
    id: 'gate_governance',
    section: 'governance',
    threshold: 2,
    blocksAbovePath: 3,
    message: 'Governance and oversight are insufficient to support bounded action systems or broad workflow redesign.',
    detail: 'Approval logic, auditability, and accountability must be in place before AI-driven action is trustworthy.',
  },
  {
    id: 'gate_execution',
    section: 'execution',
    threshold: 2,
    blocksAbovePath: 4,
    message: 'Technical execution and talent capacity are not strong enough for bounded action systems.',
    detail: 'Path 5 requires a high confidence in delivery, platform readiness, and ML/AI capability.',
  },
]

function evaluateGates(sectionScores, hardGatingEnabled) {
  if (!hardGatingEnabled) return []

  const activeGates = []

  for (const rule of GATING_RULES) {
    if (rule.section) {
      const score = sectionScores[rule.section]?.score
      if (score !== null && score !== undefined && score <= rule.threshold) {
        activeGates.push({ ...rule, triggeredScore: score })
      }
    } else if (rule.sections) {
      const scores = rule.sections.map(s => sectionScores[s]?.score).filter(s => s !== null && s !== undefined)
      if (scores.length > 0 && Math.max(...scores) <= rule.threshold) {
        activeGates.push({ ...rule, triggeredScores: Object.fromEntries(rule.sections.map(s => [s, sectionScores[s]?.score])) })
      }
    }
  }

  return activeGates
}

export function selectInterventionPath(sectionScores, hardGatingEnabled) {
  const activeGates = evaluateGates(sectionScores, hardGatingEnabled)

  let maxAllowedPath = 5
  for (const gate of activeGates) {
    maxAllowedPath = Math.min(maxAllowedPath, gate.blocksAbovePath)
  }

  const leadershipScore = sectionScores['leadership']?.score ?? null
  const workflowScore = sectionScores['workflow']?.score ?? null
  const dataScore = sectionScores['data']?.score ?? null
  const governanceScore = sectionScores['governance']?.score ?? null
  const executionScore = sectionScores['execution']?.score ?? null
  const soraScore = sectionScores['sora']?.score ?? null

  const hasScore = s => s !== null && s !== undefined

  let rawPathNumber

  if (!hasScore(leadershipScore) || leadershipScore <= 1) {
    rawPathNumber = 1
  } else if (leadershipScore <= 2 && (!hasScore(workflowScore) || workflowScore <= 2)) {
    rawPathNumber = 1
  } else if (
    (!hasScore(workflowScore) || workflowScore <= 2) ||
    (!hasScore(dataScore) || dataScore <= 2)
  ) {
    rawPathNumber = 2
  } else if (
    workflowScore >= 3 &&
    dataScore >= 3 &&
    (!hasScore(executionScore) || executionScore <= 2) ||
    (!hasScore(governanceScore) || governanceScore <= 2)
  ) {
    rawPathNumber = 3
  } else if (
    workflowScore >= 3 &&
    dataScore >= 3 &&
    executionScore >= 3 &&
    (!hasScore(soraScore) || soraScore <= 2 || (!hasScore(governanceScore) || governanceScore <= 3))
  ) {
    rawPathNumber = 4
  } else if (
    governanceScore >= 3 &&
    executionScore >= 3 &&
    workflowScore >= 3 &&
    dataScore >= 3 &&
    hasScore(soraScore) && soraScore >= 3
  ) {
    rawPathNumber = 5
  } else {
    const knownScores = [leadershipScore, workflowScore, dataScore, governanceScore, executionScore]
      .filter(s => hasScore(s))
    const avgScore = knownScores.length > 0 ? knownScores.reduce((a, b) => a + b, 0) / knownScores.length : 1

    if (avgScore < 1.8) rawPathNumber = 1
    else if (avgScore < 2.5) rawPathNumber = 2
    else if (avgScore < 3.2) rawPathNumber = 3
    else if (avgScore < 3.7) rawPathNumber = 4
    else rawPathNumber = 5
  }

  const finalPathNumber = Math.min(rawPathNumber, maxAllowedPath)
  const recommendedPath = INTERVENTION_PATHS.find(p => p.number === finalPathNumber)

  const blockers = []
  for (const gate of activeGates) {
    if (gate.blocksAbovePath < rawPathNumber) {
      blockers.push({
        id: gate.id,
        message: gate.message,
        detail: gate.detail,
        section: gate.section || gate.sections?.join(', '),
      })
    }
  }

  const rationale = buildRationale(finalPathNumber, sectionScores, rawPathNumber, maxAllowedPath, hardGatingEnabled)

  return {
    recommendedPath,
    rawPathNumber,
    finalPathNumber,
    blockers,
    activeGates,
    hardGatingEnabled,
    rationale,
    pathCapped: finalPathNumber < rawPathNumber,
  }
}

function buildRationale(finalPathNumber, sectionScores, rawPathNumber, maxAllowedPath, hardGatingEnabled) {
  const lines = []
  const score = name => sectionScores[name]?.score

  switch (finalPathNumber) {
    case 1:
      lines.push('Leadership alignment and AI strategy clarity are insufficient to support structured AI work.')
      if (score('leadership') !== null) lines.push(`Leadership score of ${score('leadership')}/4 indicates the AI thesis and ownership need to be established first.`)
      break
    case 2:
      lines.push('Strategy direction is forming but workflow understanding or data readiness is not sufficient to pilot confidently.')
      if (score('workflow') !== null) lines.push(`Workflow visibility (${score('workflow')}/4) and data readiness (${score('data') ?? '?'}/4) need to improve before AI builds are justified.`)
      break
    case 3:
      lines.push('Core workflows are understood and data is accessible. A bounded, supervised assistive pilot is appropriate.')
      lines.push('Governance and full execution confidence are not yet at the level required for broader workflow redesign.')
      break
    case 4:
      lines.push('Workflow, data, and execution conditions are strong enough for deeper AI integration.')
      lines.push('The value opportunity is no longer a feature experiment — it is a workflow redesign initiative.')
      break
    case 5:
      lines.push('All foundational conditions are strong. The company is ready to operationalize bounded action systems.')
      lines.push('Governance, execution, workflow, and data readiness are all at the level required for AI-driven action.')
      break
    default:
      lines.push('Insufficient data to determine a confident path recommendation.')
  }

  if (hardGatingEnabled && finalPathNumber < rawPathNumber) {
    lines.push(`Hard gating is enabled and has capped the recommendation at Path ${finalPathNumber}. The uncapped recommendation would be Path ${rawPathNumber}.`)
  }

  return lines.join(' ')
}

export function getStrengthsAndWeaknesses(sectionScores) {
  const ranked = DIAGNOSTICS
    .map(d => ({
      id: d.id,
      title: d.title,
      shortTitle: d.shortTitle,
      score: sectionScores[d.id]?.score ?? null,
    }))
    .filter(d => d.score !== null)
    .sort((a, b) => b.score - a.score)

  const strengths = ranked.filter(d => d.score >= 3).slice(0, 4)
  const weaknesses = ranked.filter(d => d.score <= 2).slice(-4).reverse()

  return { strengths, weaknesses }
}

export function buildNextActions(pathResult, sectionScores) {
  if (!pathResult?.recommendedPath) return []
  return pathResult.recommendedPath.nextActions
}

export const SCORE_LABELS = {
  1: 'Weak / Mostly Absent',
  2: 'Partial / Inconsistent',
  3: 'Strong / Mostly in Place',
  4: 'Advanced / Highly Reliable',
}
