# Claude Code Pilot — Tasks

## Phase 1 — Current MVP

### Session Persistence

- [x] tmux-based session persistence
- [x] auto-create tmux session
- [x] session watcher loop
- [x] terminal output capture
- [x] limit detection
- [x] resume command sending
- [x] Telegram notification support
- [x] duplicate limit protection
- [x] resume cooldown logic
- [x] npm package wrapper

---

## Phase 2 — Node Refactor

### Core Runtime

- [ ] migrate bash watcher logic into Node.js
- [ ] create SessionManager
- [ ] create Session abstraction
- [ ] create SessionAdapter interface
- [ ] implement TmuxSessionAdapter
- [ ] session lifecycle handling
- [ ] persistent config loading
- [ ] structured logging
- [ ] event emitter system

---

## Phase 3 — Multi Session Support

### Session Management

- [ ] support multiple concurrent Claude sessions
- [ ] session registry
- [ ] session metadata persistence
- [ ] session status tracking
- [ ] active/inactive state
- [ ] limit/waiting/running states
- [ ] restart session handling
- [ ] stale session cleanup

---

## Phase 4 — Detection Engine

### Detectors

- [ ] pluggable detector system
- [ ] usage limit detector
- [ ] reset time parser
- [ ] permission request detector
- [ ] stuck/no-output detector
- [ ] build failure detector
- [ ] test failure detector
- [ ] Claude crash detector

---

## Phase 5 — Notification System

### Providers

- [ ] notification abstraction
- [ ] Telegram provider
- [ ] Discord provider
- [ ] LINE provider
- [ ] desktop notification provider
- [ ] browser push support

---

## Phase 6 — Dashboard MVP

### Backend

- [ ] Express server
- [ ] WebSocket server
- [ ] REST API
- [ ] session API
- [ ] logs/output API
- [ ] send-input API
- [ ] continue-session API

### Frontend

- [ ] Vite frontend
- [ ] session sidebar
- [ ] live output panel
- [ ] session status badges
- [ ] send-input box
- [ ] continue button
- [ ] auto-scroll terminal output
- [ ] reconnect handling

---

## Phase 7 — State & Persistence

### Persistent State

- [ ] SQLite support
- [ ] JSON fallback storage
- [ ] session history
- [ ] event history
- [ ] notification history
- [ ] resume history
- [ ] output snapshotting

---

## Phase 8 — Safety & Policies

### Policy Engine

- [ ] policy abstraction
- [ ] allow/deny rules
- [ ] command filtering
- [ ] permission workflows
- [ ] require-human-approval actions
- [ ] dangerous command detection

---

## Phase 9 — Future Runtime

### Advanced Runtime

- [ ] node-pty backend
- [ ] non-tmux backend
- [ ] sandbox profiles
- [ ] docker isolation
- [ ] remote workers
- [ ] distributed sessions
- [ ] agent orchestration
- [ ] workflow engine

---

# Nice To Have

- [ ] session tags
- [ ] project grouping
- [ ] usage metrics
- [ ] cost tracking
- [ ] token usage estimates
- [ ] mobile-friendly dashboard
- [ ] markdown artifact viewer
- [ ] git status integration
- [ ] task templates
- [ ] session snapshots
- [ ] session replay

---

# Important Constraints

- interactive-first workflow
- tmux remains first-class during MVP
- avoid overengineering early
- prioritize recoverability
- prioritize observability
- externalized state is mandatory
- avoid unsafe autonomous execution
