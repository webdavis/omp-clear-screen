import { matchesKey } from "@oh-my-pi/pi-tui";
import type { Screen } from "./screen.ts";
import type { KeyAnswer, ScreenClearer } from "./screen-clearer.ts";

export class CtrlLScreenClearer implements ScreenClearer {
  constructor(private readonly screen: Screen) {}

  handleKey(data: string): KeyAnswer {
    if (!matchesKey(data, "ctrl+l")) return undefined;
    this.clear();
    return { consume: true };
  }

  clear(): void {
    if (this.screen.isBusy()) {
      this.screen.warn("Clear the screen once the current response has finished.");
      return;
    }
    this.screen.clear();
  }
}
