# AI Readiness Assessment: Documentation

Knowledge-transfer documents for the AI Readiness Assessment prototype. Each file carries the framework version in its name; a new version adds new files and never overwrites old ones.

## Document register

| Document | Audience | Purpose |
|---|---|---|
| [`AI-Readiness-Executive-Summary-v1.0.md`](AI-Readiness-Executive-Summary-v1.0.md) | Anyone; no technical or AI background needed | How the system works, in plain language |
| `AI-Readiness-Executive-Summary-v1.0.pptx` | Presenting to a team | 14-slide deck built from the executive summary, with speaker notes |
| [`AI-Readiness-Deep-Dive-v1.0.md`](AI-Readiness-Deep-Dive-v1.0.md) | Future builds (human or AI) with no prior context | Logic, mechanics, assumptions and reasoning, organized as modular components |
| [`analysis/framework-analysis.mjs`](analysis/framework-analysis.mjs) | Anyone changing the logic | Reproduces every finding and number in the deep dive against the real source code |
| [`analysis/framework-analysis-output-v1.0.txt`](analysis/framework-analysis-output-v1.0.txt) | Regression baseline | Frozen harness output for v1.0. Diff a fresh run against it after any change. |

```bash
node assessment/docs/analysis/framework-analysis.mjs   # ~10 s, no dependencies, deterministic
```

## Version history

| Version | Date | Documents | Code | Notes |
|---|---|---|---|---|
| 1.0 | 2026-10-13 | Executive summary (md + pptx), deep dive, analysis harness | `8aa65ff` | Snapshot of the system as built. Known issues are documented in deep dive §19, not fixed. |

**Versioning rule:** bump the minor version for calibration or content changes, and the major version for structural changes (deep dive §16.2). With every version, freeze a new harness output file.
