# Claude Code Remote Pilot

Interactive Claude Code supervisor using `tmux`, Node.js, and notifications.

The current MVP keeps Claude Code usable in the normal terminal while adding a small supervisor layer that can detect usage limits, notify you, wait, and send `continue` automatically.

Longer term, this project is moving toward a local multi-session Claude Code dashboard.

---

## Current Status

This repository currently contains:

- `claude-pilot.sh` — bash/tmux watcher MVP
- `bin/claude-pilot.js` — npm CLI wrapper
- `package.json` — npm package entry
- `docs/ARCHITECTURE_UPDATE.md` — architecture direction
- `TASKS.md` — implementation roadmap

Current mode:

```text
Human → tmux terminal → Claude Code
              ↑
              │
        Claude Code Remote Pilot
        - watches output
        - detects limits
        - sends notifications
        - resumes automatically
```

Future mode:

```text
Browser Dashboard
        ↓
WebSocket / REST API
        ↓
Node.js Supervisor
        ↓
Session Manager
        ↓
tmux sessions
        ↓
Claude Code instances
```

---

## Why This Exists

Claude Code is useful for long-running coding tasks, but usage/rate limits can interrupt the flow.

This project aims to provide:

- persistent Claude Code sessions
- automatic resume after limit reset
- human-supervised automation
- local-first workflow
- multi-session management
- eventual web dashboard control

It is intentionally **not** designed as an unsafe fully autonomous agent loop.

---

## Features

Current MVP:

- tmux session persistence
- auto-create Claude tmux session
- terminal output capture
- usage/rate limit detection
- reset-time parsing
- Telegram notification support
- automatic `continue` after waiting
- duplicate event protection
- resume cooldown protection
- npm CLI wrapper

Planned:

- Node.js runtime refactor
- multiple Claude sessions
- web dashboard
- WebSocket live output
- session registry
- pluggable detectors
- notification providers
- persistent session state
- policy/safety engine

---

## Requirements

- Node.js >= 18
- bash
- tmux
- curl
- python3 recommended for better reset-time parsing
- Claude Code CLI installed and authenticated

macOS:

```bash
brew install tmux
```

Ubuntu/Debian:

```bash
sudo apt install tmux curl python3
```

---

## Install

### From GitHub

```bash
git clone https://github.com/mekku/claude-code-pilot.git
cd claude-code-pilot
yarn install
```

Run locally:

```bash
yarn pilot
```

or:

```bash
node bin/claude-pilot.js
```

### As npm package later

After publishing:

```bash
npm install -g claude-code-pilot
claude-pilot
```

or:

```bash
npx claude-code-pilot
```

---

## Telegram Setup

Create a bot with `@BotFather` and get your bot token.

Send a message to your bot, then get your chat ID:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getUpdates"
```

Look for:

```json
"chat": {
  "id": 123456789
}
```

Run:

```bash
export TELEGRAM_BOT_TOKEN="xxx"
export TELEGRAM_CHAT_ID="123456789"

yarn pilot
```

Telegram is optional. If not configured, messages are printed locally.

---

## Basic Usage

Start pilot:

```bash
yarn pilot
```

Attach to Claude:

```bash
tmux attach -t claude
```

Detach without killing Claude:

```text
Ctrl+B then D
```

The watcher keeps running and watches the tmux session.

---

## Environment Variables

| Variable | Default | Description |
|---|---:|---|
| `TELEGRAM_BOT_TOKEN` | empty | Telegram bot token |
| `TELEGRAM_CHAT_ID` | empty | Telegram chat ID |
| `CLAUDE_SESSION` | `claude` | tmux session name |
| `CLAUDE_COMMAND` | `claude` | command used to start Claude |
| `CHECK_INTERVAL_SECONDS` | `30` | watcher interval |
| `LIMIT_FALLBACK_WAIT_SECONDS` | `300` | fallback wait if reset time cannot be parsed |
| `POST_RESUME_COOLDOWN_SECONDS` | `180` | avoid repeated resume spam |
| `CAPTURE_LINES` | `500` | number of tmux output lines to inspect |
| `RESUME_COMMAND` | `continue` | command sent after reset |
| `START_IF_MISSING` | `1` | auto-create tmux session if missing |
| `LIMIT_REGEX` | built-in | custom regex for limit detection |
| `PERMISSION_REGEX` | built-in | custom regex for permission detection |

Example:

```bash
CLAUDE_SESSION=claude-buildx-api \
CLAUDE_COMMAND="claude" \
TELEGRAM_BOT_TOKEN="xxx" \
TELEGRAM_CHAT_ID="123456789" \
yarn pilot
```

---

## Recommended Claude Workflow

For long-running work, ask Claude to maintain external state:

```text
Maintain TASK_STATE.md.
After every meaningful step:
- update completed work
- update current status
- update next exact action

If interrupted:
- read TASK_STATE.md
- resume from the next unfinished step.
```

This matters because LLM context can drift over long sessions. External state is the real resume brain.

---

## Safety Notes

Avoid starting with:

```bash
claude --dangerously-skip-permissions
```

That mode allows Claude to execute commands and modify files without asking.

Claude Code Pilot should begin as a **human-supervised** tool:

Allowed early:

- watch output
- notify
- send `continue`
- send user-provided input
- show latest results

Avoid early:

- auto-approve permissions
- arbitrary remote shell execution
- autonomous destructive actions

---

## Roadmap

See:

- [`docs/ARCHITECTURE_UPDATE.md`](docs/ARCHITECTURE_UPDATE.md)
- [`TASKS.md`](TASKS.md)

High-level phases:

1. tmux watcher MVP
2. Node.js runtime refactor
3. multi-session support
4. detection engine
5. notification providers
6. web dashboard
7. persistent state
8. safety/policy engine
9. optional node-pty backend

---

## Target Dashboard Concept

Planned local dashboard:

```text
Sidebar
├── claude-buildx-api
├── claude-pos-mobile
├── claude-auth-refactor
└── claude-research

Main Panel
├── live output
├── status badge
├── input box
├── continue button
└── auto-resume toggle
```

This allows normal local terminal interaction when at the machine, plus remote-lite control when away.

---

## Philosophy

Claude Code Pilot is intended to become:

```text
human-supervised local AI runtime
```

not:

```text
fully autonomous AI operator
```

The system prioritizes:

- persistence
- observability
- recoverability
- resumability
- multi-session control
- human intervention
- practical workflows

Small tools first. Spaceship later.
