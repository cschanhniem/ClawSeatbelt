# Release Notes Template

## Summary

ClawSeatbelt `<version>` improves OpenClaw baseline trust with local-first guardrails, clearer operator posture, and no hosted dependency in the hot path.

## Why This Release Matters

Use one tight paragraph that answers a user’s real question:

- what got safer
- what got easier to understand
- what changed in install, policy, or runtime behavior

## Highlights

- inbound risk scoring before agent execution
- enforce-mode blocking for dangerous tool calls in risky sessions
- outbound and persisted secret redaction
- local skill scanning
- posture reporting and operator commands

## Install

```bash
openclaw plugins install clawseatbelt@<version>
```

## Recommended Setup

- Start in `observe` mode, then move to `enforce` after a low-noise soak.
- Pin `plugins.allow` explicitly.
- Pair ClawSeatbelt with native OpenClaw security audit, tool policy, and approval controls.

## Notes

- ClawSeatbelt reduces risk. It does not solve prompt injection.
- ClawSeatbelt is not a sandbox or kernel boundary.
- Call out any new hook usage, blocking behavior, or config changes explicitly.
