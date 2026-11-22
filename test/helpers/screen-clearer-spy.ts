import type { ScreenClearer } from "../../src/screen-clearer.ts";

export class ScreenClearerSpy implements ScreenClearer {
  readonly messages: string[] = [];

  async clear(): Promise<void> {
    this.messages.push("clear");
  }
}
