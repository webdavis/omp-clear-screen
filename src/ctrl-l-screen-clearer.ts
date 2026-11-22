import type { Screen } from "./screen.ts";

export class CtrlLScreenClearer {
  constructor(private readonly screen: Screen) {}

  handleKey(_data: string): void {
    this.screen.clear();
  }
}
