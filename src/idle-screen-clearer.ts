import type { Screen } from "./screen.ts";
import type { ScreenClearer } from "./screen-clearer.ts";

export class IdleScreenClearer implements ScreenClearer {
  constructor(private readonly screen: Screen) {}

  async clear(): Promise<void> {
    if (this.screen.isBusy()) {
      this.screen.warn("Clear the screen once the current response has finished.");
      return;
    }
    const found = await this.screen.clear();
    if (!found) this.screen.reportError("omp-clearscreen cannot find omp's transcript; omp has changed.");
  }
}
