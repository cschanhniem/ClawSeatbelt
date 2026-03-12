# Task Log: Name Rebrand

## Date

2026-03-12

## Scope

- Replace the conflicting ClawShield brand on the public install surface.
- Pick a stronger package name that avoids scope friction and npm confusion.

## Decision

- Product name: `ClawSeatbelt`
- npm package: `clawseatbelt`
- OpenClaw plugin ID: `clawseatbelt`
- Command surface: `clawseatbelt-*`

## Why

`ClawShield` was colliding with existing ecosystem naming and pushed the release path toward a scoped package that adds avoidable ownership friction.

`ClawSeatbelt` is cleaner, easier to remember aloud, aligned with the product metaphor already used in the repo, and currently unpublished on npm.

## What Changed

- Renamed package metadata, plugin manifest, command names, and public install snippets.
- Updated release workflow and publish docs for an unscoped npm package.
- Added a continuity note in `README.md` so the repo path can stay stable while the public product name changes.

## Verification

- `npm view clawseatbelt` returned `404 Not Found` on 2026-03-12, which means the package name is currently unpublished.

## Next Moves

1. Publish `clawseatbelt@0.1.0`.
2. Verify install in a clean OpenClaw environment with the new plugin ID.
3. Update any external repo or listing names when convenient.
