import { type KeyId, matchesKey } from "@oh-my-pi/pi-tui";
import type { Keyboard } from "./keyboard.ts";

export class OmpKeyboard implements Keyboard {
  constructor(private readonly key: string) {}

  isClearKey(data: string): boolean {
    return matchesKey(data, this.key as KeyId);
  }
}
