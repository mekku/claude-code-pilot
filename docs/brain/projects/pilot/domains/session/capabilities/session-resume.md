---
id: session-resume
name: Auto-Resume Session
type: capability
domain: session
status: active
confidence: source_supported
source_files:
  - lib/SessionManager.js
  - lib/Watcher.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/session
  - status/active
---

# Auto-Resume Session

Automatically relaunches a Claude Code session when the watcher detects the process has exited unexpectedly, without user intervention.

## What it does

- [[session-watch-process|Watcher]] detects process exit via `tmux list-panes` polling
- If exit was not intentional (user didn't kill), `SessionManager` calls `tmux send-keys` to restart `claude` in the existing window
- Sends a [[core-send-notification|Telegram notification]] on resume event
- Increments resume counter in session state

## Entry point

`lib/Watcher.js` → callback into `lib/SessionManager.js`

## Related

- [[session|Session domain]]
- [[session-watch-process|Watch Process]]
- [[core-send-notification|Send Notification]]
- [[session-auto-resume-concept|Auto-Resume Concept]]
