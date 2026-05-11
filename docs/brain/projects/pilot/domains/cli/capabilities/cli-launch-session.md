---
id: cli-launch-session
name: Launch Session
type: capability
domain: cli
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
last_reviewed: 2026-05-11
version: 0.13.0
tags:
  - type/capability
  - domain/cli
  - status/active
---

# Launch Session

Spawns a new supervised agent session in a named tmux window. Supports claude (default), opencode, and codex. The user provides a working directory, optional session name, and agent; the CLI creates the tmux window, starts the agent process, records the session in state, and begins watching the process.

## What it does

- Prompts user for session name, working directory, and agent (claude / opencode / codex) at startup
- Accepts `--opencode` / `--codex` flags on the `spawn` REPL command
- Creates a tmux window (`tmux new-window -n <name>`) inside the configured tmux session
- Sends the selected agent command into the window
- Registers the session in persistent state via [[core-load-config|Config]] and [[core-save-config|Save Config]]
- Hands off the session reference to [[session-watch-process|Process Watcher]]

## Entry point

`bin/claude-pilot.js` — startup mount prompt or `spawn <path> [name] [--opencode|--codex]` REPL command

## Related

- [[cli|CLI domain]]
- [[session-create|Create Session]]
- [[session-watch-process|Watch Process]]
- [[core-load-config|Load Config]]
