---
id: web-open-finder
name: Open Finder
type: capability
domain: web
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
  - lib/ui.html
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/web
  - status/active
---

# Open Finder

Opens the session's working directory in macOS Finder via a single API call. Designed for local / localhost use.

## What it does

- `POST /api/sessions/:name/open-finder` — looks up the session path (active or history), runs `spawnSync('open', [cwd])`.
- Button labelled **📂 Finder** appears in the session detail header for both online and offline sessions.
- On non-macOS systems the `open` command is a no-op / error (handled silently).

## Related

- [[web|Web domain]]
- [[web-serve-dashboard|Serve Dashboard]]
