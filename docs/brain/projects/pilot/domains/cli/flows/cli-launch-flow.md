---
id: cli-launch-flow
name: Launch Flow
type: flow
domain: cli
status: active
confidence: source_supported
source_files:
  - bin/claude-pilot.js
  - lib/SessionManager.js
  - lib/Watcher.js
  - lib/notifier.js
last_reviewed: 2026-05-08
tags:
  - type/flow
  - domain/cli
  - status/active
---

# Launch Flow

End-to-end path from user running `claude-remote-pilot` to a supervised session running in tmux.

## Steps

1. `bin/claude-pilot.js` starts → loads config via `lib/config.js`
2. If setup not done: prompts for tmux session name, Telegram credentials, web port → saves prefs
3. Checks tmux is running; optionally starts the web server (`lib/WebServer.js`)
4. Displays interactive session menu (readline)
5. User selects "New session" → `SessionManager.createSession(name, cwd)`
6. SessionManager creates tmux window → sends `claude` command
7. SessionManager instantiates `Watcher(window, callbacks)`
8. Watcher polls pane; on exit → fires resume or notification via `lib/notifier.js`
9. User can exit the menu; watcher continues running in background

## Related

- [[cli|CLI domain]]
- [[cli-launch-session|Launch Session]]
- [[session-create|Create Session]]
- [[session-watch-process|Watch Process]]
- [[core-load-config|Load Config]]
- [[web-serve-dashboard|Serve Dashboard]]
