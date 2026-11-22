import type { PluginSettingsStore } from "./plugin-settings-store.ts";
import type { Settings } from "./settings.ts";

export class OmpSettings implements Settings {
  constructor(private readonly store: PluginSettingsStore) {}

  async clearKey(cwd: string): Promise<string> {
    await this.store.read("omp-clear-screen", cwd);
    return "ctrl+l";
  }
}
