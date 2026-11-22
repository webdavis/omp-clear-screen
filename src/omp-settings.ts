import type { PluginSettingsStore } from "./plugin-settings-store.ts";
import type { Settings } from "./settings.ts";

export class OmpSettings implements Settings {
  constructor(_store: PluginSettingsStore) {}

  async clearKey(_cwd: string): Promise<string> {
    return "ctrl+l";
  }
}
