---
id: cli-setup-prefs-concept
name: Setup Preferences Concept
type: concept
domain: cli
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
last_reviewed: 2026-05-11
tags:
  - type/concept
  - domain/cli
  - status/active
---

# Setup Preferences Concept

On first run, the CLI collects user preferences interactively (tmux session name, Telegram credentials, web port) and persists them. Subsequent runs skip setup if `config.setupDone` is true.

## How it works

- Checks `config.setupDone` — if false, runs the interactive setup wizard
- Uses Node.js `readline` to prompt for each setting
- Saves preferences via [[core-save-config|saveConfig]] with `setupDone: true`
- Users can re-run setup by deleting `~/.claude-pilot/config.json` or setting `setupDone: false`

## Startup mount prompt (v0.13.0)

The "Mount current directory?" prompt now also asks for the agent: `claude / opencode / codex`. Any answer other than `opencode` or `codex` defaults to `claude`.

## Non-obvious detail

The exit hint ("press X to return to menu") is shown only once — after setup is done and auto-watch starts. This is to avoid cluttering the initial setup flow. The hint is tracked by a one-shot flag in the session.

## Related

- [[cli|CLI domain]]
- [[core-save-config|Save Config]]
- [[core-config-persistence-concept|Config Persistence]]
