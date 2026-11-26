import type { KeyListener } from "./key-listener.ts";
import type { Keyboard } from "./keyboard.ts";
import type { ScreenClearer } from "./screen-clearer.ts";

export class ClearKeyListener implements KeyListener {
  constructor(
    private readonly keyboard: Keyboard,
    private readonly clearer: ScreenClearer,
  ) {}

  handleKey(keyId: string): boolean {
    if (!this.keyboard.isClearKey(keyId)) return false;
    void this.clearer.clear();
    return true;
  }
}
