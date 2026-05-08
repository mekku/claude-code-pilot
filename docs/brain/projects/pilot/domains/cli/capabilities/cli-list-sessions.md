---
id: cli-list-sessions
name: List Sessions
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

# List Sessions

Displays all known sessions (active and offline) in an interactive terminal menu. The user can select a session to attach to it or choose management actions.

## What it does

- Reads session state from [[core-load-config|Config]]
- Checks each session's actual tmux window status to classify as active/offline
- Renders an interactive `readline` menu listing sessions with their status
- Allows the user to attach (`tmux select-window`), start web dashboard, or remove offline sessions

## Entry point

`bin/claude-pilot.js` — default interactive menu on startup

## Related

- [[cli|CLI domain]]
- [[session-remove-offline|Remove Offline Sessions]]
- [[web-serve-dashboard|Serve Dashboard]]
- [[core-load-config|Load Config]]
