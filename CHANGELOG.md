# ClawSeatbelt Changelog

## Unreleased

- Added OpenClaw security audit JSON ingestion for posture reporting.
- Added versioned posture snapshots, machine-readable JSON export, and diff support in `clawseatbelt-status`.
- Expanded configuration posture checks for DM policy, group policy, secure DM scope, and unrestricted tool access.
- Added posture engine architecture docs and regression coverage for audit normalization and snapshot handling.

## 0.1.0

- First publishable OpenClaw plugin entry with `openclaw.extensions`.
- Local-first inbound risk scoring, prompt-time guard context, and enforce-mode dangerous tool blocking.
- Persisted and outbound secret redaction.
- OpenClaw skill scanning and unified posture reporting.
- Config validation, runtime throttling, recent-incident tracking, and regression tests.
- Architecture, release, quickstart, provenance, and benchmark docs.
