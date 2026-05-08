---
id: session-tmux-concept
name: Tmux Session Model
type: concept
domain: session
status: active
confidence: source_supported
source_files:
  - lib/SessionManager.js
  - bin/claude-pilot.js
last_reviewed: 2026-05-08
tags:
  - type/concept
  - domain/session
  - status/active
---

# Tmux Session Model

`claude-remote-pilot` operates inside a single tmux **session** that the user pre-creates. Each Claude Code instance runs in its own tmux **window** within that session. This is a non-obvious indirection — the "sessions" in config refer to tmux windows, not tmux sessions.

## Key invariants

- One tmux session (named in config, e.g. `pilot`) contains all Claude windows
- Window name = Claude session name
- A session is "offline" when its tmux window no longer exists
- The Watcher targets `<tmux-session>:<window-name>` as the pane address

## Why this matters

When reading code that calls `tmux new-window` or `tmux send-keys`, the `-t` flag always refers to `<session>:<window>`, not a standalone tmux session.

## Related

- [[session|Session domain]]
- [[session-create|Create Session]]
- [[session-watch-process|Watch Process]]
