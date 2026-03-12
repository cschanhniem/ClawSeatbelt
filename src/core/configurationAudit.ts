import { severityFromScore } from "./severity.js";
import type { Finding } from "../types/domain.js";
import type { OpenClawConfigLike } from "../types/openclaw.js";

interface ChannelPolicySnapshot {
  path: string;
  dmPolicy?: string;
  groupPolicy?: string;
  allowFrom: string[];
}

function readPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[key];
  }, source);
}

function buildConfigFinding(input: Omit<Finding, "severity">): Finding {
  return {
    ...input,
    severity: severityFromScore(input.score),
    source: "clawseatbelt-config-audit"
  };
}

function listStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function collectChannelPolicies(config: OpenClawConfigLike): ChannelPolicySnapshot[] {
  const channels = readPath(config, "channels");
  if (typeof channels !== "object" || channels === null || Array.isArray(channels)) {
    return [];
  }

  return Object.entries(channels)
    .filter(([, value]) => typeof value === "object" && value !== null && !Array.isArray(value))
    .map(([name, value]) => {
      const channelConfig = value as Record<string, unknown>;
      return {
        path: name === "defaults" ? "channels.defaults" : `channels.${name}`,
        dmPolicy: typeof channelConfig.dmPolicy === "string" ? channelConfig.dmPolicy : undefined,
        groupPolicy: typeof channelConfig.groupPolicy === "string" ? channelConfig.groupPolicy : undefined,
        allowFrom: listStrings(channelConfig.allowFrom)
      };
    });
}

export function assessOpenClawConfiguration(config: OpenClawConfigLike): Finding[] {
  const findings: Finding[] = [];

  const pluginsAllow = readPath(config, "plugins.allow");
  if (!Array.isArray(pluginsAllow) || pluginsAllow.length === 0) {
    findings.push(
      buildConfigFinding({
        id: "cfg-plugin-allowlist",
        title: "Plugin allowlist is not pinned",
        category: "configuration",
        score: 24,
        evidence: ["plugins.allow is missing or empty"],
        rationale: "OpenClaw warns that unallowlisted extensions increase trust ambiguity.",
        remediation: {
          summary: "Set plugins.allow to the exact trusted plugin IDs.",
          action: "Add clawseatbelt and other approved plugin IDs under plugins.allow."
        }
      })
    );
  } else if (!pluginsAllow.includes("clawseatbelt")) {
    findings.push(
      buildConfigFinding({
        id: "cfg-plugin-not-allowlisted",
        title: "ClawSeatbelt is not included in the plugin allowlist",
        category: "configuration",
        score: 26,
        evidence: [JSON.stringify(pluginsAllow)],
        rationale: "An explicit allowlist that omits ClawSeatbelt undermines predictable loading and trust posture.",
        remediation: {
          summary: "Add ClawSeatbelt to the trusted plugin inventory.",
          action: 'Include "clawseatbelt" in plugins.allow.'
        }
      })
    );
  }

  const execSecurity = readPath(config, "exec.security");
  if (execSecurity === "full") {
    findings.push(
      buildConfigFinding({
        id: "cfg-exec-full",
        title: "Host execution is configured for full access",
        category: "configuration",
        score: 30,
        evidence: ['exec.security = "full"'],
        rationale: "Full exec access raises the blast radius of prompt injection and malicious skills.",
        remediation: {
          summary: "Reduce host execution exposure for untrusted flows.",
          action: "Prefer allowlist or deny for exec.security and use approvals for escalation."
        }
      })
    );
  }

  const execAsk = readPath(config, "exec.ask");
  if (execAsk === "off") {
    findings.push(
      buildConfigFinding({
        id: "cfg-exec-ask-off",
        title: "Execution approvals are disabled",
        category: "configuration",
        score: 18,
        evidence: ['exec.ask = "off"'],
        rationale: "Approval prompts provide a useful final barrier for sensitive actions.",
        remediation: {
          summary: "Turn approval prompts back on for risky command execution.",
          action: "Use exec.ask = on-miss or always for higher-risk agent profiles."
        }
      })
    );
  }

  const redactSensitive = readPath(config, "logging.redactSensitive");
  if (redactSensitive !== "tools") {
    findings.push(
      buildConfigFinding({
        id: "cfg-redact-sensitive",
        title: "Sensitive tool output redaction is not fully enabled",
        category: "configuration",
        score: 16,
        evidence: [`logging.redactSensitive = ${JSON.stringify(redactSensitive)}`],
        rationale: "Persisted tool output often contains the exact material operators later regret storing.",
        remediation: {
          summary: "Enable sensitive tool-output redaction in OpenClaw itself.",
          action: 'Set logging.redactSensitive to "tools" for defense in depth.'
        }
      })
    );
  }

  const toolsProfile = readPath(config, "tools.profile");
  const toolsAllow = readPath(config, "tools.allow");
  const toolsDeny = readPath(config, "tools.deny");
  const hasExplicitToolControls =
    (Array.isArray(toolsAllow) && toolsAllow.length > 0) ||
    (Array.isArray(toolsDeny) && toolsDeny.length > 0);

  if ((typeof toolsProfile !== "string" || toolsProfile.length === 0) && !hasExplicitToolControls) {
    findings.push(
      buildConfigFinding({
        id: "cfg-tools-profile",
        title: "Tool access profile is not explicitly set",
        category: "configuration",
        score: 12,
        evidence: ["tools.profile is unset"],
        rationale: "Explicit tool profiles reduce surprises during upgrades and environment changes.",
        remediation: {
          summary: "Pin a deliberate tool profile instead of relying on implicit behavior."
        }
      })
    );
  }

  if (toolsProfile === "full" && (!Array.isArray(toolsDeny) || toolsDeny.length === 0)) {
    findings.push(
      buildConfigFinding({
        id: "cfg-tools-profile-full",
        title: "Tool profile is effectively unrestricted",
        category: "configuration",
        score: 18,
        evidence: ['tools.profile = "full"'],
        rationale: "OpenClaw treats the full profile like no restriction, which enlarges the blast radius of prompt injection.",
        remediation: {
          summary: "Pin a narrower base profile and deny high-impact runtime tools where possible.",
          action: 'Use tools.profile = "coding" or "messaging" and deny group:runtime for exposed agents.'
        }
      })
    );
  }

  const toolsAllowList = listStrings(toolsAllow);
  if (toolsAllowList.includes("*")) {
    findings.push(
      buildConfigFinding({
        id: "cfg-tools-allow-all",
        title: "Tool allowlist grants every tool",
        category: "configuration",
        score: 20,
        evidence: [JSON.stringify(toolsAllowList)],
        rationale: "A wildcard allowlist defeats the value of deliberate tool scoping.",
        remediation: {
          summary: "Replace the wildcard with a profile plus explicit exceptions.",
          action: "Remove '*' from tools.allow and rely on tools.profile with surgical allow entries."
        }
      })
    );
  }

  const channelPolicies = collectChannelPolicies(config);
  const openDmChannels = channelPolicies.filter((channel) => channel.dmPolicy === "open");
  if (openDmChannels.length > 0) {
    findings.push(
      buildConfigFinding({
        id: "cfg-pairing-dm-open",
        title: "One or more channels accept open direct messages",
        category: "configuration",
        score: 26,
        evidence: openDmChannels.map((channel) => `${channel.path}.dmPolicy = "open"`),
        rationale: "Open DMs widen inbound trust and are a common source of accidental multi-user exposure.",
        remediation: {
          summary: "Prefer pairing or explicit allowlists for direct-message access.",
          action: 'Set dmPolicy to "pairing" or "allowlist" for exposed channels.'
        }
      })
    );
  }

  const openGroupChannels = channelPolicies.filter((channel) => channel.groupPolicy === "open");
  if (openGroupChannels.length > 0) {
    findings.push(
      buildConfigFinding({
        id: "cfg-pairing-group-open",
        title: "One or more channels accept open group traffic",
        category: "configuration",
        score: 24,
        evidence: openGroupChannels.map((channel) => `${channel.path}.groupPolicy = "open"`),
        rationale: "Open group policy expands who can trigger the agent and increases shared-context risk.",
        remediation: {
          summary: "Restrict group ingress to allowlists unless every member is fully trusted.",
          action: 'Set groupPolicy to "allowlist" and add explicit group or sender allowlists.'
        }
      })
    );
  }

  const sessionDmScope = readPath(config, "session.dmScope");
  const likelySharedIngress = channelPolicies.some(
    (channel) =>
      channel.dmPolicy === "open" ||
      channel.groupPolicy === "open" ||
      channel.allowFrom.includes("*") ||
      channel.allowFrom.length > 1
  );
  if (
    likelySharedIngress &&
    sessionDmScope !== "per-channel-peer" &&
    sessionDmScope !== "per-account-channel-peer"
  ) {
    findings.push(
      buildConfigFinding({
        id: "cfg-session-dm-scope",
        title: "DM session scope is not isolated for likely shared ingress",
        category: "configuration",
        score: 28,
        evidence: [`session.dmScope = ${JSON.stringify(sessionDmScope ?? "main")}`],
        rationale:
          "OpenClaw recommends secure DM scope for setups that receive messages from multiple people or accounts.",
        remediation: {
          summary: "Isolate direct-message context per sender instead of sharing one main thread.",
          action: 'Set session.dmScope to "per-channel-peer" or "per-account-channel-peer" for shared inboxes.'
        }
      })
    );
  }

  return findings;
}
