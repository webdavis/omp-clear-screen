import type { Settings } from "../../src/settings.ts";

export class SettingsStub implements Settings {
  constructor(private readonly key: string) {}

  async clearKey(): Promise<string> {
    return this.key;
  }
}
