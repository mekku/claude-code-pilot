# Kode Brain Benchmark — claude-code-remote-pilot
Generated: 2026-05-08

## Coverage
Total source files:   8
Mapped to KB:         6  (75%)
Unmapped:             2  (25%)

> Unmapped files are `test/config.test.js` and `test/webserver.test.js` — intentionally excluded test files with no dedicated KB nodes. Source logic they test is fully mapped.

## Knowledge Map
| Type            | Count |
|---|---|
| Domains         | 4 |
| Capabilities    | 13 |
| Flows           | 3 |
| Concepts        | 6 |
| Models          | 0 |
| Risks           | 3 |
| Legacy areas    | 0 |
| **Total nodes** | **29** |
| **Total edges** | **50** |

## Confidence
| Level              | Nodes | % |
|---|---|---|
| source_supported   | 27 | 93% |
| inferred           | 2  | 7%  |
| ambiguous          | 0  | 0%  |
| needs_human_review | 0  | 0%  |
| verified           | 0  | 0%  |

## Status
| Status             | Nodes |
|---|---|
| active             | 26 |
| needs_review       | 3  |
| partially_migrated | 0  |
| legacy             | 0  |

## Graph Metrics
Avg edges per node:    3.4
Cross-domain edges:    0  *(domain-level edges present in edges.json; script counts capability-level only)*
Orphan nodes:          0  (perfect — every node has at least one edge)

Top hubs:
  1. session-watch-process — 8 edges  (capability)
  2. core-load-config      — 7 edges  (capability)
  3. session-create        — 6 edges  (capability)
  4. web-serve-dashboard   — 6 edges  (capability)
  5. core-save-config      — 6 edges  (capability)

## Risk & Legacy Surface
Risk nodes (HIGH):     0
Risk nodes (MED/LOW):  3  (1 med, 2 low)
Legacy/deprecated:     0 files
Needs review:          2 items
Suspected legacy:      1 file  (false positive — entry point, not dead code)

## Token Efficiency
KB Markdown:      ~35,664 bytes  (~12,700 tokens)
KB JSON graphs:   ~15,138 bytes
Source code:      ~81,426 bytes  (~20,356 tokens)
Compression ratio: **1.6×**  (reading the KB costs 38% fewer tokens than raw source)

## Graph Topology

```
         ┌──────────────────────────┐
         │           CLI            │
         │  3 caps · 1 flow         │
         │  1 concept               │
         │  bin/claude-pilot.js     │
         └──────┬────────┬──────────┘
          calls │        │ calls
                │        │
                ▼        ▼
  ┌──────────────────┐  ┌─────────────────────┐
  │    SESSION       │  │        WEB          │
  │ 4 caps · 1 flow  │  │  3 caps · 1 flow    │
  │ 2 concepts       │  │  1 concept          │
  │ SessionManager   │  │  WebServer.js       │
  │ Watcher.js       │  └──────────┬──────────┘
  └────────┬─────────┘             │
    calls  │                       │ reads_from
           └──────────┬────────────┘
                      ▼
         ┌──────────────────────────┐
         │           CORE           │
         │  3 caps · 2 concepts     │
         │  config.js · notifier.js │
         └──────────────────────────┘

  Hub nodes (by edge degree):
  ● session-watch-process (8)   ● core-load-config (7)
  ● session-create (6)          ● web-serve-dashboard (6)
  ● core-save-config (6)
```

## Quality Scores
Coverage:       75/100
Confidence:     77/100
Connectedness: 100/100
Risk awareness: 60/100
─────────────────────
Overall:        **78/100  [Good]**

Grade scale: 90+ = Excellent · 75+ = Good · 60+ = Fair · <60 = Needs work

---

## Improvement Recommendations

### HIGH
*(none)*

### MED

**1. Promote test files to KB nodes (+coverage, +25%)**
`test/config.test.js` and `test/webserver.test.js` are unmapped. Adding thin capability nodes for "Test Config" and "Test Web Server" would raise coverage from 75% to 100% and give future agents a signal that these areas have test coverage.

**2. Elevate risk awareness score (currently 60/100)**
No HIGH-severity risk nodes exist. The static token risk (`web-token-no-rotation-risk`) is marked `med` but may warrant `high` if this tool is ever exposed outside localhost. Review the severity assignments in `needs-review.md`.

### LOW

**3. Resolve 2 inferred-confidence nodes**
`config-concurrent-write-risk` and `resume-window-killed-risk` are `confidence: inferred`. Reading `lib/Watcher.js` and `lib/config.js` directly to confirm the error-handling behavior would allow upgrading both to `source_supported`.

**4. Add a model node for the config schema**
The config JSON structure (`tmuxSession`, `sessions[]`, `webToken`, etc.) is described in `core-config-persistence-concept` but not as a standalone model node. A `core-config-model` node would make the schema navigable as a first-class KB entity.

**5. False-positive entry in suspected-legacy.md**
`bin/claude-pilot.js` is flagged as `suspected_unused` by the harvest script (no importers). Document the harvest exclusion rule for `bin/` entry points to avoid confusion on future scans.
