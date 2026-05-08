---
id: core-send-notification
name: Send Notification
type: capability
domain: core
status: active
confidence: source_supported
source_files:
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/core
  - status/active
---

# Send Notification

Sends a Telegram message to a configured chat when session events occur (session started, crashed, resumed, completed).

## What it does

- Calls the Telegram Bot API via `child_process.execSync('curl ...')` with the bot token and chat ID from config
- Falls back silently if Telegram is not configured (token/chat ID missing)
- Used by [[session-watch-process|Watcher]] on process exit and [[session-resume|Auto-Resume]] on restart events

## Entry point

`lib/notifier.js` — called by `lib/Watcher.js`

## Related

- [[core|Core domain]]
- [[session-watch-process|Watch Process]]
- [[session-resume|Auto-Resume]]
- [[core-notification-concept|Notification Concept]]
