import type { PluginSettingsStore } from "./plugin-settings-store.ts";
import type { Settings } from "./settings.ts";

export class OmpSettings implements Settings {
  constructor(private readonly store: PluginSettingsStore) {}

  async clearKey(cwd: string): Promise<string> {
    try {
      const { key } = await this.store.read("omp-clear-screen", cwd);
      return typeof key === "string" ? key : "ctrl+l";
    } catch {
      return "ctrl+l";
    }
  }
}
