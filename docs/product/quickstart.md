# OpenClaw Security Quickstart

This is the fastest path to a safer OpenClaw setup with ClawSeatbelt.

## 1. Install The Plugin

Once the package is published:

```bash
openclaw plugins install clawseatbelt@0.1.0
```

## 2. Allow It Explicitly

Pin plugin trust in your OpenClaw config:

```json
{
  "plugins": {
    "allow": ["clawseatbelt"]
  }
}
```

## 3. Start In Observe Mode

Use a conservative first configuration:

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

`observe` is the right first step for most OpenClaw users. Let it collect signal before you ask it to block.

## 4. Check Your Posture

Run:

```bash
/clawseatbelt-status
```

For machine-readable posture output or first-party audit ingestion:

```bash
/clawseatbelt-status --json --audit-file ./openclaw-audit.json --write-snapshot ./clawseatbelt-posture.json
```

You should see a compact posture summary that explains:

- current runtime mode
- recent high-signal findings
- OpenClaw trust gaps worth fixing next

If you pass a prior snapshot with `--diff-file`, ClawSeatbelt will show whether trust posture improved or regressed.

## 5. Scan Skills Before You Trust Them

Run:

```bash
/clawseatbelt-scan /path/to/skill
```

Use this before enabling a skill, especially if the bundle pulls remote scripts, expands permissions, or hides execution behind setup instructions.

## 6. Move To Enforce When The Signal Is Clean

After a low-noise soak, switch to:

```bash
/clawseatbelt-mode enforce
```

`enforce` is where ClawSeatbelt starts blocking dangerous tool calls in risky sessions.

## Commands Worth Remembering

- `clawseatbelt-status`
- `clawseatbelt-mode <observe|enforce|quiet>`
- `clawseatbelt-scan <path>`
- `clawseatbelt-explain <finding-id>`
- Use the slash form inside OpenClaw chat, for example `/clawseatbelt-status`.

## Best Pairings With Native OpenClaw Security

- Set `plugins.allow` explicitly.
- Use `openclaw security audit` as a first-party baseline and let ClawSeatbelt make the results easier to act on.
- Avoid `exec.security = "full"` for open-ingress chat flows.
- Turn on approval prompts for sensitive execution.
- Enable OpenClaw transcript redaction and let ClawSeatbelt add local defense in depth.

## What ClawSeatbelt Does And Does Not Do

ClawSeatbelt is an OpenClaw trust layer. It is not a sandbox, and it does not claim prompt injection is solved. It reduces risk, improves visibility, and helps operators close obvious trust gaps before they become incidents.
