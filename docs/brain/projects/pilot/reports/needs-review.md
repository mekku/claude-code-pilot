# Needs Review

Items requiring human review before confidence can be upgraded.

## Risks (inferred — not source_supported)

### config-concurrent-write-risk
- **Node:** [[config-concurrent-write-risk|Config Concurrent Write Risk]]
- **Confidence:** inferred
- **Why:** No explicit locking code visible in harvest exports; risk inferred from architectural pattern
- **Action:** Confirm whether any code paths can trigger concurrent saveConfig calls

### resume-window-killed-risk
- **Node:** [[resume-window-killed-risk|Resume Fails When tmux Window Killed]]
- **Confidence:** inferred
- **Why:** Harvest shows Watcher uses child_process for tmux commands but error handling in send-keys path is inferred
- **Action:** Check Watcher.js error handling around `tmux send-keys` after exit detection

## Security review suggested

### web-token-no-rotation-risk
- **Node:** [[web-token-no-rotation-risk|Static Web Token — No Rotation]]
- **Confidence:** source_supported
- **Action:** Consider `--rotate-token` CLI flag or documenting manual rotation procedure in README
