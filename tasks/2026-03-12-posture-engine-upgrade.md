# Task Log: Posture Engine Upgrade

## Date

2026-03-12

## Scope

- Complete the unified posture-engine slice from `plan.md`.
- Ingest first-party OpenClaw audit JSON.
- Add posture snapshots, JSON export, and diff support.

## What Changed

- Added `src/reporting/openClawAudit.ts` to normalize `openclaw security audit --json` style reports into ClawSeatbelt findings.
- Rebuilt `src/reporting/postureReport.ts` around a richer posture model:
  - posture facets
  - versioned snapshots
  - shareable card rendering
  - diff support
- Extended `assessOpenClawConfiguration` with posture checks for:
  - unrestricted tool profile
  - wildcard tool allowlists
  - open DM policy
  - open group policy
  - insecure DM session scope for shared ingress
- Upgraded `csb_status` so it now supports:
  - `--audit-file`
  - `--json`
  - `--write-snapshot`
  - `--diff-file`
- Added architecture coverage in `docs/architecture/posture-engine.md` and updated the system overview.
- Added regression tests for audit normalization, snapshot diffing, and status-command export flow.

## Why

ClawSeatbelt cannot become the default OpenClaw trust layer if posture stays shallow. Operators need one surface that fuses runtime signal, first-party OpenClaw audit output, and configuration posture into a form they can read, save, compare, and act on.

This closes the most important gap in the current product story: ClawSeatbelt now wraps OpenClaw’s native security controls instead of merely sitting beside them.

## Verification

- `npm test`

## Next Moves

1. Build the benchmark harness and adversarial corpus for live competitor comparison.
2. Expand the skill scanner around provenance, remote installers, hidden execution paths, and permission-risk escalation.
3. Add an install-time trust report flow so fresh installs demonstrate value immediately.
