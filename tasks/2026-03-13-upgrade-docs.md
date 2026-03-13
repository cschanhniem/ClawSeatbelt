# 2026-03-13 Upgrade Docs

## Goal

Make the upgrade path obvious for existing ClawSeatbelt installs, and state plainly that plugin updates are manual today.

## Changes

- added upgrade instructions to [README.md](README.md) for latest, bulk, pinned, and local-link refresh paths
- expanded [docs/product/quickstart.md](docs/product/quickstart.md) with an "Update An Existing Install" section
- updated [docs/architecture/local-deploy.md](docs/architecture/local-deploy.md) to explain how linked and packed local installs are refreshed
- updated [docs/release/publish-playbook.md](docs/release/publish-playbook.md) and [docs/release/release-notes-template.md](docs/release/release-notes-template.md) so release docs cover upgrade verification as well as fresh install
- tightened [AGENTS.md](AGENTS.md) and [SKILL.md](SKILL.md) so install and upgrade guidance stays in the default doc update path

## Notes

- documented `openclaw plugins update clawseatbelt` as the main path for an existing npm-installed plugin
- kept exact-version reinstall instructions for operators who prefer pinned rollout over floating latest
- documented that ClawSeatbelt does not provide a plugin-specific self-update switch, while leaving room for OpenClaw's broader gateway-wide auto-updater

## Verification

- `git diff --check`
