import type { Keyboard } from "./keyboard.ts";
import type { Screen } from "./screen.ts";
import type { KeyAnswer, ScreenClearer } from "./screen-clearer.ts";

export class HotkeyScreenClearer implements ScreenClearer {
  constructor(
    private readonly keyboard: Keyboard,
    private readonly screen: Screen,
  ) {}

  handleKey(data: string): KeyAnswer {
    if (!this.keyboard.isClearKey(data)) return undefined;
    void this.clear();
    return { consume: true };
  }

  async clear(): Promise<void> {
    if (this.screen.isBusy()) {
      this.screen.warn("Clear the screen once the current response has finished.");
      return;
    }
    const found = await this.screen.clear();
    if (!found) this.screen.reportError("clear-screen cannot find omp's transcript; omp has changed.");
  }
}
