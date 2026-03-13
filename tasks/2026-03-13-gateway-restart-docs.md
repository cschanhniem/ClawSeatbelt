# Task Log: Gateway Restart Docs

## Goal

Clarify the real first-install flow for ClawSeatbelt so operators do not stop one step short of a live plugin load.

## Trigger

A manual install transcript on 2026-03-13 showed the practical gap in the docs:

- OpenClaw can warn that `plugins.allow` is empty during the first install before the allowlist command runs.
- The plugin still needs an OpenClaw gateway restart after install, allowlist, and enablement before it becomes active.
- OpenClaw doctor warnings from unrelated channel configuration can appear in the same output and should not be mistaken for ClawSeatbelt faults.

## Changes

- Updated `README.md` install instructions to include `openclaw gateway restart`.
- Updated `docs/product/quickstart.md` to explain the transient allowlist warning, the restart requirement, and unrelated doctor warnings.
- Updated `docs/release/publish-playbook.md` post-publish verification steps to include allowlist, enablement, and gateway restart.
- Updated recommendation and launch copy in `docs/product/why-clawseatbelt-first.md`, `docs/product/maintainer-answer-kit.md`, and `docs/launch/community-plugin-submission.md` so they no longer imply the plugin is live before restart.
- Updated `docs/architecture/local-deploy.md` notes and diagrams so readiness happens after the gateway restart rather than immediately after config writes.

## Result

The install docs now match what a real operator sees on first install instead of implying that config writes alone are enough.
