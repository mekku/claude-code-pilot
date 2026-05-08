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

- Calls `tmux new-window -n <name> -c <cwd>` via `child_process.execSync`
- Sends the `claude` command into the tmux window via `tmux send-keys`
- Appends the new session entry to persistent config via [[core-save-config|config]]
- Spawns a [[session-watch-process|Watcher]] instance for the new session

## Entry point

`lib/SessionManager.js` — called by `bin/claude-pilot.js` after user input

## Related

- [[session|Session domain]]
- [[session-watch-process|Watch Process]]
- [[core-save-config|Save Config]]
- [[cli-launch-session|Launch Session]]
