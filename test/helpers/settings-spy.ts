import type { Settings } from "../../src/settings.ts";

export class SettingsSpy implements Settings {
  readonly messages: string[] = [];

  constructor(private readonly key: string) {}

  async clearKey(cwd: string): Promise<string> {
    this.messages.push(cwd);
    return this.key;
  }
}
