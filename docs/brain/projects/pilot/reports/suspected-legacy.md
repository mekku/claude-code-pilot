# Suspected Legacy

Files flagged by harvest as potentially legacy, unused, or deprecated.

## bin/claude-pilot.js — suspected_unused (FALSE POSITIVE)

**Classification:** suspected_unused (harvest signal: no importers)
**Confidence:** source_supported
**Signals:**
- No files import this module (it's an entry point, not a library)
**Resolution:** This is the npm binary entry point registered in `package.json#bin`. The "no importers" signal is a false positive for CLI entry points. Status: **active**.

_No genuine legacy files detected in this project._
