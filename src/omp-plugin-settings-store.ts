import type { PluginSettingsStore } from "./plugin-settings-store.ts";

function importOmpPluginLoaderOnFirstRead() {
  return import("@oh-my-pi/pi-coding-agent/extensibility/plugins/loader");
}

export class OmpPluginSettingsStore implements PluginSettingsStore {
  async read(plugin: string, cwd: string): Promise<Record<string, unknown>> {
    const { getPluginSettings } = await importOmpPluginLoaderOnFirstRead();
    return getPluginSettings(plugin, cwd);
  }
}
