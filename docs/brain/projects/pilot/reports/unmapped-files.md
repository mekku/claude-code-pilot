# Unmapped Files

Files not assigned to any KB domain node.

## Test files (mapped to domains via test coverage but no dedicated KB nodes)

- `test/config.test.js` — tests for [[core-load-config|core]] domain; no dedicated KB node (tests are active, not a risk)
- `test/webserver.test.js` — tests for [[web|web]] domain; no dedicated KB node

## Non-source files (intentionally excluded)

- `package.json` — project metadata; version injected by WebServer at runtime
- `README.md`, `CHANGELOG.md`, `LICENSE` — documentation
- `TASKS.md` — in-project task tracker
- `docs/ARCHITECTURE_UPDATE.md` — design notes

_Total unmapped: 2 test files (expected; test coverage confirmed via imports in harvest)_
