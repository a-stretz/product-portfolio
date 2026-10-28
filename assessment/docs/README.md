# AI Readiness Assessment: Documentation

Knowledge-transfer documents for the AI Readiness Assessment prototype. Each file carries the framework version in its name; a new version adds new files and never overwrites old ones.

## Document register

| Document | Audience | Purpose |
|---|---|---|
| [`AI-Readiness-Executive-Summary-v1.0.md`](AI-Readiness-Executive-Summary-v1.0.md) | Anyone; no technical or AI background needed | How the system works, in plain language |
| `AI-Readiness-Executive-Summary-v1.0.pptx` | Presenting to a team | 14-slide deck built from the executive summary, with speaker notes |
| [`AI-Readiness-Deep-Dive-v1.0.md`](AI-Readiness-Deep-Dive-v1.0.md) | Future builds (human or AI) with no prior context | Logic, mechanics, assumptions and reasoning, organized as modular components |
| [`AI-Readiness-Synthetic-Journey-v1.0.md`](AI-Readiness-Synthetic-Journey-v1.0.md) | Operators, leaders, framework maintainers | How to run synthetic companies through the assessment, with one full 24-month journey from very low readiness to AI-native operations (plain English, STE-100 style) |
| [`analysis/framework-analysis.mjs`](analysis/framework-analysis.mjs) | Anyone changing the logic | Reproduces every finding and number in the deep dive against the real source code |
| [`analysis/synthetic-journey.mjs`](analysis/synthetic-journey.mjs) | Anyone building a synthetic user | Runs the example journey through the real engine and checks it against the realism rules |
| [`analysis/synthetic-journey-output-v1.0.txt`](analysis/synthetic-journey-output-v1.0.txt) | Regression baseline | Frozen journey output for v1.0 |
| [`analysis/framework-analysis-output-v1.0.txt`](analysis/framework-analysis-output-v1.0.txt) | Regression baseline | Frozen harness output for v1.0. Diff a fresh run against it after any change. |

```bash
node assessment/docs/analysis/framework-analysis.mjs   # ~10 s, no dependencies, deterministic
node assessment/docs/analysis/synthetic-journey.mjs    # example journey + realism checks
```

## Version history

| Version | Date | Documents | Code | Notes |
|---|---|---|---|---|
| 1.0 | 2026-10-28 | Synthetic journey design and Northline example, journey runner | `8aa65ff` | Same framework version. Adds simulation method; findings J1–J5 proposed for v1.1. |
| 1.0 | 2026-10-13 | Executive summary (md + pptx), deep dive, analysis harness | `8aa65ff` | Snapshot of the system as built. Known issues are documented in deep dive §19, not fixed. |

**Versioning rule:** bump the minor version for calibration or content changes, and the major version for structural changes (deep dive §16.2). With every version, freeze a new harness output file.
