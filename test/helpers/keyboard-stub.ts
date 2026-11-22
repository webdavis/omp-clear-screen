import type { Keyboard } from "../../src/keyboard.ts";

export const CLEAR_KEY = "the key that clears";

export class KeyboardStub implements Keyboard {
  isClearKey(data: string): boolean {
    return data === CLEAR_KEY;
  }
}
