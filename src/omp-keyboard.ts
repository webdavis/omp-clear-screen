import type { Keyboard } from "./keyboard.ts";

export class OmpKeyboard implements Keyboard {
  constructor(private readonly clearKey: string) {}

  isClearKey(keyId: string): boolean {
    return keyId === this.clearKey;
  }
}
