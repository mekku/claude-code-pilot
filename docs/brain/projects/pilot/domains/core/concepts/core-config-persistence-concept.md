---
id: core-config-persistence-concept
name: Config Persistence Concept
type: concept
domain: core
status: active
confidence: source_supported
source_files:
  - lib/config.js
last_reviewed: 2026-05-08
tags:
  - type/concept
  - domain/core
  - status/active
---

# Config Persistence Concept

All persistent state — session list, Telegram credentials, web auth token, setup flags — lives in a single JSON file at `~/.claude-pilot/config.json`. There is no database.

## Structure

```json
{
  "tmuxSession": "pilot",
  "webPort": 3000,
  "webToken": "<hex>",
  "telegram": { "botToken": "...", "chatId": "..." },
  "sessions": [
    { "name": "my-app", "cwd": "/path/to/project", "autoResume": true }
  ],
  "setupDone": true
}
```

## Non-obvious detail

Config is read fresh from disk on each load call — there is no in-memory singleton cache. Multiple processes (e.g., CLI and web server in same Node process) share the same instance but mutations must call `saveConfig` to persist. Race conditions on concurrent writes are possible but unlikely in single-user use.

## Related

- [[core|Core domain]]
- [[core-load-config|Load Config]]
- [[core-save-config|Save Config]]
