---
id: session
name: Session
type: domain
status: active
confidence: source_supported
source_files:
  - lib/SessionManager.js
  - lib/Watcher.js
last_reviewed: 2026-05-08
tags:
  - type/domain
  - domain/session
  - status/active
---

# Session Domain

Manages the lifecycle of Claude Code sessions running inside tmux windows. Handles creation, process watching, auto-resume, and cleanup.

## Capabilities

- [[session-create|Create Session]] — create tmux window and start Claude
- [[session-resume|Auto-Resume Session]] — restart on unexpected exit
- [[session-watch-process|Watch Process]] — poll pane for exit or stale state
- [[session-remove-offline|Remove Offline Sessions]] — clean up dead sessions

## Flows

- [[session-watch-flow|Watch and Resume Flow]] — crash detection and restart path

## Concepts

- [[session-tmux-concept|Tmux Session Model]] — windows vs. sessions distinction
- [[session-auto-resume-concept|Auto-Resume Concept]] — how resume works and its limits

## Cross-domain dependencies

- [[core|Core domain]] — config read/write, notifications
- [[cli|CLI domain]] — orchestration entry point
