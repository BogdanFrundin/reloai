---
target: app/_components/FlightProgress.tsx flight globe visualization — v2 craft pass
total_score: 15
max_score: 20
na_heuristics: 3,5,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-01T11-58-46Z
slug: app-components-flightprogress-tsx
---
Method: dual-agent (A: afb6e6e4334093fa1 · B: a6f2528e7a69dbf6e)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Solid/dashed distinction invisible at 0% (most common state) |
| 2 | Match System / Real World | 3 | Generic stock plane icon undermines the metaphor |
| 3 | User Control and Freedom | n/a | Passive display |
| 4 | Consistency and Standards | 3 | Correct token usage |
| 5 | Error Prevention | n/a | No user input |
| 6 | Recognition Rather Than Recall | 4 | Flags + labels self-explanatory |
| 7 | Flexibility and Efficiency | n/a | No interaction |
| 8 | Aesthetic and Minimalist Design | 2 | Plane collides with origin flag marker at low progress |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | n/a | Not applicable |
| Total | | 15/20 | Acceptable (75%) |

## Design Specificity Verdict
Bespoke engineering (custom bezier math, coordinate-locked endpoints) but generic decorative layer: unmodified Material Symbols "flight" glyph as the plane, sparse 12-dot starfield, CSS-gradient "lighting" that reads as filters not a lit sphere. CLI detector: 0 findings. Browser overlay detector: 6-7 findings on the page, of which undersized-ui-text (10px labels at lines 162-163, 172) is conclusively traced to this file.

## Priority Issues
- P0: Plane renders almost on top of origin flag marker at 0% progress (t01 clamps to 0.04) — the default/most-common state.
- P1: Plane icon is an unmodified Material Symbols glyph with a barely-visible drop-shadow.
- P1: Starfield (12 uniform dots) has no size/opacity hierarchy, no clusters, no motion.
- P2: Globe lighting is a linear vignette mislabeled "terminator," not a true curved day/night line; rim glow imperceptible against card's own ambient blob.
- P2: Earth crop shows only cloud/ocean, no landmass — missed narrative opportunity for a relocation product.
- P3: Mobile composition top-heavy — globe compressed into a thin sliver vs a tall empty starfield area.
- Detector: 10px functional text below the 11px floor (origin/destination labels).

## Strengths
Bezier math locks path endpoints to flag positions (can't drift); disciplined design-token usage; the solid/dashed arc, once visible, reads elegantly.

## Persona Red Flags
Anxious first-timer: most likely to see the 0% plane/flag collision. Efficient/expert: 2000ms replay animation on every visit is unnecessary motion for a daily-glance user. Accessibility: no text alternative for the solid/dashed metaphor beyond the raw percent number.
