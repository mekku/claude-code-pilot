---
id: cli-manage-lifecycle
name: Manage Session Lifecycle
type: capability
domain: cli
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/cli
  - status/active
---

# Manage Session Lifecycle

Orchestrates start, stop, and removal of sessions from the CLI. Handles graceful exit when all sessions are closed or when the user quits the interactive menu.

## What it does

- Starts the [[web-serve-dashboard|web dashboard]] optionally on launch
- Delegates session creation to [[session-create|SessionManager.createSession]]
- Calls [[session-remove-offline|SessionManager.removeOffline]] on user request
- Shows an "exit hint" once auto-watch is running to tell the user how to re-enter the menu
- On quit, tears down the web server and clears watchers

## Entry point

`bin/claude-pilot.js` — main program loop

## Related

- [[cli|CLI domain]]
- [[session-create|Create Session]]
- [[session-remove-offline|Remove Offline Sessions]]
- [[web-serve-dashboard|Serve Dashboard]]
