import type { Screen } from "./screen.ts";

export class CtrlLScreenClearer {
  constructor(private readonly screen: Screen) {}

  handleKey(data: string): { consume: true } | undefined {
    if (data !== "\f") return undefined;
    this.screen.clear();
    return { consume: true };
  }
}
