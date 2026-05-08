---
id: session-remove-offline
name: Remove Offline Sessions
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

# Remove Offline Sessions

Removes sessions that are no longer running from the persistent session list and kills their tmux windows if still present.

## What it does

- Checks each session's tmux window existence via `tmux list-windows`
- For sessions with no active window, removes them from config via [[core-save-config|config]]
- Optionally kills the tmux window if it still exists in a dead state
- Stops the associated [[session-watch-process|Watcher]] if still running

## Entry point

`lib/SessionManager.js` — called from `bin/claude-pilot.js` on user action

## Related

- [[session|Session domain]]
- [[core-save-config|Save Config]]
- [[session-watch-process|Watch Process]]
- [[cli-list-sessions|List Sessions]]
