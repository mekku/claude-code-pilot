---
id: web-git-panel
name: Git Diff & Commit Panel
type: capability
domain: web
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
  - lib/ui.html
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/web
  - status/active
---

# Git Diff & Commit Panel

Exposes the session workspace's git state to the dashboard, letting users review changes and commit without leaving the browser.

## Backend endpoints

- `GET /api/sessions/:name/git/status` — runs `git status --porcelain` in the session's `path`; returns `{ files: [{ status, file }] }`. Returns `{ notGit: true }` if the directory is not a repo.
- `GET /api/sessions/:name/git/diff?file=<path>` — tries `git diff HEAD`, then `git diff --cached`, then `git diff --no-index /dev/null <file>` (for untracked files). Returns `{ diff: "<unified diff text>" }`.
- `POST /api/sessions/:name/git/commit` — body `{ message, files? }`. Runs `git add <files|.>` then `git commit -m <message>`. Returns `{ ok, output }` or `{ error }`.

## Frontend (GitPanel component)

- Auto-polls status every 5 s; hides entirely when no changes or not a git repo.
- File list with `~` (modified), `+` (untracked/added), `−` (deleted) icons and checkboxes.
- Click a filename → coloured unified diff expands inline (max 280 px, scrollable).
- Commit message input + **↑ Commit all** / **↑ Commit (N files)** button.
- Lives in [[web-serve-dashboard|dashboard]] sidebar below [[web-session-api|Queue Panel]].

## Related

- [[web|Web domain]]
- [[web-serve-dashboard|Serve Dashboard]]
- [[web-terminal-ui-concept|Terminal UI Concept]]
