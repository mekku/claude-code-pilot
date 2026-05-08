---
id: session-watch-process
name: Watch Process
type: capability
domain: session
status: active
confidence: source_supported
source_files:
  - lib/Watcher.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/session
  - status/active
---

# Watch Process

Polls the tmux pane for the Claude process and fires callbacks on status changes (running → exited). Uses a crypto-based fingerprint to detect output changes.

## What it does

- Uses `setInterval` to periodically run `tmux list-panes -t <session>:<window>` 
- Captures pane content via `tmux capture-pane` and hashes it with `crypto` to detect staleness
- Fires `onExit` callback when pane process is no longer running
- Fires `onStale` callback when pane content hasn't changed for N intervals (stuck detection)
- Tracks hash of last captured output to detect activity

## Entry point

`lib/Watcher.js` — instantiated by `lib/SessionManager.js` per session

## Related

- [[session|Session domain]]
- [[session-resume|Auto-Resume]]
- [[core-send-notification|Send Notification]]
- [[session-tmux-concept|Tmux Session Concept]]
