# Release Notes Template

## Summary

ClawSeatbelt `<version>` makes the first OpenClaw trust decision easier. This release improves the local-first baseline, sharpens first proof, and gives operators clearer evidence they can forward.

## Why This Release Matters

Use one tight paragraph that answers a user’s real question:

- what got safer
- what got easier to prove
- what got easier to recommend
- what changed in install, policy, or runtime behavior

## Highlights

- inbound risk scoring before agent execution
- enforce-mode blocking for dangerous tool calls in risky sessions
- outbound and persisted secret redaction
- local skill scanning
- posture reporting and operator commands
- any change that improves the five-minute proof loop

## Install

```bash
openclaw plugins install clawseatbelt@<version>
```

## Upgrade

For operators who already have ClawSeatbelt installed:

```bash
openclaw plugins update clawseatbelt
openclaw gateway restart
```

If they want a fully pinned rollout instead of the latest published build:

```bash
openclaw plugins install clawseatbelt@<version>
openclaw gateway restart
```

## Recommended Setup

- Start in `observe` mode, then move to `enforce` after a low-noise soak.
- Pin `plugins.allow` explicitly.
- Pair ClawSeatbelt with native OpenClaw security audit, tool policy, and approval controls.

## First Proof

Point people to one fast check:

```bash
/csb_status
```

If the release changes command surface or first-proof guidance, keep the primary command example explicit:

```bash
/csb_status
```

If the release improved proof or recommendation surfaces, also call out:

```bash
/csb_check --target markdown --audience public
```

## Notes

- ClawSeatbelt reduces risk. It does not solve prompt injection.
- ClawSeatbelt is not a sandbox or kernel boundary.
- ClawSeatbelt does not ship a plugin-specific auto-update switch. If you mention automation, make it clear that OpenClaw's auto-updater is gateway-wide rather than a per-plugin toggle.
- Call out any new hook usage, blocking behavior, or config changes explicitly.
