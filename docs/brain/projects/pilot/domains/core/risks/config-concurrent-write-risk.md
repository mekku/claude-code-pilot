<!-- draft: inferred — not human-reviewed -->
---
id: config-concurrent-write-risk
name: Config Concurrent Write Risk
type: risk
severity: low
domain: core
status: needs_review
confidence: inferred
source_files:
  - lib/config.js
last_reviewed: 2026-05-08
tags:
  - type/risk
  - domain/core
  - status/needs_review
---

# Config Concurrent Write Risk

`config.js` has no file locking. If two code paths call `saveConfig` concurrently (e.g., SessionManager creates a session while WebServer rotates a token), the second write could overwrite the first.

## Risk

In practice this is unlikely in single-user CLI use (Node.js is single-threaded and the web server and CLI run in the same process). Risk increases if a future version spawns worker threads or child processes that write config independently.

## Affected components

- [[core-save-config|Save Config]]
- [[core-load-config|Load Config]]

## Mitigation

Currently: low probability due to single-threaded Node.js execution model. Future: consider a simple write queue or `proper-lockfile` if concurrency is introduced.
