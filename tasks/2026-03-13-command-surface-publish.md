# 2026-03-13 Command Surface Publish

## Goal

Promote the `csb_*` command family to the visible primary surface everywhere operators look, remove stale install guidance, and cut the next publish from that corrected surface.

## Changes

- switched the public command registry to `csb_status`, `csb_mode`, `csb_scan`, `csb_explain`, `csb_proof`, `csb_answer`, and `csb_check`
- kept the older `clawseatbelt-*` names as legacy compatibility aliases instead of primary guidance
- rewrote activation, posture, challenge, and answer follow-up copy so the next-step commands stay on the new surface
- bumped the package and plugin version to `0.1.4`
- updated install, quickstart, submission, and publish docs so operator-facing examples no longer drift back to the old command family or previous pinned release
- refreshed the OpenClaw install-verification benchmark doc and package-provenance doc with the `0.1.4` tarball facts

## Verification

- `npm run release:check` with a workspace-local npm cache, plus a follow-up `npm run pack:artifact`
- `node scripts/verify-openclaw-lab.mjs --write-docs`
- publish attempt reached npm registry and failed on `EOTP`, which confirms auth is live but publish still needs a current one-time password or a trusted-publishing path
