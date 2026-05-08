---
id: core
name: Core
type: domain
status: active
confidence: source_supported
source_files:
  - lib/config.js
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/domain
  - domain/core
  - status/active
---

# Core Domain

Shared utilities used by all other domains: configuration persistence and Telegram notifications.

## Capabilities

- [[core-load-config|Load Config]] — read config from `~/.claude-pilot/config.json`
- [[core-save-config|Save Config]] — persist config changes to disk
- [[core-send-notification|Send Notification]] — fire Telegram messages on session events

## Concepts

- [[core-config-persistence-concept|Config Persistence]] — single JSON file, no database
- [[core-notification-concept|Telegram Notification]] — curl-based, opt-in, fail-silent

## Cross-domain consumers

- [[cli|CLI domain]] — reads config on startup, saves setup prefs
- [[session|Session domain]] — reads/writes session list, triggers notifications
- [[web|Web domain]] — reads config for token and session data
