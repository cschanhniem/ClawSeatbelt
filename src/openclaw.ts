import { clawSeatbeltConfigSchema, validateClawSeatbeltConfig } from "./core/config.js";
import { ClawSeatbeltRuntime } from "./core/clawSeatbeltRuntime.js";
import type { OpenClawPluginApiLike, OpenClawPluginDefinitionLike } from "./types/openclaw.js";

export const clawSeatbeltPluginDefinition: OpenClawPluginDefinitionLike = {
  id: "clawseatbelt",
  name: "ClawSeatbelt",
  description:
    "Local-first trust layer for OpenClaw with inbound risk scoring, transcript hygiene, and skill inspection.",
  version: "0.1.0",
  configSchema: clawSeatbeltConfigSchema,
  register(api: OpenClawPluginApiLike): void {
    const parsed = validateClawSeatbeltConfig(api.pluginConfig);
    if (!parsed.ok) {
      throw new Error(`Invalid ClawSeatbelt config: ${parsed.errors.join("; ")}`);
    }

    const runtime = new ClawSeatbeltRuntime(api, parsed.value);
    runtime.register();
  }
};

export default function registerClawSeatbelt(api: OpenClawPluginApiLike): void {
  void clawSeatbeltPluginDefinition.register(api);
}
