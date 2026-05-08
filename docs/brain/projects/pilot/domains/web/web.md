---
id: web
name: Web
type: domain
status: active
confidence: source_supported
source_files:
  - lib/WebServer.js
last_reviewed: 2026-05-08
tags:
  - type/domain
  - domain/web
  - status/active
---

# Web Domain

Provides an optional HTTP dashboard for remote monitoring and control of Claude sessions. Built with Node.js native `http` module — no framework dependency.

## Capabilities

- [[web-serve-dashboard|Serve Dashboard]] — HTML status page with session list
- [[web-session-api|Session API]] — JSON API for session data and actions
- [[web-token-auth|Token Authentication]] — single-token access control

## Flows

- [[web-request-flow|Web Request Flow]] — request auth → route → response

## Concepts

- [[web-token-auth-concept|Token Auth Concept]] — static token design and security posture

## Cross-domain dependencies

- [[core|Core domain]] — config (token, sessions, port)
- [[session|Session domain]] — session state for API responses
