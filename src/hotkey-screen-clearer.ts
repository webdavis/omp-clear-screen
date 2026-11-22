import { IdleScreenClearer } from "./idle-screen-clearer.ts";
import type { Keyboard } from "./keyboard.ts";
import type { Screen } from "./screen.ts";
import type { KeyAnswer, ScreenClearer } from "./screen-clearer.ts";

export class HotkeyScreenClearer implements ScreenClearer {
  private readonly clearer: IdleScreenClearer;

  constructor(
    private readonly keyboard: Keyboard,
    screen: Screen,
  ) {
    this.clearer = new IdleScreenClearer(screen);
  }

  handleKey(data: string): KeyAnswer {
    if (!this.keyboard.isClearKey(data)) return undefined;
    void this.clear();
    return { consume: true };
  }

  clear(): Promise<void> {
    return this.clearer.clear();
  }
}
