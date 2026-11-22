import { matchesKey } from "@oh-my-pi/pi-tui";
import type { Screen } from "./screen.ts";
import type { KeyAnswer, ScreenClearer } from "./screen-clearer.ts";

export class CtrlLScreenClearer implements ScreenClearer {
  constructor(private readonly screen: Screen) {}

  handleKey(data: string): KeyAnswer {
    if (!matchesKey(data, "ctrl+l")) return undefined;
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
