<!-- draft: inferred — not human-reviewed -->
---
id: resume-window-killed-risk
name: Resume Fails When tmux Window Killed
type: risk
severity: low
domain: session
status: needs_review
confidence: inferred
source_files:
  - lib/Watcher.js
  - lib/SessionManager.js
last_reviewed: 2026-05-08
tags:
  - type/risk
  - domain/session
  - status/needs_review
---

# Resume Fails When tmux Window Killed

Auto-resume sends `claude` to an existing tmux window. If the user or an external script killed the tmux window itself (not just the process), the window no longer exists and `tmux send-keys` fails silently.

## Risk

The Watcher fires `onExit`, SessionManager attempts resume via `tmux send-keys`, the command errors out, but no notification or error log surfaces the failure. The session appears to be running in config but is actually gone.

## Affected components

- [[session-resume|Auto-Resume Session]]
- [[session-watch-process|Watch Process]]
- [[session-auto-resume-concept|Auto-Resume Concept]]

## Mitigation

Add a `tmux list-windows` check before attempting `send-keys`; if window is gone, mark session offline and send a "session window destroyed" notification.
