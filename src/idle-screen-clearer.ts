import type { Screen } from "./screen.ts";

export class IdleScreenClearer {
  constructor(private readonly screen: Screen) {}

  async clear(): Promise<void> {
    if (this.screen.isBusy()) {
      this.screen.warn("Clear the screen once the current response has finished.");
      return;
    }
    const found = await this.screen.clear();
    if (!found) this.screen.reportError("clear-screen cannot find omp's transcript; omp has changed.");
  }
}
