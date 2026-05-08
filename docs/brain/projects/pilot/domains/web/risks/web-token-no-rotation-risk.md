---
id: web-token-no-rotation-risk
name: Static Web Token — No Rotation
type: risk
severity: med
domain: web
status: needs_review
confidence: source_supported
source_files:
  - lib/WebServer.js
  - lib/config.js
last_reviewed: 2026-05-08
tags:
  - type/risk
  - domain/web
  - status/needs_review
---

# Static Web Token — No Rotation

The web authentication token is generated once and stored permanently in `~/.claude-pilot/config.json`. It never rotates automatically.

## Risk

If `config.json` is readable by other users on the same machine, the token is permanently exposed. There is no expiry, no revocation mechanism, and no audit log of requests.

## Affected components

- [[web-token-auth|Token Authentication]]
- [[web-serve-dashboard|Serve Dashboard]]
- [[web-session-api|Session API]]

## Mitigation

Designed for trusted-network use (localhost or SSH tunnel). Users on shared machines should ensure `~/.claude-pilot/` is mode 700. Manual token rotation: delete `config.json` (will regenerate on next start, but also deletes session list).

## Action required

Human review: consider adding a `--rotate-token` CLI flag.
