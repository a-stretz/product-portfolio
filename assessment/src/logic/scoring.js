import { DIAGNOSTICS } from '../data/diagnostics.js'

function normalizeFactorValue(factor, rawValue) {
  if (rawValue === null || rawValue === undefined) return null

  if (factor.type === 'binary') {
    if (rawValue === 'yes') return factor.polarity === 'positive' ? 1 : 0
    if (rawValue === 'no') return factor.polarity === 'positive' ? 0 : 1
    return null
  }

  if (factor.type === 'scale') {
    const min = factor.min || 1
    const max = factor.max || 5
    const normalized = (rawValue - min) / (max - min)
    return factor.polarity === 'positive' ? normalized : 1 - normalized
  }

  return null
}

export function inferDiagnosticScore(sectionId, factorResponses) {
  const section = DIAGNOSTICS.find(d => d.id === sectionId)
  if (!section) return null

  const allFactors = section.factorGroups.flatMap(g => g.factors)
  let totalWeight = 0
  let weightedSum = 0
  const contributions = []

  for (const factor of allFactors) {
    const rawValue = factorResponses[factor.id]
    const normalized = normalizeFactorValue(factor, rawValue)
    if (normalized === null) continue

    const contribution = normalized * factor.weight
    weightedSum += contribution
    totalWeight += factor.weight

    contributions.push({
      factorId: factor.id,
      label: factor.label,
      polarity: factor.polarity,
      weight: factor.weight,
      rawValue,
      normalized,
      contribution,
    })
  }

  if (totalWeight === 0) return { score: null, normalizedScore: null, contributions, completeness: 0 }

  const normalizedScore = weightedSum / totalWeight
  const completeness = contributions.length / allFactors.length

  let score
  if (normalizedScore < 0.30) score = 1
  else if (normalizedScore < 0.55) score = 2
  else if (normalizedScore < 0.78) score = 3
  else score = 4

  const sorted = [...contributions].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
  const topPositive = sorted.filter(c => c.polarity === 'positive' && c.normalized > 0.5).slice(0, 3)
  const topConstraining = sorted.filter(c => c.polarity === 'constraining' && c.normalized > 0.5).slice(0, 3)

  return {
    score,
    normalizedScore,
    completeness,
    contributions,
    topPositive,
    topConstraining,
  }
}

export function calculateReadinessScore(sectionScores) {
  let totalWeight = 0
  let weightedSum = 0

  for (const section of DIAGNOSTICS) {
    const result = sectionScores[section.id]
    if (!result || result.score === null) continue

    const pct = ((result.score - 1) / 3) * 100
    weightedSum += pct * section.weight
    totalWeight += section.weight
  }

  if (totalWeight === 0) return null
  return Math.round(weightedSum / totalWeight)
}

export function getReadinessBand(score) {
  if (score === null || score === undefined) return null
  if (score <= 44) return { id: 'low', label: 'Low Readiness', cssClass: 'band-low' }
  if (score <= 69) return { id: 'developing', label: 'Developing Readiness', cssClass: 'band-developing' }
  if (score <= 81) return { id: 'strong', label: 'Strong Readiness', cssClass: 'band-strong' }
  return { id: 'advanced', label: 'Advanced Readiness', cssClass: 'band-advanced' }
}

export function getScoreClass(score) {
  if (!score) return 'score-na'
  return `score-${score}`
}

export function getRankedSections(sectionScores) {
  return DIAGNOSTICS
    .map(d => ({
      id: d.id,
      title: d.shortTitle,
      fullTitle: d.title,
      weight: d.weight,
      score: sectionScores[d.id]?.score ?? null,
      normalizedScore: sectionScores[d.id]?.normalizedScore ?? null,
      completeness: sectionScores[d.id]?.completeness ?? 0,
    }))
    .sort((a, b) => {
      if (a.score === null && b.score === null) return 0
      if (a.score === null) return 1
      if (b.score === null) return -1
      return b.score - a.score
    })
}

export function getSectionCompleteness(sectionId, factorResponses) {
  const section = DIAGNOSTICS.find(d => d.id === sectionId)
  if (!section) return 0
  const allFactors = section.factorGroups.flatMap(g => g.factors)
  const answered = allFactors.filter(f => factorResponses[f.id] !== undefined && factorResponses[f.id] !== null)
  return answered.length / allFactors.length
}
