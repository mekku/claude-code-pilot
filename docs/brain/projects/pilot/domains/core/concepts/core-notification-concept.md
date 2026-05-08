---
id: core-notification-concept
name: Telegram Notification Concept
type: concept
domain: core
status: active
confidence: source_supported
source_files:
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/concept
  - domain/core
  - status/active
---

# Telegram Notification Concept

Notifications are sent to a Telegram chat using `curl` via `child_process`. This is intentionally low-dependency — no Telegram SDK, just a raw HTTP call.

## How it works

- Uses `child_process.execSync` to run `curl -s -X POST https://api.telegram.org/bot<token>/sendMessage`
- Errors are swallowed silently — notification failure never crashes the supervisor
- Events that trigger notifications: session exit, session resume, session stuck

## Non-obvious detail

Notifications are opt-in. If `config.telegram.botToken` is empty, `notifier.js` returns immediately without any network call. Users who don't configure Telegram get no notifications but the tool still works.

## Related

- [[core|Core domain]]
- [[core-send-notification|Send Notification]]
- [[session-watch-process|Watch Process]]
