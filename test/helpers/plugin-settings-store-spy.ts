import type { PluginSettingsStore } from "../../src/plugin-settings-store.ts";

export class PluginSettingsStoreSpy implements PluginSettingsStore {
  readonly messages: string[][] = [];
  private stored: Record<string, unknown> = {};
  private unreadable = false;

  async read(plugin: string, cwd: string): Promise<Record<string, unknown>> {
    this.messages.push([plugin, cwd]);
    if (this.unreadable) throw new Error("omp's settings cannot be read");
    return this.stored;
  }

  holds(settings: Record<string, unknown>): void {
    this.stored = settings;
  }

  cannotBeRead(): void {
    this.unreadable = true;
  }
}
