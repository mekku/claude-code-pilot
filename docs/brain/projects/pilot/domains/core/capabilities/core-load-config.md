---
id: core-load-config
name: Load Config
type: capability
domain: core
status: active
confidence: source_supported
source_files:
  - lib/config.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/core
  - status/active
---

# Load Config

Reads the persisted configuration file from the user's home directory and returns a parsed config object. Creates defaults if the file does not exist.

## What it does

- Determines config path: `~/.claude-pilot/config.json` (using `os.homedir()`)
- Reads and parses JSON; returns default config object if file missing or malformed
- Exposes: session list, Telegram settings, web token, setup preferences, web port

## Entry point

`lib/config.js` — exported function used by `bin/claude-pilot.js`, `lib/SessionManager.js`, `lib/WebServer.js`

## Related

- [[core|Core domain]]
- [[core-save-config|Save Config]]
- [[core-config-persistence-concept|Config Persistence]]
