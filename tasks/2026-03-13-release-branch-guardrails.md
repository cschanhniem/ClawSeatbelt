# Task Log: Release Branch Guardrails

## Goal

Ensure the npm publish workflow only releases from the intended branch lineage.

## Changes

- Added a `guard` job to the publish workflow.
- Manual `workflow_dispatch` releases now fail unless the selected ref is `main`.
- Tag-triggered releases now fail unless the tagged commit is reachable from `origin/main`.
- Updated the publish playbook to document the branch guardrails.

## Why This Matters

Tags are not branch-scoped in GitHub Actions. Without an explicit ancestry check, a release tag pushed from the wrong branch could still publish.
