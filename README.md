# ClawSeatbelt

ClawSeatbelt is a local-first OpenClaw security plugin for operators who want safer daily use without handing trust to a cloud control plane. It scores risky inbound content, guards dangerous tool use, scans skills before trust expands, redacts sensitive transcript material, and turns OpenClaw security settings into one posture report a human can actually act on.

ClawSeatbelt is the new product name for the work that started under the ClawShield label. The repository path still uses `clawshield` for continuity, but the package, plugin ID, and public install surface now use `clawseatbelt`.

If you are searching for an OpenClaw security plugin, OpenClaw prompt injection guard, OpenClaw skill scanner, or OpenClaw transcript redaction plugin, this is the product surface ClawSeatbelt is built to own.

## Why OpenClaw Users Choose ClawSeatbelt

- Local-first by default. No account, no quota, no server, no cloud service in the hot path.
- Useful on day one. Install the plugin, allow it explicitly, and get a readable posture report within minutes.
- Built for the real OpenClaw threat model. It covers inbound message risk, dangerous tool calls, skill supply chain risk, transcript hygiene, and operator configuration gaps.
- Composes with OpenClaw instead of pretending first-party controls do not exist. ClawSeatbelt works with `openclaw security audit`, tool policy, exec approvals, pairing, and plugin allowlists.
- Small enough to inspect. The package is intentionally lean because trust starts with what users can verify.

## What ClawSeatbelt Covers

- OpenClaw prompt injection risk scoring before the model sees risky content
- prompt-time guard context for safer agent behavior
- dangerous tool-call blocking in `enforce` mode
- transcript redaction for persisted tool results
- outbound secret scrubbing
- OpenClaw skill scanning for suspicious install and execution patterns
- unified posture reporting with remediation guidance
- OpenClaw security audit JSON ingestion, snapshot export, and posture diffing

## Install ClawSeatbelt For OpenClaw

After publication:

```bash
openclaw plugins install clawseatbelt@0.1.0
```

Pin trust explicitly in your OpenClaw config:

```json
{
  "plugins": {
    "allow": ["clawseatbelt"]
  }
}
```

Suggested first configuration:

```json
{
  "plugins": {
    "entries": {
      "clawseatbelt": {
        "enabled": true,
        "config": {
          "mode": "observe",
          "warnThreshold": 30,
          "holdThreshold": 60
        }
      }
    }
  }
}
```

Start in `observe`, review the signal for a few days, then move to `enforce` when the findings are clean and predictable.

## Core Commands

- `/clawseatbelt-status`
- `/clawseatbelt-status --json --audit-file ./audit.json --write-snapshot ./clawseatbelt-posture.json`
- `/clawseatbelt-mode <observe|enforce|quiet>`
- `/clawseatbelt-scan <path>`
- `/clawseatbelt-explain <finding-id>`

## Why It Converts Better Than Generic Guardrails

- It is built as an OpenClaw-native trust layer, not a detached dashboard story.
- It makes OpenClaw safer before and after runtime, not only at the moment of tool execution.
- It treats skill supply-chain risk as a first-class problem.
- It explains what happened, why it matters, and what to do next in plain operator language.
- It keeps the baseline complete even if future interop with policy servers or hosted detectors is added.

## Common OpenClaw Questions

### How do I secure OpenClaw without a cloud service?

Install ClawSeatbelt, keep it in `observe` first, and use its posture report alongside OpenClaw’s native security audit, tool policy, exec approvals, and pairing controls.

### How do I scan OpenClaw skills before installation?

Use `/clawseatbelt-scan <path>` on the skill bundle before enabling it. ClawSeatbelt is built to make skill trust expansion visible, not implicit.

### How do I stop secrets from lingering in OpenClaw transcripts?

ClawSeatbelt redacts persisted tool results locally and adds outbound secret scrubbing for defense in depth.

### Does ClawSeatbelt replace OpenClaw security audit?

No. ClawSeatbelt amplifies it. The goal is one readable posture story, not duplicate knobs.

### Does ClawSeatbelt solve prompt injection?

No. It reduces risk, adds visibility, and blocks obvious unsafe flows in enforce mode. It is not a sandbox and it does not make prompt injection disappear.

## Release

Manual release flow:

```bash
npm test
npm pack --json --pack-destination .tmp/pack
npm publish
```

Automated publish is prepared through GitHub Actions once `NPM_TOKEN` is configured.

## Development

```bash
npm install
npm test
```

## Docs

- [plan.md](plan.md)
- [AGENTS.md](AGENTS.md)
- [docs/product/quickstart.md](docs/product/quickstart.md)
- [docs/product/positioning.md](docs/product/positioning.md)
- [docs/product/packaging-and-provenance.md](docs/product/packaging-and-provenance.md)
- [docs/benchmarks/competitor-artifact-benchmark.md](docs/benchmarks/competitor-artifact-benchmark.md)
- [docs/architecture/system-overview.md](docs/architecture/system-overview.md)
- [docs/release/publish-playbook.md](docs/release/publish-playbook.md)
