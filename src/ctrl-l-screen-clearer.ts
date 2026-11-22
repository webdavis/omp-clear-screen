import { matchesKey } from "@oh-my-pi/pi-tui";
import type { Screen } from "./screen.ts";

export class CtrlLScreenClearer {
  constructor(private readonly screen: Screen) {}

  handleKey(data: string): { consume: true } | undefined {
    if (!matchesKey(data, "ctrl+l")) return undefined;
    this.screen.clear();
    return { consume: true };
  }
}
