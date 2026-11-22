export interface PluginSettingsStore {
  read(plugin: string, cwd: string): Promise<Record<string, unknown>>;
}
