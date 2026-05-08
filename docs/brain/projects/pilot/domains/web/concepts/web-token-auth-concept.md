---
id: web-token-auth-concept
name: Web Token Auth Concept
type: concept
domain: web
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
last_reviewed: 2026-05-08
tags:
  - type/concept
  - domain/web
  - status/active
---

# Web Token Auth Concept

The web dashboard uses a single static secret token for access control — no sessions, no cookies, no user accounts. The token is generated once and stored in config.

## How it works

- Token passed as `?token=<value>` in URL or `Authorization: Bearer <value>` header
- Same token secures both the HTML dashboard and all API endpoints
- Token is printed to the terminal when the web server starts so the user can note it

## Non-obvious detail

The token does not rotate. If the config file is readable by other users on the same machine, the token is exposed. Designed for single-user, trusted-network use (e.g., local network or SSH tunnel), not for public internet exposure.

## Related

- [[web|Web domain]]
- [[web-token-auth|Token Authentication]]
- [[web-serve-dashboard|Serve Dashboard]]
