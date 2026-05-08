---
id: web-token-auth
name: Token Authentication
type: capability
domain: web
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
last_reviewed: 2026-05-08
tags:
  - type/capability
  - domain/web
  - status/active
---

# Token Authentication

Protects the web dashboard and API using a secret token passed as a URL query parameter or HTTP header. The token is generated on first run and persisted in config.

## What it does

- Generates a random `crypto.randomBytes(16).toString('hex')` token on first run
- Saves the token to [[core-save-config|config]]
- Checks incoming requests for `?token=<value>` or `Authorization: Bearer <value>` header
- Returns HTTP 401 if token is missing or mismatched

## Entry point

`lib/WebServer.js` — middleware check on every request

## Related

- [[web|Web domain]]
- [[web-serve-dashboard|Serve Dashboard]]
- [[web-session-api|Session API]]
- [[web-token-auth-concept|Token Auth Concept]]
