import type { Keyboard } from "../../src/keyboard.ts";

export const CTRL_L = "the ctrl+l key";

export class KeyboardStub implements Keyboard {
  isCtrlL(data: string): boolean {
    return data === CTRL_L;
  }
}
