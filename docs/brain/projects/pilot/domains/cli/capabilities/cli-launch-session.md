---
id: cli-launch-session
name: Launch Session
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

# Launch Session

Spawns a new supervised Claude Code session in a named tmux window. The user provides a working directory and optional session name; the CLI creates the tmux window, starts the `claude` process inside it, records the session in state, and begins watching the process.

## What it does

- Prompts user for session name and working directory (or accepts via CLI args)
- Creates a tmux window (`tmux new-window -n <name>`) inside the configured tmux session
- Sends the `claude` startup command into the window
- Registers the session in persistent state via [[core-load-config|Config]] and [[core-save-config|Save Config]]
- Hands off the session reference to [[session-watch-process|Process Watcher]]

## Entry point

`bin/claude-pilot.js` — interactive menu option "New session" or `--session` flag

## Related

- [[cli|CLI domain]]
- [[session-create|Create Session]]
- [[session-watch-process|Watch Process]]
- [[core-load-config|Load Config]]
