import type { Keyboard } from "../../src/keyboard.ts";

export const CLEAR_KEY = "the key that clears";

export class KeyboardStub implements Keyboard {
  isClearKey(keyId: string): boolean {
    return keyId === CLEAR_KEY;
  }
}
