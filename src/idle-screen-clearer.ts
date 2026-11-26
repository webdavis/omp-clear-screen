import type { Screen } from "./screen.ts";
import type { ScreenClearer } from "./screen-clearer.ts";

export class IdleScreenClearer implements ScreenClearer {
  constructor(private readonly screen: Screen) {}

  async clear(): Promise<void> {
    if (this.screen.isBusy()) {
      this.screen.warn("Clear the screen once the current response has finished.");
      return;
    }
    this.screen.clear();
  }
}
