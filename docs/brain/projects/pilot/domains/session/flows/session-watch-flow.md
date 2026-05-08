---
id: session-watch-flow
name: Watch and Resume Flow
type: flow
domain: session
status: active
confidence: source_supported
source_files:
  - lib/Watcher.js
  - lib/SessionManager.js
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/flow
  - domain/session
  - status/active
---

# Watch and Resume Flow

How the system detects a crashed Claude session and automatically restarts it.

## Steps

1. `Watcher` polls `tmux list-panes -t <session>:<window>` every N ms
2. Captures pane content via `tmux capture-pane -pt <target>`; hashes with `crypto`
3. If pane is gone or process exited → fires `onExit(sessionName)` callback
4. `SessionManager.onExit` checks if session should auto-resume (not manually killed)
5. If resuming: sends `claude` via `tmux send-keys` into the existing window
6. Calls `lib/notifier.js` to send Telegram message "Session resumed"
7. If pane content hash unchanged for stale threshold → fires `onStale`; sends "Session may be stuck" notification

## Related

- [[session|Session domain]]
- [[session-watch-process|Watch Process]]
- [[session-resume|Auto-Resume]]
- [[core-send-notification|Send Notification]]
- [[session-auto-resume-concept|Auto-Resume Concept]]
