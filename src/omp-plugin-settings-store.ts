import type { PluginSettingsStore } from "./plugin-settings-store.ts";

export class OmpPluginSettingsStore implements PluginSettingsStore {
  // Importing the loader on first read lets the extension load, with its default key, after omp moves the loader.
  async read(plugin: string, cwd: string): Promise<Record<string, unknown>> {
    const { getPluginSettings } = await import("@oh-my-pi/pi-coding-agent/extensibility/plugins/loader");
    return getPluginSettings(plugin, cwd);
  }
}
