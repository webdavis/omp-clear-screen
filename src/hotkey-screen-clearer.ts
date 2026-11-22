import type { KeyAnswer, KeyListener } from "./key-listener.ts";
import type { Keyboard } from "./keyboard.ts";
import type { ScreenClearer } from "./screen-clearer.ts";

export class HotkeyScreenClearer implements KeyListener {
  constructor(
    private readonly keyboard: Keyboard,
    private readonly clearer: ScreenClearer,
  ) {}

  handleKey(data: string): KeyAnswer {
    if (!this.keyboard.isClearKey(data)) return undefined;
    void this.clearer.clear();
    return { consume: true };
  }
}
