---
id: pilot
name: claude-code-remote-pilot
type: project
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
  - lib/SessionManager.js
  - lib/Watcher.js
  - lib/WebServer.js
  - lib/config.js
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/domain
  - domain/pilot
  - status/active
---

# claude-code-remote-pilot

**v0.8.1** — Interactive Claude Code supervisor. Spawn and monitor multiple Claude sessions from a single terminal, with auto-resume on crash, a web dashboard for remote monitoring, and Telegram notifications.

## Entry Points

- `bin/claude-pilot.js` — npm binary `claude-remote-pilot`; interactive CLI orchestrator
- Web dashboard — optional HTTP server on configurable port (default 3000)

## Domains

- [[cli|CLI]] — entry point, interactive menu, session orchestration
- [[session|Session]] — tmux-based session lifecycle, auto-resume, process watching
- [[web|Web]] — optional HTTP dashboard and JSON API
- [[core|Core]] — config persistence (`~/.claude-pilot/config.json`) and Telegram notifications

## Key flows

- [[cli-launch-flow|Launch Flow]] — startup to running supervised session
- [[session-watch-flow|Watch and Resume Flow]] — crash detection and restart
- [[web-request-flow|Web Request Flow]] — dashboard request handling

## Architecture notes

- Pure Node.js, no framework. All external integration via `child_process` (tmux, curl).
- Single JSON config file at `~/.claude-pilot/config.json`
- tmux provides the process isolation — each Claude instance is a tmux window
- No in-process state beyond what's in config; process can be restarted cleanly

## Tests

- `test/config.test.js` — config load/save
- `test/webserver.test.js` — web server start/stop, token auth, API routes
