---
id: cli
name: CLI
type: domain
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
last_reviewed: 2026-05-08
tags:
  - type/domain
  - domain/cli
  - status/active
---

# CLI Domain

The CLI domain is the entry point and orchestrator for the entire supervisor. `bin/claude-pilot.js` is the npm binary (`claude-remote-pilot`) that stitches together session management, the web server, config, and notifications.

## Capabilities

- [[cli-launch-session|Launch Session]] — spawn a new Claude session in tmux
- [[cli-list-sessions|List Sessions]] — display and navigate sessions interactively
- [[cli-manage-lifecycle|Manage Session Lifecycle]] — start/stop/remove sessions, handle exit

## Flows

- [[cli-launch-flow|Launch Flow]] — end-to-end from startup to supervised session

## Concepts

- [[cli-setup-prefs-concept|Setup Preferences]] — first-run wizard and persistence

## Cross-domain dependencies

- [[session|Session domain]] — session create/remove/watch
- [[web|Web domain]] — optional dashboard server
- [[core|Core domain]] — config and notifications

## Entry point

`bin/claude-pilot.js` — registered as `claude-remote-pilot` in package.json `bin`
