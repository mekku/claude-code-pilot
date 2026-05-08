---
id: web-request-flow
name: Web Request Flow
type: flow
domain: web
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
  - lib/config.js
last_reviewed: 2026-05-08
tags:
  - type/flow
  - domain/web
  - status/active
---

# Web Request Flow

How an HTTP request to the dashboard is handled — from token check to response.

## Steps

1. Browser/client hits `http://host:port/?token=<secret>`
2. `WebServer` checks token against config value — returns 401 if mismatch
3. For `GET /`: serves embedded HTML dashboard with injected session data and version
4. For `GET /api/sessions`: reads config, maps sessions to JSON with live tmux status check
5. For `POST /api/sessions/:name/action`: validates action, calls tmux command or SessionManager
6. All other paths → 404

## Related

- [[web|Web domain]]
- [[web-serve-dashboard|Serve Dashboard]]
- [[web-session-api|Session API]]
- [[web-token-auth|Token Auth]]
- [[core-load-config|Load Config]]
