---
id: session-create
name: Create Session
type: capability
domain: session
status: active
confidence: source_supported
source_files:
  - lib/SessionManager.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/session
  - status/active
---

# Create Session

Creates a new tmux window for a Claude Code session, records it in config, and starts the process watcher.

## What it does

- `spawn(dirPath, name, command = 'claude')` — creates a new tmux session running the given command, stores `{ name, path, command, status, startedAt, resumeAt }`, adds to history, starts watcher
- `adopt(name, dirPath, command = 'claude')` — registers an already-running tmux session for watching; stores `command` in session object and calls `addToHistory(name, dirPath, command)` so the agent type is persisted in history and survives future restarts. **Previously `command` was omitted from `addToHistory()`, silently overwriting history with `'claude'` on every re-adopt (fixed in v0.14.6).**
- Appends the new session entry to persistent config via [[core-save-config|config]]
- Spawns a [[session-watch-process|Watcher]] instance for each session

## Entry point

`lib/SessionManager.js` — called by `bin/claude-pilot.js` after user input

## Related

- [[session|Session domain]]
- [[session-watch-process|Watch Process]]
- [[core-save-config|Save Config]]
- [[cli-launch-session|Launch Session]]
