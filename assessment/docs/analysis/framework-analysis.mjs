// Framework analysis harness
// ---------------------------------------------------------------------------
// Reproduces every structural finding and sensitivity number cited in
// docs/AI-Readiness-Deep-Dive-v1.0.md. Imports the real scoring and pathing
// modules, so if the logic changes, re-run this and diff the output.
//
//   node assessment/docs/analysis/framework-analysis.mjs
//
// Three kinds of analysis:
//   1. Exhaustive  - every combination of section scores (null,1..4)^8.
//                    Facts here are structural: true for ANY company.
//   2. Monte Carlo - synthetic companies generated from a latent-maturity
//                    model (see SYNTHETIC COMPANY MODEL). Facts here are
//                    indicative: they depend on the model's assumptions.
//   3. Worked example - one fictional company, scored by the real code.
//
// No dependencies. Deterministic (seeded RNG).
// ---------------------------------------------------------------------------

import { DIAGNOSTICS } from '../../src/data/diagnostics.js'
import { inferDiagnosticScore, calculateReadinessScore, getReadinessBand } from '../../src/logic/scoring.js'
import { selectInterventionPath } from '../../src/logic/pathing.js'

const SECTIONS = DIAGNOSTICS.map(d => d.id)
const FACTORS = Object.fromEntries(DIAGNOSTICS.map(d => [d.id, d.factorGroups.flatMap(g => g.factors)]))
const PATH_SECTIONS = ['leadership', 'workflow', 'data', 'governance', 'execution', 'sora']
const pct = (n, d) => (d === 0 ? '0.0' : ((100 * n) / d).toFixed(1)) + '%'
const out = (...a) => console.log(...a)
const h = t => out('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78))

// ---------------------------------------------------------------------------
// Parameterized re-implementation. Verified line-for-line against the source
// at BASE parameters (see VERIFY below) before any variant is trusted.
// ---------------------------------------------------------------------------
const BASE = {
  thresholds: [0.30, 0.55, 0.78],
  sectionWeights: Object.fromEntries(DIAGNOSTICS.map(d => [d.id, d.weight])),
  factorWeight: f => f.weight,
  bands: [44, 69, 81],
  gating: true,
  r4Parenthesized: false,
}
const withP = o => ({ ...BASE, ...o })

function normalize(f, v) {
  if (v === null || v === undefined) return null
  if (f.type === 'binary') {
    if (v === 'yes') return f.polarity === 'positive' ? 1 : 0
    if (v === 'no') return f.polarity === 'positive' ? 0 : 1
    return null
  }
  const n = (v - (f.min || 1)) / ((f.max || 5) - (f.min || 1))
  return f.polarity === 'positive' ? n : 1 - n
}

function infer(sid, resp, P) {
  let tw = 0, ws = 0
  for (const f of FACTORS[sid]) {
    const n = normalize(f, resp[f.id])
    if (n === null) continue
    const w = P.factorWeight(f)
    ws += n * w
    tw += w
  }
  if (tw === 0) return { score: null, norm: null }
  const norm = ws / tw
  const [a, b, c] = P.thresholds
  return { score: norm < a ? 1 : norm < b ? 2 : norm < c ? 3 : 4, norm }
}

function readiness(scores, P) {
  let tw = 0, ws = 0
  for (const sid of SECTIONS) {
    const s = scores[sid]
    if (s === null || s === undefined) continue
    ws += ((s - 1) / 3) * 100 * P.sectionWeights[sid]
    tw += P.sectionWeights[sid]
  }
  return tw === 0 ? null : Math.round(ws / tw)
}

function bandOf(x, P) {
  if (x === null) return null
  const [a, b, c] = P.bands
  return x <= a ? 'low' : x <= b ? 'developing' : x <= c ? 'strong' : 'advanced'
}

function selectPath(s, P, skipGate = null) {
  const has = x => x !== null && x !== undefined
  const L = s.leadership ?? null, W = s.workflow ?? null, D = s.data ?? null
  const G = s.governance ?? null, E = s.execution ?? null, S = s.sora ?? null
  const gates = []
  if (P.gating) {
    if (has(L) && L <= 2) gates.push({ id: 'gate_leadership', cap: 1 })
    const wd = [W, D].filter(has)
    if (wd.length > 0 && Math.max(...wd) <= 2) gates.push({ id: 'gate_workflow_data', cap: 2 })
    if (has(G) && G <= 2) gates.push({ id: 'gate_governance', cap: 3 })
    if (has(E) && E <= 2) gates.push({ id: 'gate_execution', cap: 4 })
  }
  const live = gates.filter(g => g.id !== skipGate)
  const ceiling = Math.min(5, ...live.map(g => g.cap))
  let raw, rule
  if (!has(L) || L <= 1) { raw = 1; rule = 'R1' }
  else if (L <= 2 && (!has(W) || W <= 2)) { raw = 1; rule = 'R2' }
  else if ((!has(W) || W <= 2) || (!has(D) || D <= 2)) { raw = 2; rule = 'R3' }
  else if (P.r4Parenthesized
    ? (W >= 3 && D >= 3 && ((!has(E) || E <= 2) || (!has(G) || G <= 2)))
    // exact source expression, including its operator precedence
    : (W >= 3 && D >= 3 && (!has(E) || E <= 2) || (!has(G) || G <= 2))) { raw = 3; rule = 'R4' }
  else if (W >= 3 && D >= 3 && E >= 3 && (!has(S) || S <= 2 || (!has(G) || G <= 3))) { raw = 4; rule = 'R5' }
  else if (G >= 3 && E >= 3 && W >= 3 && D >= 3 && has(S) && S >= 3) { raw = 5; rule = 'R6' }
  else {
    rule = 'R7'
    const k = [L, W, D, G, E].filter(has)
    const avg = k.length ? k.reduce((a, b) => a + b, 0) / k.length : 1
    raw = avg < 1.8 ? 1 : avg < 2.5 ? 2 : avg < 3.2 ? 3 : avg < 3.7 ? 4 : 5
  }
  const final = Math.min(raw, ceiling)
  return { raw, final, rule, ceiling, gates: live.map(g => g.id), blockers: live.filter(g => g.cap < raw).map(g => g.id) }
}

// The six-line decision table the cascade reduces to (see deep dive section 7.3)
function simplifiedRaw(s) {
  const weak = x => x === null || x === undefined || x <= 2
  const L = s.leadership ?? null
  if (L === null || L <= 1) return 1
  if (L <= 2 && weak(s.workflow)) return 1
  if (weak(s.workflow) || weak(s.data)) return 2
  if (weak(s.execution) || weak(s.governance)) return 3
  if (weak(s.sora) || s.governance === 3) return 4
  return 5
}
function simplifiedFinal(s, gating) {
  if (gating && s.leadership !== null && s.leadership <= 2) return 1
  return simplifiedRaw(s)
}

const toSourceScores = s => Object.fromEntries(SECTIONS.map(id => [id, { score: s[id] ?? null }]))

// ---------------------------------------------------------------------------
// 1. EXHAUSTIVE: all (null,1,2,3,4)^8 = 390,625 section-score combinations
// ---------------------------------------------------------------------------
h('1. EXHAUSTIVE ANALYSIS - all 390,625 section-score combinations (null,1-4)^8')

const VALS = [null, 1, 2, 3, 4]
function* combos(vals, n) {
  const idx = new Array(n).fill(0)
  while (true) {
    yield idx.map(i => vals[i])
    let k = n - 1
    while (k >= 0 && ++idx[k] === vals.length) { idx[k] = 0; k-- }
    if (k < 0) return
  }
}

let total = 0, srcMismatch = 0, simpMismatch = 0, r4Diff = 0, r4DiffOff = 0
const ruleCount = { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0, R7: 0 }
let gatingChanges = 0, gatingChangeNotL2W3 = 0
const gateActive = {}, gateBinding = {}, gateRedundant = {}
const pathDependsOn = new Map() // key: 6 path sections -> set of finals
for (const v of combos(VALS, 8)) {
  total++
  const s = Object.fromEntries(SECTIONS.map((id, i) => [id, v[i]]))
  for (const gating of [true, false]) {
    const P = withP({ gating })
    const mine = selectPath(s, P)
    const src = selectInterventionPath(toSourceScores(s), gating)
    const srcBlockers = src.blockers.map(b => b.id).join(',')
    if (mine.raw !== src.rawPathNumber || mine.final !== src.finalPathNumber || mine.blockers.join(',') !== srcBlockers) srcMismatch++
    if (simplifiedFinal(s, gating) !== mine.final) simpMismatch++
    const fixed = selectPath(s, withP({ gating, r4Parenthesized: true }))
    if (fixed.final !== mine.final || fixed.raw !== mine.raw) gating ? r4Diff++ : r4DiffOff++
    if (gating) {
      ruleCount[mine.rule]++
      const key = PATH_SECTIONS.map(id => s[id]).join('|')
      if (!pathDependsOn.has(key)) pathDependsOn.set(key, new Set())
      pathDependsOn.get(key).add(mine.final)
      for (const g of mine.gates) {
        gateActive[g] = (gateActive[g] || 0) + 1
        const without = selectPath(s, P, g)
        if (without.final !== mine.final) gateBinding[g] = (gateBinding[g] || 0) + 1
        const cap = { gate_leadership: 1, gate_workflow_data: 2, gate_governance: 3, gate_execution: 4 }[g]
        if (cap >= mine.raw) gateRedundant[g] = (gateRedundant[g] || 0) + 1
      }
      const off = selectPath(s, withP({ gating: false }))
      if (off.final !== mine.final) {
        gatingChanges++
        if (!(s.leadership === 2 && s.workflow !== null && s.workflow >= 3)) gatingChangeNotL2W3++
      }
    }
  }
}
const userMeasurementMatters = [...pathDependsOn.values()].some(set => set.size > 1)

out(`Combinations evaluated:                     ${total.toLocaleString()} (x2 gating modes)`)
out(`VERIFY re-implementation vs source:         ${srcMismatch === 0 ? 'IDENTICAL' : srcMismatch + ' MISMATCHES'} (raw, final, blockers)`)
out(`VERIFY 6-line decision table vs source:     ${simpMismatch === 0 ? 'IDENTICAL' : simpMismatch + ' MISMATCHES'}`)
out(`R4 precedence: parenthesized vs as-written: ${r4Diff} differences (gating on), ${r4DiffOff} (gating off)`)
out(`Do user/measurement scores ever change the path? ${userMeasurementMatters ? 'YES' : 'NO'}`)
out('\nCascade rule that fires (gating on, all combos):')
for (const [r, n] of Object.entries(ruleCount)) out(`  ${r}: ${n.toLocaleString().padStart(8)}  ${pct(n, total)}`)
out('\nGate behaviour (gating on):')
out('  gate                  active    binding*   redundant**')
for (const g of ['gate_leadership', 'gate_workflow_data', 'gate_governance', 'gate_execution']) {
  out(`  ${g.padEnd(20)} ${String(gateActive[g] || 0).padStart(7)}  ${String(gateBinding[g] || 0).padStart(9)}  ${String(gateRedundant[g] || 0).padStart(11)}`)
}
out('  * binding   = removing this gate alone would change the final path')
out('  ** redundant = gate active but its cap >= the cascade\'s raw path (cascade already stricter)')
out(`\nCombos where gating on/off changes the final path: ${gatingChanges.toLocaleString()} (${pct(gatingChanges, total)})`)
out(`  ...of which are NOT (leadership = 2 AND workflow >= 3): ${gatingChangeNotL2W3}`)

// Removal / absence impact: what is the best reachable path if a section is unscored?
out('\nBest reachable final path when one section is unscored (gating on):')
for (const sid of SECTIONS) {
  let best = 0
  for (const v of combos([1, 2, 3, 4], 7)) {
    const others = SECTIONS.filter(x => x !== sid)
    const s = Object.fromEntries(others.map((id, i) => [id, v[i]]))
    s[sid] = null
    best = Math.max(best, selectPath(s, BASE).final)
  }
  out(`  ${sid.padEnd(12)} unscored -> best possible path ${best}`)
}

// ---------------------------------------------------------------------------
// 1b. Complete assessments only: 4^8 = 65,536 combos, index range per path
// ---------------------------------------------------------------------------
h('1b. COMPLETE ASSESSMENTS - 65,536 combos (1-4)^8, gating on')
const byPath = {}
for (const v of combos([1, 2, 3, 4], 8)) {
  const s = Object.fromEntries(SECTIONS.map((id, i) => [id, v[i]]))
  const r = selectPath(s, BASE)
  const idx = readiness(s, BASE)
  const b = bandOf(idx, BASE)
  const e = (byPath[r.final] ||= { n: 0, min: 999, max: -1, minEx: null, maxEx: null, bands: {} })
  e.n++
  e.bands[b] = (e.bands[b] || 0) + 1
  if (idx < e.min) { e.min = idx; e.minEx = { ...s } }
  if (idx > e.max) { e.max = idx; e.maxEx = { ...s } }
}
const fmtS = s => SECTIONS.map(id => `${id.slice(0, 4)}=${s[id]}`).join(' ')
out('path   share     index range   bands (low / developing / strong / advanced)')
for (const p of [1, 2, 3, 4, 5]) {
  const e = byPath[p]
  const bb = ['low', 'developing', 'strong', 'advanced'].map(k => pct(e.bands[k] || 0, e.n)).join(' / ')
  out(`P${p}   ${pct(e.n, 65536).padStart(6)}     ${String(e.min).padStart(3)} - ${String(e.max).padEnd(3)}     ${bb}`)
}
out(`\nHighest-index company still recommended Path 1: index ${byPath[1].max}\n  ${fmtS(byPath[1].maxEx)}`)
out(`Lowest-index company recommended Path 5:        index ${byPath[5].min}\n  ${fmtS(byPath[5].minEx)}`)
const uniform = n => Object.fromEntries(SECTIONS.map(id => [id, n]))
for (const n of [1, 2, 3, 4]) out(`All sections = ${n}: index ${readiness(uniform(n), BASE)} (${bandOf(readiness(uniform(n), BASE), BASE)}), path ${selectPath(uniform(n), BASE).final}`)
const indexValues = new Set()
for (const v of combos([1, 2, 3, 4], 8)) indexValues.add(readiness(Object.fromEntries(SECTIONS.map((id, i) => [id, v[i]])), BASE))
out(`Distinct index values reachable by complete assessments: ${indexValues.size} (of 101 possible)`)

// ---------------------------------------------------------------------------
// 2. MONTE CARLO - synthetic companies
// ---------------------------------------------------------------------------
// SYNTHETIC COMPANY MODEL (assumption, not data):
//   company maturity  g   ~ Uniform(0.05, 0.95)
//   section maturity  m_s = clamp(g + Normal(0, 0.18), 0, 1)   -> sections correlate
//   positive binary   P(yes) = m_s ; constraining binary P(yes) = 1 - m_s
//   positive scale    round(1 + 4 * clamp(m_s + Normal(0, 0.15)))
//   constraining scale same, on (1 - m_s)
// Every factor answered unless stated otherwise.
h('2. MONTE CARLO - 20,000 synthetic companies (latent-maturity model)')

function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
const rng = mulberry32(20261013)
const gauss = () => { let u = 0, v = 0; while (!u) u = rng(); while (!v) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x))

function synthCompany() {
  const g = 0.05 + 0.9 * rng()
  const resp = {}
  for (const sid of SECTIONS) {
    const m = clamp(g + 0.18 * gauss())
    for (const f of FACTORS[sid]) {
      const target = f.polarity === 'positive' ? m : 1 - m
      if (f.type === 'binary') resp[f.id] = rng() < target ? 'yes' : 'no'
      else resp[f.id] = Math.round(1 + 4 * clamp(target + 0.15 * gauss()))
    }
  }
  return resp
}

const N = 20000
const companies = Array.from({ length: N }, synthCompany)

function evaluate(resp, P) {
  const scores = {}, norms = {}
  for (const sid of SECTIONS) { const r = infer(sid, resp, P); scores[sid] = r.score; norms[sid] = r.norm }
  const idx = readiness(scores, P)
  return { scores, norms, idx, band: bandOf(idx, P), path: selectPath(scores, P) }
}

// VERIFY against source on every synthetic company
let mcMismatch = 0
const base = companies.map(resp => {
  const e = evaluate(resp, BASE)
  const srcScores = Object.fromEntries(SECTIONS.map(id => [id, inferDiagnosticScore(id, resp)]))
  const srcIdx = calculateReadinessScore(srcScores)
  const srcPath = selectInterventionPath(srcScores, true)
  if (SECTIONS.some(id => srcScores[id].score !== e.scores[id]) || srcIdx !== e.idx ||
      getReadinessBand(srcIdx).id !== e.band || srcPath.finalPathNumber !== e.path.final) mcMismatch++
  return e
})
out(`VERIFY re-implementation vs source on all ${N.toLocaleString()} companies: ${mcMismatch === 0 ? 'IDENTICAL' : mcMismatch + ' MISMATCHES'}`)

const dist = (arr, key) => { const d = {}; for (const x of arr) d[key(x)] = (d[key(x)] || 0) + 1; return d }
const showDist = (label, d, keys) => out(`  ${label.padEnd(16)} ` + keys.map(k => `${k}: ${pct(d[k] || 0, N).padStart(6)}`).join('   '))
out('\nBaseline (gating on):')
showDist('final path', dist(base, e => e.path.final), [1, 2, 3, 4, 5])
showDist('raw path', dist(base, e => e.path.raw), [1, 2, 3, 4, 5])
showDist('band', dist(base, e => e.band), ['low', 'developing', 'strong', 'advanced'])
out(`  capped by gating: ${pct(base.filter(e => e.path.final < e.path.raw).length, N)}`)
out(`  any gate active:  ${pct(base.filter(e => e.path.gates.length > 0).length, N)}`)
const secDist = dist(base.flatMap(e => SECTIONS.map(id => ({ s: e.scores[id] }))), x => x.s)
out('  section scores   ' + [1, 2, 3, 4].map(k => `${k}: ${pct(secDist[k] || 0, N * 8).padStart(6)}`).join('   ') + '   (of all N x 8 section instances)')
const nearT = base.flatMap(e => SECTIONS.map(id => Math.min(...BASE.thresholds.map(t => Math.abs(e.norms[id] - t)))))
out(`  section instances within 0.05 of a threshold: ${pct(nearT.filter(x => x < 0.05).length, nearT.length)}`)

function compare(label, P, mutate = null) {
  let pathChg = 0, bandChg = 0, secChg = 0, idxAbs = 0, idxMax = 0
  for (let i = 0; i < N; i++) {
    const resp = mutate ? mutate(companies[i]) : companies[i]
    const e = evaluate(resp, P)
    const b = base[i]
    if (e.path.final !== b.path.final) pathChg++
    if (e.band !== b.band) bandChg++
    for (const id of SECTIONS) if (e.scores[id] !== b.scores[id]) secChg++
    if (e.idx !== null && b.idx !== null) { const d = Math.abs(e.idx - b.idx); idxAbs += d; idxMax = Math.max(idxMax, d) }
  }
  out(`  ${label.padEnd(44)} path ${pct(pathChg, N).padStart(6)} | band ${pct(bandChg, N).padStart(6)} | section scores ${pct(secChg, N * 8).padStart(6)} | mean |d idx| ${(idxAbs / N).toFixed(1).padStart(4)} (max ${idxMax})`)
}

out('\nSensitivity - share of companies whose output CHANGES vs baseline:')
const T = BASE.thresholds
compare('score thresholds all -0.05', withP({ thresholds: T.map(t => t - 0.05) }))
compare('score thresholds all +0.05', withP({ thresholds: T.map(t => t + 0.05) }))
compare('T1 (1|2 boundary) 0.30 -> 0.25', withP({ thresholds: [0.25, T[1], T[2]] }))
compare('T1 (1|2 boundary) 0.30 -> 0.35', withP({ thresholds: [0.35, T[1], T[2]] }))
compare('T2 (2|3 boundary) 0.55 -> 0.50', withP({ thresholds: [T[0], 0.50, T[2]] }))
compare('T2 (2|3 boundary) 0.55 -> 0.60', withP({ thresholds: [T[0], 0.60, T[2]] }))
compare('T3 (3|4 boundary) 0.78 -> 0.73', withP({ thresholds: [T[0], T[1], 0.73] }))
compare('T3 (3|4 boundary) 0.78 -> 0.83', withP({ thresholds: [T[0], T[1], 0.83] }))
compare('section weights all equal (12.5)', withP({ sectionWeights: Object.fromEntries(SECTIONS.map(id => [id, 12.5])) }))
compare('governance-heavy profile*', withP({ sectionWeights: { leadership: 15, workflow: 15, data: 15, user: 10, execution: 10, governance: 15, measurement: 10, sora: 10 } }))
compare('factor weights all = 1 (unweighted)', withP({ factorWeight: () => 1 }))
compare('factor weights 1/2/3 -> 1/3/9 (steeper)', withP({ factorWeight: f => [0, 1, 3, 9][f.weight] }))
compare('band cutoffs 44/69/81 -> 39/64/79', withP({ bands: [39, 64, 79] }))
compare('hard gating OFF', withP({ gating: false }))
compare('R4 parenthesized (precedence "fix")', withP({ r4Parenthesized: true }))
const half = resp => { const r = {}; for (const [k, v] of Object.entries(resp)) if (rng() < 0.5) r[k] = v; return r }
compare('only ~50% of factors answered', BASE, half)
out('  * governance-heavy: execution 15 -> 10, governance 10 -> 15 (illustrative environment profile)')

// ---------------------------------------------------------------------------
// 3. WORKED EXAMPLE - fictional company, scored by the REAL source code
// ---------------------------------------------------------------------------
h('3. WORKED EXAMPLE - "Meridian Freight Systems" (fictional, vertical software)')
export const EXAMPLE = {
  l1: 'no', l2: 'no', l3: 'yes', l4: 'yes', l5: 'no', l6: 'no', l7: 3, l8: 3, l9: 2,
  w1: 'yes', w2: 'yes', w3: 'yes', w4: 'no', w5: 'yes', w6: 'yes', w7: 'no', w8: 4, w9: 3,
  d1: 'yes', d2: 'no', d3: 'no', d4: 'yes', d5: 4, d6: 3, d7: 2, d8: 'no', d9: 'yes', d10: 'yes',
  u1: 'yes', u2: 'yes', u3: 'yes', u4: 'no', u5: 'yes', u6: 3, u7: 3, u8: 2,
  e1: 'no', e2: 'yes', e3: 'no', e4: 'yes', e5: 'yes', e6: 4, e7: 3, e8: 4, e9: 3,
  g1: 'yes', g2: 'yes', g3: 'no', g4: 'no', g5: 'yes', g6: 'no', g7: 2, g8: 2,
  m1: 'yes', m2: 'no', m3: 'yes', m4: 'no', m5: 'yes', m6: 3, m7: 2,
  s1: 'no', s2: 'yes', s3: 'yes', s4: 'no', s5: 3, s6: 3, s7: 2,
}
const exScores = Object.fromEntries(SECTIONS.map(id => [id, inferDiagnosticScore(id, EXAMPLE)]))
for (const sid of SECTIONS) {
  const r = exScores[sid]
  out(`\n${sid}  ->  normalized ${r.normalizedScore.toFixed(3)}  ->  score ${r.score}`)
  for (const c of r.contributions) {
    const f = FACTORS[sid].find(x => x.id === c.factorId)
    out(`   ${c.factorId.padEnd(4)} ${f.polarity === 'positive' ? '+' : '-'} ${String(c.rawValue).padEnd(4)} n=${c.normalized.toFixed(2)} x w${c.weight} = ${c.contribution.toFixed(2)}`)
  }
  const tw = r.contributions.reduce((a, c) => a + c.weight, 0)
  const ws = r.contributions.reduce((a, c) => a + c.contribution, 0)
  const margin = Math.min(...BASE.thresholds.map(t => Math.abs(r.normalizedScore - t)))
  out(`   sum ${ws.toFixed(2)} / weight ${tw} = ${(ws / tw).toFixed(3)}   (distance to nearest threshold ${margin.toFixed(3)})`)
}
const exIdx = calculateReadinessScore(exScores)
out(`\nReadiness index: ${exIdx}  band: ${getReadinessBand(exIdx).label}`)
for (const gating of [true, false]) {
  const r = selectInterventionPath(exScores, gating)
  const mine = selectPath(Object.fromEntries(SECTIONS.map(id => [id, exScores[id].score])), withP({ gating }))
  out(`\nGating ${gating ? 'ON ' : 'OFF'}: raw path ${r.rawPathNumber} (rule ${mine.rule}) -> final path ${r.finalPathNumber}  capped=${r.pathCapped}`)
  out(`  active gates: ${r.activeGates.map(g => g.id).join(', ') || 'none'}`)
  out(`  blockers:     ${r.blockers.map(b => b.id).join(', ') || 'none'}`)
  out(`  rationale:    ${r.rationale}`)
}
