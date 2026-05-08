---
id: session-auto-resume-concept
name: Auto-Resume Concept
type: concept
domain: session
status: active
confidence: source_supported
source_files:
  - lib/Watcher.js
  - lib/SessionManager.js
last_reviewed: 2026-05-08
tags:
  - type/concept
  - domain/session
  - status/active
---

# Auto-Resume Concept

When a Claude session exits unexpectedly, the system automatically sends the `claude` command again into the same tmux window — without user action. This is the core value proposition of the tool.

## How it works

The Watcher distinguishes between:
- **Natural exit** (Claude finished task, exited 0) → still resumes if config says so
- **Manual kill** (user explicitly stopped it) → does NOT resume
- **Crash** (non-zero exit, process gone) → resumes

The "manual kill" distinction is maintained by a flag set when the user triggers removal.

## Non-obvious detail

Auto-resume re-sends the `claude` command into an existing tmux window. If the window was killed (not just the process), the window no longer exists and resume fails. The Watcher's `onExit` fires but `send-keys` returns an error — this is not surfaced to the user directly.

## Related

- [[session|Session domain]]
- [[session-resume|Auto-Resume capability]]
- [[session-watch-process|Watch Process]]
- [[session-watch-flow|Watch and Resume Flow]]
