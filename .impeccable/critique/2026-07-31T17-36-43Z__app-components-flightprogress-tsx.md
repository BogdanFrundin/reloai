---
target: app/_components/FlightProgress.tsx flight globe visualization
total_score: 17
max_score: 24
na_heuristics: 3,7,9,10
p0_count: 1
p1_count: 1
timestamp: 2026-07-31T17-36-43Z
slug: app-components-flightprogress-tsx
---
Method: dual-agent (A: ae428bea17ee79793 · B: a4cac091d09f4032d)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Silently degrades to a floating plane with no origin marker |
| 2 | Match System / Real World | 3 | Plane rotation likely reads as flying the wrong way at low progress |
| 3 | User Control and Freedom | n/a | Passive display |
| 4 | Consistency and Standards | 4 | Reuses design tokens correctly |
| 5 | Error Prevention | 1 | Default (no-citizenship) state undesigned |
| 6 | Recognition Rather Than Recall | 3 | Origin side blank |
| 7 | Flexibility and Efficiency | n/a | No interaction paths |
| 8 | Aesthetic and Minimalist Design | 3 | Three stacked glow effects |
| 9 | Error Recovery | n/a | No error condition |
| 10 | Help and Documentation | n/a | Not applicable |
| Total | | 17/24 | Good (71%, borderline) |

## Design Specificity Verdict
Generic "global expansion" template wearing ReloAI's color; NASA Earth photo shows unrelated geography, not Europe (every destination is Poland/Germany/Spain). detect.mjs ran clean (0 findings) both via static scan and browser overlay.

## Priority Issues
- P0: No origin marker when originCode is null (the actual default/guest state).
- P1: Plane rotation (angle + 90) likely misaligned against the glyph's native heading.
- P2: Globe crop shows generic cloud/ocean, not Europe.
- P2: No progressbar ARIA semantics.
- P3: Triple-stacked glow (starfield + blob + box-shadow).

## Strengths
P0/P2 anchored directly to flag constants (path can't drift); consistent token usage from globals.css.

## Persona Red Flags
Jordan: no origin anchor in default state. Sam: no progressbar role, color-only path distinction. Casey: 10px flag labels, ambiguous plane direction on mobile glance.
