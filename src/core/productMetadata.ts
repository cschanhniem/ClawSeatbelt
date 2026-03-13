export const CLAWSEATBELT_PLUGIN_ID = "clawseatbelt";
export const CLAWSEATBELT_PLUGIN_NAME = "ClawSeatbelt";
export const CLAWSEATBELT_PLUGIN_VERSION = "0.1.4";
export const CLAWSEATBELT_REPOSITORY_URL = "https://github.com/cschanhniem/ClawSeatbelt";

export const CLAWSEATBELT_COMMANDS = {
  status: {
    canonical: "csb_status",
    telegram: "csb_status",
    legacy: "clawseatbelt-status"
  },
  mode: {
    canonical: "csb_mode",
    telegram: "csb_mode",
    legacy: "clawseatbelt-mode"
  },
  scan: {
    canonical: "csb_scan",
    telegram: "csb_scan",
    legacy: "clawseatbelt-scan"
  },
  explain: {
    canonical: "csb_explain",
    telegram: "csb_explain",
    legacy: "clawseatbelt-explain"
  },
  proofpack: {
    canonical: "csb_proof",
    telegram: "csb_proof",
    legacy: "clawseatbelt-proofpack"
  },
  answer: {
    canonical: "csb_answer",
    telegram: "csb_answer",
    legacy: "clawseatbelt-answer"
  },
  challenge: {
    canonical: "csb_check",
    telegram: "csb_check",
    legacy: "clawseatbelt-challenge"
  }
} as const;

export type ClawSeatbeltCommandKey = keyof typeof CLAWSEATBELT_COMMANDS;

export function resolveCommandName(key: ClawSeatbeltCommandKey): string {
  return CLAWSEATBELT_COMMANDS[key].canonical;
}

export function resolveLegacyCommandName(key: ClawSeatbeltCommandKey): string {
  return CLAWSEATBELT_COMMANDS[key].legacy;
}

export function buildSlashCommand(key: ClawSeatbeltCommandKey): string {
  return `/${resolveCommandName(key)}`;
}

export function buildLegacySlashCommand(key: ClawSeatbeltCommandKey): string {
  return `/${resolveLegacyCommandName(key)}`;
}

export function buildPinnedInstallCommand(version = CLAWSEATBELT_PLUGIN_VERSION): string {
  return `openclaw plugins install ${CLAWSEATBELT_PLUGIN_ID}@${version}`;
}
