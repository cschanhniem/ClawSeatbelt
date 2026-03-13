# ClawSeatbelt Changelog

## 0.1.1

- Added a local-first OpenClaw deployment flow with `deploy:local` and `deploy:local:pack`.
- Hardened the release workflow for `main` lineage only and manual reruns from GitHub Actions.
- Migrated the release path to npm trusted publishing and provenance-first package metadata.
- Clarified publish and local-deploy docs so local development no longer depends on shell publishing.
- Hardened pack-based local scripts to use a workspace-local npm cache instead of relying on `~/.npm`.
- Made the local benchmark competitor snapshot fail fast instead of hanging indefinitely on blocked npm metadata calls.

## 0.1.0

- First publishable OpenClaw plugin entry with `openclaw.extensions`.
- Local-first inbound risk scoring, prompt-time guard context, and enforce-mode dangerous tool blocking.
- Persisted and outbound secret redaction.
- OpenClaw skill scanning and unified posture reporting.
- OpenClaw security audit JSON ingestion, versioned posture snapshots, machine-readable status export, and diff support.
- Expanded configuration posture checks for DM policy, group policy, secure DM scope, and unrestricted tool access.
- Config validation, runtime throttling, recent-incident tracking, and regression tests.
- Architecture, release, quickstart, provenance, and benchmark docs.
